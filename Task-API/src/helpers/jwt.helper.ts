import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export function generateToken({ data, expiresIn = '8h' }: { data: any; expiresIn: string }): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(data, JWT_SECRET, { expiresIn }, (e: Error | null, token: string | undefined) => {
      if (e) {
        return reject(e);
      }

      return resolve(token || '');
    });
  });
}

export function verifyToken({ token }: { token: string }) {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, JWT_SECRET, (e: Error | null, decoded: any) => {
        if (e) {
          return reject(e);
        }

        return resolve(decoded);
      });
    } catch (e) {
      return reject(e);
    }
  });
}
