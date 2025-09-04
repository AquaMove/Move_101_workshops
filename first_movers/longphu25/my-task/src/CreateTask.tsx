import { useState } from "react";
import { 
  Box, 
  Container, 
  Button, 
  Text, 
  Card, 
  TextArea,
  Heading
} from "@radix-ui/themes";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfig";
import ClipLoader from "react-spinners/ClipLoader";

export function CreateTask({ onTaskCreated }: { onTaskCreated?: () => void }) {
  const [content, setContent] = useState("");
  const [isShared, setIsShared] = useState(false);
  const taskPackageId = useNetworkVariable("taskPackageId");
  const suiClient = useSuiClient();
  const {
    mutate: signAndExecute,
    isSuccess,
    isPending,
    reset
  } = useSignAndExecuteTransaction();

  function handleCreateTask() {
    if (!content.trim()) {
      alert("Please enter task content");
      return;
    }

    const tx = new Transaction();

    if (isShared) {
      // Create and share the task publicly if checkbox is checked
      const [task] = tx.moveCall({
        arguments: [tx.pure.string(content)],
        target: `${taskPackageId}::task::publish_task`,
      });
      
      // Share the task publicly
      tx.moveCall({
        arguments: [task],
        target: `${taskPackageId}::task::share_task`,
      });
    } else {
      // Create task and transfer to sender (keep as owned object)
      tx.moveCall({
        arguments: [tx.pure.string(content)],
        target: `${taskPackageId}::task::create_task`,
      });
    }

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: async ({ digest }) => {
          console.log("Task created successfully:", digest);
          const result = await suiClient.waitForTransaction({
            digest: digest,
            options: {
              showEffects: true,
              showObjectChanges: true,
            },
          });
          
          console.log("Transaction result:", result);
          console.log("Object changes:", result.objectChanges);
          console.log("Effects:", result.effects);
          
          // Reset form
          setContent("");
          setIsShared(false);
          alert("Task created successfully!");
          
          // Call the callback to refresh task list
          onTaskCreated?.();
          
          // Reset mutation state after a delay
          setTimeout(() => {
            reset();
          }, 2000);
        },
        onError: (error) => {
          console.error("Error creating task:", error);
          alert("Error creating task. Please try again.");
        }
      },
    );
  }

  return (
    <Container>
      <Card>
        <Box p="4">
          <Heading size="4" mb="3">Create New Task</Heading>
          
          <Box mb="3">
            <Text as="label" size="2" weight="bold" mb="1" style={{ display: "block" }}>
              Task Content
            </Text>
            <TextArea
              placeholder="Enter your task content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              style={{ width: "100%" }}
            />
          </Box>

          <Box mb="4">
            <Text as="label" size="2" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={isShared}
                onChange={(e) => setIsShared(e.target.checked)}
              />
              Share task publicly (allows others to like it)
            </Text>
          </Box>

          <Button
            size="3"
            onClick={handleCreateTask}
            disabled={isSuccess || isPending || !content.trim()}
            style={{ width: "100%" }}
          >
            {isSuccess || isPending ? (
              <>
                <ClipLoader size={16} color="white" />
                <Text ml="2">Creating Task...</Text>
              </>
            ) : (
              "Create Task"
            )}
          </Button>

          {isSuccess && (
            <Text size="2" color="green" mt="2" style={{ display: "block" }}>
              ✅ Task created successfully!
            </Text>
          )}
        </Box>
      </Card>
    </Container>
  );
}
