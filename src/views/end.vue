<template>
  <div class="end">
    <div class="end-top" :class="endType == 'true' ? 'topyes' : 'topno'">
      <div class="jfinfo">
        <div class="jfinfo-left span2">{{myGrad ? myGrad : 0}}分</div>
        <div class="jfinfo-right span2">{{otherGrade ? otherGrade : 0}}分</div>
      </div>
    </div>
    <div class="end-center">
      <div class="end-center-left">
        <img :src="myUser.litpicPath ? myUser.litpicPath : defaultHead" />
        <span class="span0">{{myUser.nickname ? myUser.nickname : 'xxx'}}</span>
      </div>
      <div class="end-center-center">vs</div>
      <div class="end-center-left">
        <img :src="otherInfo.litpicPath ? otherInfo.litpicPath : defaultHead" />
        <span class="span0">{{otherInfo.nickname ? otherInfo.nickname : 'xxx'}}</span>
      </div>
    </div>
    <div class="end-foot again" @click="goclick(1)"></div>
    <div class="end-foot goback" @click="goclick(2)"></div>
    <van-popup v-model="popshow" :close-on-click-overlay="false" class="popclass">
      <div class="mathchloding">匹配中...</div>
    </van-popup>
    <van-dialog v-model="matchshow" :showConfirmButton="false" class="vantdia">
      <div class="match-dialog">
        <div class="match-top">
          <img src="../assets/img/fdj.png" />
          <p class="span0">正在寻找对手({{number}})</p>
        </div>
        <div class="match-center">
          <div class="match-center-left">
            <img :src="myUser.litpicPath ? myUser.litpicPath : defaultHead" />
            <span class="span0">{{myUser.nickname ? myUser.nickname : 'xxx'}}</span>
          </div>
          <div class="match-center-center">vs</div>
          <div class="match-center-left">
            <img :src="otherInfos.litpicPath ? otherInfos.litpicPath : defaultSrc" />
            <span class="span0">{{otherInfos.opponentName ? otherInfos.opponentName : '***'}}</span>
          </div>
        </div>
        <div class="match-footer" @click="closematch"></div>
      </div>
    </van-dialog>
    <van-dialog v-model="leaveShow" :showConfirmButton="false" class="vantdia leaveDia" width="80%">
      <div class="leave-dialog">
        <div class="close">
          <img src="../assets/img/x.png" @click="diaFalse" />
        </div>
        <van-image class="imgpre" :src="leavepic" />
      </div>
    </van-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import { Dialog, Toast, Popup, Image as VanImage } from "vant";
import { shartMessage } from "@/utils/shar.js";
Vue.use(Dialog)
  .use(Toast)
  .use(Popup)
  .use(VanImage);
