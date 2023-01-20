const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const jwt_decode = require('jwt-decode')
const models = require('../models');

const sign_token = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const create_send_token = (user, status_code, res) => {
	// Sign the token with user ID
	const token = sign_token(user.id);
	// Set cookie options
	const cookie_options = {
		expires: new Date(
			Date.now() +
				process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};
	// Set cookie
	res.cookie('jwt', token, cookie_options);

	res.status(200).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

exports.signup = async (req, res, next) => {
	try {
		const new_user = await models.Professor.create(req.body);
		create_send_token(new_user, 201, res);
	} catch (err) {
		res.status(400).json({
			stats: 'fail',
			msg: err.message,
		});
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		// If no email or password throw an error
		if (!email || !password) {
			throw new Error('Enter your email or password');
		}
		const user = await models.Professor.findOne({
			where: { email: email },
		});

		// If no user or the password is incorrect throw error
		if (!user || user.password !== password) {
			throw new Error('Incorrect email or password!');
		}
		create_send_token(user, 200, res);
	} catch (err) {
		res.status(400).json({
			stats: 'fail',
			msg: err.message,
		});
	}
};

exports.protect = async (req, res, next) => {
	try {
		// 1) Getting the token and check if there is a Bearer or Cookie
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		} else if (req.cookies.jwt) {
			token = req.cookies.jwt;
			console.log(`${token} Cookies`);
		}
		if (!token)
			throw new Error('You are not logged in. Please log in!');

		// 2) Verification of the token 
		const decoded = await jwt.verify(token, process.env.JWT_SECRET);

		// 3) Check if the user still exists
		const current_user = await models.Professor.findByPk(decoded.id);
		if (!current_user) throw new Error('The user no longer exists!');

		// 4) Set local storage and req.user to current_user
		req.user = current_user;
		res.locals.user = current_user;
		next();
	} catch (err) {
		res.status(401).json({
			stats: 'fail',
			msg: err.message,
		});
	}
};
