<template>
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
    <div class="record-infos">ddddd</div>
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
        }
      ]
    };
  },
  methods: {
    phClick(item, index) {
      this.activeIndex = index;
    }
  }
};
</script>
<style lang="scss" scoped>
.record {
  width: 92%;
  height: calc(100vh - 135px);
  margin: 30px auto;
  background: url(../assets/img/recordbg.png) no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .span0 {
    font-size: 14px;
    font-weight: 400;
    color: #fff;
  }
  .span1 {
    font-size: 16px;
    font-weight: 400;
    color: #fff;
  }
  .span2 {
    font-size: 12px;
    font-weight: 400;
    color: #fff;
  }
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
}
</style>