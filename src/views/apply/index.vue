<template>
  <div class="box">
    <div class="right">
      <h1>
        用户注册
      </h1>
      <form action="">
        <div class="zhuce">
          <input type="text" v-model="info.account" class="username" /><span>请填写账户名</span><br>
          <input type="text" v-model="info.pw" class="pw" /><span>请填写注册密码</span><br>
          <input type="text" class="pw" /><span>请再次填写注册密码</span><br>
          <input type="text" v-model="info.shopname" /><span>请填写店铺名</span><br>
          <input type="text" v-model="info.address" /><span>请填写店铺地址</span><br>
          <input type="text" v-model="info.email" /><span>请填写邮箱</span><br>
          <input type="button" @click="send" value="点击发送验证码" id="btn1" /><br>
          <input type="text" v-model="info.code" /><span>请填写验证码</span><br>
          <input type="button" value="注册" id="btn" @click="apply" /><br><span class="login"
            @click="login">使用已有账户登录</span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { code, apply } from "@/api/user"; //导入获取验证码和申请注册页面请求的方法

export default {
  data() {
    return {
      info: {
        account: "",
        pw: "",
        shopname: "",
        address: "",
        email: "",
        code: "",
      },
    };
  },
  methods: {
    send() {
      code({ email: this.info.email }).then((res) => {
        console.log(res);
        this.info.code = res.data;
      });
    },
    apply() {
      if (this.info) {
        apply(this.info).then((res) => {
          if (res.status == "success") {
            console.log(res);
            this.$message({
              type: "success",
              message: "注册成功,请登录!",
            });
            this.$router.replace("/login");
          } else {
            this.$message({
              type: "error",
              message: "注册失败,请检查信息是否填写完整!",
            });
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "信息填写不完整!",
        });
      }
    },
    login() {
      this.$router.replace("/login");
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  display: flex;
}

.box {
  width: 800px;
  height: 100%;
  margin: 0 auto;
  border: 1px solid green;    
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

h1 {
  width: 200px;
  height: 50px;
  margin: 30px auto;
  line-height: 50px;
  text-align: center;
}

.zhuce {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-left: 200px;
}

input {
  width: 300px;
  height: 40px;
  font-size: 18px;
  border: 2px solid black;
  margin-bottom: 20px;
}

.zhuce input:last-of-type {
  background-color: blueviolet;
  font-size: 24px;
}

.zhuce input:nth-of-type(7) {
  background-color: brown;
  font-size: 20px;
}

.login {
  display: inline-block;
  color: blue;
  font-size: 18px;
  margin-left: 150px;
}
</style>
