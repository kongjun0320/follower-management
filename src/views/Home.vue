<template>
  <div class="home">
    <k-header class="header-70" />
    <section class="main">
      <section class="menu">
        <el-menu
          v-model="isCollapse"
          default-active="/user"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :router="true"
          background-color="#324157"
          text-color="#909399"
          active-text-color="#20a0ff"
        >
          <el-menu-item index="/home/user">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/home/order">
            <i class="el-icon-setting"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="/home/product">
            <i class="el-icon-receiving"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="/home/category">
            <i class="el-icon-s-order"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
        </el-menu>
      </section>
      <section class="content">
        <router-view></router-view>
      </section>
    </section>
  </div>
</template>

<script>
import KHeader from '../components/header'
export default {
  name: 'Home',
  components: {
    KHeader
  },
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  .main {
    display: flex;
    flex: 1;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      height: 100%;
    }
    .menu {
      width: 200px;
      height: 100%;
    }
    .content {
      flex: 1;
      padding: 20px;
    }
  }
}
</style>
