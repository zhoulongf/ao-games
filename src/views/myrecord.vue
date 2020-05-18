<template>
  <div class="myrecord">
    <div class="myrecord-content">
      <div class="myrecord-list">
        <div class="myrecord-list-item" v-for="(item,index) in list" :key="index">
          <div class="myrecord-list-item-left" :class="item.isGet == 0 ? 'myinfo' : 'myinfono'">
            <p>
              <span class="title">获奖日期：</span>
              <span
                class="info"
              >{{item.createTime ? $moment(item.createTime).format("YYYY年MM月DD日") : '--'}}</span>
            </p>
            <p>
              <span class="title">排名：</span>
              <span class="info omit">周排名第{{item.number ? item.number : 0}}名</span>
            </p>
          </div>
          <div
            class="myrecord-list-item-right"
            :class="item.isGet == 0 ? 'getPiao' : 'lookma'"
            @click="infoClick(item)"
          ></div>
        </div>
      </div>
      <div class="myrecord-foot">
        <img src="@/assets/img/face.png" />
        <span class="span2">以上为全部内容</span>
      </div>
    </div>
    <van-dialog v-model="lookma" :showConfirmButton="false" class="vantdia" width="92%">
      <div class="lookma-dialog" :class="receive ? 'lookyes' : 'lookno'">
        <div class="close">
          <img src="../assets/img/x.png" @click="diaFalse" />
        </div>
        <div class="receiveyes">领取成功</div>
        <div class="dialong-content">
          <div class="dialong-content-item" v-for="(item,index) in conversion" :key="index">
            <p class="duih">兑换码 {{item}}</p>
            <div class="fubtn" :data-clipboard-text="conversion" @click="fuzhi">
              <img src="../assets/img/fuzhi1.png" :data-clipboard-text="conversion" @click="fuzhi" />
            </div>
          </div>
          <p class="title" @click="lookPiao">点击查看领取流程</p>
        </div>
      </div>
    </van-dialog>
    <van-dialog v-model="phoneDia" :showConfirmButton="false" width="92%">
      <div class="phone-content">
        <div class="close">
          <img src="../assets/img/x.png" @click="diaFalse1" />
        </div>
        <div class="form-info">
          <p class="title">中奖信息会发送到以下手机号中，填写后将不可修改</p>
          <van-form @submit="onSubmit">
            <van-field
              v-model="userphone"
              type="tel"
              placeholder="请输入手机号"
              :rules="[{ required: true, message: '请输入手机号' }]"
            />
            <div class="code-info">
              <van-field
                class="code-input"
                v-model="code"
                placeholder="请输入验证码"
                :rules="[{ required: true, message: '请输入手机号' }]"
              />
              <span @click="getcode">{{codeTitle}}</span>
            </div>
            <div style="margin: 16px;">
              <van-button
                round
                block
                type="info"
                native-type="submit"
                class="btns"
                :disabled="!userphone || !code"
              >提交</van-button>
            </div>
          </van-form>
        </div>
      </div>
    </van-dialog>
    <van-overlay :show="optionShow" @click="optionShow = false" z-index=9999>
      <div class="wrapper">
        <div class="block">
          <img :src="defaultsrc">
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { getMyAwardList, getPhoneCode, getAward } from "@/api/index.js";
import Vue from "vue";
import { Dialog, Toast, Form, Field, Button, Overlay } from "vant";
import Clipboard from "clipboard";
Vue.use(Dialog)
  .use(Toast)
  .use(Form)
  .use(Field)
  .use(Button)
  .use(Overlay);
