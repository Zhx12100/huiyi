<template>
  <div class="app-container swiperDetail-container">
    <el-form ref="form" label-width="120px">
      <el-form-item label="会议室名称">
        <el-input v-model="formData.name" type="text" />
      </el-form-item>
      <el-form-item label="容纳人数">
        <el-input v-model="formData.people_count" type="text" />
      </el-form-item>
      <el-form-item label="开放时间">
        <el-time-picker format="HH:mm" is-range value-format="HH:mm" v-model="timeData" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
        </el-time-picker>
      </el-form-item>
      <el-form-item label="使用状态">
        <el-select v-model="formData.status" placeholder="">
          <!-- <el-option label="全部" value="" /> -->
          <el-option label="启用" :value="true" />
          <el-option label="停用" :value="false" />
        </el-select>
      </el-form-item>
       <el-form-item label="设备">
        <el-input type="textarea" v-model="formData.device"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="" size="medium" @click="GLOBAL.$backPage">返回</el-button>
        <el-button type="primary" size="medium" :loading="buttonLoading" @click="setData">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getConferenceDetail, setConference } from "@/api/conference";
export default {
  name: "ConferenceDetail",
  data() {
    return {
      baseURL: process.env.VUE_APP_BASE_API,
      formData: {
        meet_id: "",
        status: "",
        people_count: "",
        start_time: "",
        end_time: "",
        device:""
      },
      timeData: ['',''],
      buttonLoading: false,
    };
  },
  mounted() {
    var that = this;
    console.log(that.$route.query.meet_id);
    if (that.$route.query.meet_id) {
      that.formData.meet_id = that.$route.query.meet_id;
      that.getData();
    }
  },
  methods: {
    getData() {
      var that = this;
      getConferenceDetail({ meet_id: that.formData.meet_id }).then(
        (response) => {
          console.log("获取轮播详情", response);
          that.formData = response.data;
          that.timeData = [response.data.start_time,response.data.end_time]
          delete that.formData.start_time;
          delete that.formData.end_time;
          console.log(that.timeData);
        }
      );
    },
    setData() {
      var that = this;
      var data = that.formData;
      data.people_count = data.people_count*1
      data.start_time = that.timeData[0]
      data.end_time = that.timeData[1]
      that.buttonLoading = true;
      setConference(data)
        .then((response) => {
          console.log("保存会议室详情", response);
          that.$message({
            message: "保存成功",
            type: "success",
          });
          setTimeout(() => {
            that.$router.go(-1);
          }, 600);
          that.buttonLoading = false;
        })
        .catch((error) => {
          that.buttonLoading = false;
        });
    },
    handleAvatarSuccess(res, file) {
      var that = this;
      console.log(file);
      if (file.response.code == 2) {
        //导入失败
        var type = "warning";
      } else {
        var type = "success";
        that.formData.banner_pic = that.baseURL + file.response.data.file_path;
      }
      that.$message({
        message: file.response.message,
        type: type,
      });
    },
  },
  computed: {
    token() {
      return this.$store.state.user.token;
    },
  },
};
</script>

<style lang="scss">
.line {
  text-align: center;
}
.swiperDetail-container {
  .el-input,
  .el-textarea {
    width: 300px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    object-fit: contain;
  }
  .el-alert--info.is-light {
    background: transparent;
    padding-left: 0;
  }
}
</style>

