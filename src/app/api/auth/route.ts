import { NextResponse } from 'next/server';

if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.USER_USERNAME || !process.env.USER_PASSWORD) {
  throw new Error('Missing required environment variables for authentication');
}

const users = [
  {
    id: '1',
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    username: process.env.USER_USERNAME,
    password: process.env.USER_PASSWORD,
    name: 'Regular User',
    role: 'user',
  },
];

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Don't send the password back to the client
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  }

  return NextResponse.json(null);
} 