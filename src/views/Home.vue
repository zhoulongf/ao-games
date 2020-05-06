<template>
  <div class="home">
    <div class="home-content">
      <div class="home-content-top">
        <div class="imgSrc"></div>
        <div class="infoNub info-left">6666</div>
        <div class="infoNub info-right">老司机</div>
      </div>
      <div class="list">
        <img v-for="(item,index) in list" :key="index" :src="item" alt="暂无图片" @click="goTo(item,index)">
      </div>
      <div class="content-img"></div>
      <div class="btn-submit"></div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/my-header";
export default {
  name: "Home",
  components: {
    MyHeader
  },
  data(){
    return {
      list:[require('../assets/img/ph.png'),require('../assets/img/tk.png'),require('../assets/img/gz.png')]
    }
  },
  methods:{
     goTo(item,key){
       if(key == 0){
         this.$router.push({
          path: "rank",
          query: {
            id: key
          }
        });
       }
     }
  }
};
</script>
<style lang="scss" scoped>
.home{
  &-content{
    &-top{
      width: 92%;
      height: 100px;
      margin: 0px auto;
      margin-top: 20px;
      background: url(../assets/img/homeinfo.jpg) no-repeat center center;
      background-size: contain;
      position: relative;
      .imgSrc{
        position: absolute;
        width: 60px;
        height: 60px;
        background: #ff0;
        border-radius: 50%;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
      }
      .infoNub{
        position: absolute;
        color: #2782AE;
        font-size: 18px;
        font-weight: 400;
        font-style: italic;
        top: 50px;
        &.info-left{
          left: 15%;
        }
        &.info-right{
          right: 15%;
        }
      }
    }
    .list{
      width: 92%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      img{
        width: 25%;
        height: 30px;
        cursor: pointer;
      }
    }
    .content-img{
      width: 92%;
      height: 350px;
      margin: 10px auto;
      background: #fff;
    }
    .btn-submit{
      width: 42%;
      height: 50px;
      margin: 0 auto;
      background: url(../assets/img/dt.png) no-repeat center center;
      background-size: contain;
      cursor: pointer;
    }
  }
}
</style>
