import { User } from '@/types/auth';

export async function authenticate(username: string, password: string): Promise<User | null> {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}