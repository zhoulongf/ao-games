<template>
  <div class="record-content">
    <div class="record">
      <div class="record-list">
        <div
          class="record-item"
          v-for="(item,index) in 2"
          :key="index"
          :class="[activeIndex == index ? 'activeitems' : null]"
          @click="phClick(index)"
        >{{index == 0 ? '日排行奖励' : '周排行榜奖励'}}</div>
      </div>
      <div class="record-titles">
        <span class="span0">用户</span>
        <span class="span0">段位</span>
        <span class="span0">排行</span>
      </div>
      <div class="record-infos">
        <div class="record-infos-item" v-for="(item,index) in list" :key="index">
          <div class="item-left">
            <img :src="item.litpicPath" alt="暂无图片" />
            <span class="ative-item span0">{{item.nickName}}</span>
          </div>
          <div class="span0">{{item.level}}</div>
          <div class="item-right">
            <p class="span0">{{item.createTime ? $moment(item.createTime).format("YYYY年MM月DD日") : '--'}}</p>
            <p class="span2">第{{item.number ? item.number : 0}}名</p>
          </div>
        </div>
      </div>
      <!-- <img class="record-bt" src="@/assets/img/recordbt.png" /> -->
    </div>
    <div class="foot-bottom">
      <img @click="goClick(1)" src="@/assets/img/gohome.png" />
      <img @click="goClick(2)" src="@/assets/img/goback.png" />
    </div>
  </div>
</template>
<script>
import { awardList } from '@/api/index.js'
import { shartMessage } from "@/utils/shar.js";
export default {
  name: "record",
  mixins: [shartMessage],
  data() {
    return {
      activeIndex: 0,
      list: [],
      allList:[]
    };
  },
  methods: {
    phClick(index) {
      this.activeIndex = index;
      if(index == 0){
        this.list=JSON.parse(JSON.stringify(this.allList.dayList))
      }else{
        this.list=JSON.parse(JSON.stringify(this.allList.weekList))
      }
    },
    goClick(key) {
      if (key === 1) {
        this.$router.push({
          path: "home"
        });
      } else {
        this.$router.go(-1);
      }
    },
    getData(){
      awardList().then(res =>{
        if(res.data){
          this.allList=res.data
          this.list=res.data.dayList
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
.record-content {
  .record {
    width: 92%;
    height: auto;
    margin: 20px auto;
    padding-bottom: 30px;
    background: url(../assets/img/13.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    &-list {
      margin-right: 8px;
      display: flex;
      justify-content: space-around;
      border-bottom:4px solid #B0DBDD;
      .record-item {
        width: 50%;
        height: 38px;
        cursor: pointer;
        text-align:center;
        line-height:38px;
        color:#fff;
        font-size:14px;
        font-weight: bolder;
        &.itemLast {
          width: 48%;
          margin-right: 8px;
        }
        &.activeitems{
          background:#B0DDDF;
          border-top-left-radius:20px;
          border-top-right-radius:20px;
        }
        // &.item0 {
        //   background: url(../assets/img/recordday.png) no-repeat center center;
        //   background-size: 100% 100%;
        // }
        // &.item1 {
        //   background: url(../assets/img/recordweek.png) no-repeat center center;
        //   background-size: 100% 100%;
        // }
      }
    }
    &-titles {
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      span:nth-child(1) {
        flex: 3;
      }
      span:nth-child(2) {
        flex: 2;
      }
      span:nth-child(3) {
        flex: 3;
      }
    }
    &-infos {
      padding-right: 6px;
    //   margin-bottom: 10px;
      height: calc(100vh - 230px);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      position: relative;
      &-item {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 10px 0;
        border-top: 1px solid #B0DBDD;
        border-bottom: 1px solid #B0DBDD;
        text-align: center;
        div:nth-child(1) {
          flex: 3;
        }
        div:nth-child(2) {
          flex: 2;
        }
        div:nth-child(3) {
          flex: 3;
        }
        .item-left {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 10px;
          span {
            margin-left: 5px;
            font-size: 12px;
          }
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        .item-right {
          text-align: center;
        }
      }
    }
  }
  .record-bt {
    width: 100%;
    height: 20px;
  }
  .foot-bottom {
    width: 92%;
    margin: 0 auto;
    height: 36px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 28%;
      height: 100%;
      cursor: pointer;
    }
  }
}
</style>