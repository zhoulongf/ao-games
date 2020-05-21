<template>
  <div class="rank">
    <div class="rank-list">
      <div
        class="rank-item"
        v-for="(item,index) in 3"
        :key="index"
        :class="[activeIndex == index ? `item${index}` : null,index == 2 ? 'itemLast' : null]"
        @click="phClick(index)"
      ></div>
    </div>
    <div class="rank-infos">
      <div class="rank-infos-item" v-for="(item,index) in list" :key="index">
        <div class="item-left" :class="[index< 3 ? `left${index}` : null]">
          <span class="ative-item" v-if="index>2">{{++index}}</span>
        </div>
        <div class="item-center">
          <img :src="item.litpicPath" alt="暂无图片" />
          <div>
            <p class="span0 omit">{{item.nickName}}</p>
            <p class="span2">{{activeIndex == 0 ? '本日积分' : (activeIndex == 1 ? '本周积分' : '总积分')}}：{{item.border ? item.border : 0}}分</p>
          </div>
        </div>
        <div class="item-right omit">
          <img :src="item.levelPic ? item.levelPic : defaultsrc" alt="暂无图片" />
          <span class="span0">{{item.level ? item.level : '--'}}</span>
        </div>
      </div>
    </div>
    <div class="person-info">
      <div class="info-left">
        <img :src="myInfo.litpicPath" alt="暂无图片" />
        <div>
          <p class="span0 omit">{{myInfo.nickName ? myInfo.nickName : '***'}}</p>
          <p class="span2">{{integraltext}}</p>
        </div>
      </div>
      <div class="info-right">
        <div class="right-top">
          <img :src="myInfo.levelPic ? myInfo.levelPic : defaultsrc" />
          <span class="span0 omit">{{myInfo.level ? myInfo.level : '--'}}</span>
        </div>
        <p class="span2">{{rankText}}</p>
      </div>
    </div>
    <div class="rank-bottom">
      <p class="rank-top">
        <span class="span0" v-show="activeIndex !=2">进入排行榜前{{rankNum}}名，可获取影票{{ticketNum}}张</span>  
      </p>
      <div class="foot-bottom">
        <span class="span0" @click="gzclick">影票赢取规则及说明</span>
        <span class="span0" @click="goRecord">获奖记录</span>
      </div>
    </div>
    <div class="rigtFix" v-if="myInfo.isAward" @click="gomyRecord"></div>
    <van-dialog v-model="gzshow" title="影票赢取规则及说明">
      <div class="gz-dialog">
        <img v-if='myInfo.flowPic' :src='myInfo.flowPic' />
        <!-- <img v-if='myInfo.flowPic' :src='myInfo.flowPic' /> -->
        <span v-else>--</span>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import { ranking } from '@/api/index.js'
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
export default {
  name: "rank",
  data() {
    return {
      activeIndex: 0,
      integraltext:null,
      rankText:null,
      gzshow:false,
      rankNum:0,
      ticketNum:0,
      list: [],
      allList:[],
      myInfo:{},
      defaultsrc:require('@/assets/img/rankdw.png')
    };
  },
  methods: {
    phClick(index) {
      this.activeIndex = index;
      if(index == 0){
        this.list=JSON.parse(JSON.stringify(this.allList.day))
      }else if(index == 1){
        this.list=JSON.parse(JSON.stringify(this.allList.week))
      }else{
        this.list=JSON.parse(JSON.stringify(this.allList.all))
      }
      this.textSelect(index)
    },
    goRecord(){
      this.$router.push({
          path: "record"
        });
    },
    gomyRecord(){
      this.$router.push({
          path: "myrecord"
        });
    },
    gzclick(){
      this.gzshow=true
    },
    textSelect(key){
      switch(key){
        case 0:
          this.integraltext=`本日积分：${this.myInfo.dayBorder ? this.myInfo.dayBorder : 0}分`;
          this.rankText=`本日排名：${this.myInfo.dayBorder ? this.myInfo.dayRanking : '**' }名`;
          this.rankNum =this.myInfo.topFrewDay ? this.myInfo.topFrewDay : '**'
          this.ticketNum = this.myInfo.awardDay ? this.myInfo.awardDay : '**'
          break;
        case 1:
          this.integraltext=`本周积分：${this.myInfo.weekBorder ? this.myInfo.weekBorder : 0}分`;
          this.rankText=`本周排名：${this.myInfo.weekRanking ? this.myInfo.weekRanking : 0}名`;
          this.rankNum =this.myInfo.topFrewWeek ? this.myInfo.topFrewWeek : '**'
          this.ticketNum = this.myInfo.awardWeek ? this.myInfo.awardWeek : '**'
          break;
        case 2:
          this.integraltext=`总积分：${this.myInfo.allBorder ? this.myInfo.allBorder : 0}分`;
          this.rankText=`总排名：${this.myInfo.allRanking ? this.myInfo.allRanking : 0}名`;
          this.rankNum ="**"
          this.ticketNum = '**'
          break;
      }
    },
    getData(){
      ranking().then(res =>{
        if(res.code =='00000'){
          this.allList=res.data
          this.list=res.data.day
          this.myInfo=res.data.myInfo
          this.textSelect(0)
        }
      })
    }
  },
  mounted(){
    this.getData()
  }
};
</script>
<style lang="scss" scoped>
.rank {
  width: 92%;
  height: calc(100vh - 55px);
  margin: 30px auto;
  background: url(../assets/img/rankbg.png) no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  &-list {
    // padding-top: 5px;
    display: flex;
    justify-content: space-around;
    .rank-item {
      width: 33%;
      height: 34px;
      cursor: pointer;
      &.itemLast {
        width: 30%;
        margin-right: 8px;
      }
      &.item0 {
        background: url(../assets/img/rankday.png) no-repeat center center;
        background-size: cover;
      }
      &.item1 {
        background: url(../assets/img/rankweek.png) no-repeat center center;
        background-size: cover;
      }
      &.item2 {
        background: url(../assets/img/rankall.png) no-repeat center center;
        background-size: cover;
      }
    }
  }
  .item-center {
    flex: 1;
    height: 60px;
    background: #9ddadd;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .item-right {
    width: 90px;
    padding: 0 10px;
    vertical-align: middle;
    display: flex;
    align-items: center;
    img {
      width: 14px;
      height: 14px;
    }
  }
  &-infos {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &-item {
      width: 92%;
      margin: 10px auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 2px solid #2881b2;
      border-radius: 8px;
      background: #b1dddf;
      .item-left {
        width: 40px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        .ative-item {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          color: #fff;
          font-size: 12px;
          text-align: center;
          line-height: 20px;
          background-color: #2782b1;
        }
        &.left0 {
          background: url(../assets/img/madel0.png) no-repeat center center;
          background-size: 20px 30px;
        }
        &.left1 {
          background: url(../assets/img/madel1.png) no-repeat center center;
          background-size: 20px 30px;
        }
        &.left2 {
          background: url(../assets/img/madel2.png) no-repeat center center;
          background-size: 20px 30px;
        }
      }
    }
  }
  .person-info {
    display: flex;
    width: 92%;
    height: 60px;
    justify-content: space-between;
    margin: 5px auto;
    .info-left {
      width: 48%;
      height: 60px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .info-right {
      width: 30%;
      .right-top {
        margin-top: 10px;
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
  .rank-bottom{
    width: 98%;
    height: 80px;
    background: url(../assets/img/rankbottom.png) no-repeat center center;
    background-size: contain;
    .rank-top{
      margin-top:10px;
      text-align: center;
      height: 20px;
    }
    .foot-bottom{
      width: 80%;
      margin: 0 auto;
      height: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span{
        text-decoration:underline;
        cursor: pointer;
      }
    }
  }
  .rigtFix{
    position: fixed;
    width: 60px;
    height: 40px;
    right: 0;
    top: 60%;
    transform: translateY(-50%);
    background: url(../assets/img/rankno.png) no-repeat center center;
    background-size: 100% 100%;
    cursor: pointer;
  }
  .gz-dialog{
    width: 92%;
    height: auto;
    margin: 20px auto;
    text-align: center;
    img{
      width:80%;
      height:200px;
    }
  }
}
</style>