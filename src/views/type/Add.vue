<template>
  <div class="app-container">
    <h2>增加菜品类别</h2>
    <div class="box">
      <el-form label-width="80px">
        <el-form-item label="序号" label-width="120px">
          <el-input autocomplete="off" v-model="index"></el-input>
        </el-form-item>

        <el-form-item label="名称" label-width="120px">
          <el-input autocomplete="off" v-model="name"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sure">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { add } from "@/api/type"; //导入调用增加菜品分类请求的方法
export default {
  data() {
    return {
      index: 1,
      name: "",
    };
  },
  watch: {},

  methods: {
    sure() {
      if (this.name) {
        add({ index: this.index, name: this.name }).then((res) => {//调用增加菜品分类请求的方法来发送请求
          if (res.status === "success") {
            console.log(res);
            this.$message({
              type: "success",
              message: "增加菜品分类成功!",
            });
            this.name = "";
            this.index++;
          } else {
            this.$message({
              type: "error",
              message: "增加菜品分类失败!",
            });
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "名称不能为空",
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

