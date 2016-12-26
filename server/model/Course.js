export default function(sequelize, DataTypes) {
    // Create user table
    let Course = sequelize.define('Course', {
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        desc: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        pic: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        category: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
    {
        dialect: 'mysql'
    });
    
    return Course;
}