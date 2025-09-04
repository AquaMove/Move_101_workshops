import { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Button, 
  Text, 
  Card, 
  Flex, 
  Badge,
  Dialog,
  TextArea,
  Heading
} from "@radix-ui/themes";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction, useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfig";
import ClipLoader from "react-spinners/ClipLoader";

interface Task {
  objectId: string;
  content: string;
  author: string;
  likes: number;
  isOwned: boolean;
  isShared: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editContent, setEditContent] = useState("");
  
  const taskPackageId = useNetworkVariable("taskPackageId");
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction();

  // Fetch user's tasks
  useEffect(() => {
    if (!currentAccount?.address) return;
    
    fetchTasks();
  }, [currentAccount?.address, taskPackageId]);

  async function fetchTasks() {
    if (!currentAccount?.address || !taskPackageId) return;
    
    try {
      setLoading(true);
      
      // Get owned objects (private tasks)
      const ownedObjects = await suiClient.getOwnedObjects({
        owner: currentAccount.address,
        filter: {
          StructType: `${taskPackageId}::task::Task`,
        },
        options: {
          showContent: true,
          showType: true,
        },
      });

      const taskData: Task[] = [];

      console.log("Fetching tasks for address:", currentAccount.address);
      console.log("Using package ID:", taskPackageId);
      console.log("Found owned objects:", ownedObjects.data.length);

      // Process owned objects (private tasks)
      for (const obj of ownedObjects.data) {
        console.log("Processing object:", obj);
        if (obj.data?.content && 'fields' in obj.data.content) {
          const fields = obj.data.content.fields as any;
          console.log("Object fields:", fields);
          taskData.push({
            objectId: obj.data.objectId,
            content: fields.content || "",
            author: fields.author || "",
            likes: parseInt(fields.likes || "0"),
            isOwned: true,
            isShared: false,
          });
        }
      }

      // TODO: Add logic to fetch shared tasks by querying dynamic fields or events
      // For now, we're only showing owned tasks

      console.log("Processed task data:", taskData);
      setTasks(taskData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleLikeTask(taskId: string) {
    const tx = new Transaction();
    
    tx.moveCall({
      arguments: [tx.object(taskId)],
      target: `${taskPackageId}::task::like_task`,
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: () => {
          fetchTasks(); // Refresh tasks
        },
        onError: (error) => {
          console.error("Error liking task:", error);
          alert("Error liking task. Make sure it's a shared object.");
        }
      }
    );
  }

  function handleEditTask(taskId: string, newContent: string) {
    const tx = new Transaction();
    
    tx.moveCall({
      arguments: [tx.object(taskId), tx.pure.string(newContent)],
      target: `${taskPackageId}::task::edit_content`,
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: () => {
          setEditContent("");
          fetchTasks(); // Refresh tasks
        },
        onError: (error) => {
          console.error("Error editing task:", error);
          alert("Error editing task. Only the author can edit.");
        }
      }
    );
  }

  function handleDeleteTask(taskId: string) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    const tx = new Transaction();
    
    tx.moveCall({
      arguments: [tx.object(taskId)],
      target: `${taskPackageId}::task::delete_task`,
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: () => {
          fetchTasks(); // Refresh tasks
        },
        onError: (error) => {
          console.error("Error deleting task:", error);
          alert("Error deleting task. Only the author can delete.");
        }
      }
    );
  }

  function handleShareTask(taskId: string) {
    const tx = new Transaction();
    
    tx.moveCall({
      arguments: [tx.object(taskId)],
      target: `${taskPackageId}::task::share_task`,
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: () => {
          fetchTasks(); // Refresh tasks
          alert("Task shared successfully! Others can now like it.");
        },
        onError: (error) => {
          console.error("Error sharing task:", error);
          alert("Error sharing task. Only the author can share.");
        }
      }
    );
  }

  if (loading) {
    return (
      <Container>
        <Flex justify="center" align="center" style={{ height: "200px" }}>
          <ClipLoader size={40} />
        </Flex>
      </Container>
    );
  }

  return (
    <Container>
      <Box mb="4">
        <Flex justify="between" align="center">
          <Heading size="4">My Tasks ({tasks.length})</Heading>
          <Button size="2" onClick={fetchTasks} disabled={loading}>
            {loading ? <ClipLoader size={16} /> : "Refresh"}
          </Button>
        </Flex>
      </Box>

      {tasks.length === 0 ? (
        <Card>
          <Box p="4" style={{ textAlign: "center" }}>
            <Text color="gray">No tasks found. Create your first task!</Text>
          </Box>
        </Card>
      ) : (
        <Box style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {tasks.map((task) => (
            <Card key={task.objectId}>
              <Box p="4">
                <Flex justify="between" align="start" mb="3">
                  <Box style={{ flex: 1 }}>
                    <Text size="3" weight="medium" style={{ display: "block", marginBottom: "8px" }}>
                      {task.content}
                    </Text>
                    <Flex align="center" gap="2">
                      <Badge color={task.isShared ? "green" : "blue"}>
                        {task.isShared ? "Shared" : "Private"}
                      </Badge>
                      <Badge color="gray">
                        ❤️ {task.likes} likes
                      </Badge>
                    </Flex>
                  </Box>
                </Flex>

                <Flex gap="2" wrap="wrap">
                  {task.isShared && (
                    <Button 
                      size="1" 
                      variant="outline"
                      onClick={() => handleLikeTask(task.objectId)}
                      disabled={isPending}
                    >
                      👍 Like
                    </Button>
                  )}
                  
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <Button size="1" variant="outline">
                        ✏️ Edit
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Content style={{ maxWidth: "500px" }}>
                      <Dialog.Title>Edit Task</Dialog.Title>
                      <Dialog.Description size="2" mb="4">
                        Update your task content.
                      </Dialog.Description>

                      <Box mb="4">
                        <TextArea
                          placeholder="Enter new content..."
                          defaultValue={task.content}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={4}
                          style={{ width: "100%" }}
                        />
                      </Box>

                      <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                          <Button variant="soft" color="gray">
                            Cancel
                          </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                          <Button 
                            onClick={() => handleEditTask(task.objectId, editContent || task.content)}
                            disabled={isPending}
                          >
                            Save Changes
                          </Button>
                        </Dialog.Close>
                      </Flex>
                    </Dialog.Content>
                  </Dialog.Root>

                  {!task.isShared && (
                    <Button 
                      size="1" 
                      variant="outline"
                      onClick={() => handleShareTask(task.objectId)}
                      disabled={isPending}
                    >
                      🌐 Share
                    </Button>
                  )}
                  
                  <Button 
                    size="1" 
                    variant="outline" 
                    color="red"
                    onClick={() => handleDeleteTask(task.objectId)}
                    disabled={isPending}
                  >
                    🗑️ Delete
                  </Button>
                </Flex>

                <Text size="1" color="gray" mt="2" style={{ display: "block" }}>
                  ID: {task.objectId}
                </Text>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}
