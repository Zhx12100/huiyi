<template>
  <div class="app-container swiperDetail-container">
    <el-form ref="form" label-width="120px">
      <el-form-item label="角色">
        <el-select v-model="formData.role" placeholder="">
          <!-- <el-option label="全部" value="" /> -->
          <el-option label="使用者" :value="1" />
          <el-option label="管理者" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="组织ID">
        <el-input v-model="formData.organize_id" type="text" />
      </el-form-item>
      <el-form-item label="组织部门">
        <el-input v-model="formData.organize_part" type="text" />
      </el-form-item>
      <el-form-item label="分配人数">
        <el-input v-model="formData.people_count" type="number" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formData.status" placeholder="">
          <!-- <el-option label="全部" value="" /> -->
          <el-option label="使用" :value="true" />
          <el-option label="禁用" :value="false" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="" size="medium" @click="GLOBAL.$backPage">返回</el-button>
        <el-button type="primary" size="medium" :loading="buttonLoading" @click="setData">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getOrganizationDetail, setOrganization } from "@/api/organization";
export default {
  name: "OrganizationDetail",
  data() {
    return {
      baseURL: process.env.VUE_APP_BASE_API,
      formData: {
        role: "",
        organize_id: "",
        organize_part: "",
        status: "",
        people_count:""
      },
      buttonLoading: false,
    };
  },
  mounted() {
    var that = this;
    console.log(that.$route.query.id);
    if (that.$route.query.id) {
      that.formData.id = that.$route.query.id;
      that.getData();
    }
  },
  methods: {
    getData() {
      var that = this;
      getOrganizationDetail({ id: that.formData.id }).then(
        (response) => {
          console.log("获取组织详情", response);
          that.formData = response.data;
        }
      );
    },
    setData() {
      var that = this;
      var data = that.formData;
      if(data.people_count<=0){
        that.$message({
          message: '可容纳人数不能为0或者负数',
          type: 'warning',
        });
        return false
      }
      that.buttonLoading = true;
      setOrganization(data)
        .then((response) => {
          console.log("保存组织详情", response);
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
  .el-alert--info.is-light{
    background: transparent;
    padding-left: 0;
  }
}
</style>

