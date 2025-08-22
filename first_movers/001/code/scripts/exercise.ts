import { Transaction } from '@mysten/sui/transactions';
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { decodeSuiPrivateKey } from '@mysten/sui/cryptography';
import keyPairJson from './keypair.json';

/**
 * 
 * Global variables
 * 
 */
const { secretKey } = decodeSuiPrivateKey(keyPairJson.privateKey);
const keypair = Ed25519Keypair.fromSecretKey(secretKey);

// replace with your deployed package id
const PACKAGE_ADDRESS = `0xYOUR_PACKAGE_ID`;

// Example blog object id (after you mint one)
const BLOG_OBJECT_ID = `0xYOUR_BLOG_OBJECT_ID`;

const rpcUrl = getFullnodeUrl("testnet");
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