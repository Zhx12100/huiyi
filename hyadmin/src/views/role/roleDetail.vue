<template>
  <div class="app-container roleDetail-container">
    <el-form ref="form" label-width="120px">
      <el-form-item label="角色名称">
        <el-input v-model="formData.role_name" type="text" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="formData.role_describe" type="text" />
      </el-form-item>
      <el-form-item label="权限选择">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >一级菜单</el-checkbox
        >
        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          v-model="formData.perm_list"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox label="A">用户管理</el-checkbox>
          <el-checkbox label="B">组织管理</el-checkbox>
          <el-checkbox label="C">会议室管理</el-checkbox>
          <el-checkbox label="D">审核管理</el-checkbox>
          <el-checkbox label="E">反馈管理</el-checkbox>
          <el-checkbox label="F">账号管理</el-checkbox>
          <el-checkbox label="G">角色管理</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="" size="medium" @click="GLOBAL.$backPage"
          >返回</el-button
        >
        <el-button
          type="primary"
          size="medium"
          :loading="buttonLoading"
          @click="setData"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { quillEditor } from "vue-quill-editor"; //调用编辑器
// import { addQuillTitle } from "../../modules/quill-title.js";
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";
import { setRole, getRole, getRoleList } from "@/api/backstage";
export default {
  name: "RoleDetail",
  data() {
    return {
      // baseURL: process.env.VUE_APP_BASE_API,
      formData: {
        role_describe: "",
        role_name: "",
        perm_list: [],
      },
      roleArr : ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      checkAll: true,
      isIndeterminate: false,
      buttonLoading: false,
    };
  },
  mounted() {
    var that = this;
    // addQuillTitle();
    console.log(that.$route.query.id);
    if (that.$route.query.id) {
      that.formData.role_id = that.$route.query.id;
      that.getData();
    }
  },
  methods: {
    getData() {
      var that = this;
      getRole({ role_id: that.formData.role_id }).then((response) => {
        console.log("获取账户详情", response);
        that.formData = response.data;
        if(that.formData.perm_list.length>0){
          that.isIndeterminate = true
        }
        if(that.formData.perm_list.length==that.roleArr.length){
          that.checkAll = true
          console.log('that.checkAll',that.checkAll)
        }
      });
    },
    setData() {
      var that = this;
      var data = that.formData;
      that.buttonLoading = true;
      setRole(data)
        .then((response) => {
          console.log("保存账户详情", response);
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
    handleCheckAllChange(val) {
      this.formData.perm_list = val ? this.roleArr : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.roleArr.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roleArr.length;
    }
  },
  // computed: {
  //   editor() {
  //     return this.$refs.myQuillEditor.quill;
  //   },
  // },
  // components: {
  //   quillEditor,
  // },
};
</script>

<style lang="scss">
.line {
  text-align: center;
}
.roleDetail-container {
  .el-input,
  .el-textarea {
    width: 300px;
  }
}
</style>

