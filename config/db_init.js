var sqlite3 = require('sqlite3').verbose(); //imported sqlite3 library
module.exports = function (callback) { //how you share some stuff between diff modules in node js
    //function check inital state of database then add tables
    console.log("start db_init");
    var db = new sqlite3.Database("./DB/pconnect_dungeon.db"); // object hlpd talk to database
    db.serialize(() => { //anonymous function()=>
        db.run(`create table if not exists "users"(
            "name" TEXT,
            "id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
            "level" TEXT,
            "email" TEXT NOT NULL UNIQUE,
            "password" TEXT NOT NULL
            );`);

        db.run(`create table if not exists "branches"(
                "name" TEXT,
                "id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                "description" TEXT

                );`);

        db.run(`create table if not exists "forums"(
                "name" TEXT,
                "id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                "description" TEXT
                "branch_id" INTEGER

                );`);


        db.run(`create table if not exists "threads"(
                "name" TEXT,
                "id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                "text" TEXT
                "forum_id" INTEGER
                "creator_id" INTEGER
                "date_created" INTEGER

                );`);

        db.run(`create table if not exists "comments"(
                "id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                "text" TEXT
                "thread_id" INTEGER
                "date_created" INTEGER
                "creator_id" INTEGER

                );`, (res)=>{
                    callback(res);
                });



 

    })



}