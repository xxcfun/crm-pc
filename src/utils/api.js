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
  customerEditUrl: apiHost + '/customer/customer/#{id}/',
  customerDeleteUrl: apiHost + '/customer/customer/#{id}/',
  customerCreateUrl: apiHost + '/customer/customer/'
}
/* 联系人相关接口 */
/* 拜访记录相关接口 */
/* 商机相关接口 */
/* OKR相关接口 */
/* 系统相关接口 */

export {
  CustomerApis,
  AccountApis
}
