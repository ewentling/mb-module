import type { INodeProperties } from 'n8n-workflow';

export const searchOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['search'],
			},
		},
		options: [
			{
				name: 'Search Posts',
				value: 'searchPosts',
				description: 'Search for posts using filters',
				action: 'Search posts',
			},
		],
		default: 'searchPosts',
	},
];

export const searchFields: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['searchPosts'],
			},
		},
		default: '',
		description: 'Search query text',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['searchPosts'],
			},
		},
		options: [
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
				],
				default: 'all',
				description: 'Filter by platform',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Draft', value: 'draft' },
					{ name: 'Scheduled', value: 'scheduled' },
					{ name: 'Published', value: 'published' },
					{ name: 'Failed', value: 'failed' },
				],
				default: 'all',
				description: 'Filter by status',
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				type: 'dateTime',
				default: '',
				description: 'Filter posts from this date',
			},
			{
				displayName: 'End Date',
				name: 'end_date',
				type: 'dateTime',
				default: '',
				description: 'Filter posts up to this date',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				description: 'Max number of results to return',
			},
		],
	},
];
