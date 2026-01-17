import type { INodeProperties } from 'n8n-workflow';

export const aiOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ai'],
			},
		},
		options: [
			{
				name: 'Generate Caption',
				value: 'generateCaption',
				description: 'Generate a caption for your content',
				action: 'Generate a caption',
			},
			{
				name: 'Suggest Hashtags',
				value: 'suggestHashtags',
				description: 'Get hashtag suggestions',
				action: 'Suggest hashtags',
			},
			{
				name: 'Predict Engagement',
				value: 'predictEngagement',
				description: 'Predict engagement for content',
				action: 'Predict engagement',
			},
			{
				name: 'Rewrite Content',
				value: 'rewriteContent',
				description: 'Rewrite content for different platforms',
				action: 'Rewrite content',
			},
			{
				name: 'Best Times',
				value: 'bestTimes',
				description: 'Get best posting times',
				action: 'Get best times',
			},
			{
				name: 'Translate Content',
				value: 'translateContent',
				description: 'Translate content to different languages',
				action: 'Translate content',
			},
			{
				name: 'Posting Frequency',
				value: 'postingFrequency',
				description: 'Get optimal posting frequency',
				action: 'Get posting frequency',
			},
			{
				name: 'Optimize Image',
				value: 'optimizeImage',
				description: 'Optimize image for social media',
				action: 'Optimize image',
			},
			{
				name: 'Enhance Image',
				value: 'enhanceImage',
				description: 'AI enhance image quality',
				action: 'Enhance image',
			},
			{
				name: 'Generate Alt Text',
				value: 'generateAltText',
				description: 'Generate alt text for images',
				action: 'Generate alt text',
			},
			{
				name: 'Generate Image',
				value: 'generateImage',
				description: 'Generate image using DALL-E',
				action: 'Generate image',
			},
			{
				name: 'Predict Performance',
				value: 'predictPerformance',
				description: 'Predict post performance',
				action: 'Predict performance',
			},
			{
				name: 'Compare Variations',
				value: 'compareVariations',
				description: 'Compare content variations',
				action: 'Compare variations',
			},
			{
				name: 'Train Model',
				value: 'trainModel',
				description: 'Train custom AI model',
				action: 'Train model',
			},
			{
				name: 'Get Status',
				value: 'getStatus',
				description: 'Get AI service status',
				action: 'Get status',
			},
		],
		default: 'generateCaption',
	},
];

export const aiFields: INodeProperties[] = [
	// Generate Caption fields
	{
		displayName: 'Topic',
		name: 'topic',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['generateCaption'],
			},
		},
		default: '',
		description: 'The topic or subject for caption generation',
	},
	{
		displayName: 'Platform',
		name: 'platform',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['generateCaption', 'rewriteContent', 'bestTimes'],
			},
		},
		options: [
			{ name: 'Twitter', value: 'twitter' },
			{ name: 'Facebook', value: 'facebook' },
			{ name: 'Instagram', value: 'instagram' },
			{ name: 'LinkedIn', value: 'linkedin' },
			{ name: 'TikTok', value: 'tiktok' },
		],
		default: 'twitter',
		description: 'The target platform',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['generateCaption'],
			},
		},
		options: [
			{
				displayName: 'Tone',
				name: 'tone',
				type: 'options',
				options: [
					{ name: 'Professional', value: 'professional' },
					{ name: 'Casual', value: 'casual' },
					{ name: 'Fun', value: 'fun' },
					{ name: 'Formal', value: 'formal' },
				],
				default: 'professional',
				description: 'The tone of the caption',
			},
			{
				displayName: 'Max Length',
				name: 'maxLength',
				type: 'number',
				default: 280,
				description: 'Maximum length of the caption',
			},
		],
	},

	// Suggest Hashtags fields
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['suggestHashtags', 'predictEngagement', 'rewriteContent'],
			},
		},
		default: '',
		description: 'The content for analysis',
	},
	{
		displayName: 'Number of Hashtags',
		name: 'count',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['suggestHashtags'],
			},
		},
		default: 5,
		typeOptions: {
			minValue: 1,
			maxValue: 30,
		},
		description: 'Number of hashtags to suggest',
	},

	// Best Times fields
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['bestTimes'],
			},
		},
		default: '',
		description: 'The account ID to analyze',
	},

	// Translate Content fields
	{
		displayName: 'Target Language',
		name: 'targetLanguage',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['translateContent'],
			},
		},
		default: 'es',
		description: 'Target language code (e.g., es, fr, de, ja)',
		placeholder: 'es',
	},

	// Posting Frequency fields
	{
		displayName: 'Platform',
		name: 'platform',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['postingFrequency'],
			},
		},
		options: [
			{ name: 'Twitter', value: 'twitter' },
			{ name: 'Facebook', value: 'facebook' },
			{ name: 'Instagram', value: 'instagram' },
			{ name: 'LinkedIn', value: 'linkedin' },
			{ name: 'TikTok', value: 'tiktok' },
		],
		default: 'twitter',
		description: 'The target platform',
	},

	// Optimize/Enhance/Generate Alt Text - Image operations
	{
		displayName: 'Image URL',
		name: 'imageUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['optimizeImage', 'enhanceImage', 'generateAltText'],
			},
		},
		default: '',
		description: 'URL of the image to process',
		placeholder: 'https://example.com/image.jpg',
	},
	{
		displayName: 'Platform',
		name: 'platform',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['optimizeImage'],
			},
		},
		options: [
			{ name: 'Twitter', value: 'twitter' },
			{ name: 'Facebook', value: 'facebook' },
			{ name: 'Instagram', value: 'instagram' },
			{ name: 'LinkedIn', value: 'linkedin' },
			{ name: 'TikTok', value: 'tiktok' },
		],
		default: 'twitter',
		description: 'Target platform for optimization',
	},

	// Generate Image fields
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['generateImage'],
			},
		},
		default: '',
		description: 'Description of the image to generate',
		placeholder: 'A futuristic cityscape at sunset',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['generateImage'],
			},
		},
		options: [
			{
				displayName: 'Style',
				name: 'style',
				type: 'options',
				options: [
					{ name: 'Photorealistic', value: 'photorealistic' },
					{ name: 'Illustration', value: 'illustration' },
					{ name: 'Minimalist', value: 'minimalist' },
					{ name: 'Abstract', value: 'abstract' },
					{ name: 'Cinematic', value: 'cinematic' },
				],
				default: 'photorealistic',
				description: 'Image style',
			},
			{
				displayName: 'Platform',
				name: 'platform',
				type: 'options',
				options: [
					{ name: 'Twitter', value: 'twitter' },
					{ name: 'Facebook', value: 'facebook' },
					{ name: 'Instagram', value: 'instagram' },
					{ name: 'LinkedIn', value: 'linkedin' },
				],
				default: 'instagram',
				description: 'Target platform for sizing',
			},
		],
	},

	// Predict Performance fields
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['predictPerformance'],
			},
		},
		default: '',
		description: 'Content to analyze',
	},

	// Compare Variations fields
	{
		displayName: 'Variations',
		name: 'variations',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['compareVariations'],
			},
		},
		default: '[]',
		description: 'Array of content variations to compare',
	},

	// Train Model fields
	{
		displayName: 'Training Data',
		name: 'trainingData',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['ai'],
				operation: ['trainModel'],
			},
		},
		default: '{}',
		description: 'Training data for the AI model',
	},
];
