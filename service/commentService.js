const { deserializeUser } = require('passport');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./DB/pconnect_dungeon.db');

var service = {
    findComment: function (id, callback) {
        db.get(`SELECT c.id "id", thread_id, date_created, creator_id, text, u.name "creator_name"
                FROM comments c
                JOIN users u ON c.creator_id = u.id
                WHERE id=$id`, { $id: id }, function (err, row) {
            if (err) {
                callback();
            } else {
                callback(row);
            }

        })
    },
    findCommentsFromThread: function (thread_id, callback) {
        db.all(`SELECT c.id "id", thread_id, date_created, creator_id, text, u.name "creator_name"
                FROM comments c
                JOIN users u ON c.creator_id = u.id
                WHERE thread_id=$thread_id`, { $thread_id: thread_id }, function (err, rows) {
            if (err) {
                console.log(err);
                callback();
            } else {
                callback(rows);
            }
        });
    },

    createComment: function(comment, callback){
        db.run(`INSERT INTO comments(creator_id, text, thread_id) 
        VALUES($creator_id,  $text, $thread_id)`, {
            $creator_id: comment.creator_id,
            $text: comment.text,
            $thread_id: comment.thread_id
        },
        function(err){
            if (err){
                callback(undefined);
                return;
            }
            callback(this.lastID)
        })
    }
}


module.exports = service;