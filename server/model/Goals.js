import sendEmail from './../lib/sendEmail.js';
import db from './index.js';

export default function(sequelize, DataTypes) {
    // Create goals table
    let Goals = sequelize.define('Goals', {
        startWeight: DataTypes.STRING,
        goalWeight: DataTypes.STRING,
        workoutsPerWeek: DataTypes.INTEGER,
        foodLoggedPerWeek: DataTypes.INTEGER,
        preferredPartner: DataTypes.STRING,
        publicWeight: DataTypes.BOOLEAN,
        okayWithBeingRef: DataTypes.BOOLEAN,
        prizeSuggestion: DataTypes.TEXT,
        myFitnessPalName: DataTypes.STRING,
        otherSuggestions: DataTypes.TEXT
    }, 
    {
        dialect: 'mysql'
    });

    Goals.hook('afterCreate', (data, options, fn) => {
        db.User.findOne({where: {id: data.UserId}}).then((userData) => {
            console.log(userData.username);
            sendEmail(userData.username);
        });
    });
    
    return Goals;
}