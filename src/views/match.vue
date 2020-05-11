<template>
  <div class="match">
    <div class="match-info">
      <div class="match-info-left">
        <img src="../assets/img/head.png" />
        <p>微信昵称</p>
      </div>
      <div class="match-info-conter">
        <div class="score-left score-left1 span1">0</div>
        <div class="score-center">20</div>
        <div class="score-right score-right1 span1">0</div>
      </div>
      <div class="match-info-left">
        <img src="../assets/img/head.png" />
        <p>微信昵称</p>
      </div>
    </div>
    <div class="match-answer">问题1/10</div>
    <div class="match-top">
      <span v-if="answerType !='picture'">{{titles}}</span>
      <img v-else src="../assets/img/homeinfo.jpg" />
    </div>
    <div class="match-list">
      <div class="match-list-item" v-for="index in 3" :key="index" @click="chooseQuestion(index)">
        <span>{{index}}</span>
        <img
          v-if="correct == index && corrStatus"
          class="correctquestion"
          src="../assets/img/yesquestion.png"
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
      answerType: "picture",
      titles:
        "关于大好事领导刷卡睡觉撒老客户的哈是上课啦挥洒关于大好事领导刷卡睡觉撒老客户的哈是上课啦挥洒离开离开",
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
    }
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
    &-left{
        text-align: center;
        margin-top: 30px;
        img{
            height: 60px;
            height: 60px;
        }
        p{
            font-size: 14px;
            font-weight: 400;
        }
    }
    &-conter{
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: center;
        .score-left{
            width: 80px;
            height: 60px;
            line-height: 60px;
            background: url(../assets/img/left.png) no-repeat center center;
            background-size: 100% 100%;
            &.score-left1{
                margin-right: -15px;
            }
        }
        .score-center{
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
        .score-right{
            width: 80px;
            height: 60px;
            line-height: 60px;
            background: url(../assets/img/right.png) no-repeat center center;
            background-size: 100% 100%;
            &.score-right1{
                margin-left: -15px;
            }
        }
    }
  }
  &-answer{
      text-align: center;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #555B5E;
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
