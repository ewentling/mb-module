import type { INodeProperties } from 'n8n-workflow';

export const socialMonitorOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['socialMonitor'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a social monitor',
				action: 'Create monitor',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all monitors',
				action: 'Get all monitors',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a monitor',
				action: 'Update monitor',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a monitor',
				action: 'Delete monitor',
			},
			{
				name: 'Get Results',
				value: 'getResults',
				description: 'Get monitor results',
				action: 'Get results',
			},
			{
				name: 'Refresh',
				value: 'refresh',
				description: 'Refresh monitor',
				action: 'Refresh monitor',
			},
		],
		default: 'getAll',
	},
];

export const socialMonitorFields: INodeProperties[] = [
	{
		displayName: 'Monitor ID',
		name: 'monitorId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialMonitor'],
				operation: ['update', 'delete', 'getResults', 'refresh'],
			},
		},
		default: '',
		description: 'Monitor ID',
	},
	{
		displayName: 'Keywords',
		name: 'keywords',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialMonitor'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Keywords to monitor (comma-separated)',
	},
	{
		displayName: 'Platforms',
		name: 'platforms',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['socialMonitor'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{ name: 'Twitter', value: 'twitter' },
			{ name: 'Facebook', value: 'facebook' },
			{ name: 'Instagram', value: 'instagram' },
		],
		default: [],
		description: 'Platforms to monitor',
	},
];
