# n8n-nodes-mastablasta

This is an n8n community node that lets you use [MastaBlasta](https://github.com/ewentling/MastaBlasta) in your n8n workflows.

MastaBlasta is a multi-platform social media posting service that allows you to post to multiple social media platforms at once, with AI-powered features for content optimization.

**🎉 Version 1.0.0 - Complete API Coverage**
- **21 Resources** with **150+ Operations**
- **100% API Coverage** - All MastaBlasta endpoints implemented
- Support for **9 social platforms**: Twitter, Facebook, Instagram, LinkedIn, TikTok, YouTube, Mastodon, Bluesky, Threads
- Advanced features: Video generation, Voiceover studio, AI intelligence, Social monitoring, A/B testing

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

### From npm (Recommended - Proper Registration)

**⚠️ IMPORTANT**: Always use n8n's built-in Community Nodes installer for proper registration in n8n's database.

Once published, install via n8n Community Nodes:

1. Go to **Settings** > **Community Nodes** in n8n
2. Click **Install** and enter: `n8n-nodes-mastablasta`
3. Click **Install** and restart n8n

This method ensures the package is properly registered in n8n's `installed_packages` and `installed_nodes` database tables, which is required for n8n to recognize and load the node at startup.

### From GitHub (Development)

**⚠️ WARNING**: Installing directly from GitHub or manually does NOT register the package in n8n's database. The node files will exist but n8n won't load them at startup. This method is only for development/testing with custom loading mechanisms.

For development or testing the latest version:

```bash
npm install ewentling/mb-module
```

The package will automatically build during installation via the `prepare` script, creating the required `dist/` folder.

**Note**: Build tools (`@n8n/node-cli`, `typescript`) are included in dependencies to support GitHub installations. When installing from npm (once published), the pre-built `dist/` folder is already included.

### Manual Installation (Advanced)

**⚠️ WARNING**: Manual installation requires database registration. Use n8n's Community Nodes UI instead.

For contributors and advanced users:

```bash
git clone https://github.com/ewentling/mb-module.git
cd mb-module
npm install
npm run build
npm pack
```

Then use n8n's Community Nodes installer to install the generated `.tgz` file, which ensures proper database registration.

For more details, follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

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

### Video
- **Generate Script**: AI video script generation
- **Create Slideshow**: Create slideshow from images
- **Generate Captions**: Generate video captions
- **Optimize Video**: Optimize for platforms
- **Get Video Specs**: Platform video specifications
- **+18 more operations**: Subtitles, thumbnails, watermarks, intro/outro, etc.

### Voiceover
- **Get Supported Languages**: List available languages
- **Generate Pronunciation Guide**: Pronunciation assistance
- **Add Emotion Markers**: Add emotional cues
- **Multi-Voice Script**: Multiple voice support
- **+6 more operations**: Breath marks, TTS config, music sync, etc.

### Social Monitor
- **Create**: Create social monitoring
- **Get Many**: List all monitors
- **Get Results**: Get monitoring results
- **Refresh**: Refresh monitor data
- **+2 more operations**: Update, delete monitors

### Video Clip
- **Analyze**: Analyze video for viral clips
- **Get Video Info**: Extract video information
- **Schedule**: Schedule clips for posting
- **+3 more operations**: Metadata, download info, status

### Template
- **Create**: Create content template
- **Get**: Get template details
- **Get Many**: List all templates
- **Delete**: Delete template

### A/B Test
- **Create Versions**: Create post variations
- **Get Versions**: List test versions
- **Publish Version**: Publish winning version
- **Set Winner**: Mark version as winner
- **Compare**: Compare test results

### Bulk Import
- **Validate**: Validate import data
- **Execute**: Execute bulk import
- **Get Import**: Check import status
- **Get Many**: List all imports

### Chatbot
- **Create Template**: Create response template
- **Suggest Response**: AI-suggested responses
- **Get Interactions**: List interactions
- **Get Stats**: Chatbot statistics
- **+5 more operations**: Template CRUD, create interactions

### Connection
- **Check Health**: Connection health check
- **Validate**: Validate connection
- **Quick Connect**: Fast platform connection
- **Troubleshoot**: Connection troubleshooting
- **+6 more operations**: Permissions, reconnect, auto-refresh

### Retry
- **Retry Failed Posts**: Retry all failed posts
- **Retry Post**: Retry specific post

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

## Troubleshooting

### Node Not Showing in n8n UI

If the MastaBlasta node doesn't appear in n8n after installation:

1. **Verify you used n8n's Community Nodes installer**: Manual installation or direct npm install bypasses n8n's database registration. The node files may exist but n8n won't load them. **Solution**: Uninstall and reinstall using n8n's UI (Settings > Community Nodes).

2. **Check the dist folder exists**: The node requires compiled JavaScript files in the `dist/` folder
   ```bash
   ls -la node_modules/n8n-nodes-mastablasta/dist/
   ```

3. **Rebuild if necessary**: If installing from GitHub for development, the build should happen automatically. If not:
   ```bash
   cd node_modules/n8n-nodes-mastablasta
   npm run build
   ```

4. **Restart n8n**: After installation or rebuilding, restart n8n completely
   ```bash
   n8n stop
   n8n start
   ```

4. **Check n8n logs**: Look for any errors related to loading community nodes

5. **Verify n8n version**: This node requires n8n version 1.0 or higher

6. **Database registration issue**: If you manually copied files to `/home/node/.n8n/nodes/node_modules/`, n8n won't recognize the package because it's not registered in the database. n8n tracks community packages in PostgreSQL tables (`installed_packages` and `installed_nodes`). **Solution**: Always use n8n's Community Nodes UI installer for proper registration.

### Build Errors

If you encounter build errors during installation:

1. Ensure you have Node.js 18+ installed
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and `package-lock.json`, then reinstall

### Connection Issues

If you can't connect to MastaBlasta:

1. Verify the API Base URL is correct (default: `http://localhost:33766`)
2. Check that MastaBlasta service is running
3. Test the connection using the credential test feature in n8n
4. Ensure you have the correct authentication mode selected

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
