<template>
  <div class="home">
    <div class="home-content">
      <div class="home-content-top">
        <div class="imgSrc"></div>
        <div class="infoNub info-left">6666</div>
        <div class="infoNub info-right">老司机</div>
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
      <div class="content-img"></div>
      <div class="btn-submit" @click="beginTime"></div>
    </div>
    <van-dialog v-model="matchshow" :showConfirmButton="false" class="vantdia">
      <div class="match-dialog">
        <div class="match-top">
          <img src="../assets/img/fdj.png" />
          <p class="span0">正在寻找对手({{number}})</p>
        </div>
        <div class="match-center">
          <div class="match-center-left">
            <img src="../assets/img/myrecordyes.png" />
            <span class="span0">微信名称</span>
          </div>
          <div class="match-center-center">vs</div>
          <div class="match-center-left">
            <img src="../assets/img/myrecordyes.png" />
            <span class="span0">微信名称</span>
          </div>
        </div>
        <div class="match-footer" @click="closematch"></div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
import MyHeader from "@/components/my-header";
export default {
  name: "Home",
  components: {
    MyHeader
  },
  data() {
    return {
      matchshow: false,
      number: 0,
      timer: null,
      list: [
        require("../assets/img/ph.png"),
        require("../assets/img/tk.png"),
        require("../assets/img/gz.png")
      ]
    };
  },
  methods: {
    beginTime() {
      // this.matchshow = true;
      this.$router.push({
          path: "match",
          query: {
            id: 1
          }
        });
      // this.timer = setInterval(this.goTime, 1000);
    },
    goTo(item, key) {
      if (key == 0) {
        this.$router.push({
          path: "rank",
          query: {
            id: key
          }
        });
      } else if (key == 1) {
        this.$router.push({
          path: "question",
          query: {
            id: key
          }
        });
      } else if (key == 2) {
        Dialog.alert({
          title: "游戏规则",
          message: "后台返给我们"
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
      this.clearTimer();
      this.matchshow = false;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="scss">
.vantdia {
  background: #ccc;
}
</style>
<style lang="scss" scoped>
.home {
  &-content {
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
        background: #ff0;
        border-radius: 50%;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
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
    }
    .btn-submit {
      width: 40%;
      height: 50px;
      margin: 0 auto;
      margin-top: 20px;
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
}
</style>
