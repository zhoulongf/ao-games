<template>
  <div class="myrecord">
    <div class="myrecord-content">
      <div class="myrecord-list">
        <div class="myrecord-list-item" v-for="(item,index) in list" :key="index">
          <div class="myrecord-list-item-left" :class="item.status ==1 ? 'myinfo' : 'myinfono'">
            <p>
              <span class="title">获奖日期：</span>
              <span class="info">{{item.time}}</span>
            </p>
            <p>
              <span class="title">排名：</span>
              <span class="info omit">周排名第{{item.number}}名</span>
            </p>
          </div>
          <div
            class="myrecord-list-item-right"
            :class="item.status ==1 ? 'getPiao' : 'lookma'"
            @click="infoClick(item)"
          ></div>
        </div>
      </div>
      <div class="myrecord-foot">
        <img src="@/assets/img/face.png" />
        <span class="span2">以上为全部内容</span>
      </div>
    </div>
    <van-dialog v-model="lookma" :showConfirmButton="false" class="vantdia" width="75%">
      <div class="lookma-dialog" :class="receive ? 'lookyes' : 'lookno'">
        <div class="close">
          <img src="../assets/img/x.png" @click="diaFalse" />
        </div>
        <div class="dialong-content" v-if="receive">
          <p class="duih">兑换码 199999999</p>
          <p class="duih">兑换码 199999999</p>
          <p class="title">（到指定平台换取电影票）</p>
          <div class="fubtn">
            <img src="../assets/img/fubtn.png" @click="fuzhi" />
          </div>
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
              v-model="username"
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
              <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
          </van-form>
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import { Dialog, Toast, Form, Field, Button } from "vant";
Vue.use(Dialog)
  .use(Toast)
  .use(Form)
  .use(Field)
  .use(Button);
export default {
  name: "record",
  data() {
    return {
      lookma: false,
      receive: true,
      phoneDia: false,
      code: null,
      username: null,
      number: 60,
      timer: null,
      codeTitle: "获取验证码",
      list: [
        { time: "2020年5月7号", number: 2, status: 1 },
        { time: "2020年5月7号", number: 2, status: 2 },
        { time: "2020年5月7号", number: 2, status: 1 },
        { time: "2020年5月7号", number: 2, status: 2 },
        { time: "2020年5月7号", number: 2, status: 1 },
        { time: "2020年5月7号", number: 2, status: 2 },
        { time: "2020年5月7号", number: 2, status: 1 },
        { time: "2020年5月7号", number: 2, status: 2 },
        { time: "2020年5月7号", number: 2, status: 1 },
        { time: "2020年5月7号", number: 2, status: 2 }
      ]
    };
  },
  methods: {
    phClick(item, index) {
      this.activeIndex = index;
    },
    infoClick(item) {
      if (item.status == 2) {
        this.lookma = true;
        this.receive = true;
      } else if (item.status == 1) {
        // this.lookma=true
        // this.receive=false
        this.phoneDia = true;
      }
    },
    diaFalse() {
      this.lookma = false;
    },
    diaFalse1() {
      this.phoneDia = false;
      this.clearTimer(this.timer)
      this.number=60
      this.codeTitle= "获取验证码"
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
      this.codeTitle = "60s";
      this.timer = setInterval(this.goTime, 1000);
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
      this.clearTimer(this.timer);
      console.log("submit", values);
    },
    beforeDestroy() {
      this.phoneDia = false;
      this.clearTimer(this.timer)
      this.timer=null
      this.number=60
      this.codeTitle= "获取验证码"
    }
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
          background: url(../assets/img/myinfo.png) no-repeat center center;
          background-size: 100% 100%;
        }
        &.myinfono {
          opacity: 0.8;
          background: url(../assets/img/myinfono.png) no-repeat center center;
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
    background: url(../assets/img/myrecordyes.png) no-repeat center center;
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
      background: #000;
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
    height: calc(100vh - 220px);
    margin: 0 auto;
    .dialong-content {
      margin: 0 auto;
      margin-top: 35%;
      text-align: center;
      .duih {
        height: 30px;
        line-height: 30px;
        font-weight: 600;
        font-size: 16px;
      }
      .title {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        font-weight: 400;
        color: #bdbdbd;
      }
      .fubtn {
        margin-top: 20px;
        img {
          height: 30px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>