import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Send registration data to ChristChant API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const apiResponse = await fetch(`${apiUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        role: 'user', // Default role for new registrations
        status: 'active'
      }),
    });

    if (!apiResponse.ok) {
      const error = await apiResponse.json();
      throw new Error(error.message || 'Registration failed');
    }

    const userData = await apiResponse.json();
    
    // Return success response
    return res.status(201).json({
      message: 'Registration successful',
      user: {
        id: userData.id,
        username: userData.username,
        email: userData.email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}
