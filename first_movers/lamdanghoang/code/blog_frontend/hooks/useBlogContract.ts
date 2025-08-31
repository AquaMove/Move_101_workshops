import { useState } from "react";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

const PACKAGE_ID =
    "0x82877d96b186eabcbfaf756db4b7611b3ef101f5c4d7c61365e5cdc3e02bf0b5"; // From deploy output

export function useBlogContract() {
    const client = useSuiClient();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction({
        execute: async ({ bytes, signature }) =>
            await client.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                    // Raw effects are required so the effects can be reported back to the wallet
                    showRawEffects: true,
                    // Select additional data to return
                    showObjectChanges: true,
                },
            }),
    });

    const getUserBlogs = async (address: string) => {
        const ownedObjects = await client.getOwnedObjects({
            owner: address,
            filter: {
                StructType: `${PACKAGE_ID}::blog::Blog`,
            },
            options: {
                showContent: true,
                showOwner: true,
            },
        });

        return ownedObjects.data;
    };

    const [createDigest, setCreateDigest] = useState("");
    const [createErr, setCreateErr] = useState<Error | null>(null);
    const createBlog = async (title: string, content: string) => {
        const tx = new Transaction();

        tx.moveCall({
            target: `${PACKAGE_ID}::blog::publish_blog`,
            arguments: [
                tx.pure.string(title),
                tx.pure.string(content),
                tx.object.clock(),
            ],
        });

        signAndExecuteTransaction(
            { transaction: tx },
            {
                onSuccess: (result) => {
                    console.log("object changes", result.objectChanges);
                    setCreateDigest(result.digest);
                },

                onError: (err) => {
                    setCreateErr(err);
                },
            }
        );
    };

    const [likeDigest, setLikeDigest] = useState("");
    const [likeErr, setLikeErr] = useState<Error | null>(null);
    const likeBlog = async (blogId: string) => {
        const tx = new Transaction();

        tx.moveCall({
            target: `${PACKAGE_ID}::blog::like_blog`,
            arguments: [tx.object(blogId)],
        });

        signAndExecuteTransaction(
            { transaction: tx },
            {
                onSuccess: (result) => {
                    console.log("object changes", result.objectChanges);
                    setLikeDigest(result.digest);
                },

                onError: (err) => {
                    setLikeErr(err);
                },
            }
        );
    };

    const [updateDigest, setUpdateDigest] = useState("");
    const [updateErr, setUpdateErr] = useState<Error | null>(null);
    const updateBlog = async (
        blogId: string,
        title: string,
        content: string
    ) => {
        const tx = new Transaction();

        tx.moveCall({
            target: `${PACKAGE_ID}::blog::edit_blog`,
            arguments: [
                tx.object(blogId),
                tx.pure.string(title),
                tx.pure.string(content),
            ],
        });

        signAndExecuteTransaction(
            { transaction: tx },
            {
                onSuccess: (result) => {
                    console.log("object changes", result.objectChanges);
                    setUpdateDigest(result.digest);
                },

                onError: (err) => {
                    setUpdateErr(err);
                },
            }
        );
    };

    const [deleteDigest, setDeleteDigest] = useState("");
    const [deleteErr, setDeleteErr] = useState<Error | null>(null);
    const deleteBlog = async (blogId: string) => {
        const tx = new Transaction();

        tx.moveCall({
            target: `${PACKAGE_ID}::blog::delete_blog`,
            arguments: [tx.object(blogId)],
        });

        signAndExecuteTransaction(
            { transaction: tx },
            {
                onSuccess: (result) => {
                    console.log("object changes", result.objectChanges);
                    setUpdateDigest(result.digest);
                },

                onError: (err) => {
                    setUpdateErr(err);
                },
            }
        );
    };

    return {
        getUserBlogs,
        createBlog,
        createDigest,
        createErr,
        likeBlog,
        likeDigest,
        likeErr,
        updateBlog,
        updateDigest,
        updateErr,
        deleteBlog,
        deleteDigest,
        deleteErr,
    };
}
