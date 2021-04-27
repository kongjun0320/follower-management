<template>
  <div class="order">
    <el-button
      type="primary"
      @click="dialogTableVisible = true"
      icon="el-icon-plus"
      >新增</el-button
    >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="info" label="简介"> </el-table-column>
      <el-table-column prop="image" label="图片">
        <template slot-scope="scope">
          <el-image style="width: 30px; height: 30px" :src="scope.row.image">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
      <el-table-column prop="oldPrice" label="老价格"> </el-table-column>
      <el-table-column prop="count" label="库存量"> </el-table-column>
      <el-table-column prop="sellCount" label="销量"> </el-table-column>
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
        <el-form-item label="描述" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="info">
          <el-input v-model="ruleForm.info"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <!-- <el-input v-model="ruleForm.image"></el-input> -->
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
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
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
        <el-form-item label="价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="老的价格" prop="oldPrice">
          <el-input v-model="ruleForm.oldPrice"></el-input>
        </el-form-item>
        <el-form-item label="库存量" prop="count">
          <el-input v-model="ruleForm.count"></el-input>
        </el-form-item>
        <el-form-item label="销量" prop="sellCount">
          <el-input v-model="ruleForm.sellCount"></el-input>
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
  name: 'Order',
  data() {
    return {
      fileList: [],
      disabled: false,
      total: 0,
      ruleForm: {
        name: '',
        description: '',
        info: '',
        image: '',
        price: '',
        oldPrice: '',
        count: '',
        sellCount: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入描述信息', trigger: 'blur' }
        ],
        info: [{ required: true, message: '请输入简介', trigger: 'blur' }],
        image: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        oldPrice: [
          { required: true, message: '请输入老的价格', trigger: 'blur' }
        ],
        count: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        sellCount: [
          { required: true, message: '请输入销售数量', trigger: 'blur' }
        ]
      },
      dialogTableVisible: false,

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
    this._gerOrder()
  },
  methods: {
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
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    del(row) {
      this.$confirm('确定要删除嘛？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$req.delOrder(row._id).then((res) => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.page = 1
            this._gerOrder()
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
      await this._gerOrderById(row._id)
      this.dialogTableVisible = true
    },
    currentPageChange(page) {
      this.page = page
      this._gerOrder()
    },

    _gerOrderById(id) {
      this.fileList = []
      this.$req.getOrderById(id).then((res) => {
        const params = { ...res }
        delete params._id
        this.fileList.push({})
        this.fileList[0].url = res.image
        this.ruleForm = params
      })
    },
    _gerOrder() {
      const { per_page, page } = this
      const params = { per_page, page }
      this.$req.getOrder(params).then((res) => {
        console.log(res)
        this.tableData = res.user
        this.total = res.total
      })
    },
    _addOrder() {
      const params = this.ruleForm
      this.$req.addOrder(params).then(() => {
        this._gerOrder()
        this.dialogTableVisible = false
      })
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._addOrder()
          this.$message({
            message: '添加成功',
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
