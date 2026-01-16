import type { INodeProperties } from 'n8n-workflow';

export const webhookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new webhook',
				action: 'Create a webhook',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all webhooks',
				action: 'Get all webhooks',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a webhook',
				action: 'Delete a webhook',
			},
		],
		default: 'create',
	},
];

export const webhookFields: INodeProperties[] = [
	// Create operation
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The webhook URL to receive notifications',
		placeholder: 'https://example.com/webhook',
	},
	{
		displayName: 'Events',
		name: 'events',
		type: 'multiOptions',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Post Published', value: 'post.published' },
			{ name: 'Post Failed', value: 'post.failed' },
			{ name: 'Post Scheduled', value: 'post.scheduled' },
			{ name: 'Account Connected', value: 'account.connected' },
			{ name: 'Account Failed', value: 'account.failed' },
		],
		default: [],
		description: 'Events to subscribe to',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Secret',
				name: 'secret',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Secret key for webhook signature verification',
			},
		],
	},

	// Delete operation
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'The ID of the webhook to delete',
	},
];
