# versionChecker
Github에 게시된 releases에서 최신 릴리즈 (latest)의 버전 tag를 가져와 반환하는 API입니다.

wrangler으로 작성되었으며 Cloudflare workers의 serverless용으로 작성되었습니다.

[This server is being published by Cloudflare Workers.](https://workers.cloudflare.com/)

## Response
```typescript
{
    latestVersion: "v1.2.1" // returns tag name
}
```
## Environment
`GITHUB_TOKEN`: Github API 액세스 토큰
