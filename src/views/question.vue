<template>
  <div class="question">
    <div class="question-top">
        <span v-if="answerType !='picture'">{{titles}}</span>
        <img v-else src="../assets/img/homeinfo.jpg">
    </div>
    <div class="question-list">
      <div
        class="question-list-item"
        v-for="index in 3"
        :key="index"
        @click="chooseQuestion(index)"
      >
        <span>{{index}}</span>
        <img
          v-if="correct == index && corrStatus"
          class="correctquestion"
          src="../assets/img/yesquestion.png"
        />
      </div>
    </div>
    <div class="question-foot">
      <img src="../assets/img/prequestion.png" @click="prex(1)" />
      <div>问题1/20</div>
      <img src="../assets/img/nextquestion.png" @click="prex(2)" />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "question",
  data() {
    return {
        answerType:'picture',
      titles:"关于大好事领导刷卡睡觉撒老客户的哈是上课啦挥洒关于大好事领导刷卡睡觉撒老客户的哈是上课啦挥洒离开离开",
      correct: 2,
      corrStatus: false,
      onceClick: false
    };
  },
  methods: {
    chooseQuestion(key) {
      if (!this.onceClick) {
        this.onceClick = true;
        if (this.correct != key) {
          Toast("选择不正确");
        } else {
          this.corrStatus = true;
        }

        return false;
      }
    },
    prex(key) {
        this.answerType ='text'
      this.titles = "双卡双待的时刻";
      this.correct = 2;
      this.corrStatus = false;
      this.onceClick = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.question {
  height: 100%;
  position: relative;
  overflow: hidden;
  &-top {
    width: 96%;
    height: 180px;
    padding: 0 20px;
    margin: 0 auto;
    margin-top: 60px;
    background: url(../assets/img/question.png) no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 20px;
    font-weight: 600;
    font-size: 14px;
    img{
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
