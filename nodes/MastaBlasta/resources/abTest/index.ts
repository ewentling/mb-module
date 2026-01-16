import type { INodeProperties } from 'n8n-workflow';

export const abTestOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['abTest'],
			},
		},
		options: [
			{
				name: 'Create Versions',
				value: 'createVersions',
				description: 'Create post versions for A/B testing',
				action: 'Create versions',
			},
			{
				name: 'Get Versions',
				value: 'getVersions',
				description: 'Get post versions',
				action: 'Get versions',
			},
			{
				name: 'Publish Version',
				value: 'publishVersion',
				description: 'Publish a version',
				action: 'Publish version',
			},
			{
				name: 'Set Winner',
				value: 'setWinner',
				description: 'Set winning version',
				action: 'Set winner',
			},
			{
				name: 'Compare',
				value: 'compare',
				description: 'Compare A/B test results',
				action: 'Compare results',
			},
		],
		default: 'createVersions',
	},
];

export const abTestFields: INodeProperties[] = [
	{
		displayName: 'Post ID',
		name: 'postId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['abTest'],
				operation: ['getVersions'],
			},
		},
		default: '',
		description: 'Post ID',
	},
	{
		displayName: 'Version ID',
		name: 'versionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['abTest'],
				operation: ['publishVersion', 'setWinner'],
			},
		},
		default: '',
		description: 'Version ID',
	},
	{
		displayName: 'Versions',
		name: 'versions',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['abTest'],
				operation: ['createVersions', 'compare'],
			},
		},
		default: '[]',
		description: 'Array of post versions',
	},
];
