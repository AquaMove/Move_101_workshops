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
                            if (fields.author == account.address)
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
        enabled: !!account?.address,
    });
}
