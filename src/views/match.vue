<template>
  <div class="match">
    <div class="match-info">
      <div class="match-info-left">
        <img :src="myUser.litpicPath ? myUser.litpicPath : defaultHead" />
        <p>{{myUser.nickname ? myUser.nickname : 'xxx'}}</p>
      </div>
      <div class="match-info-conter">
        <div class="score-left score-left1 span1">{{myGrad}}分</div>
        <div class="score-center">{{number}}s</div>
        <div class="score-right score-right1 span1">{{otherGrade}}分</div>
      </div>
      <div class="match-info-left">
        <img :src="otherInfo.litpicPath ? otherInfo.litpicPath : defaultHead" />
        <p>{{otherInfo.nickname ? otherInfo.nickname : 'xxx'}}</p>
      </div>
    </div>
    <div class="match-answer">问题{{currentPage}}/{{questionList.length}}</div>
    <div class="match-top">
      <span class="titles">{{titles}}</span>
      <img v-if="imgSrc" :src="imgSrc" />
    </div>
    <div class="match-list">
      <div
        class="match-list-item"
        v-for="(item,index) in questions"
        :key="index"
        @click="chooseQuestion(index,item)"
        :class="corrStatus && currentNUm==index ? (correct == item ? 'yesClass' : 'noClass') :  null"
      >
        <span class="titles">{{item}}</span>
        <!-- <img
          class="correctquestion"
          v-if="otherStatus == index"
          :src="otherResulr == item ? srcRight : srcError"
        />-->
        <img
          v-if=" currentNUm==index && corrStatus"
          class="correctquestion"
          :class="correct == item ? null : 'errorclass'"
          :src="correct == item ? srcRight : srcError"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
