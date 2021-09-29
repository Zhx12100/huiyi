<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-form :inline="true" :model="formScreen" label-width="auto" size="medium">
      <el-form-item label="微信名称">
        <el-input v-model="formScreen.nick_name" />
      </el-form-item>
      <el-form-item label="组织ID">
        <el-input v-model="formScreen.openid" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formScreen.freeze_flag" placeholder="">
          <el-option label="全部" value="" />
          <el-option label="使用中" :value="0" />
          <el-option label="已禁用" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="formScreen.role" placeholder="">
          <el-option label="全部" value="" />
          <el-option label="使用者" :value="1" />
          <el-option label="管理者" :value="2" />
        </el-select>
      </el-form-item>
      <el-button type="primary" :loading="listLoading" @click="getList" size="medium">查询</el-button>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading">
      <!-- <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.ID }}
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="openid">
        <template slot-scope="scope">
          {{ scope.row.openid }}
        </template>
      </el-table-column>
      <el-table-column label="用户名称" align="center">
        <template slot-scope="scope">
          <img class="nick_image" :src="scope.row.head_image" alt="">
          <span>{{scope.row.nick_name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          {{ scope.row.real_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="组织ID">
        <template slot-scope="scope">
          {{ scope.row.organize_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="组织部门">
        <template slot-scope="scope">
          {{ scope.row.organize_part }}
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.register_time }}
        </template>
      </el-table-column>
      <el-table-column label="登录时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.login_time }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="接收订阅信息" align="center">
        <template slot-scope="scope">
          {{ scope.row.subscribe_flag ? "接收" : "拒绝" }}
        </template>
      </el-table-column> -->
      <el-table-column label="账户状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.freeze_flag ? "已禁用" : "使用中" }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" align="center">
        <template slot-scope="scope">
          <el-tag @click="setOrganization(scope.row.openid)" size="medium">修改组织ID</el-tag>
          <el-tag type="success" @click="setFreeze(scope.row.openid, !scope.row.freeze_flag)">{{ scope.row.freeze_flag ? "启用" : "停用" }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formScreen.page" :page-sizes="[10, 20, 50, 100]" :page-size="formScreen.page_len"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserList, setFreezeStatus,setOrganizationId } from "@/api/table";
export default {
  name: "Dashboard",
  data() {
    return {
      list: [],
      listLoading: true,
      formScreen: {
        openid: "",
        page: 1,
        page_len: 10,
        nick_name: "",
        freeze_flag: "",
        role: "",
      },
      pageSize: 10,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      var that = this;
      that.listLoading = true;
      let data = that.formScreen;
      getUserList(data).then((response) => {
        console.log("获取用户列表", response);
        that.listLoading = false;
        that.list = response.data.result;
        that.total = response.data.data_sum;
      });
    },
    setFreeze(openid, freeze_flag) {
      var that = this;
      console.log(freeze_flag);
      that
        .$confirm(
          `此操作将${freeze_flag ? "冻结" : "启用"}该账号, 是否继续?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
        .then(() => {
          setFreezeStatus({ openid: openid, freeze_flag: freeze_flag }).then(
            (response) => {
              console.log("改变用户状态", response);
              if (response.code == 0) {
                that.$message({
                  type: "success",
                  message: "修改状态成功!",
                });
              }
              that.getList();
            }
          );
        })
        .catch(() => {});
    },
    setOrganization(openId) {
      var that = this;
      console.log(openId)
      that
        .$prompt("修改组织ID", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          beforeClose:(action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              let data = {
                openid:openId,
                organize_id:instance.inputValue
              }
              setOrganizationId(data).then((response) => {
                console.log("修改组织id", response);
                if (response.code == 0) {
                  that.$message({
                    type: "success",
                    message: "修改组织ID成功!",
                  });
                  that.getList();
                  done();
                  instance.confirmButtonLoading = false;
                }else{
                  console.log('false')
                  instance.confirmButtonLoading = false;
                }
              }).catch(() => {
                console.log('false')
                  instance.confirmButtonLoading = false;
              });;
            }else{
              done();
            }
          },
        })
        .then(({ value }) => {
          
        })
        .catch(() => {
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
  .pagination-box {
  }
}
.pagination-box {
  text-align: center;
  margin-top: 20px;
}
</style>
