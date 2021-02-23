const sqlitedb=require('../lib/sqlitedb');
const objectid=require('objectid');
var DB=null;
const tableinit = async function(db){
	var r = await db.get(`SELECT COUNT(*) as found FROM sqlite_master where type='table' and name='user'`);
	if(r && r.found == 0){
		//console.log('create')
		db.exec(`CREATE TABLE user (
			id 		CHAR(24) 	UNIQUE 		NOT NULL,
			name 	CHAR(30) 	PRIMARY KEY NOT NULL,
			pwd 	CHAR(50)				NOT NULL
			)`);
	}else{
		//db.exec(`DROP TABLE user`);
	}
	DB=db;
};
sqlitedb().then(tableinit);

		//await db.exec(`CREATE TABLE user (id CHAR(24),name CHAR(30),pwd CHAR(50))`);
module.exports={

	check:async function(name,pwd){
		var r=await DB.get(`SELECT id FROM user WHERE name=? AND pwd=?`,name,pwd);
		//console.log(JSON.stringify(r));
		return r ;
	},
	isempty:async function(){
		var r=await DB.get(`SELECT COUNT(*) as found FROM user`);
		return !r || !r.found;
	},
	insert:async function(name,pwd){
		var id=objectid().toString();
		var r=await DB.run(`INSERT INTO user VALUES (?,?,?)`,id,name,pwd);

		return {id:id,changes:r && r.changes};
	}
};