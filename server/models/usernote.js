'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserNote = sequelize.define('UserNote', {
    TempUserNoteId: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    NoteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserNote;
};