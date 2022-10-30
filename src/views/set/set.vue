<template>
  <div class="app-container">
    <h2>系统设置</h2>
    <div class="box">
      <el-form label-width="80px">
        <el-form-item label="AppID:" label-width="120px">
          <el-input autocomplete="off" v-model="AppID"></el-input>
        </el-form-item>

        <el-form-item label="appSecret:" label-width="120px">
          <el-input autocomplete="off" v-model="appSecret" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="set">设置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { set } from '@/api/user'//导入系统设置请求的方法
export default {
  data() {
    return {
      AppID: '',
      appSecret: ''
    }
  },
  methods: {
    set() {
      //console.log(123)
      if (this.AppID && this.appSecret) {
        set({ appid: this.AppID, appsecret: this.appSecret }).then(res => {
          if (res.status == 'success') {
            console.log(res)
            this.$message({
              type: "success",
              message: "小程序密钥设置成功",
            });
          }          
               
        })
      }
      else {
        this.$message({
          type: "error",
          message: "填写的信息不能为空",
        });
      }

    }
  }

}
</script>
<style scoped>
.box {
  width: 500px;
}
</style>