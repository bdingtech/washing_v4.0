var express = require('express');
var router = express.Router();
const { getDealUrl, getStatus} =  require('../controller/index');


/**
 * @param {string} type 洗涤类型
 * @description 获取支付宝支付链接
 */
router.get('/getDealUrl', async function(req, res, next) {
  let type = req.query.type ? req.query.type : 'small'
  console.log(type)
  res.send(await getDealUrl(type))
});

/**
 * @description 获取洗衣机状态
 */
router.get('/getStatus', async function(req, res, next){
  res.send(await getStatus()) 
})

module.exports = router;
