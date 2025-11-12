import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import UsersPage from '../page';
import * as api from '@/lib/api';
import { vi } from 'vitest';

vi.mock('@/lib/api', async () => {
  const actual = await import('@/lib/api');
  return {
    ...actual,
    fetchUsers: vi.fn(),
  };
});

describe('UsersPage', () => {
  const mockFetchUsers = api.fetchUsers as unknown as vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    mockFetchUsers.mockImplementationOnce(
        () => new Promise((resolve) => setTimeout(() => resolve({ success: true, data: [] }), 50))
    );

    render(<UsersPage />);

    expect(await screen.findByText(/loading users/i)).toBeInTheDocument();

    await waitFor(() => expect(mockFetchUsers).toHaveBeenCalled());
    });


  it('renders list of users when API returns data', async () => {
    mockFetchUsers.mockResolvedValueOnce({
      success: true,
      data: [
        { id: '1', name: 'Alice', email: 'alice@example.com', createdAt: '2025-11-11T00:00:00Z' },
        { id: '2', name: 'Bob', email: 'bob@example.com', createdAt: '2025-11-11T00:00:00Z' },
      ],
    });

    render(<UsersPage />);

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    expect(screen.getByText(/alice@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/bob@example.com/i)).toBeInTheDocument();
  });

  it('shows an error when API fails', async () => {
    mockFetchUsers.mockResolvedValueOnce({
      success: false,
      error: 'Failed to fetch users',
    });

    render(<UsersPage />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
    });
  });

  it('refreshes users when clicking Refresh button', async () => {
    mockFetchUsers
      .mockResolvedValueOnce({ success: true, data: [] }) // initial load
      .mockResolvedValueOnce({
        success: true,
        data: [{ id: '1', name: 'Eve', email: 'eve@example.com', createdAt: '2025-11-11T00:00:00Z' }],
      }); 

    render(<UsersPage />);

    await waitFor(() => expect(mockFetchUsers).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole('button', { name: /refresh/i }));

    await waitFor(() => {
      expect(screen.getByText('Eve')).toBeInTheDocument();
    });

    expect(mockFetchUsers).toHaveBeenCalledTimes(2);
  });
});
