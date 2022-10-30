<template>
  <div class="app-container">
    <h2>增加台桌</h2>
    <div class="box">
      <el-form label-width="80px">
        
        <el-form-item label="序号" label-width="120px">
          <el-input autocomplete="off" v-model="index"></el-input>
        </el-form-item>

        <el-form-item label="名称" label-width="120px">
          <el-input autocomplete="off" v-model="name"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sure">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { add } from "@/api/table"; //导入调用增加台桌请求的方法
export default {
  data() {//存储数据
    return {
      index: 1,
      name: "",
    };
  },
  watch: {},

  methods: {
    sure() {
      if (this.name) {//判断已填写台桌名称
        add({ name: this.name, index: this.index }).then((res) => {//发送添加台桌的请求
          if (res.status === "success") {
            console.log(res);
            this.$message({
              type: "success",
              message: "增加台桌成功!",
            });
            this.name = "";
            this.index++;
          } else {
            this.$message({
              type: "error",
              message: "增加台桌失败!",
            });
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "台桌名称不能为空",
        });
      }
    },
  },
};
</script>
<style scoped>
.box {
  width: 500px;
}
</style>

