<template>
  <div class="text-editor">
    <div class="edit_container">
      <quill-editor 
        v-model="content" 
        ref="myQuillEditor"
        class="editer"
        :options="editorOption">
      </quill-editor>
    </div>
    <div class="submit_btn">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
    components: {
        quillEditor
    },
    data() {
        return {
            content: `<h3>文本编辑</h3>`,
            editorOption: {}
        }
    },
    methods: {
        submit(){
          this.$message.success('提交成功！');
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    }
}

</script>
<style scoped>
.submit_btn{
  text-align: center;
}
</style>
<style>
.text-editor .edit_container{
  padding: 40px;
  margin-bottom: 40px;
}
.text-editor .editer{
		height: 350px;
	}
</style>