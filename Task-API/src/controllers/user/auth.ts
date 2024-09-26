import { generateToken } from '../../helpers/jwt.helper';
import { generateSalt, hashString } from '../../helpers/utils.helper';
import { User } from '../../models/user.model';
import { Request, Response } from 'express';
export async function UserLogin(req: Request, res: Response) {
  try {
    const { mobileNumber, password } = req.body;

    const user = await User.findOne({ mobileNumber, role: 'USER' });

    if (!user) {
      const salt = generateSalt();
      const user = await User.create({
        mobileNumber,
        role: 'USER',
        password: hashString({ value: password, salt }),
        salt,
      });
      const access_token = await generateToken({ data: { id: user.id }, expiresIn: '24h' });
      return res.status(200).send({
        message: 'User logged in successfully',
        user,
        access_token,
      });
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
