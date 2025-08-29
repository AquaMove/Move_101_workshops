module blog_contract::blog;

use std::string::String;
use sui::clock::{Self, Clock};
use sui::event;

/// Error codes
const ENotAuthor: u64 = 0;

/// A blog post with content and likes count
public struct Blog has key, store {
    id: UID,
    author: address,
    title: String,
    content: String,
    likes: u64,
    timestamp_ms: u64,
}

/// Event emitted when a new blog is published
public struct BlogPublished has copy, drop {
    blog_id: ID,
    author: address,
    title: String,
}

/// Event emitted when a blog is liked
public struct BlogLiked has copy, drop {
    blog_id: ID,
    liked_by: address,
    total_likes: u64,
}

/// Publish a new blog post (entry function for CLI)
#[allow(lint(share_owned))]
public entry fun publish_blog(title: String, content: String, clock: &Clock, ctx: &mut TxContext) {
    let blog = create_blog(title, content, clock, ctx);
    transfer::share_object(blog);
}

/// Create a new blog post
fun create_blog(title: String, content: String, clock: &Clock, ctx: &mut TxContext): Blog {
    let blog = Blog {
        id: object::new(ctx),
        author: ctx.sender(),
        title,
        content,
        likes: 0,
        timestamp_ms: clock::timestamp_ms(clock),
    };

    let blog_id = object::uid_to_inner(&blog.id);
    let author = ctx.sender();

    // Emit event for indexing
    event::emit(BlogPublished {
        blog_id,
        author,
        title,
    });

    // Return object instead of transferring
    blog
}

/// Like a blog post (increase likes count by 1)
public fun like_blog(blog: &mut Blog, ctx: &TxContext) {
    blog.likes = blog.likes + 1;

    // Emit event for tracking
    event::emit(BlogLiked {
        blog_id: object::uid_to_inner(&blog.id),
        liked_by: ctx.sender(),
        total_likes: blog.likes,
    });
}

/// Edit the content of a blog post (only author can edit)
public fun edit_blog(blog: &mut Blog, new_title: String, new_content: String, ctx: &TxContext) {
    assert!(blog.author == ctx.sender(), ENotAuthor); // Only author can edit
    if (!new_title.is_empty()) {
        blog.title = new_title;
    };
    if (!new_content.is_empty()) {
        blog.content = new_content;
    }
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

/// Delete a blog post (only author can delete)
public fun delete_blog(blog: Blog, ctx: &TxContext) {
    assert!(blog.author == ctx.sender(), ENotAuthor); // Only author can delete
    let Blog { id, author: _, title: _, content: _, likes: _, timestamp_ms: _ } = blog;
    sui::object::delete(id);
}
