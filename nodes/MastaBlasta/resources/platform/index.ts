import type { INodeProperties } from 'n8n-workflow';

export const platformOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['platform'],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all supported platforms',
				action: 'Get all platforms',
			},
			{
				name: 'Get Post Types',
				value: 'getPostTypes',
				description: 'Get post types for a platform',
				action: 'Get post types',
			},
			{
				name: 'Get Post Types Details',
				value: 'getPostTypesDetails',
				description: 'Get detailed post type information',
				action: 'Get post type details',
			},
		],
		default: 'getAll',
	},
];

export const platformFields: INodeProperties[] = [
	{
		displayName: 'Platform',
		name: 'platform',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['platform'],
				operation: ['getPostTypes', 'getPostTypesDetails'],
			},
		},
		options: [
			{ name: 'Twitter', value: 'twitter' },
			{ name: 'Facebook', value: 'facebook' },
			{ name: 'Instagram', value: 'instagram' },
			{ name: 'LinkedIn', value: 'linkedin' },
			{ name: 'TikTok', value: 'tiktok' },
			{ name: 'YouTube', value: 'youtube' },
			{ name: 'Mastodon', value: 'mastodon' },
			{ name: 'Bluesky', value: 'bluesky' },
			{ name: 'Threads', value: 'threads' },
		],
		default: 'twitter',
		description: 'The social media platform',
	},
];
