<template>
  <div
    v-loading="loading"
    element-loading-text="正在上传中，请等待..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" enctype="multipart/form-data" method="post">
      <el-form-item label="资源名称" prop="resourceName">
        <el-input v-model="getFormData.resourceName" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="资源来源" prop="resourceOrigin">
        <el-input v-model="getFormData.resourceOrigin" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="资源类别" prop="resourceCatalog">
        <el-select v-model="getFormData.resourceCatalog" placeholder="请选择" style="width: 300px;">
          <el-option
            v-for="item in catalogList"
            :key="item.id"
            :label="item.catalogName"
            :value="item.catalogName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源年份" prop="resourceOriginTime">
        <el-date-picker 
          type="year"
          v-model="getFormData.resourceOriginTime"
          placeholder="选择年份" 
          style="width: 300px;"
          value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="数据格式" prop="resourceFormat" v-if="type==='非结构化数据'">
        <el-select v-model="getFormData.resourceFormat" placeholder="请选择" style="width: 300px;">
          <el-option
            v-for="item in formatList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据格式" prop="resourceFormat" v-else>
        <el-input v-model="getFormData.resourceFormat" style="width: 300px;" :disabled="isEdit"></el-input>
      </el-form-item>
      <!-- <el-form-item label="资源路径" prop="resourcePath" v-if="type !== 'SHP'">
        <el-input v-model="getFormData.resourcePath" style="width: 300px;"></el-input>
      </el-form-item> -->
      <el-form-item label="关键词" prop="keywords">
        <el-input v-model="getFormData.keywords" style="width: 300px;" placeholder="多个关键词以冒号':'分隔"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="getFormData.note" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="资源：" class="is-required" v-if="!isEdit">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="serverURL"
          :auto-upload="false"
          :limit="limit"
          :multiple="true">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip" style="color: #F56C6C;">
            {{getTips}}
          </div>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="isEdit">
        <el-button type="primary" @click="handleEdit">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {findAllCatalog} from '@/api/catalog';
