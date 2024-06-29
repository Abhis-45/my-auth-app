import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'aghvb3ytmjj#&gh*nb';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  // Here, you should check the username and password from your database
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ token, user: { username } });
  }

  res.status(401).json({ message: 'Invalid credentials' });
}
