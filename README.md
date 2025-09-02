# Back Form API

A TypeScript-based REST API built with Fastify that handles form submissions and integrates with Google Sheets for data storage.

## Features

- **Form Submission Endpoint**: Validates and processes form data with comprehensive field validation
- **Google Sheets Integration**: Automatically saves form submissions to a Google Spreadsheet
- **Type Safety**: Full TypeScript support with Zod schema validation
- **CORS Support**: Cross-origin resource sharing enabled for web applications
- **Request Validation**: Schema-based validation for all incoming requests
- **Logging**: Pretty-printed logs for development
- **Testing**: Unit tests with Vitest and coverage reporting

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Fastify
- **Language**: TypeScript
- **Validation**: Zod
- **Testing**: Vitest
- **External APIs**: Google Sheets API (googleapis)

## Project Structure

```
back-form/
├── src/
│   ├── http/
│   │   ├── controllers/
│   │   │   ├── formSubmit.ts      # Form submission controller
│   │   │   └── formSubmit.spec.ts # Controller tests
│   │   ├── routes/
│   │   │   └── form-submit.ts     # Form submission routes
│   │   └── server.ts              # HTTP server setup
│   ├── app.ts                     # Main application setup
│   └── credentials.json           # Google API credentials (not in git)
├── coverage/                      # Test coverage reports
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── .env.example                   # Environment variables example
```

## API Endpoints

### POST /form-submit

Submits a form with user information.

**Request Body:**
```json
{
  "name": "string (min 5 characters)",
  "email": "valid email address",
  "phone": "string (min 10 characters)", 
  "church": "string (min 5 characters)",
  "function": "string (min 5 characters)"
}
```

**Response:**
```json
{
  "message": "Form submit created successfully!"
}
```

### GET /ping

Health check endpoint.

**Response:**
```json
{
  "message": "pong"
}
```

## Getting Started

### Prerequisites

- Node.js (v22 or later)
- pnpm package manager
- Google Cloud Platform account with Sheets API enabled

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd back-form
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Set up Google Sheets API:
   - Create a Google Cloud Platform project
   - Enable the Google Sheets API
   - Create a service account and download the credentials JSON
   - Save the credentials as `src/credentials.json`
   - Update the `spreadsheetId` in `src/http/controllers/formSubmit.ts` with your Google Sheet ID

### Development

Start the development server with hot reload:
```bash
pnpm dev
```

The server will start on the default port with file watching enabled.

### Testing

Run the test suite:
```bash
pnpm test
```

This will run all tests and generate a coverage report in the `coverage/` directory.

## Configuration

### Environment Variables

- `NODE_ENV`: Application environment (development/production)

### Google Sheets Setup

1. Create a new Google Spreadsheet
2. Note the spreadsheet ID from the URL
3. Update the `spreadsheetId` variable in the form submission controller
4. Ensure your service account has access to the spreadsheet

## Validation Rules

The form submission endpoint validates the following:

- **Name**: Minimum 5 characters
- **Email**: Valid email format
- **Phone**: Minimum 10 characters
- **Church**: Minimum 5 characters
- **Function**: Minimum 5 characters

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is private. All rights reserved.