export default {
  name: "record",
  data() {
    return {
      defaultsrc:require('@/assets/img/picture.jpeg'),
      lookma: false,
      receive: true,
      phoneDia: false,
      code: null,
      userphone: null,
      optionShow:false,
      id: null,
      number: 60,
      timer: null,
      conversion: null,
      codeTitle: "获取验证码",
      list: []
    };
  },
  methods: {
    phClick(item, index) {
      this.activeIndex = index;
    },
    infoClick(item) {
      if (item.isGet == 1) {
        this.conversion = item.award ? item.award.split(",") : [];
        this.id = item.id ? item.id : null;
        this.lookma = true;
      } else if (item.isGet == 0) {
        // this.lookma=true
        // this.receive=false
        this.phoneDia = true;
      }
    },
    lookPiao(){
      this.optionShow=true
    },
    diaFalse() {
      this.lookma = false;
    },
    diaFalse1() {
      this.phoneDia = false;
      this.clearInfo();
    },
    clearInfo() {
      this.clearTimer(this.timer);
      this.userphone = null;
      this.code = null;
      this.number = 60;
      this.codeTitle = "获取验证码";
    },
    fuzhi() {
      Toast({
        className: "toastclass",
        duration: 1000,
        icon: require("@/assets/img/fuzyes.png")
      });
      // setInterval(() =>{
      //   this.lookma=false
      // },1001)
    },
    getcode() {
      if (!/^1[3456789]\d{9}$/.test(this.userphone)) {
        Toast({
          duration: 1000,
          message: "请输入正确的手机号"
        });
      } else {
        getPhoneCode(this.userphone).then(res => {
          if (res.code == "00000") {
            this.codeTitle = "60s";
            this.timer = setInterval(this.goTime, 1000);
          }
        });
      }
    },
    clearTimer() {
      clearInterval(this.timer);
      this.number = 60;
      this.codeTitle = "获取验证码";
    },
    goTime() {
      if (this.number <= 0) {
        this.clearTimer(this.timer);
      } else {
        --this.number;
        this.codeTitle = this.number + "s";
      }
    },
    onSubmit(values) {
      let params = {
        id: this.id,
        userPhone: this.userphone,
        code: this.code,
        token: localStorage.getItem("token")
      };
      getAward(params).then(res => {
        if (res.code == "00000") {
          this.phoneDia = false;
          this.clearInfo();
          this.getData();
          Toast({
            message: "领取成功"
          });
        } else {
          this.clearInfo();
          Toast({
            message: res.message
          });
        }
      });
    },
    getData() {
      getMyAwardList().then(res => {
        if (res.code == "00000") {
          this.list = res.data.dayList;
          this.defaultsrc=res.data.picUrl
        }
      });
    }
  },
  beforeDestroy() {
    this.phoneDia = false;
    this.clearInfo();
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="scss">
.toastclass {
  background-color: rgba(50, 50, 51, 0);
  .van-icon__image {
    width: 100px;
  }
}
.vantdia {
  background: rgba(0, 0, 0, 0.7);
}
</style>
<style lang="scss" scoped>
.myrecord {
  width: 92%;
  height: calc(100vh - 75px);
  margin: 0 auto;
  margin-top: 40px;
  background: url(../assets/img/myrecordbg.png) no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  .myrecord-content {
    width: 92%;
    height: 100%;
    margin: 0 auto;
    padding-top: 60px;
    position: relative;
  }
  &-list {
    height: 85%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &-item {
      margin-top: 10px;
      display: flex;
      flex-wrap: nowrap;
      &-left {
        flex: 1;
        height: 60px;
        &.myinfo {
          background: url(../assets/img/123.png) no-repeat center center;
          background-size: 100% 100%;
        }
        &.myinfono {
          opacity: 0.8;
          background: url(../assets/img/03.png) no-repeat center center;
          background-size: 100% 100%;
        }
        p {
          margin-top: 10px;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        span {
          color: #4f4f4f;
          font-size: 12px;
        }
        .title {
          width: 40%;
          text-align: right;
          font-weight: 700;
        }
        .info {
          flex: 1;
          font-weight: 400;
        }
      }
      &-right {
        width: 80px;
        height: 60px;
        cursor: pointer;
        &.getPiao {
          background: url(../assets/img/getpiao.png) no-repeat center center;
          background-size: 100% 100%;
        }
        &.lookma {
          background: url(../assets/img/lookma.png) no-repeat center center;
          background-size: 100% 100%;
        }
      }
    }
  }
  .myrecord-foot {
    position: absolute;
    width: 100%;
    height: 30px;
    left: 0;
    bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      width: 12px;
      height: 12px;
      margin-right: 10px;
    }
  }
  .lookyes {
    background: url(../assets/img/jump.png) no-repeat center center;
    background-size: 100% 100%;
  }
  .lookno {
    background: url(../assets/img/lookno.png) no-repeat center center;
    background-size: 100% 100%;
  }
  .close {
    padding-right: 15px;
    height: 40px;
    line-height: 30px;
    text-align: right;
    img {
      width: 12px;
      height: 12px;
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .phone-content {
    .close {
      background: #b3d3d3;
    }
    .form-info {
      padding: 20px;
      .title {
        font-size: 12px;
        font-weight: 400;
      }
      .code-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .code-input {
          width: 60%;
        }
        span {
          cursor: pointer;
          font-size: 12px;
          font-weight: 400;
        }
      }
    }
  }
  .lookma-dialog {
    height: calc(100vh - 160px);
    margin: 0 auto;
    position: relative;
    .receiveyes{
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      top: 15%;
      left: 0;
      font-size: 30px;
      font-weight: bolder;
      color: #fff;
    }
    .dialong-content {
      margin: 0 auto;
      margin-top: 45%;
      &-item {
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
      }
      .duih {
        height: 30px;
        line-height: 30px;
        font-weight: 600;
        font-size: 14px;
      }
      .title {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        font-weight: 400;
        color: #bdbdbd;
        text-align: center;
        color: #b3d3d3;
        text-decoration: underline;
        cursor: pointer;
        margin-top: 10px;
      }
      .fubtn {
        margin-top: 5px;
        img {
          height: 20px;
          cursor: pointer;
        }
      }
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 300px;
    height: 300px;
    background-color: #fff;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    img{
      width: 100%;
      height: auto;
    }
  }
  .btns {
    background: #b3d3d3;
  }
}
</style>