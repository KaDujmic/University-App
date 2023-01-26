const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ValidationError } = require('sequelize');
const { AuthorizationError } = require('./errorHandler');

const correct_password = async function (
  candidate_password,
  user_password
) {
  return await bcrypt.compare(candidate_password, user_password);
};

exports.login = async (Professor, Student, req, res) => {
  const { email, password } = req.body;
  // If no email or password throw an error
  if (!email || !password) {
    throw new ValidationError('Enter your email or password');
  }
  // Use findAll to skip afterFind Hook
  const user =
			(await Professor.findOne({
			  where: { email },
			  hooks: false
			})) ||
			(await Student.findOne({
			  where: { email },
			  hooks: false
			}));
  // If no user or the password is incorrect throw error
  if (!user || !correct_password(user.password, password)) {
    throw new ValidationError('Incorrect email or password!');
  }
  return user.dataValues;
};

exports.protect = async (Professor, Student, req, res, next) => {
  // 1) Getting the token and check if there is a Bearer or Cookie
  let token;
  if (
    req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // else if (req.cookies.jwt) {
  // 	token = req.cookies.jwt;
  // 	console.log(`${token} Cookies`);
  // }
  if (!token) { throw new AuthorizationError('You are not logged in. Please log in!'); }

  // 2) Verification of the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if the user still exists
  const current_user =
		(await Professor.findOne({
		  where: { id: decoded.id },
		  hooks: false
		})) ||
		(await Student.findOne({
		  where: { id: decoded.id },
		  hooks: false
		}));
  if (!current_user) { throw new ValidationError('The user no longer exists!'); }

  // 4) Set local storage and req.user to current_user
  req.user = current_user.dataValues;
  res.locals.user = current_user.dataValues;
  next();
};
