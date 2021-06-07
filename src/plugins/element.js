import Vue from 'vue'
import 'element-ui/lib/theme-chalk/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import {
  Aside, Autocomplete,
  Breadcrumb, BreadcrumbItem,
  Button, Card, Cascader, CheckboxButton, CheckboxGroup, Col,
  Container, DatePicker, Dialog, Divider, Footer,
  Form,
  FormItem,
  Header,
  Input, Link,
  Main,
  Menu,
  MenuItem, Message, MessageBox, Option, PageHeader, Pagination, Radio, RadioGroup, Row, Select,
  Submenu, Switch, Table, TableColumn, TabPane, Tabs, Tag, Tooltip
} from 'element-ui'

Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Autocomplete)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Link)
Vue.use(Divider)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Cascader)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(CheckboxGroup)
Vue.use(CheckboxButton)
Vue.use(Tag)
Vue.use(PageHeader)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
