'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Students', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			fullName: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			email: {
				allowNull: false,
				unique: true,
				isEmail: true,
				type: Sequelize.STRING,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			address: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			phoneNumber: {
				allowNull: false,
				unique: true,
				validate: {
					is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,6}$/,
				},
				type: Sequelize.STRING,
			},
			majorId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			role: {
				type: Sequelize.STRING,
				enum: 'student',
				defaultValue: 'student',
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Students');
	},
};
