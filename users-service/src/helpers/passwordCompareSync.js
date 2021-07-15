import bcrypt from 'bcryptjs';

const passwordCompareSync = (paswordToTest, passwordHash) =>
  bcrypt.compareSync(paswordToTest, passwordHash);

export default passwordCompareSync;
