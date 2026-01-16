import type { INodeProperties } from 'n8n-workflow';

export const accountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new social media account',
				action: 'Create an account',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an account',
				action: 'Get an account',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all accounts',
				action: 'Get all accounts',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an account',
				action: 'Update an account',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an account',
				action: 'Delete an account',
			},
			{
				name: 'Test',
				value: 'test',
				description: 'Test account credentials',
				action: 'Test an account',
			},
		],
		default: 'getAll',
	},
];

export const accountFields: INodeProperties[] = [
	// Create operation fields
	{
		displayName: 'Platform',
		name: 'platform',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['create'],
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
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'A friendly name for this account',
	},
	{
		displayName: 'Credentials',
		name: 'credentials',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['create'],
			},
		},
		default: '{}',
		description: 'Platform-specific credentials as JSON (e.g., API keys, tokens)',
	},

	// Get and Update operation fields
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['get', 'update', 'delete', 'test'],
			},
		},
		default: '',
		description: 'The ID of the account',
	},

	// Update operation fields
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'A friendly name for this account',
			},
			{
				displayName: 'Credentials',
				name: 'credentials',
				type: 'json',
				default: '{}',
				description: 'Platform-specific credentials as JSON',
			},
		],
	},
];
