/* 存放项目中的所有地址 */

const apiHost = 'http://localhost:8080/api'

/* 用户相关接口 */
const AccountApis = {
  loginUrl: apiHost + '/account/login/',
  userInfoUrl: apiHost + '/account/login/'
}

/* 客户相关接口 */
const CustomerApis = {
  customerListUrl: apiHost + '/customer/customer/',
  customerDetailUrl: apiHost + '/customer/customer/#{id}/',
  linkcustomerUrl: apiHost + '/customer/linkcustomer/'
  // customerEditUrl: apiHost + '/customer/customer/#{id}/',
  // customerDeleteUrl: apiHost + '/customer/customer/#{id}/',
  // customerCreateUrl: apiHost + '/customer/customer/'
}
/* 联系人相关接口 */
const LiaisonApis = {
  liaisonListUrl: apiHost + '/liaison/liaison/',
  liaisonDetailUrl: apiHost + '/liaison/liaison/#{id}/',
  // liaisonEditUrl: apiHost + '/liaison/liaison/#{id}/',
  // liaisonDeleteUrl: apiHost + '/liaison/liaison/#{id}/',
  // liaisonCreateUrl: apiHost + '/liaison/liaison/'
}
/* 拜访记录相关接口 */
const RecordApis = {
  recordListUrl: apiHost + '/record/record/',
  recordDetailUrl: apiHost + '/record/record/#{id}/',
}
/* 商机相关接口 */
const BusinessApis = {
  businessListUrl: apiHost + '/business/business/',
  businessDetailUrl: apiHost + '/business/business/#{id}/',
}
/* OKR相关接口 */
/* 系统相关接口 */

export {
  BusinessApis,
  RecordApis,
  LiaisonApis,
  CustomerApis,
  AccountApis
}
