import wx from 'weixin-js-sdk';//引入
import { weixinauth } from "@/api/index.js";
export const shartMessage={
    data(){
        return{
            shartInfo:{},
            appId:"wx8e0b429155bcc36a",
            timestamp:null,
            nonceStr:null,
            signature:null,
            sharetitle:'“奥”视群雄奥迪知识大挑战',
            sharedesc: '拼知识、拼速度、赢奖品，测测谁是奥迪真爱粉。',
            shareimg:require('@/assets/img/shar.jpeg'),
            shartUrl:'http://dati.jupaiaction.com/?from=singlemessage#/home'
        }
    },
    methods:{
        getMessage(){
            console.log(window.location.href)
            weixinauth().then(res =>{
                if(res.code == '00000' && res.code){
                    this.shartInfo =res.data
                    let data=res.data
                    wx.config({
                        debug: false,
                        appId:data.appId,
                        timestamp:data.timestamp,
                        nonceStr:data.noncestr,
                        signature:data.signature,
                        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
                    });
                    wx.ready(function () {
                    //     wx.onMenuShareQQ({
                    //     title: this.sharetitle,
                    //     desc: this.sharedesc,
                    //     link: this.shartUrl,
                    //     imgUrl: this.shareimg,
                    //     success: function () { },
                    //     cancel: function () { }
                    // });
                    wx.onMenuShareTimeline({
                        title: this.sharetitle,
                        desc: this.sharedesc,
                        link: this.shartUrl,
                        imgUrl: this.shareimg,
                        success: function () { },
                        cancel: function () { }
                    })
                    wx.onMenuShareAppMessage({
                        title: this.sharetitle,
                        desc: this.sharedesc,
                        link: this.shartUrl,
                        imgUrl: this.shareimg,
                        success: function () { },
                        cancel: function () { }
                    });
                    // wx.onMenuShareWeibo({
                    //     title: this.sharetitle,
                    //     desc: this.sharedesc,
                    //     link: this.shartUrl,
                    //     imgUrl: this.shareimg,
                    //     success: function () { },
                    //     cancel: function () { }
                    // });
                    })
                    
                }
            })
        },
    },
    mounted(){
        if(localStorage.getItem('token')){
            this.getMessage()
        }
    }
}