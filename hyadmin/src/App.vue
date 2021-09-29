<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style>
/* 通用样式 */
.el-form-item__label-wrap {
  margin-left: 0 !important;
}
.el-tag {
  cursor: pointer;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.nick_image {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  vertical-align: sub;
  margin-right: 5px;
}
</style>
