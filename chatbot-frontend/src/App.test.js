import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock axios direkt ohne Import
jest.mock('axios', () => ({
  post: jest.fn().mockResolvedValue({ data: { response: 'Mocked response' } }),
}));

test('renders chatbot and clears input after send', async () => {
  render(<App />);
  expect(screen.getByText('LLM Chatbot')).toBeInTheDocument();

  const input = screen.getByPlaceholderText('Type your message...');
  const button = screen.getByText('Send');
  
  // Eingabe setzen
  fireEvent.change(input, { target: { value: 'Hallo' } });
  
  // Button klicken und auf asynchrone Auflösung warten
  fireEvent.click(button);
  await waitFor(() => expect(input.value).toBe(''));

  // Prüfe, ob das Eingabefeld leer ist
  expect(input.value).toBe('');
});