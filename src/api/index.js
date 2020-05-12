import request from '../utils/axios'
let apiUrl=`https://cs.jumizc.com`
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
            token:sessionStorage.getItem('token')
        }
    })
}
export function awardList() {
    //排行榜
    return request({
        url: apiUrl+`/queue/awardList`,
        method: 'post',
        params:{
            token:sessionStorage.getItem('token')
        }
    })
}