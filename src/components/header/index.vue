<template>
  <header class="header">
    <section class="left">
      <img
        class="toggle-menu"
        src="../../assets/images/toggle-menu.svg"
        alt=""
      />
      <span class="name">后台管理系统</span>
    </section>
    <section class="right">
      <span class="name">admin</span>
      <el-button
        :style="{ 'margin-left': '20px' }"
        @click="$router.push('/login')"
        type="primary"
        >退出登录
      </el-button>
    </section>
  </header>
</template>

<script>
export default {
  name: 'KHeader'
}
</script>

<style lang="scss" scoped>
.header {
  height: 70px;
  min-height: 70px;
  width: 100%;
  font-size: 22px;
  background-color: #242f42;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px 0 20px;
  .left {
    .toggle-menu {
      cursor: pointer;
      height: 18px;
      margin-right: 20px;
    }
  }
}
</style>
