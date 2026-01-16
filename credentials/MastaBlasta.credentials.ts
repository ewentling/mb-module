import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MastaBlasta implements ICredentialType {
	name = 'mastaBlasta';

	displayName = 'MastaBlasta API';

	icon: Icon = 'file:mastablasta.svg';

	documentationUrl = 'https://github.com/ewentling/MastaBlasta';

	properties: INodeProperties[] = [
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://localhost:33766',
			placeholder: 'http://localhost:33766',
			description: 'The base URL of your MastaBlasta instance',
		},
		{
			displayName: 'Authentication Type',
			name: 'authenticationType',
			type: 'options',
			options: [
				{
					name: 'None (Development Mode)',
					value: 'none',
					description: 'No authentication required for development mode (/api/* endpoints)',
				},
				{
					name: 'JWT Token (Production Mode)',
					value: 'jwt',
					description: 'JWT authentication for production mode (/api/v2/* endpoints)',
				},
			],
			default: 'none',
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			displayOptions: {
				show: {
					authenticationType: ['jwt'],
				},
			},
			description: 'The JWT access token from MastaBlasta authentication',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials?.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.baseUrl}}',
			url: '/api/health',
			method: 'GET',
		},
	};
}
