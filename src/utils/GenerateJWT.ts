import jwt from 'jsonwebtoken';

export const generateJWT = async (userId: any): Promise<any> => {
  // Promise
  return new Promise<any>((resolve, reject) => {
    // Received user id as payload
    const payload = { userId };
    // Sign JWT
    jwt.sign(
      payload,
      process.env['JWT_SECRET_KEY'] ?? '',
      { expiresIn: process.env['JWT_TIME_EXPIRE'] ?? '4h' },
      (err, token) => {
        if (err) {
          reject('Error while generating token');
        }
        resolve(token);
      },
    );
  });
};
