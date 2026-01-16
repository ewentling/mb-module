import type { INodeProperties } from 'n8n-workflow';

export const chatbotOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['chatbot'],
			},
		},
		options: [
			{
				name: 'Create Response Template',
				value: 'createTemplate',
				description: 'Create response template',
				action: 'Create template',
			},
			{
				name: 'Get Response Templates',
				value: 'getTemplates',
				description: 'Get all templates',
				action: 'Get templates',
			},
			{
				name: 'Get Template',
				value: 'getTemplate',
				description: 'Get a template',
				action: 'Get template',
			},
			{
				name: 'Update Template',
				value: 'updateTemplate',
				description: 'Update a template',
				action: 'Update template',
			},
			{
				name: 'Delete Template',
				value: 'deleteTemplate',
				description: 'Delete a template',
				action: 'Delete template',
			},
			{
				name: 'Suggest Response',
				value: 'suggestResponse',
				description: 'AI suggest response',
				action: 'Suggest response',
			},
			{
				name: 'Get Interactions',
				value: 'getInteractions',
				description: 'Get chatbot interactions',
				action: 'Get interactions',
			},
			{
				name: 'Create Interaction',
				value: 'createInteraction',
				description: 'Create interaction',
				action: 'Create interaction',
			},
			{
				name: 'Get Stats',
				value: 'getStats',
				description: 'Get chatbot statistics',
				action: 'Get stats',
			},
		],
		default: 'suggestResponse',
	},
];

export const chatbotFields: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['chatbot'],
				operation: ['getTemplate', 'updateTemplate', 'deleteTemplate'],
			},
		},
		default: '',
		description: 'Template ID',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['chatbot'],
				operation: ['suggestResponse', 'createInteraction'],
			},
		},
		default: '',
		description: 'Message content',
	},
	{
		displayName: 'Template Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['chatbot'],
				operation: ['createTemplate'],
			},
		},
		default: '',
		description: 'Template name',
	},
	{
		displayName: 'Response',
		name: 'response',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['chatbot'],
				operation: ['createTemplate'],
			},
		},
		default: '',
		description: 'Template response',
	},
];
