<template>
  <div class="order">
    <el-button type="primary" @click="create" icon="el-icon-plus"
      >新增
    </el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
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
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="confirm('ruleForm')"
            >确认
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data() {
    return {
      options: [
        {
          value: 1,
          label: '特价'
        },
        {
          value: 2,
          label: '折扣'
        },
        {
          value: -1,
          label: '无'
        }
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      disabled: false,
      total: 0,
      ruleForm: {
        name: '',
        description: '',
        type: -1
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入描述信息', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请输入类型', trigger: 'blur' }]
      },
      dialogTableVisible: false,

      tableData: [],
      per_page: 7,
      page: 1,
      type: 1,
      currentId: ''
    }
  },
  mounted() {
    this._getCategory()
  },
  methods: {
    create() {
      this.fileList = []
      this.ruleForm = {
        name: '',
        description: '',
        type: -1
      }
      this.type = 1
      this.dialogTableVisible = true
    },

    del(row) {
      this.$confirm('确定要删除嘛？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$req.delCategory(row._id).then((res) => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.page = 1
            this._getCategory()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async edit(row) {
      this.type = 2
      await this._getCategoryById(row._id)
      this.currentId = row._id
      this.dialogTableVisible = true
    },
    currentPageChange(page) {
      this.page = page
      this._getCategory()
    },

    _getCategoryById(id) {
      this.fileList = []
      this.$req.getCategoryById(id).then((res) => {
        const params = { ...res }
        delete params._id
        this.fileList.push({})
        this.fileList[0].url = res.image
        this.ruleForm = params
      })
    },
    _getCategory() {
      const { per_page, page } = this
      const params = { per_page, page }
      this.$req.getCategory(params).then((res) => {
        console.log(res)
        this.tableData = res.user
        this.total = res.total
      })
    },
    _addCategory() {
      const params = { ...this.ruleForm, type: Number(this.ruleForm.type) }
      this.$req.addCategory(params).then(() => {
        this._getCategory()
        this.dialogTableVisible = false
      })
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 1) {
            this._addCategory()
          } else {
            const params = { ...this.ruleForm }
            this.$req.updateCategory(this.currentId, params).then(() => {
              this.dialogTableVisible = false
              this._getCategory()
            })
          }
          this.$message({
            message: '操作成功',
            type: 'success'
          })
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
.order {
  .el-pagination {
    text-align: right;
    margin-top: 20px;
  }
  .el-button {
    margin-bottom: 20px;
  }
}
</style>
