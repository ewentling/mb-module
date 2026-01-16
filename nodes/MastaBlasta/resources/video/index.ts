import type { INodeProperties } from 'n8n-workflow';

export const videoOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['video'],
			},
		},
		options: [
			{
				name: 'Generate Script',
				value: 'generateScript',
				description: 'Generate AI video script',
				action: 'Generate video script',
			},
			{
				name: 'Create Slideshow',
				value: 'createSlideshow',
				description: 'Create slideshow from images',
				action: 'Create slideshow',
			},
			{
				name: 'Generate Prompt',
				value: 'generatePrompt',
				description: 'Generate video generation prompt',
				action: 'Generate video prompt',
			},
			{
				name: 'Generate Captions',
				value: 'generateCaptions',
				description: 'Generate video captions',
				action: 'Generate video captions',
			},
			{
				name: 'Optimize Video',
				value: 'optimizeVideo',
				description: 'Optimize video for platforms',
				action: 'Optimize video',
			},
			{
				name: 'Get Video Specs',
				value: 'getVideoSpecs',
				description: 'Get platform video specifications',
				action: 'Get video specs',
			},
			{
				name: 'Get Templates',
				value: 'getTemplates',
				description: 'Get video templates',
				action: 'Get video templates',
			},
			{
				name: 'Get Template',
				value: 'getTemplate',
				description: 'Get specific video template',
				action: 'Get video template',
			},
			{
				name: 'Generate From Template',
				value: 'generateFromTemplate',
				description: 'Generate video from template',
				action: 'Generate from template',
			},
			{
				name: 'Render Slideshow',
				value: 'renderSlideshow',
				description: 'Render slideshow to video',
				action: 'Render slideshow',
			},
			{
				name: 'Generate Subtitles',
				value: 'generateSubtitles',
				description: 'Generate video subtitles',
				action: 'Generate subtitles',
			},
			{
				name: 'Convert Aspect Ratio',
				value: 'convertAspectRatio',
				description: 'Convert video aspect ratio',
				action: 'Convert aspect ratio',
			},
			{
				name: 'Generate Voiceover Script',
				value: 'generateVoiceoverScript',
				description: 'Generate voiceover script',
				action: 'Generate voiceover script',
			},
			{
				name: 'Suggest B-Roll',
				value: 'suggestBRoll',
				description: 'Suggest B-roll footage',
				action: 'Suggest B-roll',
			},
			{
				name: 'Batch Create',
				value: 'batchCreate',
				description: 'Batch create videos',
				action: 'Batch create videos',
			},
			{
				name: 'Add Watermark',
				value: 'addWatermark',
				description: 'Add watermark to video',
				action: 'Add watermark',
			},
			{
				name: 'Generate Intro/Outro',
				value: 'generateIntroOutro',
				description: 'Generate intro/outro',
				action: 'Generate intro/outro',
			},
			{
				name: 'Add Text Overlays',
				value: 'addTextOverlays',
				description: 'Add text overlays to video',
				action: 'Add text overlays',
			},
			{
				name: 'Multi-Platform Export',
				value: 'multiPlatformExport',
				description: 'Export for multiple platforms',
				action: 'Multi-platform export',
			},
			{
				name: 'Get Analytics Metadata',
				value: 'getAnalyticsMetadata',
				description: 'Get video analytics metadata',
				action: 'Get analytics metadata',
			},
			{
				name: 'Generate Thumbnail',
				value: 'generateThumbnail',
				description: 'Generate video thumbnail',
				action: 'Generate thumbnail',
			},
			{
				name: 'Generate Video Images',
				value: 'generateVideoImages',
				description: 'Generate images for video',
				action: 'Generate video images',
			},
			{
				name: 'Create Image Variations',
				value: 'createImageVariations',
				description: 'Create image variations',
				action: 'Create image variations',
			},
		],
		default: 'generateScript',
	},
];

export const videoFields: INodeProperties[] = [
	{
		displayName: 'Topic',
		name: 'topic',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['generateScript', 'generatePrompt', 'generateVoiceoverScript'],
			},
		},
		default: '',
		description: 'Topic or subject for the video',
	},
	{
		displayName: 'Platform',
		name: 'platform',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['generateScript', 'optimizeVideo', 'getVideoSpecs', 'multiPlatformExport'],
			},
		},
		options: [
			{ name: 'YouTube', value: 'youtube' },
			{ name: 'TikTok', value: 'tiktok' },
			{ name: 'Instagram', value: 'instagram' },
			{ name: 'Facebook', value: 'facebook' },
		],
		default: 'youtube',
		description: 'Target platform',
	},
	{
		displayName: 'Video URL',
		name: 'videoUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['generateCaptions', 'generateSubtitles', 'convertAspectRatio', 'addWatermark', 'addTextOverlays'],
			},
		},
		default: '',
		description: 'URL of the video to process',
	},
	{
		displayName: 'Image URLs',
		name: 'imageUrls',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['createSlideshow', 'renderSlideshow'],
			},
		},
		default: '',
		description: 'Comma-separated list of image URLs',
	},
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['getTemplate', 'generateFromTemplate'],
			},
		},
		default: '',
		description: 'Video template ID',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['video'],
			},
		},
		options: [
			{
				displayName: 'Duration',
				name: 'duration',
				type: 'number',
				default: 60,
				description: 'Video duration in seconds',
			},
			{
				displayName: 'Style',
				name: 'style',
				type: 'string',
				default: '',
				description: 'Video style',
			},
		],
	},
];
