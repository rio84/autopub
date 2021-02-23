const sqlite3 =require( 'sqlite3');
const open =require( 'sqlite').open;




/*
await db.exec('CREATE TABLE tbl (col TEXT)')
await db.exec('INSERT INTO tbl VALUES ("test")')
*/
var db=null;
module.exports=async function(){
	if(!db){
		db = await open({
			filename: './data/sqlite.db',
			driver: sqlite3.Database
		})
	}
	return db;
}