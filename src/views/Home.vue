<template>
  <div class="home">
    <k-header />
    <section class="main">
      <section class="menu">
        <el-menu
          v-model="isCollapse"
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#324157"
          text-color="#909399"
          active-text-color="#20a0ff"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
        </el-menu>
      </section>
      <section class="content">
        <el-button type="primary" @click="add" icon="el-icon-plus"
          >新增</el-button
        >
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="username" label="用户名"> </el-table-column>
          <el-table-column prop="password" label="密码"> </el-table-column>
          <el-table-column prop="nickname" label="昵称"> </el-table-column>
          <el-table-column prop="gender" label="性别"> </el-table-column>
          <el-table-column prop="description" label="简介"> </el-table-column>
          <el-table-column prop="age" label="年龄"> </el-table-column>
          <el-table-column prop="location" label="地址"> </el-table-column>
          <el-table-column prop="phone" label="电话"> </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">编辑</el-button>
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </section>
      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="活动名称" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirm('ruleForm')"
              >确认</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
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
      ruleForm: {
        username: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      dialogTableVisible: false,
      isCollapse: true,
      tableData: [
        {
          username: 'jack',
          password: '123456',
          nickname: 'jack',
          gender: '男',
          description: '描述',
          age: 21,
          location: '杭州',
          phone: '120323'
        },
        {
          username: 'jack',
          password: '123456',
          nickname: 'jack',
          gender: '男',
          description: '描述',
          age: 21,
          location: '杭州',
          phone: '120323'
        },
        {
          username: 'jack',
          password: '123456',
          nickname: 'jack',
          gender: '男',
          description: '描述',
          age: 21,
          location: '杭州',
          phone: '120323'
        }
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClick(row) {
      console.log(row)
    },
    add() {
      this.dialogTableVisible = true
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  .el-pagination {
    text-align: right;
    margin-top: 20px;
  }
  .el-button {
    margin-bottom: 20px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
  }
  .main {
    height: 100%;
    display: flex;
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
