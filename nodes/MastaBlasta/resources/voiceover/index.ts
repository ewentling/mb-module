import type { INodeProperties } from 'n8n-workflow';

export const voiceoverOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['voiceover'],
			},
		},
		options: [
			{
				name: 'Get Supported Languages',
				value: 'getSupportedLanguages',
				description: 'Get list of supported languages',
				action: 'Get supported languages',
			},
			{
				name: 'Generate Pronunciation Guide',
				value: 'generatePronunciationGuide',
				description: 'Generate pronunciation guide',
				action: 'Generate pronunciation guide',
			},
			{
				name: 'Add Emotion Markers',
				value: 'addEmotionMarkers',
				description: 'Add emotion markers to script',
				action: 'Add emotion markers',
			},
			{
				name: 'Generate Multi-Voice Script',
				value: 'generateMultiVoiceScript',
				description: 'Generate multi-voice script',
				action: 'Generate multi-voice script',
			},
			{
				name: 'Add Breath Marks',
				value: 'addBreathMarks',
				description: 'Add breath marks to script',
				action: 'Add breath marks',
			},
			{
				name: 'Estimate Duration',
				value: 'estimateDuration',
				description: 'Estimate voiceover duration',
				action: 'Estimate duration',
			},
			{
				name: 'Add Accent Guidance',
				value: 'addAccentGuidance',
				description: 'Add accent guidance',
				action: 'Add accent guidance',
			},
			{
				name: 'Configure TTS',
				value: 'configureTTS',
				description: 'Configure text-to-speech',
				action: 'Configure TTS',
			},
			{
				name: 'Sync Music',
				value: 'syncMusic',
				description: 'Sync background music',
				action: 'Sync music',
			},
			{
				name: 'Quality Check',
				value: 'qualityCheck',
				description: 'Check script quality',
				action: 'Quality check',
			},
		],
		default: 'getSupportedLanguages',
	},
];

export const voiceoverFields: INodeProperties[] = [
	{
		displayName: 'Script',
		name: 'script',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['voiceover'],
				operation: ['generatePronunciationGuide', 'addEmotionMarkers', 'generateMultiVoiceScript', 'addBreathMarks', 'estimateDuration', 'addAccentGuidance', 'qualityCheck'],
			},
		},
		default: '',
		description: 'Voiceover script text',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['voiceover'],
				operation: ['generatePronunciationGuide', 'estimateDuration'],
			},
		},
		default: 'en',
		description: 'Language code (e.g., en, es, fr)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['voiceover'],
			},
		},
		options: [
			{
				displayName: 'Emotion',
				name: 'emotion',
				type: 'options',
				options: [
					{ name: 'Excited', value: 'excited' },
					{ name: 'Calm', value: 'calm' },
					{ name: 'Serious', value: 'serious' },
					{ name: 'Friendly', value: 'friendly' },
				],
				default: 'friendly',
				description: 'Emotion type',
			},
			{
				displayName: 'Voice Count',
				name: 'voiceCount',
				type: 'number',
				default: 2,
				description: 'Number of voices',
			},
			{
				displayName: 'Accent',
				name: 'accent',
				type: 'string',
				default: 'neutral',
				description: 'Accent type',
			},
		],
	},
];
