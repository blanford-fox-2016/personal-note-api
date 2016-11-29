'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        TempUserId: DataTypes.STRING,
        name: DataTypes.STRING,
        age: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                User.hasMany(models.Note)
            }
        }
    });
    return User;
};