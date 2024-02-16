import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};
