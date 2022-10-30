<template>
  <div class="app-container">
    <h2>增加菜品</h2>
    <div class="box">
      <el-form label-width="80px">
        <el-form-item label="序号" label-width="120px">
          <el-input autocomplete="off" v-model="index"></el-input>
        </el-form-item>

        <el-form-item label="名称" label-width="120px">
          <el-input autocomplete="off" v-model="name"></el-input>
        </el-form-item>

        <el-form-item label="分类" label-width="120px">
          <el-select placeholder="请选择菜品" v-model="serie">
            <el-option :label="item.name" :value="item._id" v-for="(item, index) in list" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="价格" label-width="120px">
          <el-input autocomplete="off" v-model="price"></el-input>
        </el-form-item>

        <el-form-item label="是否上架" label-width="120px">
          <el-switch v-model="status" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>

        <el-form-item label="图片地址" label-width="120px">
          <el-input autocomplete="off" v-model="img"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sure">立即添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { add } from "@/api/dish"; //导入调用增加菜品请求的方法
import { getList } from "@/api/type"; //导入调用获取菜品列表请求的方法

export default {
 data:function(){
  return {
   
      index: 1,
      name: "",
      price: "",
      img: "",
      status: true,
      list: [],
      serie: "",
   
  }
 },
  watch: {},
  mounted() {
    getList().then((res) => {
      //调用获取菜品列表请求的方法来发送请求
      console.log(res);
      this.list = res.data;
    });
  },

  methods: {
    sure() {
      if (this.name && this.price && this.serie && this.index) {
        add({
          name: this.name,
          price: this.price,
          serie: this.serie,
          index: this.index,
          img: this.img,
          status: this.status,
        }).then((res) => {
          //调用增加菜品请求的方法来发送请求
          if (res.status === "success") {
            console.log(res);
            this.$message({
              type: "success",
              message: "增加菜品成功!",
            });
            this.name = "";
            this.price = "";
            this.serie = "";
            this.img = "";
            this.index++;
          } else {
            this.$message({
              type: "error",
              message: "增加菜品失败!",
            });
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "信息不能为空",
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

