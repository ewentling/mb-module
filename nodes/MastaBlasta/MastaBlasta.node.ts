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
import { platformOperations, platformFields } from './resources/platform';
import { viralOperations, viralFields } from './resources/viral';
import { contentOperations, contentFields } from './resources/content';
import { bulkOperations, bulkFields } from './resources/bulk';
import { webhookOperations, webhookFields } from './resources/webhook';
import { searchOperations, searchFields } from './resources/search';
import { urlOperations, urlFields } from './resources/url';

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
					{
						name: 'Platform',
						value: 'platform',
					},
					{
						name: 'Viral',
						value: 'viral',
					},
					{
						name: 'Content',
						value: 'content',
					},
					{
						name: 'Bulk',
						value: 'bulk',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
					{
						name: 'Search',
						value: 'search',
					},
					{
						name: 'URL',
						value: 'url',
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
			...platformOperations,
			...platformFields,
			...viralOperations,
			...viralFields,
			...contentOperations,
			...contentFields,
			...bulkOperations,
			...bulkFields,
			...webhookOperations,
			...webhookFields,
			...searchOperations,
			...searchFields,
			...urlOperations,
			...urlFields,
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

						let parsedCredentials: IDataObject;
						try {
							parsedCredentials = JSON.parse(credentials);
						} catch {
							throw new NodeOperationError(
								this.getNode(),
								'Invalid JSON format for credentials. Please provide valid JSON.',
								{ itemIndex: i },
							);
						}

						const body: IDataObject = {
							platform,
							name,
							credentials: parsedCredentials,
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
							try {
								body.credentials = JSON.parse(updateFields.credentials as string);
							} catch {
								throw new NodeOperationError(
									this.getNode(),
									'Invalid JSON format for credentials. Please provide valid JSON.',
									{ itemIndex: i },
								);
							}
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
					} else if (operation === 'translateContent') {
						const content = this.getNodeParameter('content', i) as string;
						const targetLanguage = this.getNodeParameter('targetLanguage', i) as string;

						const body: IDataObject = {
							content,
							target_language: targetLanguage,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/translate-content`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'postingFrequency') {
						const platform = this.getNodeParameter('platform', i) as string;

						const body: IDataObject = {
							platform,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/posting-frequency`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'optimizeImage') {
						const imageUrl = this.getNodeParameter('imageUrl', i) as string;
						const platform = this.getNodeParameter('platform', i, 'twitter') as string;

						const body: IDataObject = {
							image_url: imageUrl,
							platform,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/optimize-image`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'enhanceImage') {
						const imageUrl = this.getNodeParameter('imageUrl', i) as string;

						const body: IDataObject = {
							image_url: imageUrl,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/enhance-image`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'generateAltText') {
						const imageUrl = this.getNodeParameter('imageUrl', i) as string;

						const body: IDataObject = {
							image_url: imageUrl,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/generate-alt-text`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'generateImage') {
						const prompt = this.getNodeParameter('prompt', i) as string;
						const additionalFields = this.getNodeParameter(
							'additionalFields',
							i,
							{},
						) as IDataObject;

						const body: IDataObject = {
							prompt,
						};

						if (additionalFields.style) {
							body.style = additionalFields.style;
						}
						if (additionalFields.platform) {
							body.platform = additionalFields.platform;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/generate-image`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'platform') {
					if (operation === 'getAll') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/platforms`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getPostTypes') {
						const platform = this.getNodeParameter('platform', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/platforms/${platform}/post-types`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getPostTypesDetails') {
						const platform = this.getNodeParameter('platform', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/platforms/${platform}/post-types/details`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'viral') {
					if (operation === 'getHooks') {
						const additionalFields = this.getNodeParameter(
							'additionalFields',
							i,
							{},
						) as IDataObject;

						const qs: IDataObject = {};

						if (additionalFields.category && additionalFields.category !== 'all') {
							qs.category = additionalFields.category;
						}
						if (additionalFields.limit) {
							qs.limit = additionalFields.limit;
						}

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/viral/hooks`,
							qs,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'predictScore') {
						const content = this.getNodeParameter('content', i) as string;
						const platform = this.getNodeParameter('platform', i) as string;
						const additionalFields = this.getNodeParameter(
							'additionalFields',
							i,
							{},
						) as IDataObject;

						const body: IDataObject = {
							content,
							platform,
						};

						if (additionalFields.has_media !== undefined) {
							body.has_media = additionalFields.has_media;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/viral/predict-score`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getBestPractices') {
						const platform = this.getNodeParameter('platform', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/viral/best-practices/${platform}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'content') {
					if (operation === 'multiply') {
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

						if (additionalFields.maintain_brand_voice !== undefined) {
							body.maintain_brand_voice = additionalFields.maintain_brand_voice;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/content/multiply`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'createVariations') {
						const content = this.getNodeParameter('content', i) as string;
						const platform = this.getNodeParameter('platform', i) as string;
						const count = this.getNodeParameter('count', i, 3) as number;

						const body: IDataObject = {
							content,
							platform,
							count,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/content/variations`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'preview') {
						const content = this.getNodeParameter('content', i) as string;
						const platforms = this.getNodeParameter('platforms', i) as string[];

						const body: IDataObject = {
							content,
							platforms,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/post/preview`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'optimize') {
						const content = this.getNodeParameter('content', i) as string;
						const platform = this.getNodeParameter('platform', i) as string;

						const body: IDataObject = {
							content,
							platform,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/post/optimize`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'checkConflicts') {
						const scheduleTime = this.getNodeParameter('scheduleTime', i) as string;
						const accountId = this.getNodeParameter('accountId', i, '') as string;

						const body: IDataObject = {
							schedule_time: scheduleTime,
						};

						if (accountId) {
							body.account_id = accountId;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/schedule/conflicts`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'bulk') {
					if (operation === 'createPosts') {
						const postsData = this.getNodeParameter('postsData', i) as string;

						let posts: IDataObject[];
						try {
							posts = JSON.parse(postsData);
						} catch {
							throw new NodeOperationError(
								this.getNode(),
								'Invalid JSON format for posts data. Please provide valid JSON array.',
								{ itemIndex: i },
							);
						}

						const body: IDataObject = {
							posts,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/bulk/posts/create`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'updatePosts') {
						const postsData = this.getNodeParameter('postsData', i) as string;

						let posts: IDataObject[];
						try {
							posts = JSON.parse(postsData);
						} catch {
							throw new NodeOperationError(
								this.getNode(),
								'Invalid JSON format for posts data. Please provide valid JSON array.',
								{ itemIndex: i },
							);
						}

						const body: IDataObject = {
							posts,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/bulk/posts/update`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'deletePosts') {
						const postIds = this.getNodeParameter('postIds', i) as string;

						const body: IDataObject = {
							post_ids: postIds.split(',').map((id) => id.trim()),
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/bulk/posts/delete`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'webhook') {
					if (operation === 'create') {
						const url = this.getNodeParameter('url', i) as string;
						const events = this.getNodeParameter('events', i) as string[];
						const additionalFields = this.getNodeParameter(
							'additionalFields',
							i,
							{},
						) as IDataObject;

						const body: IDataObject = {
							url,
							events,
						};

						if (additionalFields.secret) {
							body.secret = additionalFields.secret;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/webhooks`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getAll') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/webhooks`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'delete') {
						const webhookId = this.getNodeParameter('webhookId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'DELETE',
							url: `${apiPrefix}/webhooks/${webhookId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'search') {
					if (operation === 'searchPosts') {
						const query = this.getNodeParameter('query', i, '') as string;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

						const qs: IDataObject = {};

						if (query) {
							qs.q = query;
						}
						if (filters.platform && filters.platform !== 'all') {
							qs.platform = filters.platform;
						}
						if (filters.status && filters.status !== 'all') {
							qs.status = filters.status;
						}
						if (filters.start_date) {
							qs.start_date = filters.start_date;
						}
						if (filters.end_date) {
							qs.end_date = filters.end_date;
						}
						if (filters.limit) {
							qs.limit = filters.limit;
						}

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/search/posts`,
							qs,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'url') {
					if (operation === 'shorten') {
						const url = this.getNodeParameter('url', i) as string;
						const additionalFields = this.getNodeParameter(
							'additionalFields',
							i,
							{},
						) as IDataObject;

						const body: IDataObject = {
							url,
						};

						if (additionalFields.custom_code) {
							body.custom_code = additionalFields.custom_code;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/urls/shorten`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getAll') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/urls`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getStats') {
						const shortCode = this.getNodeParameter('shortCode', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/urls/${shortCode}/stats`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'delete') {
						const shortCode = this.getNodeParameter('shortCode', i) as string;

						const options: IHttpRequestOptions = {
							method: 'DELETE',
							url: `${apiPrefix}/urls/${shortCode}`,
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
