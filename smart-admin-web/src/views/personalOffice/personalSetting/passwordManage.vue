<template>
  <div>
    <Card style="height:1000px">
      <div style="position:absolute;top:50%;left:50%;transform: translate(-50%, -50%);">
        <Form :model="formItem"
              :label-width="80">
          <FormItem label="旧密码">
            <Input v-model="formItem.oldPwd"
                   type="password"
                   style="width:300px"
                   placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="新密码">
            <Input v-model="formItem.newPwd"
                   type="password"
                   style="width:300px"
                   placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="确认新密码">
            <Input v-model="formItem.surePassword"
                   type="password"
                   style="width:300px"
                   placeholder="Enter something..."></Input>
          </FormItem>
        </Form>
        <Button style="position:absolute;left:50%;"
                type="primary"
                v-privilege="['101-106-2']"
                @click="save">保存</Button>
      </div>
    </Card>
  </div>
</template>
<script>
import { personSetting } from '@/api/personSetting';
import { loginApi } from '@/api/login';
import cookie from '@/lib/cookie';
export default {
  data () {
    return {
      formItem: {}
    };
  },
  methods: {
    save () {
      if (this.formItem.newPwd !== this.formItem.surePassword) {
        return this.$Message.error('两次输入密码不一致，请重新输入！！');
      }
      const data = {
        employeeId: this.$store.state.user.userLoginInfo.userId,
        newPwd: this.formItem.newPwd,
        oldPwd: this.formItem.oldPwd
      };
      personSetting.updatePassword(data).then(res => {
        console.log(22222, res);
        if (res.ret === 200) {
          this.formItem = {};
          let token = cookie.getToken();
          localStorage.clear();
          cookie.clearToken();

          loginApi.logout(token);
          location.reload();
        } else {
          this.$Message.success(res.msg);
        }
      });
    }
  }
};
</script>
