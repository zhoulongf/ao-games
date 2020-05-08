<template>
  <div class="record-content">
    <div class="record">
      <div class="record-list">
        <div
          class="record-item"
          v-for="(item,index) in 2"
          :key="index"
          :class="[activeIndex == index ? `item${index}` : null,index == 1 ? 'itemLast' : null]"
          @click="phClick(item,index)"
        ></div>
      </div>
      <div class="record-titles">
        <span class="span0">用户</span>
        <span class="span0">段位</span>
        <span class="span0">排行</span>
      </div>
      <div class="record-infos">
        <div class="record-infos-item" v-for="(item,index) in list" :key="index">
          <div class="item-left">
            <img src="../assets/img/rankdw.png" alt="暂无图片" />
            <span class="ative-item span0">{{item.name}}</span>
          </div>
          <div class="span0">{{item.title}}</div>
          <div class="item-right">
            <p class="span0">{{item.title}}</p>
            <p class="span2">第{{item.number}}名</p>
          </div>
        </div>
      </div>
      <img class="record-bt" src="@/assets/img/recordbt.png" />
    </div>
    <div class="foot-bottom">
      <img @click="goClick(1)" src="@/assets/img/gohome.png" />
      <img @click="goClick(2)" src="@/assets/img/goback.png" />
    </div>
  </div>
</template>
<script>
export default {
  name: "record",
  data() {
    return {
      activeIndex: 0,
      list: [
        {
          name: "山鸡炖蘑菇",
          number: 12,
          title: "秋明车神"
        },
        {
          name: "山鸡炖蘑菇",
          number: 13,
          title: "秋明车神"
        },
        {
          name: "山鸡炖蘑菇",
          number: 14,
          title: "秋明车神"
        },
        {
          name: "山鸡炖蘑菇",
          number: 15,
          title: "秋明车神"
        },
        {
          name: "山鸡炖蘑菇",
          number: 16,
          title: "秋明车神"
        },
        {
          name: "山鸡炖蘑菇",
          number: 17,
          title: "秋明车神"
        },
        {
          name: "山鸡炖蘑菇",
          number: 18,
          title: "秋明车神"
        },
        {
          name: "山鸡炖蘑菇",
          number: 19,
          title: "秋明车神"
        }
      ]
    };
  },
  methods: {
    phClick(item, index) {
      this.activeIndex = index;
    },
    goClick(key) {
      if (key === 1) {
        this.$router.push({
          path: "home"
        });
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.record-content {
  .record {
    width: 92%;
    height: auto;
    margin: 20px auto;
    background: url(../assets/img/recordbg.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    &-list {
      display: flex;
      justify-content: space-around;
      .record-item {
        width: 50%;
        height: 44px;
        cursor: pointer;
        &.itemLast {
          width: 48%;
          margin-right: 8px;
        }
        &.item0 {
          background: url(../assets/img/recordday.png) no-repeat center center;
          background-size: 100% 100%;
        }
        &.item1 {
          background: url(../assets/img/recordweek.png) no-repeat center center;
          background-size: 100% 100%;
        }
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
        flex: 2;
      }
    }
    &-infos {
      padding-right: 8px;
    //   margin-bottom: 10px;
      height: calc(100vh - 255px);
      overflow-y: auto;
      position: relative;
      &-item {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 10px 0;
        border-top: 1px solid #fff;
        text-align: center;
        div:nth-child(1) {
          flex: 3;
        }
        div:nth-child(2) {
          flex: 2;
        }
        div:nth-child(3) {
          flex: 2;
        }
        .item-left {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          span {
            margin-left: 5px;
          }
          img {
            width: 40px;
            height: 40px;
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
    height: 30px;
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