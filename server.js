/**
 * api请求server
 *
 * 0：成功
 * 1：数据不合法
 * 2：客户端数据错误
 * 3：后端错误
 */
const Express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = new Express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser('express_react_cookie'));
app.use(session({
	secret: 'express_react_cookie',
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 60 * 1000 * 30
	} //过期时间
}));

//设置跨域访问
//设置跨域请求
app.all('*', function (req, res, next) {
  //设置请求头
  //允许所有来源访问
  res.header('Access-Control-Allow-Origin', '*')
  //用于判断request来自ajax还是传统请求
  res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
  //允许访问的方式
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  //修改程序信息与版本
  res.header('X-Powered-By', ' 3.2.1')
  //内容类型：如果是post请求必须指定这个属性
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
//用户路由
app.use('/api/user', require('./user'));
//图片
app.use('/image', Express.static('./images'));

app.listen(8090, function(err) {
	if (err) {
		console.error('err:', err);
	} else {
		console.info(`===> api server is running at 8090`)
	}
});