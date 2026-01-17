/**
 * Integration tests for MastaBlasta node
 * These tests validate the node structure, resource definitions, and field configurations
 */

import { MastaBlasta } from '../../nodes/MastaBlasta/MastaBlasta.node.ts';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

describe('MastaBlasta Integration Tests', () => {
	let node: INodeType;
	let description: INodeTypeDescription;

	beforeAll(() => {
		node = new MastaBlasta();
		description = node.description;
	});

	describe('Node Structure', () => {
		it('should be properly instantiable', () => {
			expect(node).toBeDefined();
			expect(node.description).toBeDefined();
			expect(typeof node.execute).toBe('function');
		});

		it('should have all required description properties', () => {
			expect(description.displayName).toBeDefined();
			expect(description.name).toBeDefined();
			expect(description.group).toBeDefined();
			expect(description.version).toBeDefined();
			expect(description.description).toBeDefined();
			expect(description.defaults).toBeDefined();
			expect(description.inputs).toBeDefined();
			expect(description.outputs).toBeDefined();
		});
	});

	describe('Resource and Operation Configuration', () => {
		it('should have resource parameter as first property', () => {
			const firstProp = description.properties[0];
			expect(firstProp.name).toBe('resource');
			expect(firstProp.type).toBe('options');
		});

		it('should have 22 resources available', () => {
			const resourceParam = description.properties.find((p) => p.name === 'resource');
			const resources = resourceParam?.options as Array<{ name: string; value: string }>;
			expect(resources).toHaveLength(22);
		});

		it('should have operations defined for each resource', () => {
			const resourceParam = description.properties.find((p) => p.name === 'resource');
			const resources = resourceParam?.options as Array<{ name: string; value: string }>;

			resources.forEach((resource) => {
				const operationParam = description.properties.find(
					(p) =>
						p.name === 'operation' &&
						p.displayOptions?.show?.resource?.includes(resource.value),
				);
				expect(operationParam).toBeDefined();
				expect(operationParam?.options).toBeDefined();
				expect(
					(operationParam?.options as Array<{ name: string; value: string }>).length,
				).toBeGreaterThan(0);
			});
		});

		it('should have proper field definitions for major operations', () => {
			// Check post create has required fields
			const contentField = description.properties.find(
				(p) =>
					p.name === 'content' &&
					p.displayOptions?.show?.resource?.includes('post') &&
					p.displayOptions?.show?.operation?.includes('create'),
			);
			expect(contentField).toBeDefined();
			expect(contentField?.required).toBe(true);

			// Check AI generateCaption has required fields
			const topicField = description.properties.find(
				(p) =>
					p.name === 'topic' &&
					p.displayOptions?.show?.resource?.includes('ai') &&
					p.displayOptions?.show?.operation?.includes('generateCaption'),
			);
			expect(topicField).toBeDefined();
		});
	});

	describe('Platform Support', () => {
		it('should support all 9 platforms for post operations', () => {
			const platformsField = description.properties.find(
				(p) =>
					p.name === 'platforms' &&
					p.displayOptions?.show?.resource?.includes('post') &&
					p.displayOptions?.show?.operation?.includes('create'),
			);

			expect(platformsField).toBeDefined();
			const platforms = platformsField?.options as Array<{ name: string; value: string }>;

			const expectedPlatforms = [
				'twitter',
				'facebook',
				'instagram',
				'linkedin',
				'tiktok',
				'youtube',
				'mastodon',
				'bluesky',
				'threads',
			];

			expectedPlatforms.forEach((platform) => {
				expect(platforms.find((p) => p.value === platform)).toBeDefined();
			});
		});
	});

	describe('Authentication Mode Support', () => {
		it('should have request defaults configured', () => {
			expect(description.requestDefaults).toBeDefined();
			expect(description.requestDefaults?.baseURL).toBe('={{$credentials.baseUrl}}');
		});

		it('should require mastaBlasta credentials', () => {
			expect(description.credentials).toHaveLength(1);
			expect(description.credentials![0].name).toBe('mastaBlasta');
			expect(description.credentials![0].required).toBe(true);
		});
	});

	describe('Field Validation', () => {
		it('should have descriptions for all properties', () => {
			description.properties.forEach((prop) => {
				expect(prop.description).toBeDefined();
				expect(typeof prop.description).toBe('string');
			});
		});

		it('should have displayOptions for operation-specific fields', () => {
			const operationFields = description.properties.filter(
				(p) => p.name !== 'resource' && p.name !== 'operation',
			);

			operationFields.forEach((field) => {
				// Skip collection options as they may not have displayOptions directly
				if (field.type !== 'collection' && field.type !== 'fixedCollection') {
					expect(field.displayOptions).toBeDefined();
				}
			});
		});

		it('should have appropriate types for fields', () => {
			const validTypes = [
				'string',
				'number',
				'boolean',
				'options',
				'multiOptions',
				'collection',
				'fixedCollection',
				'json',
			];

			description.properties.forEach((prop) => {
				expect(validTypes).toContain(prop.type);
			});
		});
	});

	describe('Required Resources Coverage', () => {
		const requiredResources = [
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
			'connection',
			'retry',
		];

		it('should have all required resources', () => {
			const resourceParam = description.properties.find((p) => p.name === 'resource');
			const resources = resourceParam?.options as Array<{ name: string; value: string }>;

			requiredResources.forEach((requiredResource) => {
				expect(resources.find((r) => r.value === requiredResource)).toBeDefined();
			});
		});
	});

	describe('API Coverage', () => {
		it('should have comprehensive operation coverage', () => {
			// Count all operations across all resources
			let totalOperations = 0;

			const resourceParam = description.properties.find((p) => p.name === 'resource');
			const resources = resourceParam?.options as Array<{ name: string; value: string }>;

			resources.forEach((resource) => {
				const operationParam = description.properties.find(
					(p) =>
						p.name === 'operation' &&
						p.displayOptions?.show?.resource?.includes(resource.value),
				);
				if (operationParam?.options) {
					totalOperations += (
						operationParam.options as Array<{ name: string; value: string }>
					).length;
				}
			});

			// Should have at least 150 operations for 100% API coverage
			expect(totalOperations).toBeGreaterThanOrEqual(150);
		});
	});
});
