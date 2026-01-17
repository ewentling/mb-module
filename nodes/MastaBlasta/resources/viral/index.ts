import type { INodeProperties } from 'n8n-workflow';

export const viralOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['viral'],
			},
		},
		options: [
			{
				name: 'Get Hooks',
				value: 'getHooks',
				description: 'Get viral content hooks library',
				action: 'Get viral hooks',
			},
			{
				name: 'Predict Viral Score',
				value: 'predictScore',
				description: 'Predict virality score for content',
				action: 'Predict viral score',
			},
			{
				name: 'Get Best Practices',
				value: 'getBestPractices',
				description: 'Get platform-specific viral best practices',
				action: 'Get best practices',
			},
		],
		default: 'predictScore',
	},
];

export const viralFields: INodeProperties[] = [
	// Get Hooks fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['viral'],
				operation: ['getHooks'],
			},
		},
		options: [
			{
				displayName: 'Category',
				name: 'category',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Curiosity', value: 'curiosity' },
					{ name: 'Urgency', value: 'urgency' },
					{ name: 'Controversy', value: 'controversy' },
					{ name: 'Storytelling', value: 'storytelling' },
					{ name: 'Value', value: 'value' },
				],
				default: 'all',
				description: 'Filter hooks by category',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 10,
				description: 'Number of hooks to return',
			},
		],
	},

	// Predict Score fields
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['viral'],
				operation: ['predictScore'],
			},
		},
		default: '',
		description: 'Content to analyze for viral potential',
	},
	{
		displayName: 'Platform',
		name: 'platform',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['viral'],
				operation: ['predictScore', 'getBestPractices'],
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
		description: 'Target platform for analysis',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['viral'],
				operation: ['predictScore'],
			},
		},
		options: [
			{
				displayName: 'Include Media',
				name: 'has_media',
				type: 'boolean',
				default: false,
				description: 'Whether the post includes media',
			},
		],
	},
];
