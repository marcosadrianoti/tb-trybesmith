const validUsername = 'Marcos Adriano';
const validPassword = 'ch4ng3m3';
const validLoginBody = { username: validUsername, password: validPassword };

const usernamelessLoginBody = { username: '', password: validPassword };
const passwordlessLoginBody = { username: validUsername, password: '' };

const userDoesNotExist = { username: 'User Not Found', password: validPassword };
const wrongPasswordBody = { username: validUsername, password: 'wrong_password' };

const hashPassword = '$2a$10$lQGsGScdxhjGRuYVJX3PX.347IWLNiSk6hOiMmjxlzLEI32lg5LMW';

const returnedUser = { 
  id: 1, 
  username: validUsername,
  password: hashPassword,
  level: 1,
  vocation: "150",
};

export default {
  usernamelessLoginBody,
  passwordlessLoginBody,
  userDoesNotExist,
  wrongPasswordBody,
  returnedUser,
  validLoginBody,
};
