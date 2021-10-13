<template>
  <div class="swiperList-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-form
      :inline="true"
      :model="formScreen"
      label-width="auto"
      size="medium"
    >
      <el-form-item label="组织ID">
        <el-input v-model="formScreen.organize_id" />
      </el-form-item>
      <el-form-item label="组织部门">
        <el-input v-model="formScreen.organize_part" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formScreen.status" placeholder="">
          <el-option label="全部" value="" />
          <el-option label="使用" :value="true" />
          <el-option label="禁用" :value="false" />
        </el-select>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="formScreen.role" placeholder="">
          <el-option label="全部" value="" />
          <el-option label="使用者" :value="1" />
          <el-option label="管理者" :value="2" />
        </el-select>
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
      <el-table-column label="序号" type="index" align="center" width="55">
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          {{ scope.row.role }} 
        </template>
      </el-table-column>
      <el-table-column label="组织ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.organize_id }} 
        </template>
      </el-table-column>
      <el-table-column label="组织部门" align="center">
        <template slot-scope="scope">
          {{ scope.row.organize_part }} 
        </template>
      </el-table-column>
      <el-table-column label="分配人数" align="center">
        <template slot-scope="scope">
          {{ scope.row.people_count }} 
        </template>
      </el-table-column>
      <el-table-column label="已注册人数" align="center">
        <template slot-scope="scope">
          {{ scope.row.register_count }} 
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status ? "使用中" : "已禁用" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tag @click="goAddEdit(scope.row.id)" size="medium"
            >编辑</el-tag>
          <el-tag
            type="warning"
            @click="changeItem(scope.row.id,scope.row.status?false:true)"
            size="medium"
            >{{scope.row.status ? "禁用" : "启用"}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination-box"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="formScreen.page"
      :page-sizes="[1,10, 20, 50, 100]"
      :page-size="formScreen.page_len"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getOrganizationList, changeOrganization } from "@/api/organization";
export default {
  name: "OrganizationList",
  data() {
    return {
      list: [],
      listLoading: true,
      formScreen: {
        page: 1,
        page_len: 10,
        role: "",
        organize_id: "",
        organize_part: "",
        status: "",
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
      getOrganizationList(data).then((response) => {
        console.log("获取组织列表", response);
        that.listLoading = false;
        that.list = response.data.result;
        that.total = response.data.data_sum;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      var that = this;
      that.formScreen.page_len = val;
      that.formScreen.page = 1;
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
        name: "OrganizationDetail",
        query: {
          id: id || "",
        },
      });
    },
    changeItem(id,status) {
      var that = this;
      console.log(id);
      that.$confirm(`此操作将${status?'启用':'禁用'}该账号, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          changeOrganization({ id: id,status:status}).then((response) => {
            that.$message({
              type: "success",
              message: status?'启用':'禁用'+"成功!",
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
.swiperList-container {
  margin: 30px;
  .avatar {
    width: 100px;
    height: auto;
    display: inline-block;
    object-fit: contain;
    font-size: 0;
  }
  .pagination-box {
  }
}
.pagination-box {
  text-align: center;
  margin-top: 20px;
}
</style>
s