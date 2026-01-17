import type { INodeProperties } from 'n8n-workflow';

export const bulkImportOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['bulkImport'],
			},
		},
		options: [
			{
				name: 'Validate',
				value: 'validate',
				description: 'Validate bulk import data',
				action: 'Validate import',
			},
			{
				name: 'Execute',
				value: 'execute',
				description: 'Execute bulk import',
				action: 'Execute import',
			},
			{
				name: 'Get Import',
				value: 'get',
				description: 'Get import status',
				action: 'Get import',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all imports',
				action: 'Get all imports',
			},
		],
		default: 'validate',
	},
];

export const bulkImportFields: INodeProperties[] = [
	{
		displayName: 'Import ID',
		name: 'importId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['bulkImport'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'Import ID',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['bulkImport'],
				operation: ['validate', 'execute'],
			},
		},
		default: '[]',
		description: 'Bulk import data as JSON array',
	},
];
