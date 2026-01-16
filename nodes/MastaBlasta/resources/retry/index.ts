import type { INodeProperties } from 'n8n-workflow';

export const retryOperations: INodeProperties[] = [
{
displayName: 'Operation',
name: 'operation',
type: 'options',
noDataExpression: true,
displayOptions: {
show: {
resource: ['retry'],
},
},
options: [
{
name: 'Retry Failed Posts',
value: 'retryFailedPosts',
description: 'Retry all failed posts',
action: 'Retry failed posts',
},
{
name: 'Retry Post',
value: 'retryPost',
description: 'Retry a specific post',
action: 'Retry post',
},
],
default: 'retryFailedPosts',
},
];

export const retryFields: INodeProperties[] = [
{
displayName: 'Post ID',
name: 'postId',
type: 'string',
required: true,
displayOptions: {
show: {
resource: ['retry'],
operation: ['retryPost'],
},
},
default: '',
description: 'Post ID to retry',
},
];
