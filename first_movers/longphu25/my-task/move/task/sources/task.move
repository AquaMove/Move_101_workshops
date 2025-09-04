module task::task{
    use std::string::String;
    use sui::event;

    /// Error codes
    const ENotAuthor: u64 = 0;

    /// A Task post with content and likes count
    public struct Task has key, store {
        id: sui::object::UID,
        author: address,
        content: String,
        likes: u64,
        is_shared: bool, // Track if task is publicly shared
    }

    /// Event emitted when a new Task is published
    public struct TaskPublished has copy, drop {
        task_id: address,
        author: address,
        content: String,
    }

    /// Event emitted when a Task is shared
    public struct TaskShared has copy, drop {
        task_id: address,
        author: address,
        shared_by: address,
    }

    /// Event emitted when a Task is liked
    public struct TaskLiked has copy, drop {
        task_id: address,
        liked_by: address,
        total_likes: u64,
    }

    /// Publish a new Task , tranfer sender 
    #[allow(lint(self_transfer))]
    public fun create_task(content: String, ctx: &mut sui::tx_context::TxContext) {
        let task = publish_task(content, ctx);
        transfer::transfer(task, sui::tx_context::sender(ctx))
    }


    /// Publish a new Task
    public fun publish_task(content: String, ctx: &mut sui::tx_context::TxContext): Task {
        let task = Task {
            id: sui::object::new(ctx),
            author: sui::tx_context::sender(ctx),
            content,
            likes: 0,
            is_shared: false,
        };

        let task_id = sui::object::uid_to_address(&task.id);
        let author = sui::tx_context::sender(ctx);

        // Emit event for indexing
        event::emit(TaskPublished {
            task_id,
            author,
            content,
        });

        // Return object instead of transferring
        task
    }


    /// Like a task (increase likes count by 1)
    public fun like_task(task: &mut Task, ctx: &sui::tx_context::TxContext) {
        task.likes = task.likes + 1;

        // Emit event for tracking
        event::emit(TaskLiked {
            task_id: sui::object::uid_to_address(&task.id),
            liked_by: sui::tx_context::sender(ctx),
            total_likes: task.likes,
        });
    }

    /// Edit the content of a task (only author can edit)
    public fun edit_content(task: &mut Task, new_content: String, ctx: &sui::tx_context::TxContext) {
        assert!(task.author == sui::tx_context::sender(ctx), ENotAuthor); // Only author can edit
        task.content = new_content;
    }

    /// Get task content (read-only function)
    public fun get_content(task: &Task): String {
        task.content
    }

    /// Get likes count (read-only function)
    public fun get_likes(task: &Task): u64 {
        task.likes
    }

    /// Get task author (read-only function)
    public fun get_author(task: &Task): address {
        task.author
    }

    /// Transfer blog ownership to someone else (only author can do this)
    #[allow(lint(custom_state_change))]
    public fun transfer_task(task: Task, recipient: address, ctx: &sui::tx_context::TxContext) {
        assert!(task.author == sui::tx_context::sender(ctx), ENotAuthor);
        sui::transfer::transfer(task, recipient);
    }

    /// Share task publicly (anyone can read, but only author can edit/delete)
    #[allow(lint(share_owned))]
    public fun share_task(mut task: Task, ctx: &sui::tx_context::TxContext) {
        assert!(task.author == sui::tx_context::sender(ctx), ENotAuthor);
        task.is_shared = true;
        
        // Emit share event
        event::emit(TaskShared {
            task_id: sui::object::uid_to_address(&task.id),
            author: task.author,
            shared_by: sui::tx_context::sender(ctx),
        });
        
        sui::transfer::public_share_object(task);
    }

    /// Delete a task (only author can delete)
    public fun delete_task(task: Task, ctx: &sui::tx_context::TxContext) {
        assert!(task.author == sui::tx_context::sender(ctx), ENotAuthor); // Only author can delete
        let Task { id, author: _, content: _, likes: _, is_shared: _ } = task;
        sui::object::delete(id);
    }

}