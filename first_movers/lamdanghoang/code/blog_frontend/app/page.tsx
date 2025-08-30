"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Edit, Trash2, Plus } from "lucide-react";
import { BlogEditor } from "@/components/features/blog-editor";
import { BlogPost } from "@/components/features/blog-post";
import { WalletSelector } from "@/components/wallet/ConnectButton";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useBlogContract } from "@/hooks/useBlogContract";
import { getBlogsSortedByTime } from "@/hooks/useSuiGraphQLClient";
import { formatAddress } from "@mysten/sui/utils";

interface Blog {
    id: string;
    author: string;
    title: string;
    content: string;
    likes: number;
    timestamp_ms: number;
}

export default function HomePage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [showEditor, setShowEditor] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const currentAccount = useCurrentAccount();
    const {
        createBlog,
        likeBlog,
        updateBlog,
        deleteBlog,
        createDigest,
        updateDigest,
        likeDigest,
        deleteDigest,
    } = useBlogContract();

    const loadBlogs = async () => {
        try {
            setIsLoading(true);
            const objects = await getBlogsSortedByTime(true);
            setBlogs(objects);
            console.log("Blogs loaded:", objects);
        } catch (error) {
            console.error("Error loading blogs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        loadBlogs();
    }, []);

    // Refetch when digests change (after operations complete)
    useEffect(() => {
        if (createDigest || updateDigest || likeDigest || deleteDigest) {
            loadBlogs();
        }
    }, [createDigest, updateDigest, likeDigest, deleteDigest]);

    const handleSaveBlog = (title: string, content: string, id?: string) => {
        if (editingBlog) {
            // Update existing blog
            updateBlog(editingBlog.id, title, content);
            setEditingBlog(null);
        } else {
            // Create new blog
            createBlog(title, content);
        }
    };

    const handleEditBlog = (blog: Blog) => {
        setEditingBlog(blog);
        setShowEditor(true);
    };

    const handleCancelEdit = () => {
        setShowEditor(false);
        setEditingBlog(null);
    };

    useEffect(() => {
        setShowEditor(false);
    }, [createDigest, updateDigest]);

    if (showEditor) {
        return (
            <BlogEditor
                initialTitle={editingBlog?.title || ""}
                initialContent={editingBlog?.content || ""}
                onSave={handleSaveBlog}
                onCancel={handleCancelEdit}
                isEditing={!!editingBlog}
            />
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border bg-card">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-sans font-bold text-foreground">
                                Sui Blog
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Write beautiful posts with markdown
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                disabled={!currentAccount}
                                onClick={() => setShowEditor(true)}
                                className="flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Write a Post
                            </Button>

                            <WalletSelector />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {blogs.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-sans font-semibold text-foreground mb-4">
                            No posts yet
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Start writing your first blog post!
                        </p>
                        <Button
                            onClick={() => setShowEditor(true)}
                            className="flex items-center gap-2 mx-auto"
                        >
                            <Plus className="w-4 h-4" />
                            Create Your First Post
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {blogs.map((blog) => (
                            <Card
                                key={blog.id}
                                className="overflow-hidden gap-0"
                            >
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-xl font-sans text-primary mb-2">
                                                {blog.title}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(
                                                    blog.timestamp_ms
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                disabled={
                                                    blog.author !==
                                                    currentAccount?.address
                                                }
                                                onClick={() =>
                                                    handleEditBlog(blog)
                                                }
                                                className="text-muted-foreground hover:text-white"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                disabled={
                                                    blog.author !==
                                                    currentAccount?.address
                                                }
                                                onClick={() =>
                                                    deleteBlog(blog.id)
                                                }
                                                className="text-muted-foreground hover:text-white"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <BlogPost content={blog.content} />
                                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => likeBlog(blog.id)}
                                            className="flex items-center gap-2 text-red-500 hover:text-white"
                                        >
                                            <Heart className="w-4 h-4 fill-current" />
                                            {blog.likes} {""}
                                            {blog.likes === 1 ||
                                            blog.likes === 0
                                                ? "Like"
                                                : "Likes"}
                                        </Button>
                                        <Badge
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            {formatAddress(blog.author)}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
