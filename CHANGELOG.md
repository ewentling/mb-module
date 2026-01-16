# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-16

### Added
- Initial release of n8n-nodes-mastablasta
- Post resource with operations: create, get, getAll, update, delete, publish
- Account resource with operations: create, get, getAll, update, delete, test
- Media resource with operations: upload, get, getAll, delete
- AI resource with operations: generateCaption, suggestHashtags, predictEngagement, rewriteContent, bestTimes
- Analytics resource with operations: getPostAnalytics, getOverview
- Support for both Development mode (no auth) and Production mode (JWT auth)
- Support for 9 social platforms: Twitter, Facebook, Instagram, LinkedIn, TikTok, YouTube, Mastodon, Bluesky, Threads
- Comprehensive documentation and examples
- Full TypeScript implementation with type safety
- Error handling and continueOnFail support
