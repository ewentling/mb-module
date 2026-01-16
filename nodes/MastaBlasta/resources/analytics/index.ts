import type { INodeProperties } from 'n8n-workflow';

export const analyticsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['analytics'],
			},
		},
		options: [
			{
				name: 'Get Post Analytics',
				value: 'getPostAnalytics',
				description: 'Get analytics for a specific post',
				action: 'Get post analytics',
			},
			{
				name: 'Get Overview',
				value: 'getOverview',
				description: 'Get analytics overview',
				action: 'Get analytics overview',
			},
		],
		default: 'getPostAnalytics',
	},
];

export const analyticsFields: INodeProperties[] = [
	// Get Post Analytics fields
	{
		displayName: 'Post ID',
		name: 'postId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['analytics'],
				operation: ['getPostAnalytics'],
			},
		},
		default: '',
		description: 'The ID of the post to get analytics for',
	},

	// Get Overview fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['analytics'],
				operation: ['getOverview'],
			},
		},
		options: [
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Start date for analytics period',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'End date for analytics period',
			},
			{
				displayName: 'Platform',
				name: 'platform',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
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
				default: 'all',
				description: 'Filter by platform',
			},
		],
	},
];
