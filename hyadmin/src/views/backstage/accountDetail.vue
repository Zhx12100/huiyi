<template>
  <div class="app-container accountDetail-container">
    <el-form ref="form" label-width="120px">
      <el-form-item label="账号">
        <el-input v-model="formData.username" type="text" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" type="password" />
      </el-form-item>
      <el-form-item label="角色选择">
        <el-select v-model="formData.role_id" placeholder="">
          <el-option v-for="(item,index) in roleArr" :key="index" :label="item.role_name" :value="item.role_id" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.note" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="formData.freeze_flag" active-text="启用">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="" size="medium" @click="GLOBAL.$backPage"
          >返回</el-button>
        <el-button type="primary" size="medium" :loading="buttonLoading" @click="setData"
          >保存</el-button>
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
import { setAccount,getAccount,getRoleList } from "@/api/backstage";
export default {
  name: "AccountDetail",
  data() {
    return {
      // baseURL: process.env.VUE_APP_BASE_API,
      formData: {
        username: "",
        password: "",
        note: "",
        freeze_flag: false,
        user_id:'',
        role_id:''
      },
      oldPassword:'',
      roleArr:[],
      buttonLoading: false,
      // editorOption: {
      //   placeholder: "请在这里输入",
      //   modules: {
      //     toolbar: [
      //       ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
      //       ["blockquote", "code-block"], //引用，代码块
      //       [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
      //       [{ list: "ordered" }, { list: "bullet" }], //列表
      //       [{ script: "sub" }, { script: "super" }], // 上下标
      //       [{ indent: "-1" }, { indent: "+1" }], // 缩进
      //       [{ direction: "rtl" }], // 文本方向
      //       [{ size: ["small", false, "large", "huge"] }], // 字体大小
      //       [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
      //       [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
      //       [{ font: [] }], //字体
      //       [{ align: [] }], //对齐方式
      //       ["clean"], //清除字体样式
      //       ["image", "video"], //上传图片、上传视频
      //     ],
      //   },
      // },
    };
  },
  mounted() {
    var that = this;
    // addQuillTitle();
    console.log(that.$route.query.id)
    if (that.$route.query.id) {
      that.formData.user_id = that.$route.query.id;
      that.getData();
    }
    that.getRole()
  },
  methods: {
    getData() {
      var that = this;
      getAccount({user_id:that.formData.user_id}).then((response) => {
        console.log("获取账户详情", response);
        that.formData = response.data;
        that.oldPassword = that.formData.password
      });
    },
    setData() {
      var that = this;
      var data = that.formData;
      if(that.oldPassword!=that.formData.password){
        if(data.password.length<6){
          that.$message({
            message: '密码长度至少需要6位数',
            type: 'warning'
          });
          return false
        }
      }
      that.buttonLoading = true;
      setAccount(data).then((response) => {
        console.log("保存账户详情", response);
        that.$message({
          message: '保存成功',
          type: 'success'
        });
        setTimeout(()=>{
          that.$router.go(-1)
        },600)
        that.buttonLoading = false;
      }).catch((error) => {
        that.buttonLoading = false;
      });
    },
    getRole(){
      let that = this
      getRoleList({}).then((response) => {
        console.log("角色选择列表", response);
        that.roleArr = response.data.role_list
      });
    },
    // onSubmit() {
    //   this.$message("submit!");
    // },
    // onCancel() {
    //   this.$message({
    //     message: "cancel!",
    //     type: "warning",
    //   });
    // },
    // onEditorReady(editor) {
    //   // 准备编辑器
    // },
    // onEditorBlur() {}, // 失去焦点事件
    // onEditorFocus() {}, // 获得焦点事件1
    // onEditorChange() {}, // 内容改变事件
    // handleAvatarSuccess(res, file) {
    //   console.log(res, file);
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },
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
.accountDetail-container {
  .el-input,.el-textarea {
    width: 300px;
  }
}
</style>

