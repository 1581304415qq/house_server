const Express = require('express')
const router = Express.Router();
const {
    MD5_SUFFIX,
    responseClient,
    md5
} = require('./util')
router.post('/login', async (req, res) => {
    console.log(req.body)
    let {
        username,
        password
    } = req.body;
    if (!username) {
        responseClient(res, 400, 2, '用户名不可为空');
        return;
    }
    if (!password) {
        responseClient(res, 400, 2, '密码不可为空');
        return;
    }
            //登录成功后设置session
            req.session.userInfo = {username,password};
    responseClient(res, 200, 0, '登录成功','')
});

router.post('/consult', async (req, res) => {
    console.log(req.body)
    let {area,level}=req.body
    responseClient(res, 200, 0, '评估成功',{total:1001*parseInt(area),price:(Math.random()*10000)|0})
})
router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;