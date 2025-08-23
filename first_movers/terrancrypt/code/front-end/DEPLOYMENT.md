# Sui Blog dApp - Hướng dẫn Deploy

## Deploy Smart Contract

### 1. Chuẩn bị môi trường

```bash
# Cài đặt Sui CLI
curl -fsSL https://raw.githubusercontent.com/MystenLabs/sui/main/docs/scripts/install-sui.sh | sh

# Kiểm tra cài đặt
sui --version
```

### 2. Tạo project Move

```bash
# Tạo project mới
sui move new blog-contract
cd blog-contract

# Tạo file Move.toml
```

### 3. Tạo file Move.toml

```toml
[package]
name = "blog"
version = "1.0.0"
edition = "2024.beta"

[dependencies]
Sui = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-framework", rev = "framework/testnet" }

[addresses]
blog = "0x0"
```

### 4. Tạo source code

Tạo file `sources/blog.move` với nội dung smart contract đã cung cấp.

### 5. Build và Deploy

```bash
# Build contract
sui move build

# Deploy lên testnet
sui client publish --gas-budget 10000000

# Lưu lại Package ID từ output
```

## Deploy Frontend

### 1. Build Production

```bash
# Build ứng dụng
pnpm build

# Kiểm tra output trong thư mục dist/
```

### 2. Deploy lên Vercel

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 3. Deploy lên Netlify

```bash
# Cài đặt Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### 4. Deploy lên GitHub Pages

```bash
# Thêm script vào package.json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}

# Cài đặt gh-pages
pnpm add -D gh-pages

# Deploy
pnpm deploy
```

## Cấu hình Production

### 1. Cập nhật Contract Address

Sau khi deploy smart contract, cập nhật `src/constants/contract.ts`:

```typescript
export const PACKAGE_ID = "YOUR_DEPLOYED_PACKAGE_ID";
export const MODULE_NAME = "blog";
export const BLOG_STRUCT_NAME = "Blog";

export const CONTRACT_ADDRESS = `${PACKAGE_ID}::${MODULE_NAME}`;
```

### 2. Cấu hình Network

Cập nhật `src/provider.tsx` để sử dụng mainnet:

```typescript
const { networkConfig } = createNetworkConfig({
  mainnet: { url: getFullnodeUrl("mainnet") },
  testnet: { url: getFullnodeUrl("testnet") },
});

// Thay đổi default network
<SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
```

### 3. Environment Variables

Tạo file `.env.production`:

```env
VITE_SUI_NETWORK=mainnet
VITE_CONTRACT_PACKAGE_ID=YOUR_PACKAGE_ID
```

### 4. Cấu hình Indexing Service

Để lấy tất cả blogs, bạn cần một indexing service. Có thể sử dụng:

- **Sui Indexer**: https://github.com/MystenLabs/sui/tree/main/crates/sui-indexer
- **Sui GraphQL**: https://github.com/MystenLabs/sui/tree/main/crates/sui-graphql-rpc
- **Third-party services**: Alchemy, QuickNode, etc.

Cập nhật `src/hooks/useBlog.ts`:

```typescript
export function useBlogs() {
  const client = useSuiClient();
  
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      // Sử dụng indexing service để lấy blogs
      const response = await fetch('YOUR_INDEXING_SERVICE_URL/blogs');
      const blogs = await response.json();
      return blogs;
    },
  });
}
```

## Monitoring và Analytics

### 1. Error Tracking

Thêm Sentry hoặc LogRocket:

```bash
pnpm add @sentry/react @sentry/tracing
```

### 2. Analytics

Thêm Google Analytics hoặc Mixpanel:

```bash
pnpm add react-ga4
```

### 3. Performance Monitoring

Sử dụng Vercel Analytics hoặc Google PageSpeed Insights.

## Security Considerations

### 1. Input Validation

```typescript
// Validate blog content
const validateContent = (content: string) => {
  if (content.length > 10000) {
    throw new Error("Content too long");
  }
  if (content.trim().length === 0) {
    throw new Error("Content cannot be empty");
  }
};
```

### 2. Rate Limiting

Implement rate limiting cho các API calls:

```typescript
const rateLimiter = {
  createBlog: new Map(),
  likeBlog: new Map(),
};

const checkRateLimit = (action: string, address: string) => {
  const now = Date.now();
  const userActions = rateLimiter[action].get(address) || [];
  const recentActions = userActions.filter(time => now - time < 60000); // 1 minute
  
  if (recentActions.length >= 5) {
    throw new Error("Rate limit exceeded");
  }
  
  recentActions.push(now);
  rateLimiter[action].set(address, recentActions);
};
```

### 3. Content Moderation

Implement content filtering:

```typescript
const filterContent = (content: string) => {
  const bannedWords = ['spam', 'inappropriate'];
  const lowerContent = content.toLowerCase();
  
  for (const word of bannedWords) {
    if (lowerContent.includes(word)) {
      throw new Error("Content contains inappropriate words");
    }
  }
  
  return content;
};
```

## Testing

### 1. Unit Tests

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```

### 2. Integration Tests

Test với Sui testnet:

```typescript
describe('Blog Contract Integration', () => {
  it('should create a blog post', async () => {
    // Test implementation
  });
});
```

### 3. E2E Tests

```bash
pnpm add -D playwright
```

## Maintenance

### 1. Regular Updates

- Cập nhật dependencies hàng tháng
- Monitor Sui network updates
- Cập nhật smart contract nếu cần

### 2. Backup Strategy

- Backup smart contract source code
- Backup frontend code
- Monitor contract events

### 3. Performance Optimization

- Implement caching
- Optimize bundle size
- Use CDN cho static assets

## Support và Documentation

### 1. API Documentation

Tạo API documentation cho các hooks và functions.

### 2. User Guide

Cập nhật README và USAGE.md với thông tin mới nhất.

### 3. Community Support

- GitHub Issues
- Discord/Slack channels
- Stack Overflow tags
