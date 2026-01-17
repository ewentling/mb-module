# Usage Examples

This document provides practical examples of using the MastaBlasta n8n node.

## Table of Contents
- [Basic Post Creation](#basic-post-creation)
- [Scheduled Post](#scheduled-post)
- [AI-Powered Workflow](#ai-powered-workflow)
- [Account Management](#account-management)
- [Media Upload Workflow](#media-upload-workflow)
- [Analytics Dashboard](#analytics-dashboard)

## Basic Post Creation

Create a simple post to multiple platforms:

1. Add **MastaBlasta** node
2. Configure:
   - Resource: **Post**
   - Operation: **Create**
   - Content: "Check out our new product launch! 🚀"
   - Platforms: Twitter, Facebook, LinkedIn

The post will be created and queued for all selected platforms.

## Scheduled Post

Schedule a post for future publishing:

1. Add **MastaBlasta** node
2. Configure:
   - Resource: **Post**
   - Operation: **Create**
   - Content: "Happy Monday everyone!"
   - Platforms: Twitter, Instagram
   - Additional Fields → Schedule Time: "2026-01-20T09:00:00Z"

## AI-Powered Workflow

Create an automated content workflow:

### Step 1: Generate Caption
1. **MastaBlasta** node:
   - Resource: **AI**
   - Operation: **Generate Caption**
   - Topic: "New eco-friendly packaging"
   - Platform: Instagram
   - Tone: Professional

### Step 2: Get Hashtags
2. **MastaBlasta** node:
   - Resource: **AI**
   - Operation: **Suggest Hashtags**
   - Content: `{{ $json.caption }}`
   - Count: 10

### Step 3: Create Post
3. **MastaBlasta** node:
   - Resource: **Post**
   - Operation: **Create**
   - Content: `{{ $node["Generate Caption"].json.caption }} {{ $json.hashtags.join(' ') }}`
   - Platforms: Instagram, Twitter

## Account Management

Add and test a social media account:

### Step 1: Create Account
1. **MastaBlasta** node:
   - Resource: **Account**
   - Operation: **Create**
   - Platform: Twitter
   - Name: "Company Twitter Account"
   - Credentials:
     ```json
     {
       "api_key": "your_api_key",
       "api_secret": "your_api_secret",
       "access_token": "your_access_token",
       "access_token_secret": "your_access_token_secret"
     }
     ```

### Step 2: Test Account
2. **MastaBlasta** node:
   - Resource: **Account**
   - Operation: **Test**
   - Account ID: `{{ $json.id }}`

## Media Upload Workflow

Upload an image and create a post with it:

### Step 1: Upload Media
1. **Read Binary File** node (or HTTP Request to get image)
2. **MastaBlasta** node:
   - Resource: **Media**
   - Operation: **Upload**
   - Binary Property: "data"
   - Title: "Product Image"

### Step 2: Create Post with Media
3. **MastaBlasta** node:
   - Resource: **Post**
   - Operation: **Create**
   - Content: "Check out our latest product!"
   - Platforms: Instagram, Facebook
   - Media URLs: `{{ $json.url }}`

## Analytics Dashboard

Create a workflow to collect and analyze post performance:

### Step 1: Get All Posts
1. **MastaBlasta** node:
   - Resource: **Post**
   - Operation: **Get Many**
   - Return All: false
   - Limit: 50

### Step 2: Get Analytics for Each
2. **Loop Over Items** (split in batches if needed)
3. **MastaBlasta** node:
   - Resource: **Analytics**
   - Operation: **Get Post Analytics**
   - Post ID: `{{ $json.id }}`

### Step 3: Get Overview
4. **MastaBlasta** node:
   - Resource: **Analytics**
   - Operation: **Get Overview**
   - Start Date: "2026-01-01T00:00:00Z"
   - End Date: "2026-01-31T23:59:59Z"
   - Platform: "all"

### Step 4: Process Data
5. **Function** node to aggregate and format the data
6. **Send to your preferred destination** (Spreadsheet, Database, Dashboard)

## Best Practices

### Error Handling
- Always enable "Continue On Fail" for batch operations
- Use the **IF** node to check for errors: `{{ $json.error }}`

### Rate Limiting
- Use **Wait** nodes between bulk operations
- Check platform-specific rate limits

### Content Optimization
1. Use AI operations to optimize content before posting
2. Test engagement prediction to refine your content
3. Use best times API to schedule posts optimally

### Multi-Platform Strategy
```
[Schedule Trigger] → [Generate Content] → [Predict Engagement]
                                              ↓
                                    [If Score > 70]
                                              ↓
                    [Rewrite for Each Platform] → [Create Posts]
```

## Advanced Workflows

### Content Multiplier
Transform one piece of content into multiple posts:

1. **MastaBlasta AI** - Generate Caption (for main content)
2. **MastaBlasta AI** - Rewrite Content (for Twitter)
3. **MastaBlasta AI** - Rewrite Content (for LinkedIn)
4. **MastaBlasta AI** - Rewrite Content (for Instagram)
5. **Merge** all versions
6. **Split In Batches**
7. **MastaBlasta Post** - Create (for each platform)

### Performance Monitoring
Set up a daily workflow to track your social media performance:

1. **Schedule Trigger** (daily at 9 AM)
2. **MastaBlasta Analytics** - Get Overview (yesterday's data)
3. **Set** node to calculate metrics (engagement rate, reach, etc.)
4. **Send Email** with daily report
5. **Google Sheets** to log historical data

## Troubleshooting

### Common Issues

**Issue: "Invalid JSON format for credentials"**
- Ensure credentials are valid JSON
- Check for trailing commas or missing quotes

**Issue: "Post failed to publish"**
- Verify account credentials are valid
- Check platform-specific requirements (character limits, media formats)
- Use the Test Account operation to validate credentials

**Issue: "Media upload failed"**
- Check file size and format
- Ensure binary data is properly passed
- Verify supported formats for target platforms

## Need More Help?

- Check the [README](README.md) for general information
- See [CONTRIBUTING](CONTRIBUTING.md) for development guidelines
- Report issues on [GitHub](https://github.com/ewentling/mb-module/issues)
