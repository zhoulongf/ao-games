<template>
  <div class="question">
    <div class="question-top">
      <span>{{titles}}</span>
      <img v-if="imgSrc" :src="imgSrc" />
    </div>
    <div class="question-list">
      <div
        class="question-list-item"
        v-for="(item,index) in questions"
        @click="chooseQuestion(item,index)"
        :key="index"
      >
        <span>{{item}}</span>
        <img
          v-if="correct == item && (corrStatus && corrStatus !=-1)"
          class="correctquestion"
          src="../assets/img/yesquestion.png"
        />
      </div>
    </div>
    <div class="question-foot">
      <img src="../assets/img/prequestion.png" @click="prex(1)" />
      <div>问题{{pageNum}}/{{this.list.length}}</div>
      <img src="../assets/img/nextquestion.png" @click="prex(2)" />
    </div>
  </div>
</template>
<script>
import { getQuestionList } from "@/api/index.js";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "question",
  data() {
    return {
      imgSrc: null,
      pageNum: 0,
      titles:
        "关于大好事领导刷卡睡觉撒老客户的哈是上课啦挥洒关于大好事领导刷卡睡觉撒老客户的哈是上课啦挥洒离开离开",
      correct: null,
      corrStatus: -1, //判断答题是否正确
      onceClick: false,
      questions: [],
      list: []
    };
  },
  methods: {
    chooseQuestion(item, key) {
      if (!this.onceClick) {
        this.onceClick = true;
        if (this.correct != item) {
          Toast("选择不正确");
        } else {
          this.corrStatus = true;
        }
        return false;
      }
    },
    prex(key) {
      if(this.corrStatus ==-1){
        Toast("请先选题");
        return false
      }
      if(key ==2){
        if(this.pageNum < this.list.length-1){
          this.pageNum++
        }else{
          return false
        }
      }else{
        if(this.pageNum > 0){
          this.pageNum--
        }else{
          return false
        }
      }
        this.titles = this.list[this.pageNum].body;
        this.imgSrc = this.list[this.pageNum].bodyPic;
        this.questions = this.list[this.pageNum].questions;
        this.correct = this.list[this.pageNum].result;
        this.corrStatus = false;
        this.onceClick = false;
    }
  },
  mounted() {
    getQuestionList().then(res => {
      if (res.code == "00000") {
        this.list = res.data;
        if (this.list.length > 0) {
          this.titles = this.list[0].body;
          this.imgSrc = this.list[0].bodyPic;
          this.questions = this.list[0].questions;
          this.correct = this.list[0].result;
        }
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.question {
  height: 100vh;
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