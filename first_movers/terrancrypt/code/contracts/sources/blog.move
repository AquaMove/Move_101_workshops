module blog::blog {
    use std::string::String;
    use sui::event;

    /// Error codes
    const ENotAuthor: u64 = 0;

    /// A blog post with content and likes count
    public struct Blog has key, store {
        id: sui::object::UID,
        author: address,
        content: String,
        likes: u64,
    }

    /// Event emitted when a new blog is published
    public struct BlogPublished has copy, drop {
        blog_id: address,
        author: address,
        content: String,
    }

    /// Event emitted when a blog is liked
    public struct BlogLiked has copy, drop {
        blog_id: address,
        liked_by: address,
        total_likes: u64,
    }

    /// Publish a new blog post and transfer to sender (entry function for CLI)
    public entry fun create_blog(content: String, ctx: &mut sui::tx_context::TxContext) {
        let blog = publish_blog(content, ctx);
        sui::transfer::transfer(blog, sui::tx_context::sender(ctx));
    }

    /// Publish a new blog post
    public fun publish_blog(content: String, ctx: &mut sui::tx_context::TxContext): Blog {
        let blog = Blog {
            id: sui::object::new(ctx),
            author: sui::tx_context::sender(ctx),
            content,
            likes: 0,
        };

        let blog_id = sui::object::uid_to_address(&blog.id);
        let author = sui::tx_context::sender(ctx);

        // Emit event for indexing
        event::emit(BlogPublished {
            blog_id,
            author,
            content,
        });

        // Return object instead of transferring
        blog
    }

    /// Like a blog post (increase likes count by 1)
    public fun like_blog(blog: &mut Blog, ctx: &sui::tx_context::TxContext) {
        blog.likes = blog.likes + 1;
        
        // Emit event for tracking
        event::emit(BlogLiked {
            blog_id: sui::object::uid_to_address(&blog.id),
            liked_by: sui::tx_context::sender(ctx),
            total_likes: blog.likes,
        });
    }

    /// Edit the content of a blog post (only author can edit)
    public fun edit_content(blog: &mut Blog, new_content: String, ctx: &sui::tx_context::TxContext) {
        assert!(blog.author == sui::tx_context::sender(ctx), ENotAuthor);
        blog.content = new_content;
    }

    /// Get blog content (read-only function)
    public fun get_content(blog: &Blog): String {
        blog.content
    }

    /// Get likes count (read-only function)
    public fun get_likes(blog: &Blog): u64 {
        blog.likes
    }

    /// Get blog author (read-only function)
    public fun get_author(blog: &Blog): address {
        blog.author
    }

    /// Transfer blog ownership to someone else (only author can do this)
    #[allow(lint(custom_state_change))]
    public fun transfer_blog(blog: Blog, recipient: address, ctx: &sui::tx_context::TxContext) {
        assert!(blog.author == sui::tx_context::sender(ctx), ENotAuthor);
        sui::transfer::transfer(blog, recipient);
    }

    /// Share blog publicly (anyone can read, but only author can edit/delete)
    #[allow(lint(share_owned))]
    public fun share_blog(blog: Blog, ctx: &sui::tx_context::TxContext) {
        assert!(blog.author == sui::tx_context::sender(ctx), ENotAuthor);
        sui::transfer::public_share_object(blog);
    }

    /// Delete a blog post (only author can delete)
    public fun delete_blog(blog: Blog, ctx: &sui::tx_context::TxContext) {
        assert!(blog.author == sui::tx_context::sender(ctx), ENotAuthor);
        let Blog { id, author: _, content: _, likes: _ } = blog;
        sui::object::delete(id);
    }
}