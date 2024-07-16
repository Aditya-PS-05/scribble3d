import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.PUBLIC_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('Missing SECRET_KEY environment variable');
}

export const generateToken = (userId: string): string => {
  const payload = { userId };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '15d' });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
