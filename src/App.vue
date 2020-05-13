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
import { audirequest, audilogin } from "@/api/index.js";
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
  },
  methods: {
    getUrlParams(objName) {
      var data = window.location.href;
      if (data.indexOf("?") < 0) return undefined; //判断是否存在参数
      var allParamsArr = data.split("?")[1].split("&"),
        returnObj = {};
      if (allParamsArr.length == 0) return undefined;
      for (var i = 0; i < allParamsArr.length; i++) {
        returnObj[`${allParamsArr[i].split("=")[0]}`] = allParamsArr[i].split(
          "="
        )[1];
      }
      return returnObj[`${objName}`];
    }
  },
  mounted() {
    let token =this.getUrlParams("token")
    if (token) {
      sessionStorage.setItem("token", "394865d721587e87d38e9ca7e13404ce");
    }
    if (!sessionStorage.getItem("token")) {
      let params = {
        requestUrl: location.href,
        token: ""
      };
      audirequest(params).then(res => {
        location.replace(res.message);
      });
    }
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
.content {
  flex: 1;
  background: url(./assets/img/homebg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
</style>
