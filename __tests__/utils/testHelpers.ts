import type {
	IExecuteFunctions,
	INodeExecutionData,
	ICredentialDataDecryptedObject,
	IDataObject,
} from 'n8n-workflow';

/**
 * Custom error type for API errors with status code
 */
interface ApiError extends Error {
	statusCode: number;
	response: {
		statusCode: number;
		body: { error: string };
	};
}

/**
 * Mock IExecuteFunctions for testing n8n nodes
 */
export function mockExecuteFunctions(
	inputData: INodeExecutionData[],
	nodeParameters: Record<string, unknown> = {},
	credentials: ICredentialDataDecryptedObject = {},
): IExecuteFunctions {
	const parameterValues: Record<string, unknown> = { ...nodeParameters };

	return {
		getInputData: () => inputData,
		getNodeParameter: (parameterName: string, itemIndex: number, defaultValue?: unknown) => {
			const key = `${parameterName}_${itemIndex}`;
			if (parameterValues[key] !== undefined) {
				return parameterValues[key];
			}
			if (parameterValues[parameterName] !== undefined) {
				return parameterValues[parameterName];
			}
			return defaultValue;
		},
		getCredentials: async () => credentials,
		helpers: {
			httpRequestWithAuthentication: async (): Promise<IDataObject> => {
				// Mock HTTP request - can be overridden in tests
				return {};
			},
		} as IExecuteFunctions['helpers'],
		getNode: () => ({
			name: 'MastaBlasta Test Node',
			type: 'n8n-nodes-mastablasta.mastaBlasta',
			typeVersion: 1,
			position: [0, 0],
			parameters: {},
		}),
		getWorkflow: () => ({
			id: 'test-workflow',
			name: 'Test Workflow',
			active: false,
			nodes: [],
			connections: {},
			settings: {},
		}),
	} as IExecuteFunctions;
}

/**
 * Create mock HTTP response helper
 */
export function mockHttpResponse(statusCode: number, data: unknown) {
	return {
		statusCode,
		body: data,
		headers: {
			'content-type': 'application/json',
		},
	};
}

/**
 * Mock credentials for testing
 */
export function mockCredentials(
	authenticationType: 'none' | 'jwt' = 'none',
	baseUrl: string = 'http://localhost:33766',
	accessToken: string = 'test-token',
): ICredentialDataDecryptedObject {
	return {
		baseUrl,
		authenticationType,
		...(authenticationType === 'jwt' && { accessToken }),
	};
}

/**
 * Create sample post data
 */
export function createSamplePost(overrides: Partial<IDataObject> = {}): IDataObject {
	return {
		id: 'test-post-123',
		content: 'Test post content',
		platforms: ['twitter', 'linkedin'],
		status: 'draft',
		created_at: '2026-01-17T00:00:00Z',
		updated_at: '2026-01-17T00:00:00Z',
		...overrides,
	};
}

/**
 * Create sample account data
 */
export function createSampleAccount(overrides: Partial<IDataObject> = {}): IDataObject {
	return {
		id: 'test-account-456',
		platform: 'twitter',
		username: 'testuser',
		connected: true,
		...overrides,
	};
}

/**
 * Create sample media data
 */
export function createSampleMedia(overrides: Partial<IDataObject> = {}): IDataObject {
	return {
		id: 'test-media-789',
		url: 'https://example.com/media/test.jpg',
		type: 'image',
		size: 102400,
		...overrides,
	};
}

/**
 * Create error response
 */
export function createErrorResponse(
	message: string = 'Test error',
	statusCode: number = 400,
): ApiError {
	const error = new Error(message) as ApiError;
	error.statusCode = statusCode;
	error.response = {
		statusCode,
		body: { error: message },
	};
	return error;
}
