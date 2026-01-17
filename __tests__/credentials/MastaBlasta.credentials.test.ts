import { MastaBlasta } from '../../credentials/MastaBlasta.credentials';

describe('MastaBlasta Credentials', () => {
	let credential: MastaBlasta;

	beforeEach(() => {
		credential = new MastaBlasta();
	});

	describe('Credential Properties', () => {
		it('should have correct name', () => {
			expect(credential.name).toBe('mastaBlasta');
		});

		it('should have correct display name', () => {
			expect(credential.displayName).toBe('MastaBlasta API');
		});

		it('should have documentation URL', () => {
			expect(credential.documentationUrl).toBe('https://github.com/ewentling/MastaBlasta');
		});

		it('should have three properties', () => {
			expect(credential.properties).toHaveLength(3);
		});
	});

	describe('Property Configuration', () => {
		it('should have baseUrl property', () => {
			const baseUrlProp = credential.properties.find((p) => p.name === 'baseUrl');
			expect(baseUrlProp).toBeDefined();
			expect(baseUrlProp?.type).toBe('string');
			expect(baseUrlProp?.default).toBe('http://localhost:33766');
		});

		it('should have authenticationType property with options', () => {
			const authTypeProp = credential.properties.find((p) => p.name === 'authenticationType');
			expect(authTypeProp).toBeDefined();
			expect(authTypeProp?.type).toBe('options');
			expect(authTypeProp?.options).toHaveLength(2);
			expect(authTypeProp?.default).toBe('none');
		});

		it('should have accessToken property with password type', () => {
			const tokenProp = credential.properties.find((p) => p.name === 'accessToken');
			expect(tokenProp).toBeDefined();
			expect(tokenProp?.type).toBe('string');
			expect(tokenProp?.typeOptions).toEqual({ password: true });
		});

		it('should show accessToken only for JWT authentication', () => {
			const tokenProp = credential.properties.find((p) => p.name === 'accessToken');
			expect(tokenProp?.displayOptions?.show?.authenticationType).toEqual(['jwt']);
		});
	});

	describe('Authentication', () => {
		it('should have generic authentication type', () => {
			expect(credential.authenticate.type).toBe('generic');
		});

		it('should set Authorization header with Bearer token', () => {
			expect(credential.authenticate.properties?.headers?.Authorization).toBe(
				'=Bearer {{$credentials?.accessToken}}',
			);
		});
	});

	describe('Credential Test', () => {
		it('should have test configuration', () => {
			expect(credential.test).toBeDefined();
			expect(credential.test.request).toBeDefined();
		});

		it('should test with health endpoint', () => {
			expect(credential.test.request?.url).toBe('/api/health');
			expect(credential.test.request?.method).toBe('GET');
		});

		it('should use credential baseURL', () => {
			expect(credential.test.request?.baseURL).toBe('={{$credentials?.baseUrl}}');
		});
	});
});
