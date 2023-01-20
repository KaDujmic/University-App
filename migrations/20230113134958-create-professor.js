'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Professors', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			email: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
				isEmail: true,
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
			departmentId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			role: {
				type: Sequelize.STRING,
				enum: 'professor',
				defaultValue: 'professor',
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
		await queryInterface.dropTable('Professors');
	},
};
