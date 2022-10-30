<template>
  <div>
    <div class="app-container">
      <h2>台桌列表</h2>
      <template>
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="_id" label="ID" width="230">
          </el-table-column>

          <el-table-column prop="index" label="序号" width="100">
          </el-table-column>

          <el-table-column prop="name" label="名称" width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link type="primary" @click="updata(scope.$index, scope.row)">编辑</el-link> &nbsp;&nbsp;
              <el-link type="danger" @click.native="del(scope.$index, scope.row)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="修改台桌" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="序号" label-width="120px">
              <el-input autocomplete="off" v-model="index"></el-input>
            </el-form-item>

            <el-form-item label="名称" label-width="120px">
              <el-input autocomplete="off" v-model="name"></el-input>
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
import { getList, del, updata } from "@/api/table"; //导入调用获取台桌列表，删除台桌，修改台桌请求的方法

export default {
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      index: "",
      name: "",
      id: "",
    };
  },
  mounted() {
    getList().then((res) => {
      //调用获取台桌列表数据请求的方法
      //console.log(res);
      this.list = res.data;
      this.$nextTick(()=>{
        //console.log(this.$route)
      })
    });
  },
  methods: {
    del(index, row) {
      //console.log(row);
      //console.log(index);
      //console.log(row._id);
      this.$confirm("确定真的删除该台桌码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.list.splice(index, 1);
          del({ id: row._id }).then((res) => { //调用删除台桌数据请求的方法
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

    updata(index, row) {//组件绑定点击事件，触发该事件可拿到当前点击的scope对象数据，从而将携带的参数数据赋值到当前存储的数据变量里，进而显示在弹框的文本框里
      //console.log(888);
      //console.log(row);
      //console.log(index);
      this.dialogFormVisible = true;
      this.index = row.index;
      this.name = row.name;
      this.id = row._id;
    },
    sure() {
      updata({ id: this.id, index: this.index, name: this.name }).then(//调用修改台桌数据请求的方法
        (res) => {
          console.log(res);
          this.$message({
            type: "success",
            message: "修改成功!",
          });

          getList().then((res) => {
            //调用获取台桌列表数据请求的方法
            console.log(res);
            this.list = res.data;
          });
        }
      );
      this.dialogFormVisible = false;
    },
    cancel() {
      this.dialogFormVisible = false;
    }
  },
};
</script>
