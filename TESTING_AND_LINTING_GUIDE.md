# Testing and Linting Guide for n8n-nodes-mastablasta

This guide provides step-by-step instructions for testing and linting this n8n community node package to ensure it meets all requirements for submission to the n8n community repository.

Based on the official [n8n community node documentation](https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/) and [verification guidelines](https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/).

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Building the Node](#building-the-node)
- [Linting](#linting)
- [Testing](#testing)
- [Local Development and Testing](#local-development-and-testing)
- [Pre-Submission Checklist](#pre-submission-checklist)
- [Community Node Submission Process](#community-node-submission-process)

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 18.17.0 or higher
- **npm**: Comes with Node.js
- **n8n** (optional for local testing): Can be installed globally or run via npx

```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ewentling/mb-module.git
cd mb-module
```

2. Install dependencies:
```bash
npm install
```

This will install all required development dependencies including:
- `@n8n/node-cli` - Official n8n node development CLI
- TypeScript and type definitions
- ESLint for linting
- Jest for testing
- Prettier for code formatting

## Building the Node

The build process compiles TypeScript files and prepares the node for distribution.

### Build Commands

```bash
# Standard build
npm run build

# Build with watch mode (auto-rebuilds on file changes)
npm run build:watch
```

### What the Build Does
- Compiles TypeScript files from `nodes/` and `credentials/` to JavaScript
- Generates type declaration files (`.d.ts`)
- Copies static assets (like `.svg` icon files)
- Outputs everything to the `dist/` directory

### Expected Output
```
┌   n8n-node build  v0.17.0
│
◒  Building TypeScript files...
◇  TypeScript build successful
│
◇  Copied static files
│
└  ✓ Build successful
```

### Troubleshooting Build Issues
- **TypeScript errors**: Check your `.ts` files for type errors
- **Missing files**: Ensure all imports are correct and files exist
- **Configuration issues**: Verify `tsconfig.json` is correct

## Linting

Linting ensures code quality and adherence to n8n's coding standards.

### Lint Commands

```bash
# Check for linting issues
npm run lint

# Automatically fix linting issues where possible
npm run lint:fix
```

### What the Linter Checks
- TypeScript type safety
- Code style consistency
- Import restrictions (no unauthorized external dependencies)
- Unused variables and imports
- Proper use of n8n workflow types

### Expected Output (Success)
```
┌   n8n-node lint  v0.17.0
```

### Common Linting Issues and Fixes

1. **Unexpected `any` type**
   - ❌ `const data: any = ...`
   - ✅ `const data: IDataObject = ...`
   - Use proper types from `n8n-workflow`

2. **Unused variables**
   - ❌ `const unusedVar = 'test'`
   - ✅ Remove unused variables or prefix with `_` if needed: `const _unusedVar = 'test'`

3. **External dependencies**
   - ❌ Community nodes cannot use runtime dependencies
   - ✅ Only use n8n-workflow and Node.js built-ins

4. **Import issues**
   - Ensure all imports use proper paths
   - Remove unused imports

## Testing

This project includes comprehensive tests for all functionality.

### Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

```
__tests__/
├── integration.test.ts          # Integration tests for the node
├── nodes/                       # Node-specific tests
├── credentials/                 # Credential tests
├── resources/                   # Resource-specific tests
│   ├── post.test.ts
│   ├── account.test.ts
│   └── allResources.test.ts
└── utils/
    └── testHelpers.ts          # Test utilities and mocks
```

### What Tests Cover
- ✅ Node type description and structure
- ✅ All resources are properly defined
- ✅ All operations are properly configured
- ✅ Resource and operation field definitions
- ✅ Credential validation
- ✅ API endpoint coverage (150+ operations)
- ✅ Input/output data handling

### Expected Test Output
```
PASS __tests__/integration.test.ts
PASS __tests__/resources/post.test.ts
PASS __tests__/resources/allResources.test.ts

Test Suites: X passed, X total
Tests:       X passed, X total
Snapshots:   0 total
Time:        Xs
```

### Writing New Tests

When adding new functionality, follow these patterns:

```typescript
import { mockExecuteFunctions, mockCredentials } from '../utils/testHelpers';

describe('MyNewFeature', () => {
  it('should do something', async () => {
    const executeFunctions = mockExecuteFunctions(
      [],
      { resource: 'post', operation: 'create' },
      mockCredentials()
    );
    
    // Your test logic here
    expect(result).toBeDefined();
  });
});
```

## Local Development and Testing

To test your node in a real n8n environment:

### Option 1: Using n8n-node CLI (Recommended)

```bash
# Start development mode with hot-reload
npm run dev
```

This will:
- Start a local n8n instance
- Link your node automatically
- Watch for changes and reload

### Option 2: Manual Installation in n8n

1. Build the node:
```bash
npm run build
```

2. Link the package locally:
```bash
npm link
```

3. In your n8n installation directory:
```bash
npm link n8n-nodes-mastablasta
```

4. Restart n8n:
```bash
n8n start
```

### Option 3: Testing with Docker

```bash
# Build the node
npm run build

# Create a volume mount for n8n
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -v $(pwd):/data/node_modules/n8n-nodes-mastablasta \
  n8nio/n8n
```

### Verifying Node Installation

1. Open n8n in your browser (http://localhost:5678)
2. Create a new workflow
3. Search for "MastaBlasta" in the node panel
4. The node should appear with the icon and description
5. Add the node and verify all resources and operations are available

## Pre-Submission Checklist

Before submitting to the n8n community repository, verify all items from the [official standards](https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/#standards) and [verification guidelines](https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/):

### 1. Package Structure ✅
- [x] Package name follows convention: `n8n-nodes-mastablasta`
- [x] Contains required keyword: `n8n-community-node-package`
- [x] `package.json` has proper `n8n` section
- [x] **No runtime dependencies** (only `devDependencies` and `peerDependencies`) - [Critical requirement](https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/#no-external-dependencies)

### 2. Code Quality ✅
- [x] All linting passes: `npm run lint`
- [x] Build succeeds: `npm run build`
- [x] All tests pass: `npm test`
- [x] TypeScript types are properly defined
- [x] No use of `any` type
- [x] No unused variables or imports
- [x] No access to environment variables or file system

### 3. Documentation ✅
- [x] README.md with clear usage instructions
- [x] Comprehensive operation documentation
- [x] Credential setup instructions
- [x] Example workflows
- [x] All content in English only

### 4. Node Implementation ✅
- [x] Icon file present (`mastablasta.svg`)
- [x] Credentials properly configured (API keys as password fields)
- [x] All resources implement required operations
- [x] Error handling implemented
- [x] Proper use of n8n workflow types
- [x] Follows [UX guidelines](https://docs.n8n.io/integrations/creating-nodes/build/reference/ux-guidelines/)

### 5. Testing ✅
- [x] Integration tests pass
- [x] Resource tests pass
- [x] Test coverage is adequate
- [x] Manual testing completed

### Run All Checks

```bash
# Run complete verification
npm run lint && npm run build && npm test
```

Expected output:
```
✓ Linting passed
✓ Build successful  
✓ All tests passed
```

## Community Node Submission Process

Follow the [official submission process](https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/) to get your node verified by n8n.

### 1. Prepare for Publication

```bash
# Ensure everything is committed
git status

# Run pre-publish checks
npm run prepublishOnly
```

### 2. Publish to npm

```bash
# Login to npm (if not already logged in)
npm login

# Publish the package
npm publish
```

### 3. Submit for Verification

1. Go to [n8n Creator Portal](https://creators.n8n.io/nodes)
2. Sign in with your GitHub account
3. Click "Submit a node"
4. Enter your npm package name: `n8n-nodes-mastablasta`
5. Provide additional information:
   - Description
   - Link to MastaBlasta API documentation
   - Screenshots/examples (optional but recommended)

**Note**: Per the [submission guidelines](https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/#submit-your-node-for-verification-by-n8n), n8n reserves the right to reject nodes that compete with paid or enterprise features.

### 4. Wait for Review

The n8n team will review your submission and check:
- Code quality and security
- Adherence to guidelines
- Proper functionality
- Documentation quality

### 5. Address Feedback

If the review team provides feedback:
1. Make the requested changes
2. Run all checks again
3. Publish a new version to npm
4. The team will automatically be notified

### 6. Verification Complete

Once approved, your node will:
- Be marked as "verified" in the n8n community nodes registry
- Appear in n8n Cloud node library
- Be discoverable in the n8n editor

## Additional Resources

- [n8n Creating Nodes Overview](https://docs.n8n.io/integrations/creating-nodes/overview/)
- [Building Community Nodes](https://docs.n8n.io/integrations/creating-nodes/build/)
- [Community Node Submission Process](https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/)
- [Verification Guidelines](https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/)
- [UX Guidelines](https://docs.n8n.io/integrations/creating-nodes/build/reference/ux-guidelines/)
- [n8n-node CLI Tool](https://docs.n8n.io/integrations/creating-nodes/build/n8n-node/)
- [n8n Community Forum](https://community.n8n.io/)
- [n8n GitHub Repository](https://github.com/n8n-io/n8n)
- [MastaBlasta API Documentation](https://github.com/ewentling/MastaBlasta)

## Troubleshooting

### Issue: Tests fail with import errors
**Solution**: Make sure all TypeScript files are properly configured in `tsconfig.json` and imports don't include `.ts` extensions in the actual code (only in test files where configured).

### Issue: Linting fails on test files
**Solution**: Test files may have different rules. Check `jest.config.js` for TypeScript configuration that allows certain patterns in tests.

### Issue: Build fails with type errors
**Solution**: Ensure all n8n-workflow types are properly imported and used. Check for missing type definitions.

### Issue: Node doesn't appear in n8n
**Solution**: 
- Verify the build output in `dist/` directory
- Check that `package.json` points to correct paths in the `n8n` section
- Restart n8n completely

### Issue: Cannot publish to npm
**Solution**:
- Ensure you're logged in: `npm whoami`
- Check package name isn't already taken: `npm search n8n-nodes-mastablasta`
- Verify version number is incremented

## Support

For issues or questions:
- [Open an issue on GitHub](https://github.com/ewentling/mb-module/issues)
- [Join n8n Community Forum](https://community.n8n.io/)
- [MastaBlasta Documentation](https://github.com/ewentling/MastaBlasta)

---

**Last Updated**: 2026-01-17
**Node Version**: 1.0.0
**n8n API Version**: 1
