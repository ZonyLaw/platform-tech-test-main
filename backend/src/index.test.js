import request from 'supertest';
import app from './index';

describe('POST /api/submit', () => {
  it('returns 400 when fields are missing', async () => {
    const res = await request(app)
      .post('/api/submit');

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain('Name is required');
    expect(res.body.errors).toContain('Message is required');
    expect(res.body.errors).toContain('File is required');
  });

  it('submits form data with a file', async () => {
    const res = await request(app)
      .post('/api/submit')
      .field('name', 'Sunny')
      .field('message', 'Hello')
      .attach('file', Buffer.from('test file content'), 'test.txt');

    expect(res.status).toBe(200);
    expect(res.body.body.name).toBe('Sunny');
    expect(res.body.body.message).toBe('Hello');
    expect(res.body.file.originalname).toBe('test.txt');
  });
});