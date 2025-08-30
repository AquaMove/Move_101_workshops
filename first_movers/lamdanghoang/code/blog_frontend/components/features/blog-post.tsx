"use client";

interface BlogPostProps {
    content: string;
}

export function BlogPost({ content }: BlogPostProps) {
    const parseMarkdown = (text: string) => {
        let html = text;

        // Headers
        html = html.replace(
            /^### (.*$)/gim,
            '<h3 class="text-lg font-sans font-semibold text-foreground mt-6 mb-3">$1</h3>'
        );
        html = html.replace(
            /^## (.*$)/gim,
            '<h2 class="text-xl font-sans font-semibold text-foreground my-4">$1</h2>'
        );
        html = html.replace(
            /^# (.*$)/gim,
            '<h1 class="text-2xl font-sans font-bold text-foreground mt-4">$1</h1>'
        );

        // Bold and italic
        html = html.replace(
            /\*\*(.*?)\*\*/g,
            '<strong class="font-semibold text-foreground">$1</strong>'
        );
        html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

        // Links
        html = html.replace(
            /\[([^\]]+)\]$$([^)]+)$$/g,
            '<a href="$2" class="text-primary hover:text-primary/80 underline" target="_blank" rel="noopener noreferrer">$1</a>'
        );

        // Code blocks
        html = html.replace(
            /```([\s\S]*?)```/g,
            '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code class="font-mono text-sm text-foreground">$1</code></pre>'
        );

        // Inline code
        html = html.replace(
            /`([^`]+)`/g,
            '<code class="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground">$1</code>'
        );

        // Blockquotes
        html = html.replace(
            /^> (.*$)/gim,
            '<blockquote class="border-l-4 border-primary pl-4 py-2 my-4 bg-muted/50 italic text-muted-foreground">$1</blockquote>'
        );

        // Lists
        html = html.replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>');
        html = html.replace(
            /(<li[\s\S]*<\/li>)/g,
            '<ul class="my-4 space-y-1 text-foreground">$1</ul>'
        );

        // Line breaks
        html = html.replace(
            /\n\n/g,
            '</p><p class="mb-4 text-foreground leading-relaxed">'
        );
        html = html.replace(/\n/g, "<br>");

        // Wrap in paragraph if not already wrapped
        if (!html.startsWith("&lt;")) {
            html =
                '<p class="mb-4 text-foreground leading-relaxed">' +
                html +
                "</p>";
        }

        return html;
    };

    return (
        <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
        />
    );
}
