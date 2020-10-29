const judge = arr => {
  const roles = JSON.parse(localStorage.getItem('userRouterPrivilege'));
  if (arr && arr instanceof Array && arr.length > 0) {
    const permissionRoles = arr;
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role);
    });
    return hasPermission;
  } else {
    throw new Error('need roles!');
  }
};
export default judge;
