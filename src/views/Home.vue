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
        <el-button type="primary" @click="_addUser" icon="el-icon-plus"
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
              <el-button type="text" size="small" @click="edit(scope.row)"
                >编辑</el-button
              >
              <el-button @click="del(scope.row)" type="text" size="small"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="currentPageChange"
          background
          :current-page="page"
          :page-size="per_page"
          layout="prev, pager, next"
          :total="total"
        >
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
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="ruleForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-input v-model="ruleForm.gender"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="location">
            <el-input v-model="ruleForm.location"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirm('ruleForm')"
              >确认
            </el-button>
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
      total: 0,
      ruleForm: {
        username: '',
        password: '',
        nickname: '',
        gender: '',
        description: '',
        age: '',
        location: '',
        phone: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        gender: [{ required: true, message: '请输入性别', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入个人简介', trigger: 'blur' }
        ],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        location: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }]
      },
      dialogTableVisible: false,
      isCollapse: true,
      tableData: [
        {
          username: 'jack',
          nickname: 'jack',
          gender: '男',
          description: '描述',
          age: 21,
          location: '杭州',
          phone: '120323'
        }
      ],
      per_page: 7,
      page: 1
    }
  },
  mounted() {
    this._getUser()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    del(row) {
      this.$req.delUser(row._id).then((res) => {
        console.log(res)
        this.page = 1
        this._getUser()
      })
    },
    async edit(row) {
      await this._getUserById(row._id)
      this.dialogTableVisible = true
    },
    currentPageChange(page) {
      this.page = page
      this._getUser()
    },

    _getUserById(id) {
      this.$req.getUserById(id).then((res) => {
        const params = { ...res }
        delete params._id
        this.ruleForm = params
      })
    },
    _getUser() {
      const { per_page, page } = this
      const params = { per_page, page }
      this.$req.getUser(params).then((res) => {
        console.log(res)
        this.tableData = res.user
        this.total = res.total
      })
    },
    _addUser() {
      this.dialogTableVisible = true
      const params = this.ruleForm
      this.$req.addUser(params).then(() => {
        this._getUser()
        this.dialogTableVisible = false
      })
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._addUser()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.el-table__row {
  td {
    padding: 0;
  }
}
</style>
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
