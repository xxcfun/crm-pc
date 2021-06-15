/* 存放项目中的所有地址 */

const apiHost = 'http://localhost:8080/api'

/* 用户相关接口 */
const AccountApis = {
  loginUrl: apiHost + '/account/user/login/',
  logoutUrl: apiHost + '/account/user/logout/',
  userInfoUrl: apiHost + '/account/user/info/'
}

/* 客户相关接口 */
const CustomerApis = {
  customerListUrl: apiHost + '/customer/customer/list/',
  customerDetailUrl: apiHost + '/customer/customer/detail/#{id}/'
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
