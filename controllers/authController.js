const jwt = require('jsonwebtoken');
const models = require('../models');
const auth = require('../utils/authentication');

const sign_token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const create_send_token = (user, status_code, res, req) => {
  // Sign the token with user ID
  const token = sign_token(user.id);
  res.status(status_code).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.userLogin = async (req, res) => {
  const user = await auth.login(
    models.Professor,
    models.Student,
    req,
    res
  );
  if (user) create_send_token(user, 200, res, req);
};

exports.isLoggedIn = async (req, res, next) => {
  await auth.protect(models.Professor, models.Student, req, res, next);
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json('You do not have permission to access this route!');
    }
    next();
  };
};
