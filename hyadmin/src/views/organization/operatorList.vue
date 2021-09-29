<template>
  <div class="app-container operatorList-container">
    <el-form ref="form" label-width="120px">
      <!-- <el-form-item label="首页图片">
        <el-upload class="avatar-uploader" :action="baseURL+'system/upload'" :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="formData.index_pic" :src="formData.index_pic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item> -->
      <el-form-item label="运输服务合同">
        <quill-editor v-model="formData.contract" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
        </quill-editor>
      </el-form-item>
      <el-form-item label="陆运1介绍">
        <el-input v-model="formData.land_one" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item label="陆运2介绍">
        <el-input v-model="formData.land_two" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item label="空运介绍">
        <el-input v-model="formData.air_transport" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item label="客服电话">
        <el-input v-model="formData.phone" type="number" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="setData">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import { addQuillTitle } from "../../modules/quill-title.js";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { setOperator, getOperator } from "@/api/operator";
export default {
  name: "OperatorList",
  data() {
    return {
      editorOption: {
        placeholder: "请在这里输入",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式
            ["clean"], //清除字体样式
            ["image", "video"], //上传图片、上传视频
          ],
        },
      },
      // baseURL: process.env.VUE_APP_BASE_API,
      formData: {
        contract: "",
        phone: "",
        land_one: "",
        land_two: "",
        air_transport: "",
      },
    };
  },
  mounted() {
    var that = this;
    addQuillTitle();
    that.getData();
  },
  methods: {
    getData() {
      var that = this;
      getOperator({}).then((response) => {
        console.log("获取运营设置详情", response);
        that.formData = response.data;
      });
    },
    setData() {
      var that = this;
      var data = that.formData;
      const loading = that.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setOperator(data).then((response) => {
        console.log("保存运营设置详情", response);
        loading.close();
        that.$message({
          message: "保存成功",
          type: "success",
        });
        that.getData();
      });
    },
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件1
    onEditorChange() {}, // 内容改变事件
    // handleAvatarSuccess(res, file) {
    //   console.log(res, file);
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  components: {
    quillEditor,
  },
};
</script>

<style lang="scss">
.line {
  text-align: center;
}
.operatorList-container {
  .ql-editor {
    height: 400px !important;
  }
  // .avatar-uploader .el-upload {
  //   border: 1px dashed #d9d9d9;
  //   border-radius: 6px;
  //   cursor: pointer;
  //   position: relative;
  //   overflow: hidden;
  // }
  // .avatar-uploader .el-upload:hover {
  //   border-color: #409eff;
  // }
  // .avatar-uploader-icon {
  //   font-size: 28px;
  //   color: #8c939d;
  //   width: 178px;
  //   height: 178px;
  //   line-height: 178px;
  //   text-align: center;
  // }
  // .avatar {
  //   width: 178px;
  //   height: 178px;
  //   display: block;
  // }
  .ql-snow .ql-picker-label::before {
    vertical-align: top;
  }
  svg:not(:root) {
    overflow: hidden;
    vertical-align: top;
  }
}
</style>

