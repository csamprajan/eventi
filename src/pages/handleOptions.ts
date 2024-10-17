import { NextApiRequest, NextApiResponse } from 'next';

export default function handleOptions(req: NextApiRequest, res: NextApiResponse) {
  const allowedOrigins = ['https://your-allowed-origin.com', 'https://another-allowed-origin.com']; // Replace with your allowed origins

  // if (allowedOrigins.includes(req.headers.origin)) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin??'*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', 86400); // 24 hours
    res.status(200).send('OK');
  // } else {
  //   res.status(403).send('Forbidden');
  // }
}