import { accountOperations, accountFields } from '../../../nodes/MastaBlasta/resources/account/index.ts';

describe('Account Resource', () => {
	describe('Account Operations', () => {
		it('should have all 6 account operations', () => {
			const operations = accountOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(6);

			const expectedOperations = ['create', 'get', 'getAll', 'update', 'delete', 'testCredentials'];
			expectedOperations.forEach((op) => {
				expect(operations.find((o) => o.value === op)).toBeDefined();
			});
		});

		it('should show operations only for account resource', () => {
			expect(accountOperations.displayOptions?.show?.resource).toEqual(['account']);
		});
	});

	describe('Account Fields', () => {
		it('should have platform field for create operation', () => {
			const platformField = accountFields.find(
				(f) =>
					f.name === 'platform' &&
					f.displayOptions?.show?.operation?.includes('create') &&
					f.displayOptions?.show?.resource?.includes('account'),
			);
			expect(platformField).toBeDefined();
			expect(platformField?.required).toBe(true);
			expect(platformField?.type).toBe('options');
		});

		it('should have accountId field for get, update, delete operations', () => {
			const accountIdField = accountFields.find((f) => f.name === 'accountId');
			expect(accountIdField).toBeDefined();
			expect(accountIdField?.required).toBe(true);

			const showOperations = accountIdField?.displayOptions?.show?.operation;
			expect(showOperations).toContain('get');
			expect(showOperations).toContain('update');
			expect(showOperations).toContain('delete');
		});

		it('should support all 9 platforms for account creation', () => {
			const platformField = accountFields.find(
				(f) => f.name === 'platform' && f.displayOptions?.show?.operation?.includes('create'),
			);
			const platforms = platformField?.options as Array<{ name: string; value: string }>;

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

		it('should have pagination for getAll', () => {
			const returnAllField = accountFields.find(
				(f) => f.name === 'returnAll' && f.displayOptions?.show?.operation?.includes('getAll'),
			);
			expect(returnAllField).toBeDefined();

			const limitField = accountFields.find(
				(f) => f.name === 'limit' && f.displayOptions?.show?.operation?.includes('getAll'),
			);
			expect(limitField).toBeDefined();
		});
	});
});
