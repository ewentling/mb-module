import type { INodeProperties } from 'n8n-workflow';

export const connectionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['connection'],
			},
		},
		options: [
			{
				name: 'Check Health',
				value: 'checkHealth',
				description: 'Check connection health',
				action: 'Check health',
			},
			{
				name: 'Get Reconnect Instructions',
				value: 'getReconnectInstructions',
				description: 'Get reconnection instructions',
				action: 'Get reconnect instructions',
			},
			{
				name: 'Validate',
				value: 'validate',
				description: 'Validate connection',
				action: 'Validate connection',
			},
			{
				name: 'Check Permissions',
				value: 'checkPermissions',
				description: 'Check connection permissions',
				action: 'Check permissions',
			},
			{
				name: 'Get Quick Connect Options',
				value: 'getQuickConnectOptions',
				description: 'Get quick connect options',
				action: 'Get quick connect options',
			},
			{
				name: 'Quick Connect',
				value: 'quickConnect',
				description: 'Quick connect to platform',
				action: 'Quick connect',
			},
			{
				name: 'Troubleshoot',
				value: 'troubleshoot',
				description: 'Troubleshoot connection',
				action: 'Troubleshoot',
			},
			{
				name: 'Test Prerequisites',
				value: 'testPrerequisites',
				description: 'Test connection prerequisites',
				action: 'Test prerequisites',
			},
			{
				name: 'Prepare Bulk Connect',
				value: 'prepareBulkConnect',
				description: 'Prepare bulk connection',
				action: 'Prepare bulk connect',
			},
			{
				name: 'Auto Refresh',
				value: 'autoRefresh',
				description: 'Auto refresh connection',
				action: 'Auto refresh',
			},
		],
		default: 'checkHealth',
	},
];

export const connectionFields: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['connection'],
				operation: ['checkHealth', 'validate', 'checkPermissions', 'autoRefresh'],
			},
		},
		default: '',
		description: 'Account ID',
	},
	{
		displayName: 'Platform',
		name: 'platform',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['connection'],
				operation: ['getReconnectInstructions', 'quickConnect', 'testPrerequisites'],
			},
		},
		options: [
			{ name: 'Twitter', value: 'twitter' },
			{ name: 'Facebook', value: 'facebook' },
			{ name: 'Instagram', value: 'instagram' },
			{ name: 'LinkedIn', value: 'linkedin' },
		],
		default: 'twitter',
		description: 'Platform name',
	},
	{
		displayName: 'Error Details',
		name: 'errorDetails',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['connection'],
				operation: ['troubleshoot'],
			},
		},
		default: '{}',
		description: 'Error details for troubleshooting',
	},
];
