import request from '../utils/axios'
// let apiUrl=`https://cs.jumizc.com`
let apiUrl=`http://47.110.91.228:8123`
export function audirequest(params) {
    //授权
    return request({
        url: apiUrl+`/weixinauth/audirequest`,
        method: 'post',
        params
    })
}
export function audilogin(params) {
    //授权拿token
    return request({
        url: apiUrl+`/weixinauth/audilogin`,
        method: 'post',
        params
    })
}
export function ranking() {
    //排行榜
    return request({
        url: apiUrl+`/queue/ranking`,
        method: 'post',
        params:{
            token:localStorage.getItem('token')
        }
    })
}
export function awardList() {
    //排行榜
    return request({
        url: apiUrl+`/queue/awardList`,
        method: 'post',
        params:{
            token:localStorage.getItem('token')
        }
    })
}
export function getMyAwardList() {
    //领奖记录
    return request({
        url: apiUrl+`/queue/getMyAwardList`,
        method: 'post',
        params:{
            token:localStorage.getItem('token')
        }
    })
}
export function homePage() {
    //首页信息
    return request({
        url: apiUrl+`/queue/homePage`,
        method: 'post',
        params:{
            token:localStorage.getItem('token')
        }
    })
}
export function getPhoneCode(userPhone) {
    //手机验证码
    return request({
        url: apiUrl+`/queue/getPhoneCode`,
        method: 'post',
        params:{
            userPhone:userPhone
        }
    })
}
export function getAward(params) {
    //领取奖励
    return request({
        url: apiUrl+`/queue/getAward`,
        method: 'post',
        params
    })
}
export function getQuestionList(params) {
    //领取奖励
    return request({
        url: apiUrl+`/queue/getQuestionList`,
        method: 'post',
        params
    })
}
export function weixinauth() {
    //分享
    return request({
        url: apiUrl+`/weixinauth/initjs`,
        method: 'post',
        params:{url:encodeURIComponent(window.location.href)}
    })
}