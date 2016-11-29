# personal-note-api

## Dependencies
1. Server
* express.js
* mongodb
* mongoose
* morgan
* dotenv
* body-parser
* cors
* babel-cli
* babel-preset-es2015

## API End Point
Defautl development URL & port : http://localhost:3000

### Users

| Routes | HTTP | Description |
|--------|------|-------------|
| /api/users | GET | get all users |
| /api/users/:id | GET | get a user by id |
| /api/users | POST | create a new user |
| /api/users | PUT | edit a user by id |
| /api/users | DELETE | delete a new user |

### Notes

| Routes | HTTP | Description |
|--------|------|-------------|
| /api/notes/:id | GET | get a note by id |
| /api/notes | POST | create a new note |
| /api/notes | PUT | edit a note by id |
| /api/notes | DELETE | delete a note user |

## Database Schema
Database name : db_personal_note
### Users
```JSON
{
  "id"          : {
    "type"      : Schema.Types.ObjectId,
    "required"  : true,
    "unique"    : true
  },
  "name"        : {
    "type"      : String,
    "required"  : true,
  },
  "age"        : {
    "type"      : Number,
    "required"  : true,
  },
  "noteId"        : [{
    "type"      : Schema.Types.ObjectId,
    "ref"  : "Notes",
  }]
}
```
### Notes
```JSON
{
  "id"          : {
    "type"      : Schema.Types.ObjectId,
    "required"  : true,
    "unique"    : true
  },
  "title"        : {
    "type"      : String,
    "required"  : true,
  },
  "content"        : {
    "type"      : String,
    "required"  : true,
  },
  "userId"        : [{
    "type"      : Schema.Types.ObjectId,
    "ref"  : "Users",
  }]
}
```

## Contributor
Ken Duigraha Putra &copy; 2016

## License
MIT
