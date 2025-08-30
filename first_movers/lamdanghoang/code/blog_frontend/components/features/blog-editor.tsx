"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, X, Eye, Edit } from "lucide-react";
import { BlogPost } from "@/components/features/blog-post";

interface BlogEditorProps {
    initialTitle?: string;
    initialContent?: string;
    onSave: (title: string, content: string) => void;
    onCancel: () => void;
    isEditing?: boolean;
}

export function BlogEditor({
    initialTitle = "",
    initialContent = "",
    onSave,
    onCancel,
    isEditing = false,
}: BlogEditorProps) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    const handleSave = () => {
        if (title.trim() && content.trim()) {
            onSave(title.trim(), content.trim());
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* <CHANGE> Editor header */}
            <header className="border-b border-border bg-card">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-sans font-bold text-foreground">
                            {isEditing ? "Edit Post" : "Write New Post"}
                        </h1>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                onClick={onCancel}
                                className="flex items-center gap-2 bg-transparent"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={!title.trim() || !content.trim()}
                                className="flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                {isEditing ? "Update Post" : "Publish Post"}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* <CHANGE> Editor content */}
            <main className="max-w-6xl mx-auto px-4 py-6">
                <div className="space-y-6">
                    {/* Title input */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-sans">
                                Post Title
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input
                                placeholder="Enter your post title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-lg"
                            />
                        </CardContent>
                    </Card>

                    {/* Content editor with tabs */}
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle className="text-lg font-sans">
                                Post Content
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="edit" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger
                                        value="edit"
                                        className="flex items-center gap-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="preview"
                                        className="flex items-center gap-2"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Preview
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="edit" className="mt-4">
                                    <Textarea
                                        placeholder={`Write your post content in markdown...

# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- List item 1
- List item 2

[Link text](https://example.com)

\`\`\`
code block
\`\`\`

> Blockquote`}
                                        value={content}
                                        onChange={(e) => {
                                            setContent(e.target.value);
                                            console.log(e.target.value);
                                        }}
                                        className="min-h-[400px] font-mono text-sm leading-relaxed resize-none"
                                    />
                                    <div className="mt-2 text-xs text-muted-foreground">
                                        Tip: Use markdown syntax to format your
                                        content. Switch to Preview tab to see
                                        how it looks.
                                    </div>
                                </TabsContent>

                                <TabsContent value="preview" className="mt-4">
                                    <div className="min-h-[400px] p-4 border border-border rounded-md bg-card">
                                        {content.trim() ? (
                                            <BlogPost content={content} />
                                        ) : (
                                            <p className="text-muted-foreground italic">
                                                Start writing to see the
                                                preview...
                                            </p>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
