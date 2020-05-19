<template>
  <div class="end">
    <div class="end-top" :class="endType == 'true' ? 'topyes' : 'topno'">
      <div class="jfinfo">
        <div class="jfinfo-left span2">{{myGrad ? myGrad : 0}}</div>
        <div class="jfinfo-right span2">{{otherGrade ? otherGrade : 0}}</div>
      </div>
    </div>
    <div class="end-center">
      <div class="end-center-left">
        <img :src="myUser.litpicPath ? myUser.litpicPath : defaultHead" />
        <span class="span0">{{myUser.myName ? myUser.myName : 'xxx'}}</span>
      </div>
      <div class="end-center-center">vs</div>
      <div class="end-center-left">
        <img :src="otherInfo.litpicPath ? otherInfo.litpicPath : defaultHead" />
        <span class="span0">{{otherInfo.opponentName ? otherInfo.opponentName : 'xxx'}}</span>
      </div>
    </div>
    <div class="end-foot again" @click="goclick(1)"></div>
    <div class="end-foot goback" @click="goclick(2)"></div>
  </div>
</template>
<script lang="ts">
export default {
  name: "end",
  data() {
    return {
      endType: null,
      myGrad: localStorage.getItem("myGrad"),
      otherGrade: localStorage.getItem("otherGrade"),
      otherInfo: JSON.parse(localStorage.getItem("otherInfo")),
      myUser: JSON.parse(localStorage.getItem("myUser")),
      defaultHead: require("@/assets/img/head.png")
    };
  },
  methods: {
    goclick(key) {
      this.$router.push({
        path: "home",
        query:{
          status:key==1 ? true : false
        }
      });
    }
  },
  mounted() {
    let status =this.$route.query.status
    if (status) {
      this.endType = status
    } else {
      this.endType = 'false';
    }
  }
};
</script>
<style lang="scss" scoped>
.end {
  width: 92%;
  height: calc(100vh - 135px);
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
}
</style>
