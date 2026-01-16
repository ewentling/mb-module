import type { INodeProperties } from 'n8n-workflow';

export const videoClipOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['videoClip'],
			},
		},
		options: [
			{
				name: 'Get Status',
				value: 'getStatus',
				description: 'Get clipping status',
				action: 'Get status',
			},
			{
				name: 'Analyze Video',
				value: 'analyze',
				description: 'Analyze video for clips',
				action: 'Analyze video',
			},
			{
				name: 'Get Video Info',
				value: 'getVideoInfo',
				description: 'Get video information',
				action: 'Get video info',
			},
			{
				name: 'Get Metadata',
				value: 'getMetadata',
				description: 'Get clip metadata',
				action: 'Get metadata',
			},
			{
				name: 'Get Download Info',
				value: 'getDownloadInfo',
				description: 'Get download information',
				action: 'Get download info',
			},
			{
				name: 'Schedule Clips',
				value: 'schedule',
				description: 'Schedule clips for posting',
				action: 'Schedule clips',
			},
		],
		default: 'getStatus',
	},
];

export const videoClipFields: INodeProperties[] = [
	{
		displayName: 'Video URL',
		name: 'videoUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['videoClip'],
				operation: ['analyze', 'getVideoInfo', 'getMetadata', 'getDownloadInfo'],
			},
		},
		default: '',
		description: 'URL of video to analyze',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['videoClip'],
				operation: ['analyze'],
			},
		},
		options: [
			{
				displayName: 'Clip Count',
				name: 'clipCount',
				type: 'number',
				default: 5,
				description: 'Number of clips to generate',
			},
			{
				displayName: 'Min Duration',
				name: 'minDuration',
				type: 'number',
				default: 15,
				description: 'Minimum clip duration in seconds',
			},
		],
	},
];
