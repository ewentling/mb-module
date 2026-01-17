# MastaBlasta n8n Node - Test Suite

## Overview

Comprehensive test suite for the MastaBlasta n8n community node with 100% API coverage.

## Test Structure

```
__tests__/
├── credentials/           # Credential configuration tests
│   └── MastaBlasta.credentials.test.ts
├── nodes/                 # Main node tests
│   └── MastaBlasta.node.test.ts
├── resources/             # Resource-specific tests
│   ├── post.test.ts
│   ├── ai.test.ts
│   ├── account.test.ts
│   └── allResources.test.ts
├── utils/                 # Test utilities
│   └── testHelpers.ts
└── integration.test.ts    # Integration tests
```

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

## Test Coverage

### Unit Tests
- ✅ Credential configuration and authentication
- ✅ Node structure and properties
- ✅ All 21 resources with operations
- ✅ Field definitions and validations
- ✅ Platform support (9 platforms)
- ✅ Operation coverage (150+ operations)

### Integration Tests
- ✅ Node instantiation and execution
- ✅ Resource-operation mapping
- ✅ API prefix selection (dev/prod)
- ✅ Complete workflow validation

### Resource Coverage
1. **Post** (6 ops) - Create, get, list, update, delete, publish
2. **Account** (6 ops) - Full CRUD + credential testing
3. **Media** (4 ops) - Upload and management
4. **AI** (15 ops) - Caption, hashtags, translation, image generation, etc.
5. **Analytics** (3 ops) - Post analytics, overview, compare
6. **Platform** (3 ops) - Platform info and capabilities
7. **Viral** (3 ops) - Hooks library, virality scoring
8. **Content** (5 ops) - Multiplier, variations, optimize
9. **Bulk** (3 ops) - Bulk create/update/delete
10. **Webhook** (3 ops) - Event notifications
11. **Search** (1 op) - Full-text search
12. **URL** (4 ops) - URL shortening and analytics
13. **Video** (23 ops) - Generation, editing, export
14. **Voiceover** (10 ops) - TTS and voice customization
15. **Social Monitor** (6 ops) - Keyword tracking
16. **Video Clip** (6 ops) - AI clip detection
17. **Template** (4 ops) - Content templates
18. **A/B Test** (5 ops) - Variation testing
19. **Bulk Import** (4 ops) - CSV imports
20. **Chatbot** (9 ops) - Auto-responses
21. **Connection** (10 ops) - Health checks
22. **Retry** (2 ops) - Failed post retry

## Test Utilities

### Mock Functions
- `mockExecuteFunctions()` - Mock n8n execution context
- `mockCredentials()` - Mock authentication credentials
- `mockHttpResponse()` - Mock HTTP responses
- `createSamplePost()` - Generate test post data
- `createSampleAccount()` - Generate test account data
- `createSampleMedia()` - Generate test media data
- `createErrorResponse()` - Generate error responses

## Coverage Goals

- **Line Coverage**: >80%
- **Branch Coverage**: >75%
- **Function Coverage**: >80%
- **Statement Coverage**: >80%

## Writing New Tests

### Adding Resource Tests

```typescript
import { myResourceOperations, myResourceFields } from '../../../nodes/MastaBlasta/resources/myResource';

describe('My Resource', () => {
  it('should have expected operations', () => {
    const operations = myResourceOperations.options;
    expect(operations).toHaveLength(expectedCount);
  });
});
```

### Adding Integration Tests

```typescript
import { MastaBlasta } from '../../nodes/MastaBlasta/MastaBlasta.node';

describe('My Integration Test', () => {
  let node: MastaBlasta;
  
  beforeEach(() => {
    node = new MastaBlasta();
  });
  
  it('should validate node behavior', () => {
    // Test implementation
  });
});
```

## CI/CD Integration

Tests run automatically on:
- Every pull request
- Every push to main branch
- Before npm package release

## Test Configuration

See `jest.config.js` for Jest configuration:
- TypeScript support via ts-jest
- Coverage thresholds
- Test timeout: 30 seconds
- Test environment: node

## Troubleshooting

### Tests Failing

1. Ensure dependencies are installed: `npm install`
2. Clear Jest cache: `npx jest --clearCache`
3. Check Node.js version (requires 18+)
4. Verify TypeScript compilation: `npm run build`

### Coverage Issues

1. Run coverage report: `npm run test:coverage`
2. View HTML report: `open coverage/index.html`
3. Check uncovered lines in report

## Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Ensure tests pass: `npm test`
3. Verify coverage: `npm run test:coverage`
4. Update this README if needed
