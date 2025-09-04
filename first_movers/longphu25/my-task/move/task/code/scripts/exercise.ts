import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import keyPairJson from "./keypair.json";

/**
 *
 * Global variables
 *
 */
const { secretKey } = decodeSuiPrivateKey(keyPairJson.privateKey);
const keypair = Ed25519Keypair.fromSecretKey(secretKey);

// replace with your deployed package id
const PACKAGE_ADDRESS = `0x29b4d98fdcc25e6e8f593739f0fb3fea0acb88b576f2e1ad5d7c836231431937`;

// Example blog object id (after you mint one)
const BLOG_OBJECT_ID = `0xYOUR_BLOG_OBJECT_ID`;

const rpcUrl = getFullnodeUrl("devnet");
const suiClient = new SuiClient({ url: rpcUrl });

/**
 * Objects as input: Blog Exercise
 *
 * In this exercise, you will interact with the Blog contract written in Move.
 *
 * When finished, run the following command in the scripts directory to test your solution:
 *
 * yarn blog-interact
 *
 * RESOURCES:
 * - https://sdk.mystenlabs.com/typescript/transaction-building/basics
 */
const main = async () => {
  /**
   * Task 1:
   *
   * Create a new Transaction instance from the @mysten/sui/transactions module.
   */

  const tx = new Transaction();

  // This is an example of what the frontend application would do.
  // const tx = new Transaction();

  // Call your module's create_task function.
  // The result is an object that is now available for the rest of the PTB.
  const task = tx.moveCall({
    target: `${PACKAGE_ADDRESS}::task::create_task`,
    arguments: [tx.pure.string("My new task content")],
  });

  // Transfer the resulting task object to the transaction sender.
  const sender = keypair.getPublicKey().toSuiAddress(); // Define sender as the address derived from the keypair
  tx.transferObjects([task], tx.pure.address(sender));

  // This PTB can now be sent to the Sui network.
  const signer = keypair.getPublicKey(); // Initialize the signer with the public key from the keypair
  const result = await suiClient.signAndExecuteTransactionBlock({
    signer,
    transactionBlock: tx,
  });

  /**
   * Task 2:
   *
   * Call the `publish_blog` function from the blog module.
   *
   * Target format: {package}::blog::publish_blog
   * Args: a string content
   * Example: "Hello from TypeScript"
   */

  // tx.moveCall({
  //   target: `${PACKAGE_ADDRESS}::blog::publish_blog`,
  //   arguments: [
  //     tx.pure.string("Hello from TypeScript 🚀")
  //   ]
  // });

  /**
   * Task 3:
   *
   * Call the `like_blog` function.
   *
   * You must pass the BLOG_OBJECT_ID as an object input.
   */

  /**
   * Task 4 (optional advanced):
   *
   * Call `edit_content` to update the blog post text.
   */

  // tx.moveCall({
  //   target: `${PACKAGE_ADDRESS}::blog::edit_content`,
  //   arguments: [
  //     tx.object(BLOG_OBJECT_ID),
  //     tx.pure.string("Edited content from AppKit ✍️")
  //   ]
  // });

  /**
   * Task 5:
   *
   * Sign and execute the transaction with suiClient.
   * Print the result to console.
   */
};

main();
