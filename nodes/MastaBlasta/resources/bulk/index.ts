import type { INodeProperties } from 'n8n-workflow';

export const bulkOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['bulk'],
			},
		},
		options: [
			{
				name: 'Create Posts',
				value: 'createPosts',
				description: 'Create multiple posts at once',
				action: 'Bulk create posts',
			},
			{
				name: 'Update Posts',
				value: 'updatePosts',
				description: 'Update multiple posts at once',
				action: 'Bulk update posts',
			},
			{
				name: 'Delete Posts',
				value: 'deletePosts',
				description: 'Delete multiple posts at once',
				action: 'Bulk delete posts',
			},
		],
		default: 'createPosts',
	},
];

export const bulkFields: INodeProperties[] = [
	{
		displayName: 'Posts Data',
		name: 'postsData',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['bulk'],
				operation: ['createPosts', 'updatePosts'],
			},
		},
		default: '[]',
		description: 'Array of post objects to create or update',
		placeholder: '[{"content": "Post 1", "platforms": ["twitter"]}, {"content": "Post 2", "platforms": ["facebook"]}]',
	},
	{
		displayName: 'Post IDs',
		name: 'postIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['bulk'],
				operation: ['deletePosts'],
			},
		},
		default: '',
		description: 'Comma-separated list of post IDs to delete',
		placeholder: 'post1,post2,post3',
	},
];
