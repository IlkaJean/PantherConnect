const { deserializeUser } = require('passport');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./DB/pconnect_dungeon.db');

var service = {
    findThread: function (id, callback) {
        db.get(`SELECT t.id "id", t.name "name", t.text "text", 
            t.forum_id "forum_id", t.creator_id "creator_id", u.name "creator_name",t.date_created "date_created", 
            count(c.id) "comment_number", max(c.date_created) "last_updated" 
            FROM threads t
            LEFT JOIN  comments c ON t.id=c.thread_id
            LEFT JOIN  users u ON t.creator_id=u.id
            GROUP BY t.id
            HAVING t.id = $id`, { $id: id }, function (err, row) {
            if (err) {
                callback();
            } else {
                callback(row);
            }

        })
    },
    findThreadsFromForum: function (forum_id, callback) {
        db.all(`SELECT t.id "id", t.name "name", t.text "text", 
                t.forum_id "forum_id", t.creator_id "creator_id", u.name "creator_name", t.date_created "date_created", 
                count(c.id) "comment_number", max(c.date_created) "last_updated" 
                FROM threads t
                LEFT JOIN  comments c ON t.id=c.thread_id
                LEFT JOIN  users u ON t.creator_id=u.id
                GROUP BY t.id
                HAVING t.forum_id = $forum_id
                ORDER BY coalesce(max(c.date_created) , t.date_created) DESC`, { $forum_id: forum_id }, function (err, rows) {
            if (err) {
                console.log(err);
                callback();
            } else {
                callback(rows);
            }
        });
    },

    createThread: function(thread, callback){
        db.run(`INSERT INTO threads(creator_id, name, text, forum_id) 
        VALUES($creator_id, $name, $text, $forum_id)`, {
            $creator_id: thread.creator_id,
            $name: thread.name,
            $text: thread.text,
            $forum_id: thread.forum_id
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