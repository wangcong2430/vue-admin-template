<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="box">
      <ul>
        <li :class="{ active: item.flag }" v-for="(item, index) in list" :key="index" @click="goInfo(item)">
          <div> {{ item.name }}</div>
          <div>{{ item.flag ? '已开桌' : '空闲' }}</div>
        </li>
      </ul>
    </div>

    <div class="info" v-if="infoFlage">
      <div> <button class="close" @click="closeInfo">x</button></div>
      <div class="table">1号桌</div>
      <ul>
        <li v-for="(item, index) in info.list" :key="index">
          <div>{{ item.name }}</div>
          <div>{{ item.price }}*{{ item.num }}<button @click="del(info._id, index)">x</button></div>
        </li>
      </ul>
      <div class="footer">
        <div class="total">账单总额：￥{{ info.total }}元</div>
        <button class="buy" @click="buy">买单</button>
      </div>      
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getList } from "@/api/table"; //导入台桌列表请求的方法
import { getInfo, del, buy } from "@/api/info"; //导入获取订单详情，删除订单，买单请求的方法

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      infoFlage: false,
      list: [],
      info: "",
    };
  },
  mounted() {
    getList().then((res) => {
      console.log(res);
      this.list = res.data;
    });
  },
  methods: {
    buy() {
      console.log(123);
      this.$confirm(`已收款：￥${this.info.total}`, "确定买单吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          buy({ tid: this.info.table }).then((res) => {
            if (res.status == "success") {
              getList().then((res) => {
                console.log(res);
                this.list = res.data;
              });

              this.$message({
                type: "success",
                message: "买单成功!",
              });
              this.infoFlage = false;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
        });
    },
    goInfo(info) {
      this.infoFlage = true;
      getInfo({ oid: info.order }).then((res) => {
        console.log(res);
        this.info = res.data;
      });
    },
    closeInfo() {
      this.infoFlage = false;
    },
    del(oid, index) {
      console.log(123);
      this.$confirm("确定真的删除该菜吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del({ oid: oid, index: index }).then((res) => {
            if (res.status == "success") {
              console.log(res);
              this.info.list.splice(index, 1);
            }
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

* {
  margin: 0;
  padding: 0;
}

ul {
  li {
    list-style: none;
    width: 150px;
    height: 100px;
    box-sizing: border-box;
    padding: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px green solid;
    background: #ccc;
  }

  .active {
    background: red;
    cursor: pointer;
  }
}

.info {
  width: 400px;
  height: 100%;
  position: fixed;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  border: 2px solid red;
  z-index: 10;
  background: gray;
  display: inline-flex;
  flex-direction: column;

  ul {
    flex: 1;
    overflow-y: auto;

    li {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 10px;
      flex-direction: row;
    }
  }

  .table {
    text-align: center;
  }

  .footer {
    padding: 10px;

    .total {
      margin-bottom: 20px;
    }

    .buy {
      width: 100%;
      height: 30px;
      background: red;
      text-align: center;
    }
  }

  .close {
    display: block;
    text-align: center;
    width: 40px;
    height: 40px;
    border: solid red solid;
    border-radius: 50%;
    line-height: 20px;
    font-size: 40px;
  }
}
</style>
