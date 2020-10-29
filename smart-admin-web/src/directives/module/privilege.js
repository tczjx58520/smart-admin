// // 页面内按钮过滤
// import store from '@/store/index';
// export default {
//   inserted: function (el, binding, vnode) {
//     // 获取当前路由name
//     // 如果页面为同一模块下的子页面则取最上级权限
//     let routeName = vnode.context.$route.meta.privilegeExtend
//       ? vnode.context.$route.meta.privilegeExtend
//       : vnode.context.$route.name;
//     // 超级管理员
//     if (store.state.user.userLoginInfo.isSuperMan) {
//       return true;
//     }
//     // 获取功能点权限
//     let functionList = store.state.user.privilegeFunctionPointsMap.get(routeName);
//     // 有权限
//     if (functionList && functionList.includes(binding.value)) {

//     } else {
//       el.parentNode.removeChild(el);
//     }
//   }
// };
// 页面内按钮过滤
export default{
  inserted (el, binding, vnode) {
    const { value } = binding;
    const roles = JSON.parse(localStorage.getItem('userRouterPrivilege'));
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role);
      });
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"');
    }
  }
};
