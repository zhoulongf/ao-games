<template>
  <div class="question">
    <div class="question-top">
      <div class="titles">{{titles}}</div>
      <img v-if="imgSrc" :src="imgSrc" />
    </div>
    <div class="question-list">
      <div
        class="question-list-item"
        :class="correct == item ? 'yescalss' : null"
        v-for="(item,index) in questions"
        :key="index"
      >
        <span class="titles">{{item}}</span>
        <img v-if="correct == item" class="correctquestion" src="../assets/img/yes1.png" />
      </div>
    </div>
    <div class="question-foot">
      <img src="../assets/img/prequestion.png" @click="prex(1)" />
      <div>问题{{currentPage}}/{{this.list.length}}</div>
      <img src="../assets/img/nextquestion.png" @click="prex(2)" />
    </div>
  </div>
</template>
<script>
import { getQuestionList } from "@/api/index.js";
import { shartMessage } from "@/utils/shar.js";
import Vue from "vue";
const lodash = require('lodash')
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "question",
  mixins: [shartMessage],
  data() {
    return {
      imgSrc: null,
      pageNum: 0,
      currentPage: 1,
      titles: null,
      result: null,
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
        this.result = item;
        this.onceClick = true;
        if (this.correct != item) {
          Toast("选择不正确");
        } else {
          this.corrStatus = true;
        }
        return false;
      }
    },
    prex:lodash.debounce(function(key){
      // if (!this.result) {
      //   Toast("请先选题");
      //   return false;
      // }
      if (key == 2) {
        if (this.pageNum < this.list.length - 1) {
          this.pageNum++;
          this.currentPage += 1;
        } else {
          Toast("已经是最后一题了");
          return false;
        }
      } else {
        if (this.pageNum > 0) {
          this.pageNum--;
          this.currentPage -= 1;
        } else {
          Toast("已经是第一题了");
          return false;
        }
      }
          this.titles = this.list[this.pageNum].body;
        this.imgSrc = this.list[this.pageNum].bodyPic;
        this.questions = this.list[this.pageNum].questions;
        this.correct = this.list[this.pageNum].result;
        this.corrStatus = false;
        this.onceClick = false;
        this.result = null;
      // });
    },300)
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
  .centers {
    text-align: center;
  }
  .titles{
    display: flex;
    justify-content: center;
  }
  &-top {
    width: 96%;
    height: 180px;
    padding: 0 20px;
    margin: 0 auto;
    margin-top: 40px;
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
    margin: 10px auto;
    overflow: hidden;
    &-item {
      box-sizing: border-box;
      margin-top: 10px;
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
      }
      &.yescalss {
        background: url(../assets/img/yes01.png) no-repeat center center;
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