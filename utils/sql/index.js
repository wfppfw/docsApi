const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./test.db');

const Fnc = () => {
  db.serialize(() => {
    // db.run('CREATE TABLE lorem (info TEXT)');
    // const stmt = db.prepare('INSERT INTO lorem VALUES (?)');
    // for (let i = 0; i < 10; i++) {
    //   stmt.run('Ipsum ' + i);
    // }
    // stmt.finalize();
    db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
      console.log(row.id + ': ' + row.info);
    });
  });

  // db.close();
};

const add = () => {
  db.serialize(() => {
    // db.run('CREATE TABLE lorem (info TEXT)');

    // const stmt = db.prepare('INSERT INTO lorem VALUES (?)');
    // for (let i = 0; i < 10; i++) {
    //   stmt.run('Ipsum ' + i);
    // }
    // stmt.finalize();

    db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
      console.log(row.id + ': ' + row.info);
    });
  });
};

module.exports = {
  Fnc,
  db,
};

// 增:
// var add = db.prepare("  human (name, age) VALUES (?,?)");
// add.run("小白1",3);
// add.run("小白2",3);
// add.run("小白3",3);
// add.finalize();

// 删:
// var del=db.prepare("DELETE from human where name =?");
// del.run('小白1');
// del.finalize();

//改:
// var r = db.prepare("UPDATE human set name =? where id =2");
// r.run("小白22222");
// r.finalize();

// 查 指定字段
// db.each("SELECT id, name,age FROM human", function(err, row) {
//     console.log(`${row.id} 姓名:${row.name} 年龄:${row.age}`);
//   });

// 查 所有字段
// db.all("select * from human",function(err,row){
//     console.log(JSON.stringify(row));
// })

// 查 按条件
// db.each("SELECT id, name,age FROM human where name=?",'小白2', function(err, row) {
//     console.log(`${row.id} 姓名:${row.name} 年龄:${row.age}`);
//   });
