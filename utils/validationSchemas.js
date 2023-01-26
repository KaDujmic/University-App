const Joi = require('joi');
const { ValidationError } = require('./errorHandler');

exports.courseSchema = Joi.object({
	id: null,
	name: Joi.string().min(3).max(50).required(),
	credit_hours: Joi.number().min(1).required(),
	major_id: Joi.string().min(3).max(50).required(),
	createdAt: Joi.date(),
	updatedAt: Joi.date(),
}).options({ abortEarly: false });

exports.professorSchema = Joi.object({
	id: null,
	full_name: Joi.string().min(3).max(50).required(),
	email: Joi.string()
		.alphanum()
		.min(3)
		.max(50)
		.email({ minDomainSegments: 2 })
		.required(),
	address: Joi.string().min(3).max(50).required(),
	phone_number: Joi.string().alphanum().min(3).max(25).required(),
	password: Joi.string().min(6).required(),
	department_id: Joi.string().min(3).max(50).required(),
	createdAt: Joi.date(),
	updatedAt: Joi.date(),
}).options({ abortEarly: false });

exports.studentSchema = Joi.object({
	id: null,
	full_name: Joi.string().min(3).max(50).required(),
	email: Joi.string()
		.min(3)
		.max(50)
		.email({ minDomainSegments: 2 })
		.required(),
	address: Joi.string().min(3).max(50).required(),
	phone_number: Joi.string().min(3).max(25).required(),
	major_id: Joi.string().min(3).max(50).required(),
	password: Joi.string().min(6).required(),
	createdAt: Joi.date(),
	updatedAt: Joi.date(),
}).options({ abortEarly: false });

exports.examSchema = Joi.object({
	id: null,
	name: Joi.string().min(3).max(50).required(),
	date: Joi.date()
		.greater(Date.now() + 48 * 60 * 60 * 1000)
		.required(),
	time: Joi.date()
		.greater(Date.now() + 48 * 60 * 60 * 1000)
		.required(),
	course_id: Joi.string().alphanum().min(3).max(50).required(),
	createdAt: Joi.date(),
	updatedAt: Joi.date(),
}).options({ abortEarly: false });

exports.resultSchema = Joi.object({
	grade: Joi.number().min(1).max(5).required(),
	exam_id: Joi.string().min(3).max(50).required(),
	student_id: Joi.string().min(3).max(50).required(),
	createdAt: Joi.date(),
	updatedAt: Joi.date(),
}).options({ abortEarly: false });

exports.departmentSchema = Joi.object({
	id: null,
	name: Joi.string().min(3).max(50).required(),
	createdAt: Joi.date(),
	updatedAt: Joi.date(),
}).options({ abortEarly: false });

exports.majorSchema = Joi.object({
	id: null,
	name: Joi.string().min(3).max(50).required(),
	department_id: Joi.string().min(3).max(50).required(),
	createdAt: Joi.date(),
	updatedAt: Joi.date(),
}).options({ abortEarly: false });

exports.validation = (schema, body) => {
	const { error } = schema.validate(body);

	if (error) {
		const errorMessages = error.details.map((err) => err.message);
		throw new ValidationError(errorMessages);
	}
};
