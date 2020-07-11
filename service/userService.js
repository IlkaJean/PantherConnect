const bcrypt = require('bcryptjs');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./DB/pconnect_dungeon.db');

/**
 * The service is responsible for working with user entities
 */
var service = {
    findUser: function(email, callback){
        db.get('SELECT * FROM users WHERE email=$email',{$email:email}, function(err, row){
            if (err){
                callback();
            } else{
                callback(row)
            }
        })
    },

    registerUser: function(user, callback){
        // check that all fields are present
        if (!user.name || !user.email || !user.password || !user.password2){
            callback(undefined);
            return;
        }
        // check that the user with given email does not exist
        this.findUser(user.email, (foundUser) =>{
            if (foundUser){
                callback(undefined);
                return
            }
            // create a password with a salt
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                  if (err) throw err;
                  user.password = hash;
                  delete user.password2;
                  user.level = 'user';
                  // save the user to db
                  db.run(`INSERT INTO users(name, level, email, password)
                  VALUES ($name, $level, $email, $password)`,{
                    $name: user.name, 
                    $level: user.level, 
                    $email: user.email, 
                    $password: user.password
                  }, function(err){
                      if (err){
                          callback(undefined);
                          return;
                      }
                      callback(this.lastID)
                  })
             });
            });
        })        
    },

    // get all users but remove password field from them
    getUsers: function(callback){
        db.all('SELECT * FROM users', function(err, rows){
            if (err){
                callback()
            } else{
                callback(rows)
            }
        })
    }
}

module.exports = service;