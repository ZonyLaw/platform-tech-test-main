# Development Notes

## ESLint Setup

Install ESLint with Airbnb rules:

```bash
npm install --save-dev eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

Create ESLint configuration:

```txt
.eslintrc.json
```

Add Jest support for linting test files:

```bash
npm install --save-dev eslint-plugin-jest
```

---

# Backend Testing

Install Jest and SuperTest:

```bash
npm install --save-dev jest supertest
```

Run backend tests:

```bash
npm run test:backend
```

---

# Frontend Testing

Install frontend testing libraries:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

Install Babel support for JSX testing:

```bash
npm install --save-dev babel-jest @babel/preset-env @babel/preset-react
```

Run frontend tests:


```bash
npm test -- --selectProjects frontend
```


# CSS Support in Jest

Install CSS mocking support for Jest:

```bash
npm install --save-dev identity-obj-proxy
```