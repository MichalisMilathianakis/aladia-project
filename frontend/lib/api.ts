export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.message || 'Something went wrong',
      };
    }

    return { success: true, data };
  } catch (err) {
    console.error(err);
    return { success: false, error: 'Network error' };
  }
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export async function fetchUsers() {
  return apiFetch<User[]>('/auth/users');
}