import { shartMessage } from "@/utils/shar.js";
Vue.use(Toast);
export default {
  name: "match",
  mixins: [shartMessage],
  data() {
    return {
      titles: null,
      correct: null, //当前题的答案
      imgSrc: null,
      currentPage: 1,
      pageNum: 0,
      corrStatus: null, //当前答题者是否答对
      onceClick: false, //每道题只能点击一次
      timer: null,
      option: null, //当前选择的答案
      currentNUm: -1, //获取当前答题者点击的哪一个选项
      // otherStatus: -1, //另一个答题者的选项
      // otherResulr: null, //另一个答题者的答案
      playUserId: localStorage.getItem("playUserId"), //如果是0 就是机器人
      number: 20,
      questions: [],
      questionId: null,
      myGrad: 0,
      otherGrade: 0,
      otherInfo: JSON.parse(localStorage.getItem("otherInfo")),
      myUser: JSON.parse(localStorage.getItem("myUser")),
      questionList: JSON.parse(localStorage.getItem("questionList")),
      defaultHead: require("@/assets/img/head.png"),
      srcRight: require("@/assets/img/yes1.png"),
      srcError: require("@/assets/img/error1.png")
    };
  },
  methods: {
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.number = 20;
    },
    goTime() {
      if (this.number <= 0) {
        this.clearTimer(this.timer);
        if (!this.option) {
          let stringInfo = {
            questionId: this.questionId,
            option: this.option
          };
          console.log("我没答题");
          if (window.math.readyState === 1) {
            window.math.send(JSON.stringify(stringInfo), res => {});
          }
        }
      } else {
        --this.number;
        if (this.playUserId == 0) {
          if (this.number === 10) {
            // const randomIntegerInRange = (min, max) =>
            //   Math.floor(Math.random() * (max - min + 1)) + min;
            // let mathNumb = randomIntegerInRange(0, this.questions.length - 1);
            // this.otherStatus = mathNumb;
            // this.otherResulr = this.questions[mathNumb];
            let stringInfo = {
              robot: "robot",
              questionId: this.questionId,
              option: null
            };
            if (window.math.readyState === 1) {
              console.log("我是人机");
              window.math.send(JSON.stringify(stringInfo), res => {
                // console.log(res);
              });
            }
          }
        }
      }
    },
    chooseQuestion(key, item) {
      if (!this.onceClick) {
        this.currentNUm = key;
        this.option = item;
        this.questionId = this.questionList[this.pageNum].id;
        this.onceClick = true;
        if (this.correct != item) {
          this.corrStatus = -1;
        } else {
          this.corrStatus = 1;
        }
        let stringInfo = {
          questionId: this.questionId,
          option: this.option
        };
        if (window.math.readyState === 1) {
          console.log("我答题了");
          window.math.send(JSON.stringify(stringInfo), res => {});
        }

        return false;
      }
    },
    beginTime() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      }
      window.math = new WebSocket(
        // "ws://192.168.10.2:8123/question/" + localStorage.getItem("token")
        "ws://47.110.91.228:8123/question/" + localStorage.getItem("token")
      );
      window.math.onopen = this.onopen;
      window.math.onmessage = this.onmessage;
      window.math.onerror = this.onerror;
    },
    onopen(e) {
      this.timer = setInterval(this.goTime, 1000);
    },
    onmessage(data) {
      let obj = JSON.parse(data.data);
      this.myGrad = obj.presentGrade;
      this.otherGrade = obj.opponentUser.grade;
      //判断两者都答完之后的操作
      console.log(obj.next, this.playUserId);
      if (this.pageNum < this.questionList.length - 1) {
        // console.log(this.currentPage, obj.presentSize);
        if (obj.next == true && this.currentPage == obj.presentSize) {
          this.clearTimer(this.timer);
          setTimeout(() => {
            this.pageNum++;
            this.currentPage += 1;
            this.getData(1);
          }, 2000);
        }
      } else {
        console.log(obj.presentSize,'dddd')
        if (obj.presentSize == 10) {
          this.clearTimer(this.timer);
          localStorage.setItem("myGrad", this.myGrad);
          localStorage.setItem("otherGrade", this.otherGrade);
          window.math.onclose = this.onclose;
          this.$router.push({
            path: "end",
            query: {
              status: this.myGrad > this.otherGrade ? "true" : "false",
              up:obj.up,
              upLevelName:obj.upLevelName
            }
          });
        }
      }

      // if (this.pageNum == this.questionList.length) {
      // }
    },
    onerror(e) {
      console.log(e);
    },
    onclose() {
      console.log("断开链接");
    },
    getData(type) {
      if (type) {
        this.timer = setInterval(this.goTime, 1000);
      }
      let questionList = this.questionList;
      this.corrStatus = null;
      this.onceClick = false;
      // this.otherStatus = -1;
      this.currentNUm = -1;
      // this.otherResulr = null;
      this.option = null;
      this.titles = questionList[this.pageNum].body;
      this.imgSrc = questionList[this.pageNum].bodyPic;
      this.questions = questionList[this.pageNum].questions;
      this.correct = questionList[this.pageNum].result;
      this.questionId = questionList[this.pageNum].id;
    }
  },
  mounted() {
    this.beginTime();
    this.getData();
    // this.timer = setInterval(this.goTime, 1000);
  },
  beforeDestroy() {
    this.clearTimer(this.timer);
  }
};
</script>
<style lang="scss" scoped>
.match {
  height: 100%;
  position: relative;
  overflow: hidden;
  .titles{
    display: flex;
    justify-content: center;
  }
  .centers {
    text-align: center;
  }
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
      max-height: 140px;
    }
  }
  &-list {
    width: 80%;
    margin: 20px auto;
    overflow: hidden;
    &-item {
      box-sizing: border-box;
      margin-top: 20px;
      padding: 20px;
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
        width: 24px;
        height: 20px;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
        &.errorclass {
          width: 20px;
        }
      }
      &.yesClass {
        background: url(../assets/img/yes01.png) no-repeat center center;
        background-size: 100% 100%;
      }
      &.noClass {
        background: url(../assets/img/no01.png) no-repeat center center;
        background-size: 100% 100%;
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
