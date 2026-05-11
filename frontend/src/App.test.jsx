import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

global.fetch = jest.fn();

describe('App Frontend Tests', () => {

  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders form fields', () => {
    render(<App />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/file upload/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('shows validation errors when fields are empty', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
    expect(screen.getByText('File is required')).toBeInTheDocument();

    expect(fetch).not.toHaveBeenCalled();
  });

  test('updates text inputs correctly', () => {
    render(<App />);

    const nameInput = screen.getByLabelText(/name/i);
    const messageInput = screen.getByLabelText(/message/i);

    fireEvent.change(nameInput, {
      target: { value: 'Sunny' },
    });

    fireEvent.change(messageInput, {
      target: { value: 'Hello World' },
    });

    expect(nameInput.value).toBe('Sunny');
    expect(messageInput.value).toBe('Hello World');
  });

  test('uploads file correctly', () => {
    render(<App />);

    const fileInput = screen.getByLabelText(/file upload/i);

    const file = new File(
      ['file content'],
      'test.txt',
      { type: 'text/plain' }
    );

    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    expect(fileInput.files[0]).toBe(file);
    expect(fileInput.files[0].name).toBe('test.txt');
  });

  test('submits form successfully', async () => {

    fetch.mockResolvedValueOnce({
      json: async () => ({
        success: true,
        message: 'Form submitted successfully',
      }),
    });

    render(<App />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Sunny' },
    });

    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Testing frontend' },
    });

    const file = new File(
      ['hello'],
      'test.txt',
      { type: 'text/plain' }
    );

    fireEvent.change(screen.getByLabelText(/file upload/i), {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5003/api/submit',
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
      })
    );

    expect(await screen.findByText(/response/i))
      .toBeInTheDocument();
  });

  test('shows API error message', async () => {

    fetch.mockRejectedValueOnce(
      new Error('Network Error')
    );

    render(<App />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Sunny' },
    });

    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Testing frontend' },
    });

    const file = new File(
      ['hello'],
      'test.txt',
      { type: 'text/plain' }
    );

    fireEvent.change(screen.getByLabelText(/file upload/i), {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/network error/i))
      .toBeInTheDocument();
  });

});