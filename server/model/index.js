import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import lodash from 'lodash';

const sequelize = new Sequelize('learnenergy_schema', 'root', 'winsbee');
const db = {};

fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf('.') !== 0) && (file !== 'index.js');
	})
	.forEach(function(file) {
		let model = sequelize.import(path.join(__dirname, file));

		db[model.name] = model;
	});

export default lodash.extend({
	sequelize: sequelize,
	Sequelize: Sequelize
}, db);