import type { INodeProperties } from 'n8n-workflow';

export const urlOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['url'],
			},
		},
		options: [
			{
				name: 'Shorten',
				value: 'shorten',
				description: 'Shorten a URL',
				action: 'Shorten URL',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all shortened URLs',
				action: 'Get all URLs',
			},
			{
				name: 'Get Stats',
				value: 'getStats',
				description: 'Get URL statistics',
				action: 'Get URL stats',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a shortened URL',
				action: 'Delete URL',
			},
		],
		default: 'shorten',
	},
];

export const urlFields: INodeProperties[] = [
	// Shorten operation
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['url'],
				operation: ['shorten'],
			},
		},
		default: '',
		description: 'The URL to shorten',
		placeholder: 'https://example.com/very/long/url',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['url'],
				operation: ['shorten'],
			},
		},
		options: [
			{
				displayName: 'Custom Short Code',
				name: 'custom_code',
				type: 'string',
				default: '',
				description: 'Custom short code for the URL',
			},
		],
	},

	// Get Stats and Delete operations
	{
		displayName: 'Short Code',
		name: 'shortCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['url'],
				operation: ['getStats', 'delete'],
			},
		},
		default: '',
		description: 'The short code of the URL',
	},
];
