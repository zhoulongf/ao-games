<template>
  <div class="header-top" ref="headerChild">
    <p class="header-go" @click="goBack">
      <van-icon color="#000" size="18" name="arrow-left" />
    </p>
    <p class="header-titie" style="color:#000;">{{headerInfo.title}}</p>
  </div>
</template>
<script>
export default {
  props: {
    headerInfo: {
      type: Object
    },
    returnPath: {
      type: String
    }
  },
  data() {
    return {
      loginUser: "",
    };
  },
  methods: {
    goBack(){
        this.$router.go(-1);
    },
    historyGo() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss">
.header-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
  font-size: 16px;
  padding: 16px 10px;
  display: flex;
  align-items: center;
  color: #9853f5;
  background-color: #fff;
  border-bottom: 1px solid rgba(237,237,237,1);
  p {
    cursor: pointer;
  }
  .header-go{
    position: absolute;
    width: 18px;
    font-size: 0;
    line-height: 0;
  }
  .header-titie{
    flex: 1;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color:rgba(0,0,0,1);
  }
  .header-right{
    position:absolute;
    right: 16px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,0.45);
    img{
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin-bottom: 4px;
    }
  }
}
</style>
