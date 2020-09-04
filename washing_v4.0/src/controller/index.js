const axios = require('axios')

/**
 * @author pudding
 * @description 获取支付宝支付订单
 * @param {string} type 洗涤模式 
 */
async function getDealUrl(type){
    let fee
    let coin
    let body
    switch(type){
        case 'big': 
            fee = 400
            coin = 4
            body = '%E5%A4%A7%E7%89%A9%E6%B4%97'
            break
        case 'mid':
            fee = 300
            coin= 3
            body = '%E6%A0%87%E5%87%86%E6%B4%97'
            break
        case 'small':
            fee = 200
            coin = 2
            body = '%E5%BF%AB%E6%B4%97'
            break
        case 'normal':
            fee = 100
            coin = 1
            body = '%E5%8D%95%E8%84%B1%E6%B0%B4'
    }
    const result = await axios.get(`http://view.8848y.com/ajax/GetPaySign.ashx?Scene=0&payname=1&deviceID=60c59d2a-0edc-4e34-b92a-e6f0c4e04f6e&packageID=3fea4348-0c88-4fbc-a578-340fe40dc656&openid=AlipayClient&fee=${fee}&coin=${coin}&body=${body}&AffiliateID=ad5f937e-1bd8-4e6f-b14e-53dce19d1c99`)
    return result.data
}

/**
 * @description 获取洗衣机状态
 */
async function getStatus(){
    let result = await axios.get('http://view.8848y.com/ajax/GetDeviceStatus.ashx?deviceID=60c59d2a-0edc-4e34-b92a-e6f0c4e04f6e&packageID=bed8dd61-8e84-4d4a-a0f9-b755f90bc9b2&AffiliateID=ad5f937e-1bd8-4e6f-b14e-53dce19d1c99')
    let status = result.data[0]
    console.log(status)
    if(status.Key == 'online'){
        if(status.Value == '1'){
            return {
                "stat": "设备正常",
                "code": 200
            }
        }
        if(status.Value == '100'){
            return {
                "stat": '设备正在运行，请稍后重试！',
                "code": 300
            }
        }
        if(status.Value == '99'){
            return {
                "stat": "设备尚未准备就绪，请稍后重试",
                "code": 400
            }
        }
    }else{
        return {
            "stat":'设备离线,请稍后重试！',
            "code": 500
        }
    }
}


module.exports = {
    getDealUrl,
    getStatus
}