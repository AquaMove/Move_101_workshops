module blog::blog;

use std::string::String;

/// A blog post with content and likes count
public struct Blog has key, store {
    id: UID,
    author: address,
    title: String,
    content: String,
    likes: u64,
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
