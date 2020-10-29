import { postAxios, getAxios } from '@/lib/http';
export const positionApi = {
  deletePost: data => {
    let Form = new FormData();
    if (data.postId) {
      Form.append('postId', data.postId);
    }
    if (data.operatId) {
      Form.append('operatId', data.operatId);
    }
    return postAxios('/post/deletePost', Form);
  },
  updatePost: data => {
    let Form = new FormData();
    if (data.postId) {
      Form.append('postId', data.postId);
    }
    if (data.postName) {
      Form.append('postName', data.postName);
    }
    if (data.remarks) {
      Form.append('remarks', data.remarks);
    }
    return postAxios('/post/updatePost', Form);
  },
  // 分页查询所有岗位
  postList: data => {
    let Form = new FormData();
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    if (data.postName) {
      Form.append('postName', data.postName);
    }
    return postAxios('/post/postList', Form);
  },
  addPost: data => {
    let Form = new FormData();
    if (data.postName) {
      Form.append('postName', data.postName);
    }
    Form.append('createId', data.createId);
    if (data.remarks) {
      Form.append('remarks', data.remarks);
    }
    return postAxios('/post/addPost', Form);
  }
};
