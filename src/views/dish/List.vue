<template>
  <div>
    <div class="app-container">
      <h2>菜品列表</h2>
      <template>
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="_id" label="ID" width="230">
          </el-table-column>

          <el-table-column prop="index" label="序号" width="100">
          </el-table-column>

          <el-table-column prop="name" label="名称" width="180">
          </el-table-column>

          <el-table-column prop="serie.name" label="分类" width="100%">
          </el-table-column>

          <el-table-column prop="price" label="价格" width="180">
          </el-table-column>

          <el-table-column label="是否上架">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949"
                @change="(flag) => { onChange(flag, scope.row._id) }">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link type="primary" @click="updata(scope.$index, scope.row)">编辑</el-link> &nbsp;&nbsp;
              <el-link type="danger" @click.native="del(scope.$index, scope.row)">删除</el-link>
            </template>

          </el-table-column>

        </el-table>

        <el-dialog title="修改菜品" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="序号" label-width="120px">
              <el-input autocomplete="off" v-model="index"></el-input>
            </el-form-item>

            <el-form-item label="名称" label-width="120px">
              <el-input autocomplete="off" v-model="name"></el-input>
            </el-form-item>

            <el-form-item label="分类" label-width="120px">
              <el-select v-model="serie._id" clearable placeholder="请选择">
                <el-option v-for="(item, index) in serie" :key="index" :label="item.name" :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="价格" label-width="120px">
              <el-input autocomplete="off" v-model="price"></el-input>
            </el-form-item>

            
            <el-form-item label="图片地址" label-width="120px">
              <el-input autocomplete="off" v-model="img"></el-input>
            </el-form-item>

            <el-form-item label="是否上架" label-width="120px">
              <el-switch v-model="status" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>

            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="sure">确 定</el-button>
          </div>
        </el-dialog>

      </template>

    </div>
  </div>
</template>

<script>
import { getList, del, updata } from "@/api/dish"; //导入调用获取菜品列表，删除菜品，修改菜品请求的方法
import { getList as getSeries } from "@/api/type";//导入调用获取菜品分类列表的方法，并增加别名
export default {
  filters: {},
  data() {
    return {
      list: [],
      index: "",
      name: "",
      id: "",
      dialogFormVisible: false,
      serie: "",
      price: '',
      status: '',
      img:''
    };
  },
  mounted() {
    getList().then((res) => {
      //调用获取菜品列表数据请求的方法来发送请求
      console.log(res);
      this.list = res.data;
    });
    getSeries().then((res) => {
      //调用获取菜品分类列表数据请求的方法来发送请求
      console.log(res);
      this.serie = res.data;
    });
  },
  methods: {
    del(index, row) {
      //console.log(row);
      //console.log(index);
      //console.log(row._id);
      this.$confirm("确定真的删除该菜品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.list.splice(index, 1);
          del({ id: row._id }).then((res) => { //调用删除菜品请求的方法来发送请求
            console.log(res);
          });

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    onChange(flag, id) {//状态栏改变，触发此方法，携带哪个菜品被修改的id参数和状态参数，发送修改菜品的请求
      //console.log(flag, id);
      updata({ id: id, status: flag, }).then((res) => {
        console.log(res);
        this.$message({
          type: "success",
          message: "更新成功!",
        });
      });
    },
    updata(index, row) {
      //console.log(index);
      //console.log(row);
      this.dialogFormVisible = true;
      this.index = row.index;
      this.name = row.name;
      this.id = row._id;
      this.price = row.price;
      this.status = row.status;
    },

    sure() {
      updata({ id: this.id, index: this.index, name: this.name, price: this.price, status: this.status, serie: this.serie }).then((res) => {//编辑按钮中修改菜品的请求发送
        console.log(res);
        this.$message({
          type: "success",
          message: "修改成功!",
        });

        getList().then((res) => {
          //调用获取菜品列表数据请求的方法来发送请求
          console.log(res);
          this.list = res.data;
        });
      });
      this.dialogFormVisible = false;
    },
    cancel() {
      this.dialogFormVisible = false;
    },
  },
};
</script>
