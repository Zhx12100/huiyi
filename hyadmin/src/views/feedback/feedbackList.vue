<template>
  <div class="feedbackList feedbackList-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-form ref="form" :inline="true" label-width="auto" size="medium">
      <el-form-item label="用户名称">
        <el-input v-model="formScreen.nick_name" />
      </el-form-item>
      <el-button type="primary" :loading="listLoading" @click="getList" size="medium">查询</el-button>
    </el-form>
    <el-table v-loading="listLoading" :data="list" ref="multipleTable" element-loading-text="Loading">
      <el-table-column label="序号" type="index" align="center" width="55">
      </el-table-column>
      <el-table-column label="用户名称" align="center">
        <template slot-scope="scope">
          <img class="nick_image" :src="scope.row.head_image" alt="" />
          <span>{{ scope.row.nick_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系号码" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="反馈内容" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.pic_count }}
        </template>
      </el-table-column>
      <el-table-column label="反馈时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" align="center">
        <template slot-scope="scope">
          <el-tag type="success" size="small" @click="getDetail(scope.row.feedback_id)">查看详情</el-tag>
          <!-- <el-tag
            type="warning"
            v-if="scope.row.status == '待支付' || scope.row.status == '待运输'"
            @click="cancelOrder(scope.row.feedback_id)"
            size="small"
            >取消订单</el-tag
          > -->
          <!-- <el-tag
            v-if="scope.row.status == '待运输'"
            size="small"
            @click="openDriver(0, scope.row.feedback_id)"
            >填写信息</el-tag
          >
          <el-tag
            v-if="scope.row.status == '运输中'"
            size="small"
            @click="openDriver(1, scope.row.feedback_id)"
            >更新信息</el-tag
          > -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formScreen.page" :page-sizes="[10, 20, 50, 100]" :page-size="formScreen.page_len"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog title="反馈详情" class="detail-box" :visible.sync="dialogVisibleDetail" width="600px">
      <el-form ref="form" label-width="120px">
        <el-form-item label="用户名称：">
          <img class="nick_image" :src="detail.head_image" alt="" />
          <span>{{ detail.nick_name }}</span>
        </el-form-item>
        <el-form-item label="联系电话：">
          {{ detail.phone }}
        </el-form-item>
        <el-form-item label="反馈图片：">
          <div class="img-box" v-for="(item,index) in detail.pic_list" :key="index">
            <img :src="baseURL+item" @click="getImage(baseURL + item)" alt="">
          </div>
        </el-form-item>
        <el-form-item label="反馈备注：">
          {{ detail.note }}
        </el-form-item>
        <el-form-item label="反馈时间：">
          {{ detail.create_time }}
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="imageDialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <el-image
      style="width: 100%; height: auto"
      :src="imageUrl"
      :fit="'contain'"></el-image>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getFeedbackList,
  getFeedbackDetail,
} from "@/api/feedback";
export default {
  name: "FeedbackList",
  data() {
    return {
      list: null,
      listLoading: true,
      baseURL: process.env.VUE_APP_BASE_API,
      imageDialogVisible: false,
      imageUrl:'https://meal.coschat.com/static/upload/2110041324143798723799145.png',
      dialogVisibleDetail: false,
      dialogVisibleEditAdd: false,
      formScreen: {
        nick_name: "",
        page: 1,
        page_len: 10,
      },
      pageSize: 10,
      total: 0,
      detail: {},
      feedback_id: "",
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
      getFeedbackList(data).then((response) => {
        console.log("获取审核列表", response);
        that.listLoading = false;
        that.list = response.data.result;
        that.total = response.data.data_sum;
      });
    },
    getDetail(id) {
      var that = this;
      console.log(id);
      that.feedback_id = id;
      getFeedbackDetail({ feedback_id: id }).then((response) => {
        console.log("获取审核详情", response);
        // that.dialogVisibleDetail = false;
        that.dialogVisibleDetail = true;
        that.detail = response.data;
      });
    },
    handleClose(){
      that.imageDialogVisible = false
    },
    getImage(url){
      let that = this
      that.imageUrl = url
      that.imageDialogVisible = true
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
    getSwitchStatus: function (status) {
      console.log(status);
      switch (status) {
        case 0:
          return "待付款";
        case 1:
          return "待运输";
        case 2:
          return "运输中";
        case 3:
          return "已完成";
        case 4:
          return "已取消";
        case 5:
          return "（待）开票";
        case 6:
          return "历史开票";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.feedbackList {
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
.detail-box {
  .el-form-item {
    margin-bottom: 0;
  }
  p {
    line-height: 32px;
    margin: 5px 0;
    // display: flex;
    // justify-content: space-between;
  }
}
.img-box{
  width: 100px;
  height: 100px;
  display: inline-block;
  margin-right: 10px;
}
.img-box img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
.driver-box {
  .el-form {
    width: 80%;
    margin: 0 auto;
  }
  .el-form .el-form-item:last-child {
    margin-bottom: 0;
  }
}
.pagination-box {
  text-align: center;
  margin-top: 20px;
}
</style>
