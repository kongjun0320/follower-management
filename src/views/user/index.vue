<template>
  <div class="user">
    <el-button type="primary" @click="create" icon="el-icon-plus"
      >新增</el-button
    >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="image" label="头像">
        <template slot-scope="scope">
          <el-image style="width: 20px; height: 20px" :src="scope.row.image">
          </el-image>
        </template>
      </el-table-column>
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
    <el-dialog title="操作" :visible.sync="dialogTableVisible">
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
        <el-form-item label="图片" prop="image">
          <el-upload
            action="http://localhost:3333/upload"
            :limit="1"
            :multiple="false"
            :auto-upload="true"
            :file-list="fileList"
            list-type="picture-card"
            :on-success="uploadSuccess"
            :on-exceed="uploadExceed"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>

                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
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
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      fileList: [],
      disabled: false,
      dialogImageUrl: '',
      dialogVisible: false,
      total: 0,
      ruleForm: {
        username: '',
        image: '',
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
        image: [{ required: true, message: '请输入密码', trigger: 'blur' }],
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

      tableData: [],
      per_page: 7,
      page: 1,
      currentId: '',
      type: '1'
    }
  },
  mounted() {
    this._getUser()
  },
  methods: {
    create() {
      this.type = 1 //新增
      this.fileList = []
      this.ruleForm = {
        username: '',
        image: '',
        password: '',
        nickname: '',
        gender: '',
        description: '',
        age: '',
        location: '',
        phone: ''
      }
      this.dialogTableVisible = true
    },
    uploadSuccess(res) {
      this.ruleForm.image = res.url
    },
    uploadExceed(...args) {
      console.log(args)
      this.$message({
        message: '操作失败，只允许上传一张图片',
        type: 'error'
      })
    },
    handleRemove(file) {
      console.log(file)
      this.fileList = []
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    del(row) {
      this.$req.delUser(row._id).then((res) => {
        console.log(res)
        this.page = 1
        this._getUser()
      })
    },
    async edit(row) {
      this.type = 2 //编辑
      await this._getUserById(row._id)
      this.currentId = row._id
      this.dialogTableVisible = true
    },
    currentPageChange(page) {
      this.page = page
      this._getUser()
    },

    _getUserById(id) {
      this.fileList = []
      this.$req.getUserById(id).then((res) => {
        const params = { ...res }
        delete params._id
        this.ruleForm = params
        this.fileList.push({})
        this.fileList[0].url = res.image
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
      const params = this.ruleForm
      this.$req.addUser(params).then(() => {
        this._getUser()
        this.dialogTableVisible = false
      })
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 1) {
            this._addUser()
          } else {
            const params = { ...this.ruleForm }
            this.$req.updateUser(this.currentId, params).then(() => {
              this._getUser()
              this.dialogTableVisible = false
            })
          }
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
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
.el-button {
  margin-bottom: 20px;
}
</style>
