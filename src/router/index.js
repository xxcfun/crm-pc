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
import LiaisonAdd from '../views/liaison/LiaisonAdd'
import LiaisonDetail from '../views/liaison/LiaisonDetail'
import RecordAdd from '../views/record/RecordAdd'
import RecordDetail from '../views/record/RecordDetail'
import BusinessAdd from '../views/business/BusinessAdd'
import BusinessDetail from '../views/business/BusinessDetail'
import Login from '../views/account/Login'
import AddLiaison from '../views/customer/AddLiaison'
import AddRecord from '../views/customer/AddRecord'
import AddBusiness from '../views/customer/AddBusiness'
import CustomerAll from '../views/customer/CustomerAll'
import CustomerAllDetail from '../views/customer/CustomerAllDetail'
import LiaisonAll from '../views/liaison/LiaisonAll'
import LiaisonAllDetail from '../views/liaison/LiaisonAllDetail'
import RecordAll from '../views/record/RecordAll'
import RecordAllDetail from '../views/record/RecordAllDetail'
import BusinessAll from '../views/business/BusinessAll'
import BusinessAllDetail from '../views/business/BusinessAllDetail'
import ServiceAdd from '../views/service/ServiceAdd'
import Service from '../views/service/Service'
import PreSupport from '../views/presupport/PreSupport'
import PreSupportAdd from '../views/presupport/PreSupportAdd'
import AfterSupport from '../views/aftersupport/AfterSupport'
import AfterSupportAdd from '../views/aftersupport/AfterSupportAdd'
import Implement from '../views/implement/Implement'
import ImplementAdd from '../views/implement/ImplementAdd'
import PreSupportDetail from '../views/presupport/PreSupportDetail'
import ImplementDetail from '../views/implement/ImplementDetail'
import AfterSupportDetail from '../views/aftersupport/AfterSupportDetail'
import ServiceDetail from '../views/service/ServiceDetail'
import ServiceAll from '../views/service/ServiceAll'
import ServiceAllDetail from '../views/service/ServiceAllDetail'
import AfterSupportAllDetail from '../views/aftersupport/AfterSupportAllDetail'
import AfterSupportAll from '../views/aftersupport/AfterSupportAll'
import ImplementAllDetail from '../views/implement/ImplementAllDetail'
import ImplementAll from '../views/implement/ImplementAll'
import PreSupportAllDetail from '../views/presupport/PreSupportAllDetail'
import PreSupportAll from '../views/presupport/PreSupportAll'
import CustomerCreate from '../views/customer/CustomerCreate'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'data',
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
        path: '/customer/create',
        name: 'CustomerCreate',
        component: CustomerCreate,
        meta: {
          title: 'CRM-创建客户'
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
        path: '/customer/all',
        name: 'CustomerAll',
        component: CustomerAll,
        meta: {
          title: 'CRM-所有客户列表'
        }
      },
      {
        path: '/customer/all/detail/:id',
        name: 'CustomerAllDetail',
        component: CustomerAllDetail,
        meta: {
          title: 'CRM-客户详情'
        }
      },
      {
        path: '/liaison/add/:id',
        name: 'AddLiaison',
        component: AddLiaison,
        meta: {
          title: 'CRM-添加联系人'
        }
      },
      {
        path: '/record/add/:id',
        name: 'AddRecord',
        component: AddRecord,
        meta: {
          title: 'CRM-添加拜访记录'
        }
      },
      {
        path: '/business/add/:id',
        name: 'AddBusiness',
        component: AddBusiness,
        meta: {
          title: 'CRM-添加商机'
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
        path: '/liaison/all',
        name: 'LiaisonAll',
        component: LiaisonAll,
        meta: {
          title: 'CRM-所有联系人列表'
        }
      },
      {
        path: '/liaison/all/detail/:id',
        name: 'LiaisonAllDetail',
        component: LiaisonAllDetail,
        meta: {
          title: 'CRM-联系人详情'
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
        path: '/record/all',
        name: 'RecordAll',
        component: RecordAll,
        meta: {
          title: 'CRM-所有拜访记录列表'
        }
      },
      {
        path: '/record/all/detail/:id',
        name: 'RecordAllDetail',
        component: RecordAllDetail,
        meta: {
          title: 'CRM-拜访记录详情'
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
        path: '/business/all',
        name: 'BusinessAll',
        component: BusinessAll,
        meta: {
          title: 'CRM-所有商机列表'
        }
      },
      {
        path: '/business/all/detail/:id',
        name: 'BusinessAllDetail',
        component: BusinessAllDetail,
        meta: {
          title: 'CRM-商机详情'
        }
      },
      // 售前支持模块
      {
        path: '/presupport',
        name: 'PreSupport',
        component: PreSupport,
        meta: {
          title: 'CRM-售前支持记录列表'
        }
      },
      {
        path: '/presupport/all',
        name: 'PreSupportAll',
        component: PreSupportAll,
        meta: {
          title: 'CRM-售前支持记录列表'
        }
      },
      {
        path: '/presupport/add',
        name: 'PreSupportAdd',
        component: PreSupportAdd,
        meta: {
          title: 'CRM-添加售前支持记录'
        }
      },
      {
        path: '/presupport/detail/:id',
        name: 'PreSupportDetail',
        component: PreSupportDetail,
        meta: {
          title: 'CRM-售前支持记录详情'
        }
      },
      {
        path: '/presupport/all/detail/:id',
        name: 'PreSupportAllDetail',
        component: PreSupportAllDetail,
        meta: {
          title: 'CRM-售前支持记录详情'
        }
      },
      // 实施模块
      {
        path: '/implement',
        name: 'Implement',
        component: Implement,
        meta: {
          title: 'CRM-实施测试记录列表'
        }
      },
      {
        path: '/implement/all',
        name: 'ImplementAll',
        component: ImplementAll,
        meta: {
          title: 'CRM-实施测试记录列表'
        }
      },
      {
        path: '/implement/add',
        name: 'ImplementAdd',
        component: ImplementAdd,
        meta: {
          title: 'CRM-添加实施测试记录'
        }
      },
      {
        path: '/implement/detail/:id',
        name: 'ImplementDetail',
        component: ImplementDetail,
        meta: {
          title: 'CRM-实施测试记录详情'
        }
      },
      {
        path: '/implement/all/detail/:id',
        name: 'ImplementAllDetail',
        component: ImplementAllDetail,
        meta: {
          title: 'CRM-实施测试记录详情'
        }
      },
      // 售后支持模块
      {
        path: '/aftersupport',
        name: 'AfterSupport',
        component: AfterSupport,
        meta: {
          title: 'CRM-售后支持记录列表'
        }
      },
      {
        path: '/aftersupport/all',
        name: 'AfterSupportAll',
        component: AfterSupportAll,
        meta: {
          title: 'CRM-售后支持记录列表'
        }
      },
      {
        path: '/aftersupport/add',
        name: 'AfterSupportAdd',
        component: AfterSupportAdd,
        meta: {
          title: 'CRM-添加售后支持记录'
        }
      },
      {
        path: '/aftersupport/detail/:id',
        name: 'AfterSupportDetail',
        component: AfterSupportDetail,
        meta: {
          title: 'CRM-售后支持记录详情'
        }
      },
      {
        path: '/aftersupport/all/detail/:id',
        name: 'AfterSupportAllDetail',
        component: AfterSupportAllDetail,
        meta: {
          title: 'CRM-售后支持记录详情'
        }
      },
      // 售后维修模块
      {
        path: '/service',
        name: 'Service',
        component: Service,
        meta: {
          title: 'CRM-售后维修列表'
        }
      },
      {
        path: '/service/all',
        name: 'ServiceAll',
        component: ServiceAll,
        meta: {
          title: 'CRM-售后维修列表'
        }
      },
      {
        path: '/service/add',
        name: 'ServiceAdd',
        component: ServiceAdd,
        meta: {
          title: 'CRM-添加售后维修记录'
        }
      },
      {
        path: '/service/detail/:id',
        name: 'ServiceDetail',
        component: ServiceDetail,
        meta: {
          title: 'CRM-售后维修记录详情'
        }
      },
      {
        path: '/service/all/detail/:id',
        name: 'ServiceAllDetail',
        component: ServiceAllDetail,
        meta: {
          title: 'CRM-售后维修记录详情'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录济南控创电子科技有限公司客户关系管理系统'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
