import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
	IDataObject,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

import { postOperations, postFields } from './resources/post';
import { accountOperations, accountFields } from './resources/account';
import { mediaOperations, mediaFields } from './resources/media';
import { aiOperations, aiFields } from './resources/ai';
import { analyticsOperations, analyticsFields } from './resources/analytics';

export class MastaBlasta implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MastaBlasta',
		name: 'mastaBlasta',
		icon: 'file:mastablasta.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with MastaBlasta API for multi-platform social media posting',
		defaults: {
			name: 'MastaBlasta',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'mastaBlasta',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Post',
						value: 'post',
					},
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Media',
						value: 'media',
					},
					{
						name: 'AI',
						value: 'ai',
					},
					{
						name: 'Analytics',
						value: 'analytics',
					},
				],
				default: 'post',
			},
			...postOperations,
			...postFields,
			...accountOperations,
			...accountFields,
			...mediaOperations,
			...mediaFields,
			...aiOperations,
			...aiFields,
			...analyticsOperations,
			...analyticsFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('mastaBlasta');

		// Determine API prefix based on authentication type
		const apiPrefix =
			credentials.authenticationType === 'jwt' ? '/api/v2' : '/api';

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] | undefined;

				if (resource === 'post') {
					if (operation === 'create') {
						const content = this.getNodeParameter('content', i) as string;
						const platforms = this.getNodeParameter('platforms', i) as string[];
						const additionalFields = this.getNodeParameter(
							'additionalFields',
							i,
							{},
						) as IDataObject;

						const body: IDataObject = {
							content,
							platforms,
						};

						if (additionalFields.scheduleTime) {
							body.schedule_time = additionalFields.scheduleTime;
						}
						if (additionalFields.mediaUrls) {
							body.media_urls = (additionalFields.mediaUrls as string).split(',').map((url) => url.trim());
						}
						if (additionalFields.tags) {
							body.tags = (additionalFields.tags as string).split(',').map((tag) => tag.trim());
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/posts`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'get') {
						const postId = this.getNodeParameter('postId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/posts/${postId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const limit = this.getNodeParameter('limit', i, 50) as number;

						const qs: IDataObject = {};
						if (!returnAll) {
							qs.limit = limit;
						}

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/posts`,
							qs,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);

						// Handle array response
						if (Array.isArray(responseData)) {
							responseData = responseData.slice(0, returnAll ? undefined : limit);
						}
					} else if (operation === 'update') {
						const postId = this.getNodeParameter('postId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const body: IDataObject = {};
						if (updateFields.content) {
							body.content = updateFields.content;
						}
						if (updateFields.scheduleTime) {
							body.schedule_time = updateFields.scheduleTime;
						}
						if (updateFields.status) {
							body.status = updateFields.status;
						}

						const options: IHttpRequestOptions = {
							method: 'PUT',
							url: `${apiPrefix}/posts/${postId}`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'delete') {
						const postId = this.getNodeParameter('postId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'DELETE',
							url: `${apiPrefix}/posts/${postId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'publish') {
						const postId = this.getNodeParameter('postId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/posts/${postId}/publish`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'account') {
					if (operation === 'create') {
						const platform = this.getNodeParameter('platform', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const credentials = this.getNodeParameter('credentials', i) as string;

						const body: IDataObject = {
							platform,
							name,
							credentials: JSON.parse(credentials),
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/accounts`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'get') {
						const accountId = this.getNodeParameter('accountId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/accounts/${accountId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getAll') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/accounts`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'update') {
						const accountId = this.getNodeParameter('accountId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const body: IDataObject = {};
						if (updateFields.name) {
							body.name = updateFields.name;
						}
						if (updateFields.credentials) {
							body.credentials = JSON.parse(updateFields.credentials as string);
						}

						const options: IHttpRequestOptions = {
							method: 'PUT',
							url: `${apiPrefix}/accounts/${accountId}`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'delete') {
						const accountId = this.getNodeParameter('accountId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'DELETE',
							url: `${apiPrefix}/accounts/${accountId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'test') {
						const accountId = this.getNodeParameter('accountId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/accounts/${accountId}/test`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'media') {
					if (operation === 'upload') {
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
						const additionalFields = this.getNodeParameter(
							'additionalFields',
							i,
							{},
						) as IDataObject;

						const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
						const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

						const formData: IDataObject = {
							file: {
								value: dataBuffer,
								options: {
									filename: binaryData.fileName,
									contentType: binaryData.mimeType,
								},
							},
						};

						if (additionalFields.title) {
							formData.title = additionalFields.title;
						}
						if (additionalFields.description) {
							formData.description = additionalFields.description;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/media/upload`,
							body: formData,
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'get') {
						const mediaId = this.getNodeParameter('mediaId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/media/${mediaId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const limit = this.getNodeParameter('limit', i, 50) as number;

						const qs: IDataObject = {};
						if (!returnAll) {
							qs.limit = limit;
						}

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/media`,
							qs,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);

						if (Array.isArray(responseData)) {
							responseData = responseData.slice(0, returnAll ? undefined : limit);
						}
					} else if (operation === 'delete') {
						const mediaId = this.getNodeParameter('mediaId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'DELETE',
							url: `${apiPrefix}/media/${mediaId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'ai') {
					if (operation === 'generateCaption') {
						const topic = this.getNodeParameter('topic', i) as string;
						const platform = this.getNodeParameter('platform', i) as string;
						const additionalFields = this.getNodeParameter(
							'additionalFields',
							i,
							{},
						) as IDataObject;

						const body: IDataObject = {
							topic,
							platform,
						};

						if (additionalFields.tone) {
							body.tone = additionalFields.tone;
						}
						if (additionalFields.maxLength) {
							body.max_length = additionalFields.maxLength;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/generate-caption`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'suggestHashtags') {
						const content = this.getNodeParameter('content', i) as string;
						const count = this.getNodeParameter('count', i, 5) as number;

						const body: IDataObject = {
							content,
							count,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/suggest-hashtags`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'predictEngagement') {
						const content = this.getNodeParameter('content', i) as string;

						const body: IDataObject = {
							content,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/predict-engagement`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'rewriteContent') {
						const content = this.getNodeParameter('content', i) as string;
						const platform = this.getNodeParameter('platform', i) as string;

						const body: IDataObject = {
							content,
							platform,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/rewrite-content`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'bestTimes') {
						const platform = this.getNodeParameter('platform', i) as string;
						const accountId = this.getNodeParameter('accountId', i, '') as string;

						const body: IDataObject = {
							platform,
						};

						if (accountId) {
							body.account_id = accountId;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/best-times`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'analytics') {
					if (operation === 'getPostAnalytics') {
						const postId = this.getNodeParameter('postId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/analytics/posts/${postId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getOverview') {
						const additionalFields = this.getNodeParameter(
							'additionalFields',
							i,
							{},
						) as IDataObject;

						const qs: IDataObject = {};

						if (additionalFields.startDate) {
							qs.start_date = additionalFields.startDate;
						}
						if (additionalFields.endDate) {
							qs.end_date = additionalFields.endDate;
						}
						if (additionalFields.platform && additionalFields.platform !== 'all') {
							qs.platform = additionalFields.platform;
						}

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/analytics/overview`,
							qs,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				}

				// Add the response data to the return array
				if (responseData) {
					if (Array.isArray(responseData)) {
						returnData.push(...responseData.map((item) => ({ json: item })));
					} else {
						returnData.push({ json: responseData as IDataObject });
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					returnData.push({
						json: {
							error: errorMessage,
						},
						pairedItem: i,
					});
					continue;
				}
				const nodeError = error instanceof Error ? error : new Error(String(error));
				throw new NodeOperationError(this.getNode(), nodeError, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
