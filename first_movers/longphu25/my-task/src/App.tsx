import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import TaskManager from "./TaskManager.tsx";

function App() {
  const currentAccount = useCurrentAccount();

  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>Task Manager dApp</Heading>
          <Text size="2" color="gray">Powered by Sui Blockchain</Text>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          {currentAccount ? (
            <TaskManager />
          ) : (
            <Box style={{ textAlign: "center", padding: "40px 0" }}>
              <Heading mb="3">Welcome to Task Manager</Heading>
              <Text color="gray" size="3">
                Please connect your wallet to start creating and managing tasks on the Sui blockchain
              </Text>
            </Box>
          )}
        </Container>
      </Container>
    </>
  );
}

export default App;
