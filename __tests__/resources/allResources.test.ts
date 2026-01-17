import { mediaOperations } from '../../../nodes/MastaBlasta/resources/media/index.ts';
import { analyticsOperations } from '../../../nodes/MastaBlasta/resources/analytics/index.ts';
import { platformOperations } from '../../../nodes/MastaBlasta/resources/platform/index.ts';
import { viralOperations } from '../../../nodes/MastaBlasta/resources/viral/index.ts';
import { contentOperations } from '../../../nodes/MastaBlasta/resources/content/index.ts';
import { bulkOperations } from '../../../nodes/MastaBlasta/resources/bulk/index.ts';
import { webhookOperations } from '../../../nodes/MastaBlasta/resources/webhook/index.ts';
import { searchOperations } from '../../../nodes/MastaBlasta/resources/search/index.ts';
import { urlOperations } from '../../../nodes/MastaBlasta/resources/url/index.ts';
import { videoOperations } from '../../../nodes/MastaBlasta/resources/video/index.ts';
import { voiceoverOperations } from '../../../nodes/MastaBlasta/resources/voiceover/index.ts';
import { socialMonitorOperations } from '../../../nodes/MastaBlasta/resources/socialMonitor/index.ts';
import { videoClipOperations } from '../../../nodes/MastaBlasta/resources/videoClip/index.ts';
import { templateOperations } from '../../../nodes/MastaBlasta/resources/template/index.ts';
import { abTestOperations } from '../../../nodes/MastaBlasta/resources/abTest/index.ts';
import { bulkImportOperations } from '../../../nodes/MastaBlasta/resources/bulkImport/index.ts';
import { chatbotOperations } from '../../../nodes/MastaBlasta/resources/chatbot/index.ts';
import { connectionOperations } from '../../../nodes/MastaBlasta/resources/connection/index.ts';
import { retryOperations } from '../../../nodes/MastaBlasta/resources/retry/index.ts';

