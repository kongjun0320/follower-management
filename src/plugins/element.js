import Vue from 'vue'
import {
  Form,
  FormItem,
  Input,
  Button,
  Menu,
  MenuItem,
  Submenu,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Image,
  Upload,
  Message,
  MessageBox,
  Select,
  Option,
  Loading
} from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$loading = Loading

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Image)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)