export default {
  name: "end",
  mixins: [shartMessage],
  data() {
    return {
      leaveShow: true,
      matchshow: false,
      popshow: false,
      closeinfo: false,
      number: 0,
      timer: null,
      endType: null,
      myGrad: localStorage.getItem("myGrad"),
      defaultSrc: require("@/assets/img/gif1.gif"),
      otherGrade: localStorage.getItem("otherGrade"),
      otherInfo: JSON.parse(localStorage.getItem("otherInfo")),
      myUser: JSON.parse(localStorage.getItem("myUser")),
      defaultHead: require("@/assets/img/head.png"),
      leavepic: require("@/assets/rand/1.png"),
      myInfo: {},
      otherInfos: {}
    };
  },
  methods: {
    goclick(key) {
      if (key == 1) {
        this.beginTime();
      } else {
        this.$router.push({
          path: "home"
        });
      }
    },
    diaFalse(){
      this.leaveShow=false
    },
    beginTime() {
      this.closeinfo = false;
      this.popshow = true;
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      }
      window.ws = new WebSocket(
        // "ws://192.168.10.2:8123/websocket/" + localStorage.getItem("token")
        "ws://47.110.91.228:8123/websocket/" + localStorage.getItem("token")
      );
      window.ws.onopen = this.onopen;
      window.ws.onmessage = this.onmessage;
      window.ws.onerror = this.onerror;
    },
    onopen(e) {
      console.log("连接成功");
      this.popshow = false;
      this.matchshow = true;
      this.timer = setInterval(this.goTime, 1000);
    },
    onmessage(data) {
      if (!this.closeinfo) {
        let obj = JSON.parse(data.data);
        this.otherInfos = obj.opponentUser;
        this.myUser = obj.myUser;
        console.log(obj);
        localStorage.setItem("otherInfo", JSON.stringify(this.otherInfos));
        localStorage.setItem("myUser", JSON.stringify(this.myUser));
        localStorage.setItem("questionList", JSON.stringify(obj.questionList));
        localStorage.setItem("playUserId", obj.playUserId);
        Toast({
          message: "匹配成功",
          onOpened: () => {
            this.closematch();
            this.$router.push({
              path: "match"
            });
          }
        });
      }
    },
    onerror(e) {
      console.log(e);
    },
    goTime() {
      this.number++;
    },
    clearTimer() {
      clearInterval(this.timer);
      this.number = 0;
    },
    closematch() {
      window.ws.onclose = this.onclose;
      this.clearTimer();
      this.matchshow = false;
      this.closeinfo = true;
      this.onmessage();
    },
    onclose() {
      console.log("断开链接");
    }
  },
  mounted() {
    let status = this.$route.query.status;
    if (status) {
      this.endType = status;
    } else {
      this.endType = "false";
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    if (window.wx) {
      this.closeinfo = true;
      window.ws.onclose = this.onclose;
    }
  }
};
</script>
<style lang="scss">
.vantdia {
  background: #ccc;
}
.leaveDia {
  height: calc(100vh - 200px);
}
</style>
<style lang="scss" scoped>
.end {
  width: 92%;
  height: calc(100vh - 65px);
  margin: 0 auto;
  margin-top: 40px;
  background: url(../assets/img/endbg.png) no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
  &-top {
    width: 50%;
    height: 100px;
    margin: 0 auto;
    margin-top: 60px;
    position: relative;
    &.topyes {
      background: url(../assets/img/yes.png) no-repeat center center;
      background-size: 100% 100%;
    }
    &.topno {
      background: url(../assets/img/no.png) no-repeat center center;
      background-size: 100% 100%;
    }
    .jfinfo {
      width: 48%;
      position: absolute;
      left: 50%;
      bottom: -20px;
      transform: translateX(-50%);
      div {
        display: inline-block;
        width: 50%;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
      &-left {
        background: url(../assets/img/leftjf.png) no-repeat center center;
        background-size: 100% 100%;
      }
      &-right {
        background: url(../assets/img/rightjf.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
  &-center {
    width: 80%;
    margin: 0 auto;
    margin-top: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-bottom: 10px;
      }
    }
    &-center {
      font-weight: 700;
      font-size: 22px;
      color: #fff;
    }
  }
  &-foot {
    width: 40%;
    height: 40px;
    margin: 0 auto;
    cursor: pointer;
    &.again {
      margin-top: 40px;
      background: url(../assets/img/again.png) no-repeat center center;
      background-size: 100% 100%;
    }
    &.goback {
      margin-top: 20px;
      background: url(../assets/img/endgo.png) no-repeat center center;
      background-size: 100% 100%;
    }
  }
  .leave-dialog {
    width: 100%;
    height: 100%;
    position: absolute;
    background: url(../assets/img/leave3.png) no-repeat center center;
    background-size: 100% 100%;
    overflow: hidden;
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
    .imgpre {
      width: 240px;
      height: 300px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .match-dialog {
    height: calc(100vh - 120px);
    margin: 0 auto;
    background: url(../assets/img/matchbg.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
    .match-top {
      width: 60%;
      height: 40px;
      margin: 40px auto;
      background: url(../assets/img/ppbg.png) no-repeat center center;
      background-size: 100% 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .match-center {
      width: 80%;
      margin: 0 auto;
      margin-top: 40px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      &-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-bottom: 10px;
        }
      }
      &-center {
        font-weight: 700;
        font-size: 22px;
        color: #fff;
      }
    }
    .match-footer {
      position: absolute;
      left: 50%;
      bottom: 40px;
      transform: translateX(-50%);
      width: 40%;
      height: 40px;
      background: url(../assets/img/nopp.png) no-repeat center center;
      background-size: contain;
      cursor: pointer;
    }
  }
  .popclass {
    width: 80%;
    height: 100px;
    font-size: 20px;
    font-weight: bolder;
    text-align: center;
    line-height: 100px;
  }
}
</style>
