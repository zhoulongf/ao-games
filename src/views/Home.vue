<template>
  <div
    class="home"
    :style="{backgroundImage: 'url(' + (userInfo.picUrl ? userInfo.picUrl : baseImg) + ')', backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat'}"
  >
    <div class="home-content">
      <div class="home-content-top">
        <div class="imgSrc">
          <img :src="userInfo.litpicPath" />
        </div>
        <div class="infoNub info-left">{{userInfo.border ? userInfo.border : 0}}</div>
        <div class="infoNub info-right">{{userInfo.level ? userInfo.level : '***'}}</div>
      </div>
      <div class="list">
        <img
          v-for="(item,index) in list"
          :key="index"
          :src="item"
          alt="暂无图片"
          @click="goTo(item,index)"
        />
      </div>
      <!-- <div class="content-img">
        <img :src="userInfo.picUrl" />
      </div>-->
      <div class="btn-submit" @click="beginTime"></div>
    </div>
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
            <img :src="userInfo.litpicPath" />
            <span class="span0">{{userInfo.nickName}}</span>
          </div>
          <div class="match-center-center">vs</div>
          <div class="match-center-left">
            <img :src="otherInfo.litpicPath ? otherInfo.litpicPath : defaultSrc" />
            <span class="span0">{{otherInfo.opponentName ? otherInfo.opponentName : '***'}}</span>
          </div>
        </div>
        <div class="match-footer" @click="closematch"></div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { homePage, chooseUser } from "@/api/index.js";
import Vue from "vue";
import { Dialog, Toast, Popup } from "vant";
import { shartMessage } from "@/utils/shar.js";
Vue.use(Dialog)
  .use(Toast)
  .use(Popup);
import MyHeader from "@/components/my-header";
export default {
  name: "Home",
  mixins: [shartMessage],
  components: {
    MyHeader
  },
  data() {
    return {
      matchshow: false,
      popshow: false,
      number: 0,
      timer: null,
      closeinfo: false,
      userInfo: {},
      baseImg: require("@/assets/img/homebg.jpg"),
      defaultSrc: require("@/assets/img/matchtou.gif"),
      otherInfo: {},
      myUser: {},
      list: [
        require("../assets/img/ph.png"),
        require("../assets/img/tk.png"),
        require("../assets/img/07.png")
      ]
    };
  },
  methods: {
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
      this.popshow = false;
      this.matchshow = true;
      this.timer = setInterval(this.goTime, 1000);
    },
    onmessage(data) {
      if (!this.closeinfo) {
        let obj = JSON.parse(data.data);
        this.otherInfo = obj.opponentUser;
        this.myUser = obj.myUser;
        localStorage.setItem("otherInfo", JSON.stringify(this.otherInfo));
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
    goTo(item, key) {
      if (key == 0) {
        this.$router.push({
          path: "rank"
        });
      } else if (key == 1) {
        this.$router.push({
          path: "question"
        });
      } else if (key == 2) {
        Dialog.alert({
          title: "",
          className: "jsutAlert",
          message: this.userInfo.rule ? this.userInfo.rule : "暂无规则"
        }).then(() => {
          // on close
        });
      }
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
    },
    getData() {
      homePage().then(res => {
        if (res.code == "00000") {
          this.userInfo = res.data;
        }
      });
    }
  },
  mounted() {
    this.getData();
    let status = this.$route.query.status;
    if (status == "true") {
      this.beginTime();
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    if (window.ws) {
      this.closeinfo = true;
      window.ws.onclose = this.onclose;
    }
  }
};
</script>
<style lang="scss">
.vantdia {
  background: #313C3D;
}
.jsutAlert {
  .van-dialog__message {
    text-align: justify;
  }
}
</style>
<style lang="scss" scoped>
.home {
  display: flex;
  height: 100%;
  &-content {
    height: 100vh;
    &-top {
      width: 92%;
      height: 100px;
      margin: 0px auto;
      margin-top: 20px;
      background: url(../assets/img/homeinfo.jpg) no-repeat center center;
      background-size: contain;
      position: relative;
      .imgSrc {
        position: absolute;
        width: 60px;
        height: 60px;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      .infoNub {
        position: absolute;
        color: #2782ae;
        font-size: 18px;
        font-weight: 400;
        font-style: italic;
        top: 50px;
        &.info-left {
          left: 15%;
        }
        &.info-right {
          right: 15%;
        }
      }
    }
    .list {
      width: 92%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      img {
        width: 25%;
        height: 30px;
        cursor: pointer;
      }
    }
    .content-img {
      width: 92%;
      height: calc(100vh - 255px);
      margin: 10px auto;
      background: #fff;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .btn-submit {
      position: absolute;
      left: 30%;
      bottom: 50px;
      width: 40%;
      height: 80px;
      background: url(../assets/img/dt.png) no-repeat center center;
      background-size: contain;
      cursor: pointer;
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
