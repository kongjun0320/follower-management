<template>
  <div class="user">
    <el-button
      type="primary"
      @click="dialogTableVisible = true"
      icon="el-icon-plus"
      >新增</el-button
    >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="category" label="分类"> </el-table-column>
      <el-table-column prop="image" label="图片">
        <template slot-scope="scope">
          <el-image style="width: 30px; height: 30px" :src="scope.row.image">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
      <el-table-column prop="oldPrice" label="老的价格"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
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
        <el-form-item label="分类" prop="category">
          <el-select v-model="ruleForm.category" placeholder="请选择">
            <el-option
              v-for="category in categorys"
              :key="category.value"
              :label="category.label"
              :value="category.value"
            >
            </el-option>
          </el-select>
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
        <el-form-item label="描述" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
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
  name: 'product',
  data() {
    return {
      fileList: [],
      disabled: false,
      categorys: [],
      total: 0,
      ruleForm: {
        name: '',
        category: '',
        image: '',
        price: '',
        oldPrice: '',
        description: '',
        sellCount: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        image: [{ required: true, message: '请输入图片地址', trigger: 'blur' }],
        category: [{ required: true, message: '请输入分类', trigger: 'blur' }],
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        oldPrice: [
          { required: true, message: '请输入老的价格', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述信息', trigger: 'blur' }
        ],
        sellCount: [{ required: true, message: '请输入销量', trigger: 'blur' }]
      },
      dialogTableVisible: false,

      tableData: [
        {
          name: 'jack',
          image: 'jack',
          category: '',
          price: '男',
          oldPrice: '',
          description: '描述',
          sellCount: '120323'
        }
      ],
      per_page: 7,
      page: 1
    }
  },
  created() {
    this._getCategory()
  },
  mounted() {
    this._getProduct()

    // this.$req.getCategoryById(this.ruleForm.category).then((res) => {
    //   console.log(res)
    // })
  },
  methods: {
    _getCategory() {
      this.categorys = []
      this.$req.getCategory().then((res) => {
        res.forEach((category) => {
          this.categorys.push({
            value: category._id,
            label: category.name
          })
        })
      })
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
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    del(row) {
      this.$req.delProduct(row._id).then((res) => {
        console.log(res)
        this.page = 1
        this._getProduct()
      })
    },
    async edit(row) {
      await this._getProductById(row._id)
      this.dialogTableVisible = true
    },
    currentPageChange(page) {
      this.page = page
      this._getProduct()
    },

    _getProductById(id) {
      this.$req.getUserById(id).then((res) => {
        const params = { ...res }
        delete params._id
        this.ruleForm = params
      })
    },
    _getProduct() {
      const { per_page, page } = this
      const params = { per_page, page }
      this.$req.getProduct(params).then((res) => {
        console.log(res)
        this.tableData = res.product
        this.total = res.total
      })
    },
    _addProduct() {
      const params = this.ruleForm
      this.$req.addProduct(params).then((product) => {
        this.$req.getCategoryById(this.ruleForm.category).then((res) => {
          const categoryParams = { ...res }
          const categoryId = categoryParams._id
          delete categoryParams._id
          categoryParams.foods.push(product._id)
          this.$req
            .addProductToCategory(categoryId, categoryParams)
            .then((category) => {
              console.log(category)
            })
        })
        this._getProduct()
        this.dialogTableVisible = false
      })
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._addProduct()
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
