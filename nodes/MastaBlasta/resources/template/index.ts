import type { INodeProperties } from 'n8n-workflow';

export const templateOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['template'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a template',
				action: 'Create template',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a template',
				action: 'Get template',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all templates',
				action: 'Get all templates',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a template',
				action: 'Delete template',
			},
		],
		default: 'getAll',
	},
];

export const templateFields: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['get', 'delete'],
			},
		},
		default: '',
		description: 'Template ID',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Template name',
	},
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
				resource: ['template'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Template content',
	},
];
