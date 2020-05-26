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
        title: "一汽-大众奥迪车主互动游戏"
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
    var that = this;
    let originUrl = location.href;
    let params = {
      requestUrl: location.href,
      token: ""
    };
    if (that.getUrlParams("token")) {
      localStorage.setItem("token", that.getUrlParams("token"));
    }
    if (localStorage.getItem("token")) {
      params.token = localStorage.getItem("token");
    }
    audirequest(params).then(res => {
      if (res.result == "FAIL") {
        location.replace(res.message);
      } else {
        location.replace(originUrl);
      }
    });
    // let token =this.getUrlParams("token")
    // if (token) {
    //   sessionStorage.setItem("token", token);
    // }
    // if (!sessionStorage.getItem("token")) {
    //   let params = {
    //     requestUrl: location.href,
    //     token: ""
    //   };
    //   audirequest(params).then(res => {
    //     location.replace(res.message);
    //   });
    // }
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
  background: url(./assets/img/nohome.png) no-repeat center center;
  background-size: 100% 100%;
}
</style>
