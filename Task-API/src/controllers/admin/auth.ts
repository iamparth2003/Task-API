import { Request, Response } from 'express';
import { User } from '../../models/user.model';
import { hashString } from '../../helpers/utils.helper';
import { generateToken } from '../../helpers/jwt.helper';

export async function adminLogin(req: Request, res: Response) {
  try {
    const { mobileNumber, password } = req.body;

    const user = await User.findOne({ mobileNumber, role: 'ADMIN' });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const hashedPassword = hashString({ value: password, salt: user.salt });

    if (user.password !== hashedPassword) {
      return res.status(401).send({ message: 'Invalid password' });
    }
    const access_token = await generateToken({ data: { id: user.id }, expiresIn: '24h' });
    return res.status(200).send({
      message: 'User logged in successfully',
      user,
      access_token,
    });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}
