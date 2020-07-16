const { deserializeUser } = require('passport');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./DB/pconnect_dungeon.db');

var service = {
    findForum: function (id, callback) {
        db.get(`SELECT  id, branch_id, name, description
            FROM forums f
             WHERE id=$id 
            `, { $id: id }, function (err, row) {
            if (err) {
                callback();
            } else {
                callback(row);
            }

        })
    },
    findForumFromBranches: function (branch_id, callback) {
        db.all(`SELECT  name, branch_id, description, id
                FROM forums
                
                WHERE branch_id=$branch_id`, { $branch_id: branch_id }, function (err, rows) {
            if (err) {
                console.log(err);
                callback();
            } else {
                callback(rows);
            }
        });
    }
}

module.exports = service;