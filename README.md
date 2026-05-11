# TalentDesk Platform Tech Test

## Setup

```
cp .env.example .env
npm i
npm run start-backend
npm run start-frontend
```

## Assignment

We have provided a basic application, where a form submits and the back-end returns what has been submitted.

Make the following changes:

1. Add styling to the form

    added style/style.css file

2. Add selecting a file to the form, this should be stored in a directory in the back-end and the path to the file returned to the front-end on submission. Selecting the file should support drag and drop

    Installed:

    cors — handles Cross-Origin Resource Sharing (CORS), allowing the frontend to communicate with the backend across different URLs/domains.
    multer — handles file uploads and saving files on the server.

3. Add validation to the form

    added validation.js in backend and validation funtion in app.jsx in frontend

4. Add linting to the application, following AirBnb's linting rules

    npm run lint
    npm run lint -- --fix

5. Add front-end and back-end tests to the application
   
    npm test -- --selectProjects frontend
    npm test -- --selectProjects backend

You may add any relevant 3rd party libraries. Please explain why you have chosen them.

## Third-Party Libraries

These are the key and standard libraries used:

- Express — backend API framework.
- Multer — file upload handling and storage.
- Cors — enables communication between frontend and backend.
- Jest — frontend and backend testing framework.
- SuperTest — API endpoint testing.
- React Testing Library — React component testing.
- ESLint + Airbnb config — linting and code consistency.
- Vite — frontend tooling and development server.

## Bonus

Add an AI agent method (e.g. a Claude Code skill) to run linting and automatically fix any issues found
