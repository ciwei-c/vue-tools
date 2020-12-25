<template>
  <div>
    <div style="height: 40px;display: flex;justify-content: center">
      <el-form inline style="display: flex;align-items: center;justify-content: center">
        <el-form-item label="颗粒尺寸" style="margin-bottom:0">
          <el-input-number size="mini" placeholder="像素粒度" style="width:160px;" :min="5" v-model="pixelSize"></el-input-number>
        </el-form-item>
        <el-form-item label="原图置底" style="margin-bottom:0">
          <el-checkbox v-model="showImage"></el-checkbox>
        </el-form-item>
        <el-form-item style="margin-bottom:0">
          <el-upload ref="upload" :auto-upload="false" action="/" accept="image/*" :on-change="onChange" :limit="1" :show-file-list="false">
            <el-button size="mini" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div style="height:calc(100% - 40px)">
      <pixel :image="image" :pixelSize="pixelSize" :showImage="showImage"></pixel>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      image:require('./gogh1.jpg'),
      pixelSize:16,
      showImage:false
    }
  },
  methods:{
    onChange(file){
      let reader = new FileReader()
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        this.image = reader.result
        this.$refs.upload.clearFiles()
      }
    }
  }
}
</script>

<style>

</style>