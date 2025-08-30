import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { graphql } from "@mysten/sui/graphql/schemas/latest";

const gqlClient = new SuiGraphQLClient({
    url: "https://sui-testnet.mystenlabs.com/graphql",
});

interface Blog {
    id: string;
    author: string;
    title: string;
    content: string;
    likes: number;
    timestamp_ms: number;
}

interface ObjectNode {
    address: string;
    version: unknown;
    asMoveObject: {
        contents: {
            json: unknown;
        } | null;
    } | null;
    display: Array<{
        key: string;
        value: string | null;
    }> | null;
}

interface ProcessedBlog {
    id: string;
    version: number;
    data: Blog;
    display: Record<string, string>;
}

const objects = graphql(`
    query {
        objects(
            filter: {
                type: "0x82877d96b186eabcbfaf756db4b7611b3ef101f5c4d7c61365e5cdc3e02bf0b5::blog::Blog"
            }
        ) {
            nodes {
                address
                version
                asMoveObject {
                    contents {
                        json
                    }
                }
                display {
                    key
                    value
                }
            }
        }
    }
`);

export const getAllBlogs = async (): Promise<ObjectNode[]> => {
    try {
        const result = await gqlClient.query({
            query: objects,
        });

        return result.data?.objects.nodes || [];
    } catch (error) {
        console.error("Error fetching objects:", error);
        throw error;
    }
};

export const processMoveObject = (
    objectNode: ObjectNode
): ProcessedBlog | null => {
    if (!objectNode.asMoveObject?.contents?.json) {
        return null;
    }

    const rawData = objectNode.asMoveObject.contents.json as Blog;
    const version =
        typeof objectNode.version === "number"
            ? objectNode.version
            : typeof objectNode.version === "string"
            ? parseInt(objectNode.version)
            : 0;

    // Display metadata
    const display: Record<string, string> = {};
    if (objectNode.display) {
        objectNode.display.forEach((item) => {
            if (item.value !== null) {
                display[item.key] = item.value;
            }
        });
    }

    // Validate required fields
    if (!rawData.id || !rawData.timestamp_ms || rawData.likes === undefined) {
        console.warn("Missing required fields in object data:", rawData);
        return null;
    }

    return {
        id: objectNode.address,
        version: version,
        data: rawData,
        display: display,
    };
};

export const processBlog = (objectNode: ObjectNode): Blog | null => {
    if (!objectNode.asMoveObject?.contents?.json) {
        return null;
    }

    const rawData = objectNode.asMoveObject.contents.json as Blog;

    // Validate required fields
    if (!rawData.id || !rawData.timestamp_ms || rawData.likes === undefined) {
        console.warn("Missing required fields in object data:", rawData);
        return null;
    }

    return {
        ...rawData,
        likes: Number(rawData.likes),
        timestamp_ms: Number(rawData.timestamp_ms),
    };
};

export const getAllProcessedBlogs = async (): Promise<Blog[]> => {
    const objects = await getAllBlogs();

    return objects.map(processBlog).filter((obj): obj is Blog => obj !== null);
};

export const getBlogsSortedByTime = async (
    newestFirst: boolean = false
): Promise<Blog[]> => {
    const objects = await getAllProcessedBlogs();

    return objects.sort((a, b) => {
        const timestampA = a.timestamp_ms;
        const timestampB = b.timestamp_ms;

        return newestFirst ? timestampB - timestampA : timestampA - timestampB;
    });
};
