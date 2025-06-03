import type { NextApiRequest, NextApiResponse } from 'next';
import { signUpUser } from '@/lib/firebase/service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await signUpUser(
      req.body,
      (result: { status: boolean; message?: string }) => {
        if (result.status) {
          res.status(200).json({
            status: true,
            message: result.message || 'User registered successfully',
          });
        } else {
          res.status(400).json({
            status: false,
            message: result.message || 'User registration failed',
          });
        }
      }
    );
  } else {
    res.status(405).json({
      status: false,
      statusCode: 405,
      message: 'Method not allowed',
    });
  }
}
