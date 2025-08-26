import { useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { CONTRACT_ADDRESS } from "../constants/contract";
import type { Blog } from "../types/blog";

export function useUserBlogs() {
    const client = useSuiClient();
    const account = useCurrentAccount();

    return useQuery({
        queryKey: ["user-blogs", account?.address],
        queryFn: async () => {
            if (!account?.address) return [];

            try {
                // Get objects owned by the current user
                const ownedObjects = await client.getOwnedObjects({
                    owner: account.address,
                    filter: {
                        StructType: `${CONTRACT_ADDRESS}::Blog`,
                    },
                    options: {
                        showContent: true,
                        showType: true,
                    },
                });

                const blogs: Blog[] = [];

                for (const obj of ownedObjects.data) {
                    if (obj.data?.content && obj.data.content.dataType === "moveObject") {
                        try {
                            const fields = (obj.data.content as any).fields;
                            blogs.push({
                                id: obj.data.objectId,
                                author: fields.author,
                                content: fields.content,
                                likes: parseInt(fields.likes),
                            });
                        } catch (error) {
                            console.error("Error processing user blog:", error);
                        }
                    }
                }

                return blogs;
            } catch (error) {
                console.error("Error fetching user blogs:", error);
                return [];
            }
        },
        enabled: !!account?.address,
    });
}
