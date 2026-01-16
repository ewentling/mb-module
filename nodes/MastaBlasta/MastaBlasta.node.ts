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
import { videoOperations, videoFields } from './resources/video';
import { voiceoverOperations, voiceoverFields } from './resources/voiceover';
import { socialMonitorOperations, socialMonitorFields } from './resources/socialMonitor';
import { videoClipOperations, videoClipFields } from './resources/videoClip';
import { templateOperations, templateFields } from './resources/template';
import { abTestOperations, abTestFields } from './resources/abTest';
import { bulkImportOperations, bulkImportFields } from './resources/bulkImport';
import { chatbotOperations, chatbotFields } from './resources/chatbot';
import { connectionOperations, connectionFields } from './resources/connection';
import { retryOperations, retryFields } from './resources/retry';

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
					{
						name: 'Video',
						value: 'video',
					},
					{
						name: 'Voiceover',
						value: 'voiceover',
					},
					{
						name: 'Social Monitor',
						value: 'socialMonitor',
					},
					{
						name: 'Video Clip',
						value: 'videoClip',
					},
					{
						name: 'Template',
						value: 'template',
					},
					{
						name: 'A/B Test',
						value: 'abTest',
					},
					{
						name: 'Bulk Import',
						value: 'bulkImport',
					},
					{
						name: 'Chatbot',
						value: 'chatbot',
					},
					{
						name: 'Connection',
						value: 'connection',
					},
					{
						name: 'Retry',
						value: 'retry',
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
			...videoOperations,
			...videoFields,
			...voiceoverOperations,
			...voiceoverFields,
			...socialMonitorOperations,
			...socialMonitorFields,
			...videoClipOperations,
			...videoClipFields,
			...templateOperations,
			...templateFields,
			...abTestOperations,
			...abTestFields,
			...bulkImportOperations,
			...bulkImportFields,
			...chatbotOperations,
			...chatbotFields,
			...connectionOperations,
			...connectionFields,
			...retryOperations,
			...retryFields,
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
					} else if (operation === 'predictPerformance') {
						const content = this.getNodeParameter('content', i) as string;

						const body: IDataObject = {
							content,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/predict-performance`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'compareVariations') {
						const variations = this.getNodeParameter('variations', i) as string;

						const body: IDataObject = {
							variations: JSON.parse(variations),
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/compare-variations`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'trainModel') {
						const trainingData = this.getNodeParameter('trainingData', i) as string;

						const body: IDataObject = JSON.parse(trainingData);

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/train-model`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getStatus') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/ai/status`,
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
					} else if (operation === 'compare') {
						const postIds = this.getNodeParameter('postIds', i) as string;

						const body: IDataObject = {
							post_ids: postIds.split(',').map((id) => id.trim()),
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/analytics/compare`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'video') {
					if (operation === 'generateScript') {
						const topic = this.getNodeParameter('topic', i) as string;
						const platform = this.getNodeParameter('platform', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							topic,
							platform,
						};

						if (additionalFields.duration) {
							body.duration = additionalFields.duration;
						}
						if (additionalFields.style) {
							body.style = additionalFields.style;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/generate-video-script`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'createSlideshow') {
						const imageUrls = this.getNodeParameter('imageUrls', i) as string;

						const body: IDataObject = {
							image_urls: imageUrls.split(',').map((url) => url.trim()),
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ai/create-slideshow`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'generatePrompt') {
						const topic = this.getNodeParameter('topic', i) as string;

						const body: IDataObject = {
							topic,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/generate-prompt`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'generateCaptions') {
						const videoUrl = this.getNodeParameter('videoUrl', i) as string;

						const body: IDataObject = {
							video_url: videoUrl,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/generate-captions`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'optimizeVideo') {
						const platform = this.getNodeParameter('platform', i) as string;

						const body: IDataObject = {
							platform,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/optimize`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getVideoSpecs') {
						const platform = this.getNodeParameter('platform', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/video/specs/${platform}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getTemplates') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/video/templates`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getTemplate') {
						const templateId = this.getNodeParameter('templateId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/video/templates/${templateId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'generateFromTemplate') {
						const templateId = this.getNodeParameter('templateId', i) as string;

						const body: IDataObject = {
							template_id: templateId,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/generate-from-template`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'renderSlideshow') {
						const imageUrls = this.getNodeParameter('imageUrls', i) as string;

						const body: IDataObject = {
							image_urls: imageUrls.split(',').map((url) => url.trim()),
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/render-slideshow`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'generateSubtitles') {
						const videoUrl = this.getNodeParameter('videoUrl', i) as string;

						const body: IDataObject = {
							video_url: videoUrl,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/generate-subtitles`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'convertAspectRatio') {
						const videoUrl = this.getNodeParameter('videoUrl', i) as string;

						const body: IDataObject = {
							video_url: videoUrl,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/convert-aspect-ratio`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'generateVoiceoverScript') {
						const topic = this.getNodeParameter('topic', i) as string;

						const body: IDataObject = {
							topic,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/generate-voiceover-script`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'suggestBRoll') {
						const body: IDataObject = {};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/suggest-b-roll`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'batchCreate') {
						const body: IDataObject = {};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/batch-create`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'addWatermark') {
						const videoUrl = this.getNodeParameter('videoUrl', i) as string;

						const body: IDataObject = {
							video_url: videoUrl,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/add-watermark`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'generateIntroOutro') {
						const body: IDataObject = {};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/generate-intro-outro`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'addTextOverlays') {
						const videoUrl = this.getNodeParameter('videoUrl', i) as string;

						const body: IDataObject = {
							video_url: videoUrl,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/add-text-overlays`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'multiPlatformExport') {
						const platform = this.getNodeParameter('platform', i) as string;

						const body: IDataObject = {
							platform,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/multi-platform-export`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getAnalyticsMetadata') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/video/analytics-metadata`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'generateThumbnail') {
						const body: IDataObject = {};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/generate-thumbnail`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'generateVideoImages') {
						const body: IDataObject = {};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/generate-images`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'createImageVariations') {
						const body: IDataObject = {};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/video/create-image-variations`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'voiceover') {
					if (operation === 'getSupportedLanguages') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/voiceover/supported-languages`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'generatePronunciationGuide') {
						const script = this.getNodeParameter('script', i) as string;
						const language = this.getNodeParameter('language', i) as string;

						const body: IDataObject = {
							script,
							language,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/voiceover/pronunciation-guide`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'addEmotionMarkers') {
						const script = this.getNodeParameter('script', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							script,
						};

						if (additionalFields.emotion) {
							body.emotion = additionalFields.emotion;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/voiceover/add-emotion-markers`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'generateMultiVoiceScript') {
						const script = this.getNodeParameter('script', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							script,
						};

						if (additionalFields.voiceCount) {
							body.voice_count = additionalFields.voiceCount;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/voiceover/multi-voice-script`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'addBreathMarks') {
						const script = this.getNodeParameter('script', i) as string;

						const body: IDataObject = {
							script,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/voiceover/add-breath-marks`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'estimateDuration') {
						const script = this.getNodeParameter('script', i) as string;
						const language = this.getNodeParameter('language', i) as string;

						const body: IDataObject = {
							script,
							language,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/voiceover/estimate-duration`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'addAccentGuidance') {
						const script = this.getNodeParameter('script', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							script,
						};

						if (additionalFields.accent) {
							body.accent = additionalFields.accent;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/voiceover/add-accent-guidance`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'configureTTS') {
						const body: IDataObject = {};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/voiceover/configure-tts`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'syncMusic') {
						const body: IDataObject = {};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/voiceover/sync-music`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'qualityCheck') {
						const script = this.getNodeParameter('script', i) as string;

						const body: IDataObject = {
							script,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/voiceover/quality-check`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'socialMonitor') {
					if (operation === 'create') {
						const keywords = this.getNodeParameter('keywords', i) as string;
						const platforms = this.getNodeParameter('platforms', i) as string[];

						const body: IDataObject = {
							keywords: keywords.split(',').map((k) => k.trim()),
							platforms,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/social-monitors`,
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
							url: `${apiPrefix}/social-monitors`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'update') {
						const monitorId = this.getNodeParameter('monitorId', i) as string;
						const platforms = this.getNodeParameter('platforms', i) as string[];

						const body: IDataObject = {
							platforms,
						};

						const options: IHttpRequestOptions = {
							method: 'PUT',
							url: `${apiPrefix}/social-monitors/${monitorId}`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'delete') {
						const monitorId = this.getNodeParameter('monitorId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'DELETE',
							url: `${apiPrefix}/social-monitors/${monitorId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getResults') {
						const monitorId = this.getNodeParameter('monitorId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/social-monitors/${monitorId}/results`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'refresh') {
						const monitorId = this.getNodeParameter('monitorId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/social-monitors/${monitorId}/refresh`,
							body: {},
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'videoClip') {
					if (operation === 'getStatus') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/clips/status`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'analyze') {
						const videoUrl = this.getNodeParameter('videoUrl', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							video_url: videoUrl,
						};

						if (additionalFields.clipCount) {
							body.clip_count = additionalFields.clipCount;
						}
						if (additionalFields.minDuration) {
							body.min_duration = additionalFields.minDuration;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/clips/analyze`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getVideoInfo') {
						const videoUrl = this.getNodeParameter('videoUrl', i) as string;

						const body: IDataObject = {
							video_url: videoUrl,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/clips/video-info`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getMetadata') {
						const videoUrl = this.getNodeParameter('videoUrl', i) as string;

						const body: IDataObject = {
							video_url: videoUrl,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/clips/metadata`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getDownloadInfo') {
						const videoUrl = this.getNodeParameter('videoUrl', i) as string;

						const body: IDataObject = {
							video_url: videoUrl,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/clips/download-info`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'schedule') {
						const body: IDataObject = {};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/clips/schedule`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'template') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const content = this.getNodeParameter('content', i) as string;

						const body: IDataObject = {
							name,
							content,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/templates`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'get') {
						const templateId = this.getNodeParameter('templateId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/templates/${templateId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getAll') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/templates`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'delete') {
						const templateId = this.getNodeParameter('templateId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'DELETE',
							url: `${apiPrefix}/templates/${templateId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'abTest') {
					if (operation === 'createVersions') {
						const versions = this.getNodeParameter('versions', i) as string;

						const body: IDataObject = {
							versions: JSON.parse(versions),
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/post-versions`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getVersions') {
						const postId = this.getNodeParameter('postId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/post-versions/${postId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'publishVersion') {
						const versionId = this.getNodeParameter('versionId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/post-versions/${versionId}/publish`,
							body: {},
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'setWinner') {
						const versionId = this.getNodeParameter('versionId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ab-tests/${versionId}/winner`,
							body: {},
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'compare') {
						const versions = this.getNodeParameter('versions', i) as string;

						const body: IDataObject = {
							versions: JSON.parse(versions),
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/ab-tests/compare`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'bulkImport') {
					if (operation === 'validate') {
						const data = this.getNodeParameter('data', i) as string;

						const body: IDataObject = {
							data: JSON.parse(data),
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/bulk-import/validate`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'execute') {
						const data = this.getNodeParameter('data', i) as string;

						const body: IDataObject = {
							data: JSON.parse(data),
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/bulk-import/execute`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'get') {
						const importId = this.getNodeParameter('importId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/bulk-import/${importId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getAll') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/bulk-import`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'chatbot') {
					if (operation === 'createTemplate') {
						const name = this.getNodeParameter('name', i) as string;
						const response = this.getNodeParameter('response', i) as string;

						const body: IDataObject = {
							name,
							response,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/response-templates`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getTemplates') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/response-templates`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getTemplate') {
						const templateId = this.getNodeParameter('templateId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/response-templates/${templateId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'updateTemplate') {
						const templateId = this.getNodeParameter('templateId', i) as string;

						const body: IDataObject = {};

						const options: IHttpRequestOptions = {
							method: 'PUT',
							url: `${apiPrefix}/response-templates/${templateId}`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'deleteTemplate') {
						const templateId = this.getNodeParameter('templateId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'DELETE',
							url: `${apiPrefix}/response-templates/${templateId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'suggestResponse') {
						const message = this.getNodeParameter('message', i) as string;

						const body: IDataObject = {
							message,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/chatbot/suggest-response`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getInteractions') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/chatbot/interactions`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'createInteraction') {
						const message = this.getNodeParameter('message', i) as string;

						const body: IDataObject = {
							message,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/chatbot/interactions`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getStats') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/chatbot/stats`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'connection') {
					if (operation === 'checkHealth') {
						const accountId = this.getNodeParameter('accountId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/connection/health/${accountId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getReconnectInstructions') {
						const platform = this.getNodeParameter('platform', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/connection/reconnect-instructions/${platform}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'validate') {
						const accountId = this.getNodeParameter('accountId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/connection/validate/${accountId}`,
							body: {},
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'checkPermissions') {
						const accountId = this.getNodeParameter('accountId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/connection/permissions/${accountId}`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'getQuickConnectOptions') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${apiPrefix}/connection/quick-connect-options`,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'quickConnect') {
						const platform = this.getNodeParameter('platform', i) as string;

						const body: IDataObject = {
							platform,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/connection/quick-connect`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'troubleshoot') {
						const errorDetails = this.getNodeParameter('errorDetails', i, '{}') as string;

						const body: IDataObject = JSON.parse(errorDetails);

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/connection/troubleshoot`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'testPrerequisites') {
						const platform = this.getNodeParameter('platform', i) as string;

						const body: IDataObject = {
							platform,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/connection/test-prerequisites`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'prepareBulkConnect') {
						const body: IDataObject = {};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/connection/prepare-bulk-connect`,
							body,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'autoRefresh') {
						const accountId = this.getNodeParameter('accountId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/connection/auto-refresh/${accountId}`,
							body: {},
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					}
				} else if (resource === 'retry') {
					if (operation === 'retryFailedPosts') {
						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/posts/retry-failed`,
							body: {},
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'mastaBlasta',
							options,
						);
					} else if (operation === 'retryPost') {
						const postId = this.getNodeParameter('postId', i) as string;

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiPrefix}/posts/${postId}/retry`,
							body: {},
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
