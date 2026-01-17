import { postOperations, postFields } from '../../../nodes/MastaBlasta/resources/post/index.ts';

describe('Post Resource', () => {
	describe('Post Operations', () => {
		it('should have correct display name', () => {
			expect(postOperations.displayName).toBe('Operation');
		});

		it('should have all 6 operations', () => {
			const operations = postOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(6);

			const expectedOperations = ['create', 'get', 'getAll', 'update', 'delete', 'publish'];
			expectedOperations.forEach((op) => {
				expect(operations.find((o) => o.value === op)).toBeDefined();
			});
		});

		it('should show operations only for post resource', () => {
			expect(postOperations.displayOptions?.show?.resource).toEqual(['post']);
		});
	});

	describe('Post Fields', () => {
		it('should have required fields for create operation', () => {
			const contentField = postFields.find(
				(f) =>
					f.name === 'content' &&
					f.displayOptions?.show?.operation?.includes('create') &&
					f.displayOptions?.show?.resource?.includes('post'),
			);
			expect(contentField).toBeDefined();
			expect(contentField?.required).toBe(true);
			expect(contentField?.type).toBe('string');

			const platformsField = postFields.find(
				(f) =>
					f.name === 'platforms' &&
					f.displayOptions?.show?.operation?.includes('create') &&
					f.displayOptions?.show?.resource?.includes('post'),
			);
			expect(platformsField).toBeDefined();
			expect(platformsField?.required).toBe(true);
			expect(platformsField?.type).toBe('multiOptions');
		});

		it('should have postId field for get, update, delete, publish operations', () => {
			const postIdField = postFields.find((f) => f.name === 'postId');
			expect(postIdField).toBeDefined();
			expect(postIdField?.required).toBe(true);
			expect(postIdField?.type).toBe('string');

			const showOperations = postIdField?.displayOptions?.show?.operation;
			expect(showOperations).toContain('get');
			expect(showOperations).toContain('update');
			expect(showOperations).toContain('delete');
			expect(showOperations).toContain('publish');
		});

		it('should have pagination fields for getAll operation', () => {
			const returnAllField = postFields.find(
				(f) => f.name === 'returnAll' && f.displayOptions?.show?.operation?.includes('getAll'),
			);
			expect(returnAllField).toBeDefined();
			expect(returnAllField?.type).toBe('boolean');

			const limitField = postFields.find(
				(f) => f.name === 'limit' && f.displayOptions?.show?.operation?.includes('getAll'),
			);
			expect(limitField).toBeDefined();
			expect(limitField?.type).toBe('number');
		});

		it('should have additionalFields for create operation', () => {
			const additionalFields = postFields.find(
				(f) =>
					f.name === 'additionalFields' &&
					f.displayOptions?.show?.operation?.includes('create') &&
					f.displayOptions?.show?.resource?.includes('post'),
			);
			expect(additionalFields).toBeDefined();
			expect(additionalFields?.type).toBe('collection');
		});

		it('should support all 9 platforms', () => {
			const platformsField = postFields.find(
				(f) => f.name === 'platforms' && f.displayOptions?.show?.operation?.includes('create'),
			);
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
				expect(platforms?.find((p) => p.value === platform)).toBeDefined();
			});
		});
	});

	describe('Field Validation', () => {
		it('should have proper descriptions for all fields', () => {
			postFields.forEach((field) => {
				expect(field.description).toBeDefined();
				expect(field.description.length).toBeGreaterThan(10);
			});
		});

		it('should have default values where appropriate', () => {
			const returnAllField = postFields.find((f) => f.name === 'returnAll');
			expect(returnAllField?.default).toBe(false);

			const limitField = postFields.find((f) => f.name === 'limit');
			expect(limitField?.default).toBe(50);
		});
	});
});
