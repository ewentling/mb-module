# n8n-nodes-mastablasta

This is an n8n community node that lets you use [MastaBlasta](https://github.com/ewentling/MastaBlasta) in your n8n workflows.

MastaBlasta is a multi-platform social media posting service that allows you to post to multiple social media platforms at once, with AI-powered features for content optimization.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Post
- **Create**: Create a new social media post
- **Get**: Get details of a specific post
- **Get Many**: Retrieve multiple posts
- **Update**: Update an existing post
- **Delete**: Delete a post
- **Publish**: Publish a post immediately

### Account
- **Create**: Add a new social media account
- **Get**: Get details of a specific account
- **Get Many**: Retrieve all configured accounts
- **Update**: Update account credentials
- **Delete**: Remove an account
- **Test**: Test account credentials

### Media
- **Upload**: Upload media files (images, videos)
- **Get**: Get media file details
- **Get Many**: Retrieve all media files
- **Delete**: Delete a media file

### AI
- **Generate Caption**: AI-powered caption generation for posts
- **Suggest Hashtags**: Get AI-suggested hashtags for content
- **Predict Engagement**: Predict engagement metrics for content
- **Rewrite Content**: Rewrite content optimized for different platforms
- **Best Times**: Get AI-recommended best posting times
- **Translate Content**: Translate content to different languages
- **Posting Frequency**: Get optimal posting frequency recommendations
- **Optimize Image**: Optimize images for social media platforms
- **Enhance Image**: AI-powered image quality enhancement
- **Generate Alt Text**: Generate accessibility alt text for images
- **Generate Image**: Create images using DALL-E 3

### Analytics
- **Get Post Analytics**: Retrieve analytics for a specific post
- **Get Overview**: Get analytics overview with date and platform filters

### Platform
- **Get All**: Get all supported platforms and their capabilities
- **Get Post Types**: Get available post types for a platform
- **Get Post Types Details**: Get detailed post type information

### Viral
- **Get Hooks**: Access viral content hooks library (1,000+ hooks)
- **Predict Viral Score**: Predict virality score (0-100) for content
- **Get Best Practices**: Get platform-specific viral best practices

### Content
- **Multiply**: Transform one piece into 50+ platform-specific posts
- **Create Variations**: Generate multiple variations for A/B testing
- **Preview Post**: Preview how post will appear on platforms
- **Optimize Post**: Optimize post content for better engagement
- **Check Schedule Conflicts**: Check for scheduling conflicts

### Bulk
- **Create Posts**: Create multiple posts at once
- **Update Posts**: Update multiple posts at once
- **Delete Posts**: Delete multiple posts at once

### Webhook
- **Create**: Create a webhook for event notifications
- **Get Many**: Get all configured webhooks
- **Delete**: Delete a webhook

### Search
- **Search Posts**: Search for posts with advanced filters

### URL
- **Shorten**: Shorten URLs for social media
- **Get Many**: Get all shortened URLs
- **Get Stats**: Get URL click statistics
- **Delete**: Delete a shortened URL

## Credentials

This node supports two authentication modes:

### Development Mode (No Authentication)
- Uses MastaBlasta's `/api/*` endpoints
- No authentication required
- Good for testing and development

### Production Mode (JWT Authentication)
- Uses MastaBlasta's `/api/v2/*` endpoints
- Requires JWT access token
- Full authentication and user management

To set up credentials:
1. Set the **API Base URL** (default: `http://localhost:33766`)
2. Choose **Authentication Type**:
   - Select "None (Development Mode)" for testing
   - Select "JWT Token (Production Mode)" for production use
3. If using JWT, provide your **Access Token** obtained from MastaBlasta authentication

## Compatibility

- Tested with n8n version 1.0+
- Compatible with MastaBlasta API v1 and v2

## Usage

### Example: Create and Publish a Post

1. Add the **MastaBlasta** node to your workflow
2. Select **Resource**: Post
3. Select **Operation**: Create
4. Enter your **Content**
5. Select target **Platforms** (e.g., Twitter, Facebook, LinkedIn)
6. Optionally add:
   - Schedule Time for future posting
   - Media URLs
   - Tags

### Example: AI-Powered Content Workflow

1. Use **AI > Generate Caption** to create content
2. Use **AI > Suggest Hashtags** to get hashtags
3. Use **Post > Create** to create the post with generated content
4. Use **Post > Publish** to publish immediately

### Example: Analytics Workflow

1. Use **Post > Get Many** to retrieve your posts
2. Use **Analytics > Get Post Analytics** for each post
3. Use **Analytics > Get Overview** for aggregate metrics

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [MastaBlasta Repository](https://github.com/ewentling/MastaBlasta)
* [MastaBlasta Quick Start Guide](https://github.com/ewentling/MastaBlasta/blob/main/QUICK_START.md)

## Development

To build and test locally:

```bash
# Install dependencies
npm install

# Build the node
npm run build

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

## License

[MIT](LICENSE.md)

## Support

For issues or questions:
- [Report an issue](https://github.com/ewentling/mb-module/issues)
- [MastaBlasta Documentation](https://github.com/ewentling/MastaBlasta)
