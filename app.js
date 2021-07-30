const Koa = require('koa');
const app = new Koa();
//const xmlParser = require('koa-xml-body')
const koaBody = require('koa-body')
const koaStatic=require('koa-static');
const session = require('koa-session');

const router=require('./routes/index')

app.keys = ['autopub-app'];
app.proxy=true;
app//.use(xmlParser())
.use(session({
  key: 'AUTOPUB.SESS', 
  maxAge: 86400000,
  sameSite:'strict'
 
},app))

.use(koaBody({
    jsonLimit:'2mb',
    formLimit:'2mb',
    textLimit:'2mb',
    //strict:false
    parsedMethods : ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE']
}))
.use(router.allowedMethods())
.use(koaStatic('./static', {
    //maxage:31536000*1000,
    maxage:0,
}))
.use(router.routes());
  

app.listen(process.env.PORT || 11100);

console.log('>>>>Start Time:',(new Date()).toLocaleString())

console.log(`>>>>NODE_ENV=${process.env.NODE_ENV}; 如果是本地启动请执行'npm test'`)




