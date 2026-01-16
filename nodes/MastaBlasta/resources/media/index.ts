import type { INodeProperties } from 'n8n-workflow';

export const mediaOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['media'],
			},
		},
		options: [
			{
				name: 'Upload',
				value: 'upload',
				description: 'Upload a media file',
				action: 'Upload media',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get media details',
				action: 'Get media',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all media files',
				action: 'Get all media',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a media file',
				action: 'Delete media',
			},
		],
		default: 'upload',
	},
];

export const mediaFields: INodeProperties[] = [
	// Upload operation fields
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		required: true,
		default: 'data',
		displayOptions: {
			show: {
				resource: ['media'],
				operation: ['upload'],
			},
		},
		description: 'Name of the binary property which contains the file to upload',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['media'],
				operation: ['upload'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title for the media file',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 2,
				},
				default: '',
				description: 'Description of the media file',
			},
		],
	},

	// Get and Delete operation fields
	{
		displayName: 'Media ID',
		name: 'mediaId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['media'],
				operation: ['get', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the media file',
	},

	// Get Many operation fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['media'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['media'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
];
