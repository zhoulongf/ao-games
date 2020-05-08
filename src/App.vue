<template>
  <div id="app">
    <!-- <my-header :headerInfo="headerInfo"></my-header> -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/my-header";
export default {
  name: "app",
  components: {
    MyHeader
  },
  data() {
    return {
      headerInfo: {
        title: "小游戏"
      }
    };
  }
};
</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  // overflow: hidden;
  display: flex;
  flex-direction: column;
}
.content{
  flex: 1;
  background: url(./assets/img/homebg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
</style>
