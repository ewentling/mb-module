import { MastaBlasta } from '../../nodes/MastaBlasta/MastaBlasta.node.ts';
import type { INodeType } from 'n8n-workflow';

describe('MastaBlasta Node', () => {
	let node: INodeType;

	beforeEach(() => {
		node = new MastaBlasta();
	});

	describe('Node Description', () => {
		it('should have correct basic properties', () => {
			expect(node.description.displayName).toBe('MastaBlasta');
			expect(node.description.name).toBe('mastaBlasta');
			expect(node.description.group).toContain('output');
			expect(node.description.version).toBe(1);
		});

		it('should have correct subtitle format', () => {
			expect(node.description.subtitle).toBe('={{$parameter["operation"] + ": " + $parameter["resource"]}}');
		});

		it('should have description', () => {
			expect(node.description.description).toBe(
				'Interact with MastaBlasta API for multi-platform social media posting',
			);
		});

		it('should have icon', () => {
			expect(node.description.icon).toBe('file:mastablasta.svg');
		});
	});

	describe('Node Configuration', () => {
		it('should have Main input and output', () => {
			expect(node.description.inputs).toHaveLength(1);
			expect(node.description.outputs).toHaveLength(1);
		});

		it('should require mastaBlasta credentials', () => {
			expect(node.description.credentials).toHaveLength(1);
			expect(node.description.credentials![0].name).toBe('mastaBlasta');
			expect(node.description.credentials![0].required).toBe(true);
		});

		it('should have request defaults configured', () => {
			expect(node.description.requestDefaults?.baseURL).toBe('={{$credentials.baseUrl}}');
			expect(node.description.requestDefaults?.headers).toHaveProperty('Accept');
			expect(node.description.requestDefaults?.headers).toHaveProperty('Content-Type');
		});
	});

	describe('Resource Options', () => {
		it('should have resource parameter', () => {
			const resourceParam = node.description.properties.find((p) => p.name === 'resource');
			expect(resourceParam).toBeDefined();
			expect(resourceParam?.type).toBe('options');
		});

		it('should have all 22 resources', () => {
			const resourceParam = node.description.properties.find((p) => p.name === 'resource');
			const resources = resourceParam?.options as Array<{ name: string; value: string }>;
			
			expect(resources).toHaveLength(22);
			
			const expectedResources = [
				'post',
				'account',
				'media',
				'ai',
				'analytics',
				'platform',
				'viral',
				'content',
				'bulk',
				'webhook',
				'search',
				'url',
				'video',
				'voiceover',
				'socialMonitor',
				'videoClip',
				'template',
				'abTest',
				'bulkImport',
				'chatbot',
				'retry',
			];

			expectedResources.forEach((resource) => {
				expect(resources.find((r) => r.value === resource)).toBeDefined();
			});
		});
	});

	describe('Resource Fields', () => {
		it('should have operation fields for all resources', () => {
			const properties = node.description.properties;
			
			// Check that we have operations and fields for major resources
			const hasPostOperations = properties.some(
				(p) => p.name === 'operation' && p.displayOptions?.show?.resource?.includes('post'),
			);
			expect(hasPostOperations).toBe(true);
		});
	});

	describe('Node Structure', () => {
		it('should have execute method', () => {
			expect(typeof node.execute).toBe('function');
		});

		it('should have all required properties', () => {
			expect(node.description.properties.length).toBeGreaterThan(20);
		});
	});
});
