'use strict';
module.exports = function(sequelize, DataTypes) {
    var Note = sequelize.define('Note', {
        TempNoteId: DataTypes.STRING,
        title: DataTypes.STRING,
        content: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Note;
};