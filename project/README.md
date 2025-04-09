# GITAM Hub

A platform for GITAM students to connect, share, and collaborate.

## Features

- User Authentication
- Domain-specific feeds
- Discussion forums
- Challenge registration
- Admin dashboard

## Deployment Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- Vercel account

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd gitam-hub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Deployment to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy the application:
```bash
vercel
```

4. Follow the prompts to complete the deployment.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url
```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── store/         # State management
  ├── services/      # API services
  ├── types/         # TypeScript types
  └── App.tsx        # Main application component
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 