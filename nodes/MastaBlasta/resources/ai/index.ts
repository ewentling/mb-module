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
];
