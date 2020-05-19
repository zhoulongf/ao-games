<template>
  <div class="match">
    <div class="match-info">
      <div class="match-info-left">
        <img :src="myUser.myLitpicPath ? myUser.myLitpicPath : defaultHead" />
        <p>{{myUser.myName ? myUser.myName : 'xxx'}}</p>
      </div>
      <div class="match-info-conter">
        <div class="score-left score-left1 span1">0</div>
        <div class="score-center">{{number}}</div>
        <div class="score-right score-right1 span1">0</div>
      </div>
      <div class="match-info-left">
        <img :src="otherInfo.opponentLitpicPath ? otherInfo.opponentLitpicPath : defaultHead" />
        <p>{{otherInfo.opponentName ? otherInfo.opponentName : 'xxx'}}</p>
      </div>
    </div>
    <div class="match-answer">问题{{pageNum+1}}/{{questionList.length}}</div>
    <div class="match-top">
      <span>{{titles}}</span>
      <img v-if="imgSrc" :src="imgSrc" />
    </div>
    <div class="match-list">
      <div
        class="match-list-item"
        v-for="(item,index) in questions"
        :key="index"
        @click="chooseQuestion(index)"
      >
        <span>{{item}}</span>
        <img class="correctquestion" v-if="otherStatus == index" :src="otherResulr == item ? srcRight : srcError">
        <img
          v-if=" currentNUm==index && corrStatus"
          class="correctquestion"
          :src="correct == item ? srcRight : srcError"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "match",
  data() {
    return {
      titles: null,
      correct: null,//当前题的答案
      imgSrc: null,
      pageNum: 0,
      corrStatus: 1,//当前答题者是否答对
      onceClick: false,//每道题只能点击一次
      timer: null,
      currentNUm:-1,//获取当前答题者点击的哪一个选项
      otherStatus:0,//另一个答题者是否答对
      otherResulr:'C。adC',//另一个答题者的答案
      number: 20,
      questions: [],
      otherInfo: JSON.parse(localStorage.getItem("otherInfo")),
      myUser:JSON.parse(localStorage.getItem("myUser")),
      questionList:JSON.parse(localStorage.getItem("questionList")),
      defaultHead: require("@/assets/img/head.png"),
      srcRight: require("@/assets/img/yesquestion.png"),
      srcError: require("@/assets/img/error.png")
    };
  },
  methods: {
    clearTimer() {
      clearInterval(this.timer);
      this.number = 0;
    },
    goTime() {
      if (this.number <= 0) {
        this.clearTimer(this.timer);
      } else {
        --this.number;
      }
    },
    chooseQuestion(key) {
      if (!this.onceClick) {
        this.currentNUm=key
        this.onceClick = true;
        if (this.correct != key) {
          this.corrStatus = -1;
        } else {
          this.corrStatus = 1;
        }
        return false;
      }
    },
    beforeDestroy() {
      this.clearTimer(this.timer);
      this.timer = null;
      this.number = 20;
    },
    beginTime() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      }
      window.math = new WebSocket(
        "ws://192.168.10.2:8123/question/" + localStorage.getItem("token")
      );
      window.math.onopen = this.onopen;
      window.math.onmessage = this.onmessage;
      window.math.onerror = this.onerror;
    },
    onopen(e) {
      console.log("连接成功");
      this.timer = setInterval(this.goTime, 1000);
    },
    onmessage(data) {
      console.log(data);
      let obj = JSON.parse(data.data);
    },
    onerror(e) {
      console.log(e);
    },
    getData() {
      let questionList=this.questionList
      this.titles = questionList[this.pageNum].body;
      this.imgSrc = questionList[this.pageNum].bodyPic;
      this.questions = questionList[this.pageNum].questions;
      this.correct = questionList[this.pageNum].result;
    }
  },
  mounted() {
    this.beginTime();
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
.match {
  height: 100%;
  position: relative;
  overflow: hidden;
  &-info {
    width: 96%;
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    overflow: hidden;
    &-left {
      text-align: center;
      margin-top: 30px;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      p {
        font-size: 14px;
        font-weight: 400;
      }
    }
    &-conter {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      .score-left {
        width: 80px;
        height: 60px;
        line-height: 60px;
        background: url(../assets/img/left.png) no-repeat center center;
        background-size: 100% 100%;
        &.score-left1 {
          margin-right: -15px;
        }
      }
      .score-center {
        width: 90px;
        height: 90px;
        line-height: 90px;
        background: url(../assets/img/time.png) no-repeat center center;
        background-size: 100% 100%;
        z-index: 2;
        font-weight: 700;
        font-size: 20px;
        color: #fff;
      }
      .score-right {
        width: 80px;
        height: 60px;
        line-height: 60px;
        background: url(../assets/img/right.png) no-repeat center center;
        background-size: 100% 100%;
        &.score-right1 {
          margin-left: -15px;
        }
      }
    }
  }
  &-answer {
    text-align: center;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #555b5e;
  }
  &-top {
    width: 96%;
    height: 180px;
    padding: 0 20px;
    margin: 0 auto;
    margin-top: 10px;
    background: url(../assets/img/question.png) no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 20px;
    font-weight: 600;
    font-size: 14px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  &-list {
    width: 80%;
    margin: 20px auto;
    overflow: hidden;
    &-item {
      margin-top: 20px;
      min-height: 60px;
      padding: 0 20px;
      background: url(../assets/img/answer.png) no-repeat center center;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 20px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      position: relative;
      .correctquestion {
        position: absolute;
        width: 32px;
        height: 24px;
        right: -5px;
        top: -10px;
      }
    }
  }
  &-foot {
    position: absolute;
    left: 2%;
    bottom: 20px;
    width: 96%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    img {
      width: 30%;
      cursor: pointer;
    }
  }
}
</style>
