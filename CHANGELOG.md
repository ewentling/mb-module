# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-01-16

### Added
- Platform resource with operations: getAll, getPostTypes, getPostTypesDetails
- Viral content resource with operations: getHooks, predictScore, getBestPractices
- Content resource with operations: multiply, createVariations, preview, optimize, checkConflicts
- Bulk operations resource: createPosts, updatePosts, deletePosts
- Webhook resource with operations: create, getAll, delete
- Search resource: searchPosts with advanced filters
- URL shortening resource: shorten, getAll, getStats, delete
- Additional AI operations: translateContent, postingFrequency, optimizeImage, enhanceImage, generateAltText, generateImage
- Support for 70+ operations across 12 resources
- Viral hooks library access (1,000+ hooks in 5 categories)
- Content multiplier (1 → 50+ posts)
- AI image generation with DALL-E 3
- Advanced image optimization and enhancement
- URL shortening with analytics
- Webhook event notifications
- Bulk operations for production use
- Full-text search with filters
- Schedule conflict detection
- Post preview and optimization

### Improved
- Expanded API coverage from ~15% to ~50% of available endpoints
- Added comprehensive viral content features
- Enhanced AI capabilities with image generation and optimization
- Better content management with multiplier and variations

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
