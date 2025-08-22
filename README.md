# Tasks Guide
Community Groups:

You must join the community groups and send a submitted PR (Pull Request) to be merged within a week, otherwise the reward will be forfeited

- [First Movers Discord](https://discord.gg/TmJvPmZECE) (Required)
- [First Movers Telegram](@firstmoversvn) Option


# How To Participate

**You must join the community groups and send a submitted PR (Pull Request) to be merged within a week.**

1. Copy the `first_movers/001` and rename the copied directory using your `GitHub ID`. Now you should have a directory named `first_movers/your-github-id`.
2. Fill out your personal information in `first_movers/your-github-id/README.md`.
3. Submit a PR (Pull Request):
    - Submit task first to register your wallet address, name the PR as `complete final project`.



# Task build a sui blog 

- [ ] write a simple mint Blog Object

```
public struct Blog has key {
    id: UID,
    content: String,
    likes: u64,
}

public fun publish_blog(content: String, ctx: &mut TxContext): Blog {
    let blog = Blog {
        // 	Use object::new(ctx) to generate a fresh UID.
        content,
        likes: 0,
    };

    // Transfer the object to the sender so it is globally owned.
}

public fun like_blog(blog: &mut Blog) {
    // update likes 
    // 	Increase the likes count by 1.
}


public fun edit_content(blog: &mut Blog, content: String) {
    // update content
}

// delete blog
public entry fun delete_blog(blog: Blog) {
    //
}
```

