# Contributing to n8n-nodes-mastablasta

Thank you for your interest in contributing to n8n-nodes-mastablasta!

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ewentling/mb-module.git
   cd mb-module
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the node**
   ```bash
   npm run build
   ```

4. **Watch for changes (development)**
   ```bash
   npm run build:watch
   ```

## Project Structure

```
mb-module/
├── credentials/           # Credential definitions
│   └── MastaBlasta.credentials.ts
├── nodes/
│   └── MastaBlasta/      # Main node
│       ├── MastaBlasta.node.ts
│       ├── MastaBlasta.node.json
│       ├── mastablasta.svg
│       └── resources/    # Resource operations
│           ├── post/
│           ├── account/
│           ├── media/
│           ├── ai/
│           └── analytics/
├── package.json
└── tsconfig.json
```

## Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Keep changes focused and minimal
   - Add TypeScript types for all new code

3. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

4. **Fix linting issues**
   ```bash
   npm run lint:fix
   ```

## Code Style

- Use TypeScript for all new code
- Follow the existing code patterns
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Format code with Prettier (configured in `.prettierrc.js`)
- Lint with ESLint (configured in `eslint.config.mjs`)

## Adding New Operations

1. Add the operation to the appropriate resource file in `nodes/MastaBlasta/resources/`
2. Add the operation description to the operations array
3. Add the operation fields to the fields array
4. Implement the operation logic in `MastaBlasta.node.ts`
5. Build and test

## Testing with n8n

To test your changes with n8n:

1. Build the node: `npm run build`
2. Link the package: `npm link`
3. In your n8n installation directory: `npm link n8n-nodes-mastablasta`
4. Restart n8n

## Submitting Changes

1. Ensure your code builds without errors
2. Ensure linting passes
3. Commit your changes with a clear message
4. Push to your fork
5. Create a Pull Request

## Resources

- [n8n documentation](https://docs.n8n.io/)
- [n8n node development guide](https://docs.n8n.io/integrations/creating-nodes/)
- [MastaBlasta repository](https://github.com/ewentling/MastaBlasta)

## Questions?

Feel free to open an issue for any questions or concerns.
