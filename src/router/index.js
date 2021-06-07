import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Data from '../views/data/Data'
import DataWeek from '../views/data/DataWeek'
import Customer from '../views/customer/Customer'
import Liaison from '../views/liaison/Liaison'
import Record from '../views/record/Record'
import Business from '../views/business/Business'
import Okr from '../views/okr/Okr'
import CustomerDetail from '../views/customer/CustomerDetail'
import CustomerAdd from '../views/customer/CustomerAdd'
import CustomerEdit from '../views/customer/CustomerEdit'
import LiaisonAdd from '../views/liaison/LiaisonAdd'
import LiaisonDetail from '../views/liaison/LiaisonDetail'
import LiaisonEdit from '../views/liaison/LiaisonEdit'
import RecordAdd from '../views/record/RecordAdd'
import RecordDetail from '../views/record/RecordDetail'
import RecordEdit from '../views/record/RecordEdit'
import BusinessAdd from '../views/business/BusinessAdd'
import BusinessDetail from '../views/business/BusinessDetail'
import BusinessEdit from '../views/business/BusinessEdit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'Data',
    meta: {
      title: '济南控创电子科技有限公司客户关系管理系统'
    },
    children: [
      // 数据汇总
      {
        path: '/data',
        name: 'Data',
        component: Data,
        meta: {
          title: 'CRM-数据一览'
        }
      },
      {
        path: '/data/week',
        name: 'DataWeek',
        component: DataWeek,
        meta: {
          title: 'CRM-一周工作汇总'
        }
      },
      // okr模块
      {
        path: '/okr',
        name: 'Okr',
        component: Okr,
        meta: {
          title: 'CRM-OKR列表'
        }
      },
      // 客户模块
      {
        path: '/customer',
        name: 'Customer',
        component: Customer,
        meta: {
          title: 'CRM-客户列表'
        }
      },
      {
        path: '/customer/add',
        name: 'CustomerAdd',
        component: CustomerAdd,
        meta: {
          title: 'CRM-添加客户'
        }
      },
      {
        path: '/customer/detail/:id',
        name: 'CustomerDetail',
        component: CustomerDetail,
        meta: {
          title: 'CRM-客户详情'
        }
      },
      {
        path: '/customer/edit/:id',
        name: 'CustomerEdit',
        component: CustomerEdit,
        meta: {
          title: 'CRM-编辑客户'
        }
      },
      // 联系人模块
      {
        path: '/liaison',
        name: 'Liaison',
        component: Liaison,
        meta: {
          title: 'CRM-联系人列表'
        }
      },
      {
        path: '/liaison/add',
        name: 'LiaisonAdd',
        component: LiaisonAdd,
        meta: {
          title: 'CRM-添加联系人'
        }
      },
      {
        path: '/liaison/detail/:id',
        name: 'LiaisonDetail',
        component: LiaisonDetail,
        meta: {
          title: 'CRM-联系人详情'
        }
      },
      {
        path: '/liaison/edit/:id',
        name: 'LiaisonEdit',
        component: LiaisonEdit,
        meta: {
          title: 'CRM-编辑联系人'
        }
      },
      // 拜访记录模块
      {
        path: '/record',
        name: 'Record',
        component: Record,
        meta: {
          title: 'CRM-拜访记录列表'
        }
      },
      {
        path: '/record/add',
        name: 'RecordAdd',
        component: RecordAdd,
        meta: {
          title: 'CRM-添加拜访记录'
        }
      },
      {
        path: '/record/detail/:id',
        name: 'RecordDetail',
        component: RecordDetail,
        meta: {
          title: 'CRM-拜访记录详情'
        }
      },
      {
        path: '/record/edit/:id',
        name: 'RecordEdit',
        component: RecordEdit,
        meta: {
          title: 'CRM-编辑拜访记录'
        }
      },
      // 商机模块
      {
        path: '/business',
        name: 'Business',
        component: Business,
        meta: {
          title: 'CRM-商机列表'
        }
      },
      {
        path: '/business/add',
        name: 'BusinessAdd',
        component: BusinessAdd,
        meta: {
          title: 'CRM-添加商机'
        }
      },
      {
        path: '/business/detail/:id',
        name: 'BusinessDetail',
        component: BusinessDetail,
        meta: {
          title: 'CRM-商机详情'
        }
      },
      {
        path: '/business/edit/:id',
        name: 'BusinessEdit',
        component: BusinessEdit,
        meta: {
          title: 'CRM-修改商机'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
