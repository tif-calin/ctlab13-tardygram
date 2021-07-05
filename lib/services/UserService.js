import bcrypt from 'bcrypt';
import User from '../models/User.js';

export default class UserService {
  static async create({ password, username, profilePhotoUrl }) {
    return User.create({
      username,
      profilePhotoUrl,
      passwordHash: await bcrypt.hash(password, process.env.SALT_ROUNDS)
    });
  }

  static async authorize({ username, password }) {
    const user = await User.findBy(username);

    if (!user) throw new Error('invalid username');

    if (await bcrypt.compare(password, user.passwordHash)) return user;
    else throw new Error('invalid password');
  }
}
