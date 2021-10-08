<template>
  <div class="accountList-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-form
      :inline="true"
      :model="formScreen"
      label-width="auto"
      size="medium"
    >
      <el-form-item label="角色名称">
        <el-input v-model="formScreen.role_name" />
      </el-form-item>
      <el-button
        type="primary"
        :loading="listLoading"
        @click="getList"
        size="medium"
        >查询</el-button
      >
      <el-button size="medium" @click="goAddEdit()" icon="el-icon-plus"
        >新增</el-button
      >
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
    >
      <el-table-column label="序号" align="center" width="55">
        <template slot-scope="scope">
          {{ scope.row.role_id }}
        </template>
      </el-table-column>
      <el-table-column label="角色名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.role_name }}
        </template>
      </el-table-column>
      <el-table-column label="角色描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.role_describe }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tag @click="goAddEdit(scope.row.role_id)" size="medium"
            >编辑</el-tag
          >
          <el-tag
            type="warning"
            @click="deleteItem(scope.row.role_id)"
            size="medium"
            >删除</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination-box"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="formScreen.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="formScreen.page_len"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getRoleLists, setFreeze , deleteRole } from "@/api/backstage";
export default {
  name: "RoleList",
  data() {
    return {
      list: [],
      listLoading: true,
      formScreen: {
        page: 1,
        page_len: 10,
        role_name: "",
      },
      pageSize: 10,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取列表
    getList() {
      var that = this;
      that.listLoading = true;
      let data = that.formScreen;
      getRoleLists(data).then((response) => {
        console.log("获取账户列表", response);
        that.listLoading = false;
        that.list = response.data.result;
        that.total = response.data.data_sum;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      var that = this;
      that.formScreen.page_len = val;
      that.getList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      var that = this;
      that.formScreen.page = val;
      that.getList();
    },
    // 前往新增列表
    goAddEdit(id) {
      var that = this;
      that.$router.push({
        name: "RoleDetail",
        query: {
          id: id || "",
        },
      });
    },
    //改变状态
    changeFreeze(val, id) {
      var that = this;
      console.log(val, id);
      setFreeze({ role_id: id, freeze_flag: val }).then((response) => {});
    },
    deleteItem(id) {
      var that = this;
      console.log(id);
      that.$confirm("此操作将该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRole({ role_id: id}).then((response) => {
            that.$message({
              type: "success",
              message: "删除成功!",
            });
            that.getList()
          });
        })
        .catch(() => {
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.accountList {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  .pagination-box {
  }
}
.pagination-box {
  text-align: center;
  margin-top: 20px;
}
</style>
