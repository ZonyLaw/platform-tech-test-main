import app from './app.js';

const { BACKEND_PORT } = process.env;

// eslint-disable-next-line no-console
app.listen(BACKEND_PORT, () => {
  // console.log(`Server running on port ${BACKEND_PORT}`);
});