export default {
  data () {
    return {
      formatList: [
        {
          value: 'Doc',
          label: 'Word文档'
        }, {
          value: 'Excel',
          label: '表格'
        }, {
          value: 'PDF',
          label: 'PDF文档'
        }, {
          value: 'Img',
          label: '图片'
        }, {
          value: 'MP4',
          label: '视频'
        }
      ],
      serverURL: '',
      form: {
        resourceName: '',
        //resourceType: '',
        resourceOrigin: '',
        resourceCatalog: '',
        resourceFormat: '',
        resourceOriginTime: '',
        keywords: '',
        /* resourcePath: new Date(), */
        note: ''
      },
      rules: {
        resourceName: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        resourceOrigin: [
          { required: true, message: '请输入资源来源', trigger: 'blur' }
        ],
        resourceCatalog: [
          { required: true, message: '请输入资源类别', trigger: 'blur' }
        ],
        resourceOriginTime: [
          { required: true, message: '请输入资源年份', trigger: 'blur' }
        ],
        resourceFormat: [
          { required: true, message: '请输入数据格式', trigger: 'blur' }
        ],
        keywords: [
          { required: true, message: '请输入关键词', trigger: 'blur' }
        ]
      },
      suffix: {
      },
      tips: '',
      isTips: false,
      catalogList: []
    }
  },
  props: [
    'isResourceEdit', 
    'isVisible', 
    'loading', 
    'type',
    'resourceInfo',
    'editInfo',
    'limit'],
  computed: {
    getFormData () {
      this.initForm()
      return this.form
    },
    isEdit () {
      return this.isResourceEdit
    },
    getTips () {
      if (this.form.resourceFormat) {
        if (!this.isTips) {
          if (this.form.resourceFormat === 'Img') {
            this.tips = '只能上传png、jpg、jpeg或gif格式的数据';
          } else {
            this.tips = '只能上传' + this.form.resourceFormat + '格式的数据';
          }
        }
      }
      return this.tips;
    }
  },
  mounted () {
    this.getCatalogList();
  },
  methods: {
    getCatalogList () {
      findAllCatalog().then(res => {
        console.log(res.data.data);
        this.catalogList = res.data.data;
      })
    },
    initForm () {
      //根据不同数据类型初始化form表单
      if (this.resourceInfo) {
        for (const key in this.resourceInfo) {
          this.form[key] = this.resourceInfo[key]
        }
      }
      if (this.isEdit) {
        for (const key in this.editInfo) {
          this.form[key] = this.editInfo[key]
        }
      }
    },
    resetForm () {
      this.$refs.upload.clearFiles()
      this.$refs['form'].resetFields()
    },
    submitUpload () {
      let that = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log(this.$refs.upload.uploadFiles);
          if (this.$refs.upload.uploadFiles.length !== this.limit) {
            this.$message({
              type: 'warning',
              message: '当前限制选择' + this.limit + '个文件',
              duration: 2000
            })
          } else {
            let pArr = this.$refs.upload.uploadFiles;
            let isCurrentFormat = false;
            if (this.form.resourceFormat === 'SHP') {
              pArr.some(item => {
                let pStr = /\.shp$/i;
                if (pStr.test(item.name)) {
                  isCurrentFormat = true;
                  return isCurrentFormat;
                }
              });
            } else if (this.form.resourceFormat === 'TIFF') {
              pArr.forEach(item => {
                let pStr = /\.tiff?$/i;
                isCurrentFormat = pStr.test(item.name);
              });
            } else {
              pArr.forEach(item => {
                isCurrentFormat = this.isFormatValid(item.name);
              });
            }
            if (isCurrentFormat) {
              this.$emit('update:loading', true);
              that.handleUpload(pArr);
            } else {
              this.isTips = true;
              this.tips = '当前选择上传文件的格式错误，请重新选择！';
              setTimeout(() => {
                this.tips = '';
                this.resetForm();
              }, 2000)
            }
          }
        } else {
          this.$message({
            type: 'error',
            message: '请输入有效的信息',
            duration: 2000
          })
        }
      })
    },
    isFormatValid (fileName) {
      let isValid = false;
      switch (this.getFormData.resourceFormat) {
        case 'TIFF':
          isValid = true;
          return isValid;
          break;
        case 'Doc':
          let pStrDoc = /\.docx?$/i;
          isValid = pStrDoc.test(fileName);
          return isValid;
          break;
        case 'Excel':
          let pStrExcel = /\.xlsx?$/i;
          isValid = pStrExcel.test(fileName);
          return isValid;
          break;
        case 'PDF':
          let pStrPDF = /\.pdf$/i;
          isValid = pStrPDF.test(fileName);
          return isValid;
          break;
        case 'Img':
          let pStrImg = /\.(png|jpe?g|gif)$/i;
          isValid = pStrImg.test(fileName);
          return isValid;
          break;
        case 'MP4':
          let pStrMP4 = /\.mp4$/i;
          isValid = pStrMP4.test(fileName);
          return isValid;
          break;
        default:
          return isValid;
          break;
      }
    },
    handleUpload (file) {
      let formData = new FormData()
      let fileName = '';
      if (this.type === 'SHP') {
        file.forEach(item => {
          if (item.name.indexOf('.shp') != -1) {
            fileName = item.name
          }
          formData.append('MultipartFile', item.raw)
        })
      } else {
        fileName = file[0].name
        formData.append('MultipartFile', file[0].raw)
      }
      formData.append('resourceOriginName', fileName)
      //各字段赋值
      for (const key in this.getFormData) {
        formData.append(key, this.getFormData[key] || '')
      }
      this.$emit('upload', formData)
    },
    handleEdit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.handleClose();
          console.log(this.getFormData);
          this.$emit('edit', this.getFormData);
        } else {
          this.$message({
            type: 'error',
            message: '请输入有效的信息',
            duration: 2000
          })
        }
      });
      
    },
    handleClose () {
      this.$emit('update:isResourceEdit', false);
    }
  }
}
</script>

<style scoped>
.dataUpload{
  padding: 50px 200px;
}
.dataDlg{
  padding: 0
}
</style>