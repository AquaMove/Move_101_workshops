import { useState } from "react";
import { 
  Box, 
  Container, 
  Heading, 
  Button, 
  Text, 
  Flex
} from "@radix-ui/themes";
import { CreateTask } from "./CreateTask.tsx";
import { TaskList } from "./TaskList.tsx";

export function TaskManager() {
  const [activeTab, setActiveTab] = useState<"create" | "list">("create");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskCreated = () => {
    setRefreshTrigger(prev => prev + 1);
    setActiveTab("list"); // Switch to list view to see the new task
  };

  return (
    <Container>
      <Box mb="4">
        <Heading size="6" mb="3">Task Manager</Heading>
        <Text color="gray" size="2">
          Create, manage, and interact with tasks on the Sui blockchain
        </Text>
      </Box>

      {/* Tab Navigation */}
      <Flex gap="2" mb="4">
        <Button
          variant={activeTab === "create" ? "solid" : "outline"}
          onClick={() => setActiveTab("create")}
        >
          Create Task
        </Button>
        <Button
          variant={activeTab === "list" ? "solid" : "outline"}
          onClick={() => setActiveTab("list")}
        >
          My Tasks
        </Button>
      </Flex>

      {/* Tab Content */}
      {activeTab === "create" && <CreateTask onTaskCreated={handleTaskCreated} />}
      {activeTab === "list" && <TaskList key={refreshTrigger} />}
    </Container>
  );
}

export default TaskManager;
