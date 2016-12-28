import sendEmail from './../lib/sendEmail.js';
import db from './index.js';

export default function(sequelize, DataTypes) {
    // Create goals table
    let Goals = sequelize.define('Goals', {
        goalWeight: DataTypes.STRING,
        workoutsPerWeek: DataTypes.INTEGER,
        foodLoggedPerWeek: DataTypes.INTEGER,
        otherSuggestions: DataTypes.TEXT
    }, 
    {
        dialect: 'mysql'
    });

    Goals.hook('afterCreate', (data, options, fn) => {
        db.User.findOne({where: {id: data.UserId}}).then((userData) => {
            //sendEmail(userData, data);
        });
    });
    
    return Goals;
}