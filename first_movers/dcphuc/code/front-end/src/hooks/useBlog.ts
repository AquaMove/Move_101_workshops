import { useSuiClient, useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CONTRACT_ADDRESS } from "../constants/contract";
import type { Blog, CreateBlogParams, EditBlogParams, LikeBlogParams, TransferBlogParams } from "../types/blog";

export function useBlogs() {
    const client = useSuiClient();

    return useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            try {
                // Query for BlogPublished events to get all blogs
                const events = await client.queryEvents({
                    query: {
                        MoveEventType: `${CONTRACT_ADDRESS}::BlogPublished`,
                    },
                    limit: 50,
                    order: "descending",
                });

                const blogs: Blog[] = [];

                // For each event, get the current state of the blog object
                for (const event of events.data) {
                    try {
                        const eventData = event.parsedJson as any;
                        const blogId = eventData.blog_id;

                        // Get the current state of the blog object
                        const blogObject = await client.getObject({
                            id: blogId,
                            options: { showContent: true },
                        });

                        if (blogObject.data?.content && blogObject.data.content.dataType === "moveObject") {
                            const fields = (blogObject.data.content as any).fields;
                            blogs.push({
                                id: blogId,
                                author: fields.author,
                                content: fields.content,
                                likes: parseInt(fields.likes),
                            });
                        }
                    } catch (error) {
                        console.error("Error processing blog event:", error);
                        // Continue with next blog
                    }
                }

                return blogs;
            } catch (error) {
                console.error("Error fetching blogs:", error);
                // Return empty array on error
                return [];
            }
        },
    });
}

export function useCreateBlog() {
    const account = useCurrentAccount();
    const signAndExecute = useSignAndExecuteTransaction();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ content }: CreateBlogParams) => {
            if (!account?.address) throw new Error("No account connected");

            const tx = new Transaction();
            tx.moveCall({
                target: `${CONTRACT_ADDRESS}::create_blog`,
                arguments: [tx.pure.string(content)],
            });

            const result = await signAndExecute.mutateAsync({
                transaction: tx,
            });

            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
}

export function useLikeBlog() {
    const account = useCurrentAccount();
    const signAndExecute = useSignAndExecuteTransaction();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ blogId }: LikeBlogParams) => {
            console.log("Liking blog with ID:", blogId);
            if (!account?.address) throw new Error("No account connected");

            const tx = new Transaction();
            tx.moveCall({
                target: `${CONTRACT_ADDRESS}::like_blog`,
                arguments: [tx.object(blogId)],
            });

            const result = await signAndExecute.mutateAsync({
                transaction: tx,
            });

            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
}

export function useEditBlog() {
    const account = useCurrentAccount();
    const signAndExecute = useSignAndExecuteTransaction();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ blogId, newContent }: EditBlogParams) => {
            if (!account?.address) throw new Error("No account connected");

            const tx = new Transaction();
            tx.moveCall({
                target: `${CONTRACT_ADDRESS}::edit_content`,
                arguments: [tx.object(blogId), tx.pure.string(newContent)],
            });

            const result = await signAndExecute.mutateAsync({
                transaction: tx,
            });

            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
}

export function useTransferBlog() {
    const account = useCurrentAccount();
    const signAndExecute = useSignAndExecuteTransaction();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ blogId, recipient }: TransferBlogParams) => {
            if (!account?.address) throw new Error("No account connected");

            const tx = new Transaction();
            tx.moveCall({
                target: `${CONTRACT_ADDRESS}::transfer_blog`,
                arguments: [tx.object(blogId), tx.pure.address(recipient)],
            });

            const result = await signAndExecute.mutateAsync({
                transaction: tx,
            });

            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
}

export function useShareBlog() {
    const account = useCurrentAccount();
    const signAndExecute = useSignAndExecuteTransaction();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (blogId: string) => {
            if (!account?.address) throw new Error("No account connected");

            const tx = new Transaction();
            tx.moveCall({
                target: `${CONTRACT_ADDRESS}::share_blog`,
                arguments: [tx.object(blogId)],
            });

            const result = await signAndExecute.mutateAsync({
                transaction: tx,
            });

            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
}

export function useDeleteBlog() {
    const account = useCurrentAccount();
    const signAndExecute = useSignAndExecuteTransaction();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (blogId: string) => {
            if (!account?.address) throw new Error("No account connected");

            const tx = new Transaction();
            tx.moveCall({
                target: `${CONTRACT_ADDRESS}::delete_blog`,
                arguments: [tx.object(blogId)],
            });

            const result = await signAndExecute.mutateAsync({
                transaction: tx,
            });

            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
}
