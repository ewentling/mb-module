import type { INodeProperties } from 'n8n-workflow';

export const contentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['content'],
			},
		},
		options: [
			{
				name: 'Multiply',
				value: 'multiply',
				description: 'Transform one piece into multiple platform-specific posts',
				action: 'Multiply content',
			},
			{
				name: 'Create Variations',
				value: 'createVariations',
				description: 'Generate multiple variations for A/B testing',
				action: 'Create variations',
			},
			{
				name: 'Preview Post',
				value: 'preview',
				description: 'Preview how post will appear on platforms',
				action: 'Preview post',
			},
			{
				name: 'Optimize Post',
				value: 'optimize',
				description: 'Optimize post content for better engagement',
				action: 'Optimize post',
			},
			{
				name: 'Check Schedule Conflicts',
				value: 'checkConflicts',
				description: 'Check for scheduling conflicts',
				action: 'Check conflicts',
			},
		],
		default: 'multiply',
	},
];

export const contentFields: INodeProperties[] = [
	// Multiply operation
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
				resource: ['content'],
				operation: ['multiply', 'createVariations', 'preview', 'optimize'],
			},
		},
		default: '',
		description: 'The base content to process',
	},
	{
		displayName: 'Platforms',
		name: 'platforms',
		type: 'multiOptions',
		required: true,
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['multiply', 'preview'],
			},
		},
		options: [
			{ name: 'Twitter', value: 'twitter' },
			{ name: 'Facebook', value: 'facebook' },
			{ name: 'Instagram', value: 'instagram' },
			{ name: 'LinkedIn', value: 'linkedin' },
			{ name: 'TikTok', value: 'tiktok' },
		],
		default: [],
		description: 'Target platforms for content adaptation',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['multiply'],
			},
		},
		options: [
			{
				displayName: 'Maintain Brand Voice',
				name: 'maintain_brand_voice',
				type: 'boolean',
				default: true,
				description: 'Maintain consistent brand voice across platforms',
			},
		],
	},

	// Create Variations operation
	{
		displayName: 'Number of Variations',
		name: 'count',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['createVariations'],
			},
		},
		default: 3,
		typeOptions: {
			minValue: 2,
			maxValue: 10,
		},
		description: 'Number of variations to generate',
	},
	{
		displayName: 'Platform',
		name: 'platform',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['createVariations', 'optimize'],
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
		description: 'Target platform',
	},

	// Check Conflicts operation
	{
		displayName: 'Schedule Time',
		name: 'scheduleTime',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['checkConflicts'],
			},
		},
		default: '',
		description: 'Proposed schedule time to check',
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['checkConflicts'],
			},
		},
		default: '',
		description: 'Account ID to check conflicts for',
	},
];