describe('All Resources Coverage', () => {
	describe('Media Resource', () => {
		it('should have 4 media operations', () => {
			const operations = mediaOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(4);
			expect(operations.find((o) => o.value === 'upload')).toBeDefined();
			expect(operations.find((o) => o.value === 'get')).toBeDefined();
			expect(operations.find((o) => o.value === 'getAll')).toBeDefined();
			expect(operations.find((o) => o.value === 'delete')).toBeDefined();
		});
	});

	describe('Analytics Resource', () => {
		it('should have 3 analytics operations', () => {
			const operations = analyticsOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(3);
			expect(operations.find((o) => o.value === 'getPostAnalytics')).toBeDefined();
			expect(operations.find((o) => o.value === 'getOverview')).toBeDefined();
			expect(operations.find((o) => o.value === 'compare')).toBeDefined();
		});
	});

	describe('Platform Resource', () => {
		it('should have 3 platform operations', () => {
			const operations = platformOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(3);
			expect(operations.find((o) => o.value === 'getAll')).toBeDefined();
			expect(operations.find((o) => o.value === 'getPostTypes')).toBeDefined();
			expect(operations.find((o) => o.value === 'getPostTypeDetails')).toBeDefined();
		});
	});

	describe('Viral Resource', () => {
		it('should have 3 viral content operations', () => {
			const operations = viralOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(3);
			expect(operations.find((o) => o.value === 'getHooks')).toBeDefined();
			expect(operations.find((o) => o.value === 'predictScore')).toBeDefined();
			expect(operations.find((o) => o.value === 'getBestPractices')).toBeDefined();
		});
	});

	describe('Content Resource', () => {
		it('should have 5 content operations', () => {
			const operations = contentOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(5);
			expect(operations.find((o) => o.value === 'multiply')).toBeDefined();
			expect(operations.find((o) => o.value === 'createVariations')).toBeDefined();
			expect(operations.find((o) => o.value === 'preview')).toBeDefined();
			expect(operations.find((o) => o.value === 'optimize')).toBeDefined();
			expect(operations.find((o) => o.value === 'checkConflicts')).toBeDefined();
		});
	});

	describe('Bulk Resource', () => {
		it('should have 3 bulk operations', () => {
			const operations = bulkOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(3);
			expect(operations.find((o) => o.value === 'createPosts')).toBeDefined();
			expect(operations.find((o) => o.value === 'updatePosts')).toBeDefined();
			expect(operations.find((o) => o.value === 'deletePosts')).toBeDefined();
		});
	});

	describe('Webhook Resource', () => {
		it('should have 3 webhook operations', () => {
			const operations = webhookOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(3);
			expect(operations.find((o) => o.value === 'create')).toBeDefined();
			expect(operations.find((o) => o.value === 'getAll')).toBeDefined();
			expect(operations.find((o) => o.value === 'delete')).toBeDefined();
		});
	});

	describe('Search Resource', () => {
		it('should have search operation', () => {
			const operations = searchOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(1);
			expect(operations.find((o) => o.value === 'search')).toBeDefined();
		});
	});

	describe('URL Resource', () => {
		it('should have 4 URL operations', () => {
			const operations = urlOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(4);
			expect(operations.find((o) => o.value === 'shorten')).toBeDefined();
			expect(operations.find((o) => o.value === 'getAll')).toBeDefined();
			expect(operations.find((o) => o.value === 'getStats')).toBeDefined();
			expect(operations.find((o) => o.value === 'delete')).toBeDefined();
		});
	});

	describe('Video Resource', () => {
		it('should have 23 video operations', () => {
			const operations = videoOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(23);
			expect(operations.find((o) => o.value === 'generateScript')).toBeDefined();
			expect(operations.find((o) => o.value === 'createSlideshow')).toBeDefined();
			expect(operations.find((o) => o.value === 'generateImage')).toBeDefined();
		});
	});

	describe('Voiceover Resource', () => {
		it('should have 10 voiceover operations', () => {
			const operations = voiceoverOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(10);
			expect(operations.find((o) => o.value === 'getSupportedLanguages')).toBeDefined();
			expect(operations.find((o) => o.value === 'generateVoiceover')).toBeDefined();
		});
	});

	describe('Social Monitor Resource', () => {
		it('should have 6 social monitor operations', () => {
			const operations = socialMonitorOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(6);
			expect(operations.find((o) => o.value === 'create')).toBeDefined();
			expect(operations.find((o) => o.value === 'get')).toBeDefined();
			expect(operations.find((o) => o.value === 'getAll')).toBeDefined();
			expect(operations.find((o) => o.value === 'update')).toBeDefined();
			expect(operations.find((o) => o.value === 'delete')).toBeDefined();
			expect(operations.find((o) => o.value === 'getResults')).toBeDefined();
		});
	});

	describe('Video Clip Resource', () => {
		it('should have 6 video clip operations', () => {
			const operations = videoClipOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(6);
			expect(operations.find((o) => o.value === 'detectClips')).toBeDefined();
			expect(operations.find((o) => o.value === 'getClips')).toBeDefined();
		});
	});

	describe('Template Resource', () => {
		it('should have 4 template operations', () => {
			const operations = templateOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(4);
			expect(operations.find((o) => o.value === 'create')).toBeDefined();
			expect(operations.find((o) => o.value === 'getAll')).toBeDefined();
		});
	});

	describe('A/B Test Resource', () => {
		it('should have 5 A/B test operations', () => {
			const operations = abTestOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(5);
			expect(operations.find((o) => o.value === 'create')).toBeDefined();
			expect(operations.find((o) => o.value === 'getResults')).toBeDefined();
		});
	});

	describe('Bulk Import Resource', () => {
		it('should have 4 bulk import operations', () => {
			const operations = bulkImportOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(4);
			expect(operations.find((o) => o.value === 'validate')).toBeDefined();
			expect(operations.find((o) => o.value === 'execute')).toBeDefined();
		});
	});

	describe('Chatbot Resource', () => {
		it('should have 9 chatbot operations', () => {
			const operations = chatbotOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(9);
			expect(operations.find((o) => o.value === 'createTemplate')).toBeDefined();
			expect(operations.find((o) => o.value === 'suggestResponse')).toBeDefined();
		});
	});

	describe('Connection Resource', () => {
		it('should have 10 connection management operations', () => {
			const operations = connectionOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(10);
			expect(operations.find((o) => o.value === 'checkHealth')).toBeDefined();
			expect(operations.find((o) => o.value === 'troubleshoot')).toBeDefined();
		});
	});

	describe('Retry Resource', () => {
		it('should have 2 retry operations', () => {
			const operations = retryOperations.options as Array<{ name: string; value: string }>;
			expect(operations).toHaveLength(2);
			expect(operations.find((o) => o.value === 'retryFailed')).toBeDefined();
			expect(operations.find((o) => o.value === 'retryPost')).toBeDefined();
		});
	});

	describe('Total Operation Count', () => {
		it('should have at least 150 operations across all resources', () => {
			const allOperations = [
				mediaOperations,
				analyticsOperations,
				platformOperations,
				viralOperations,
				contentOperations,
				bulkOperations,
				webhookOperations,
				searchOperations,
				urlOperations,
				videoOperations,
				voiceoverOperations,
				socialMonitorOperations,
				videoClipOperations,
				templateOperations,
				abTestOperations,
				bulkImportOperations,
				chatbotOperations,
				connectionOperations,
				retryOperations,
			];

			const totalOperations = allOperations.reduce((sum, resource) => {
				return sum + (resource.options as Array<any>).length;
			}, 0);

			// Plus post (6), account (6), ai (15) = 27 more
			expect(totalOperations + 27).toBeGreaterThanOrEqual(150);
		});
	});
});
