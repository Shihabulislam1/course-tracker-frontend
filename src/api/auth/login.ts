import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@/constants';
import { API_URL } from "@/constants";


export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, email, password } = req.body;

  // Validate input data
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Make a request to the external API for authentication
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    // Check if the response is not okay
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ message: errorData.message || 'Login failed.' });
    }

    const responseData = await response.json();
    const userKey = responseData.key; // Extract the key from the response

    // Create a JWT token after successful authentication
    const token = jwt.sign({ key: userKey }, SECRET_KEY, { expiresIn: '1h' });

    // Send the token back to the client
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}
