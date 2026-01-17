import { aiOperations, aiFields } from '../../../nodes/MastaBlasta/resources/ai/index.ts';

describe('AI Resource', () => {
	describe('AI Operations', () => {
		it('should have all 15 AI operations', () => {
			const operations = aiOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(15);

			const expectedOperations = [
				'generateCaption',
				'suggestHashtags',
				'predictEngagement',
				'rewriteContent',
				'getBestTimes',
				'translateContent',
				'getFrequency',
				'optimizeImage',
				'enhanceImage',
				'generateAltText',
				'generateImage',
				'predictPerformance',
				'compareVariations',
				'trainModel',
				'getModelStatus',
			];

			expectedOperations.forEach((op) => {
				expect(operations.find((o) => o.value === op)).toBeDefined();
			});
		});

		it('should show operations only for ai resource', () => {
			expect(aiOperations.displayOptions?.show?.resource).toEqual(['ai']);
		});
	});

	describe('AI Fields', () => {
		it('should have topic field for generateCaption', () => {
			const topicField = aiFields.find(
				(f) =>
					f.name === 'topic' && f.displayOptions?.show?.operation?.includes('generateCaption'),
			);
			expect(topicField).toBeDefined();
			expect(topicField?.required).toBe(true);
			expect(topicField?.type).toBe('string');
		});

		it('should have content field for rewriting', () => {
			const contentField = aiFields.find(
				(f) =>
					f.name === 'content' &&
					f.displayOptions?.show?.operation?.includes('rewriteContent'),
			);
			expect(contentField).toBeDefined();
			expect(contentField?.required).toBe(true);
		});

		it('should have platform selection for AI operations', () => {
			const platformField = aiFields.find(
				(f) =>
					f.name === 'platform' &&
					f.displayOptions?.show?.operation?.includes('generateCaption'),
			);
			expect(platformField).toBeDefined();
			expect(platformField?.required).toBe(true);
			expect(platformField?.type).toBe('options');
		});

		it('should have tone options for generateCaption', () => {
			const toneField = aiFields.find(
				(f) =>
					f.name === 'tone' &&
					f.displayOptions?.show?.operation?.includes('generateCaption') &&
					f.displayOptions?.show?.resource?.includes('ai'),
			);
			expect(toneField).toBeDefined();
			expect(toneField?.type).toBe('options');

			const tones = toneField?.options as Array<{ name: string; value: string }>;
			expect(tones.length).toBeGreaterThan(3);
			expect(tones.find((t) => t.value === 'professional')).toBeDefined();
			expect(tones.find((t) => t.value === 'casual')).toBeDefined();
		});

		it('should have language field for translation', () => {
			const langField = aiFields.find(
				(f) =>
					f.name === 'targetLanguage' &&
					f.displayOptions?.show?.operation?.includes('translateContent'),
			);
			expect(langField).toBeDefined();
			expect(langField?.required).toBe(true);
		});

		it('should have image-related fields for DALL-E', () => {
			const promptField = aiFields.find(
				(f) =>
					f.name === 'prompt' && f.displayOptions?.show?.operation?.includes('generateImage'),
			);
			expect(promptField).toBeDefined();
			expect(promptField?.required).toBe(true);

			const sizeField = aiFields.find(
				(f) => f.name === 'size' && f.displayOptions?.show?.operation?.includes('generateImage'),
			);
			expect(sizeField).toBeDefined();
		});
	});

	describe('Field Validation', () => {
		it('should have descriptions for all fields', () => {
			aiFields.forEach((field) => {
				expect(field.description).toBeDefined();
				expect(field.description.length).toBeGreaterThan(5);
			});
		});
	});
});
