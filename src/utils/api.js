/* 存放项目中的所有地址 */

// 生产环境
// const apiHost = 'http://47.104.3.183/api'
// 开发环境
const apiHost = 'http://localhost:8080/api'
//
/* 用户相关接口 */
const AccountApis = {
  loginUrl: apiHost + '/account/login/',
  userInfoUrl: apiHost + '/account/users/1/',
  userListUrl: apiHost + '/account/users/',
  jsuserListUrl: apiHost + '/account/jsusers/'
}

/* 客户相关接口 */
const CustomerApis = {
  customerListUrl: apiHost + '/customer/customer/',
  customerDetailUrl: apiHost + '/customer/customer/#{id}/',
  customerAllListUrl: apiHost + '/customer/all/customer/',
  customerAllDetailUrl: apiHost + '/customer/all/customer/#{id}/',
  linkcustomerUrl: apiHost + '/customer/linkcustomer/',
  linkallcustomerUrl: apiHost + '/customer/linkallcustomer/',
  // customerEditUrl: apiHost + '/customer/customer/#{id}/',
  // customerDeleteUrl: apiHost + '/customer/customer/#{id}/',
  // customerCreateUrl: apiHost + '/customer/customer/'
  // 后端人员新建客户
  customerCreateUrl: apiHost + '/customer/customercreate/'
}
/* 联系人相关接口 */
const LiaisonApis = {
  liaisonListUrl: apiHost + '/liaison/liaison/',
  liaisonDetailUrl: apiHost + '/liaison/liaison/#{id}/',
  liaisonAllListUrl: apiHost + '/liaison/all/liaison/',
  liaisonAllDetailUrl: apiHost + '/liaison/all/liaison/#{id}/',
}
/* 拜访记录相关接口 */
const RecordApis = {
  recordListUrl: apiHost + '/record/record/',
  recordDetailUrl: apiHost + '/record/record/#{id}/',
  recordAllListUrl: apiHost + '/record/all/record/',
  recordAllDetailUrl: apiHost + '/record/all/record/#{id}/',
}
/* 商机相关接口 */
const BusinessApis = {
  businessListUrl: apiHost + '/business/business/',
  businessDetailUrl: apiHost + '/business/business/#{id}/',
  businessAllListUrl: apiHost + '/business/all/business/',
  businessAllDetailUrl: apiHost + '/business/all/business/#{id}/',
  businessProdListUrl: apiHost + '/business/businessproduct/',
  businessProdDetailUrl: apiHost + '/business/businessproduct/#{id}/',
}
/* OKR相关接口 */
/* 数据模块相关接口 */
const DataApis = {
  dataListUrl: apiHost + '/data/data/',
  weekCustomerUrl: apiHost + '/data/data/customer/',
  weekLiaisonUrl: apiHost + '/data/data/liaison/',
  weekRecordUrl: apiHost + '/data/data/record/',
  weekBusinessUrl: apiHost + '/data/data/business/'
}

/* 售前技术支持 */
const PreSupportApis = {
  preSupportListUrl: apiHost + '/backend/presupport/',
  preSupportAllListUrl: apiHost + '/backend/all/presupport/',
  preSupportAllDetailUrl: apiHost + '/backend/all/presupport/#{id}/',
  preSupportDetailUrl: apiHost + '/backend/presupport/#{id}/'
}

/* 实施 */
const ImplementApis = {
  implementListUrl: apiHost + '/backend/implement/',
  implementAllListUrl: apiHost + '/backend/all/implement/',
  implementAllDetailUrl: apiHost + '/backend/all/implement/#{id}/',
  implementDetailUrl: apiHost + '/backend/implement/#{id}/'
}

/* 售后技术支持 */
const AfterSupportApis = {
  afterSupportListUrl: apiHost + '/backend/aftersupport/',
  afterSupportAllListUrl: apiHost + '/backend/all/aftersupport/',
  afterSupportAllDetailUrl: apiHost + '/backend/all/aftersupport/#{id}/',
  afterSupportDetailUrl: apiHost + '/backend/aftersupport/#{id}/'
}

/* 维修 */
const ServiceApis = {
  serviceListUrl: apiHost + '/backend/service/',
  serviceAllListUrl: apiHost + '/backend/all/service/',
  serviceAllDetailUrl: apiHost + '/backend/all/service/#{id}/',
  serviceDetailUrl: apiHost + '/backend/service/#{id}/',
  serviceProcessListUrl: apiHost + '/backend/serviceprocess/',
  serviceProcessDetailUrl: apiHost + '/backend/serviceprocess/#{id}/'
}

export {
  ServiceApis,
  AfterSupportApis,
  ImplementApis,
  PreSupportApis,
  DataApis,
  BusinessApis,
  RecordApis,
  LiaisonApis,
  CustomerApis,
  AccountApis
}
