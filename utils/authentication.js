const jwt = require('jsonwebtoken')

exports.login = async (Professor, Student, req, res) => {
	try {
		const { email, password } = req.body;
		// If no email or password throw an error
		if (!email || !password) {
			throw new Error('Enter your email or password');
		}
		const user =
			(await Professor.findOne({
				where: { email: email },
			})) || (await Student.findOne({ where: { email: email } }));

		// If no user or the password is incorrect throw error
		if (!user || user.password !== password) {
			throw new Error('Incorrect email or password!');
		}
		return user.dataValues;
	} catch (err) {
		res.status(400).json({
			stats: 'fail',
			msg: err.message,
		});
	}
};

exports.protect = async (Professor, Student, req, res) => {
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
	const current_user =
		(await Professor.findByPk(decoded.id)) ||
		(await Student.findByPk(decoded.id));
	if (!current_user) throw new Error('The user no longer exists!');

	// 4) Set local storage and req.user to current_user
	req.user = current_user;
	res.locals.user = current_user;
};
