<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem>
            <Input v-model="getFormData" v-show="false"></Input>
        </FormItem>
        <FormItem label="编号" prop="id">
            <Input v-model="formValidate.id" placeholder="请输入编号"></Input>
        </FormItem>
        <FormItem label="所属编号" prop="id">
            <Input v-model="formValidate.pid" placeholder="请输入所属编号"></Input>
        </FormItem>
        <FormItem label="名称" prop="cate_name">
            <Input v-model="formValidate.cate_name" placeholder="请输入名称"></Input>
        </FormItem>

        <FormItem label="图片" prop="cate_img">
            <Input v-model="formValidate.cate_img"></Input>
        </FormItem>
        <FormItem label="路径" prop="path">
            <Input v-model="formValidate.path"></Input>
        </FormItem>
        <FormItem label="优先级" prop="sort">
            <Input v-model="formValidate.sort"></Input>
        </FormItem>                
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleCancel()" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                    cate_name: '',
                    pid: '',
                    id: '',
                    cate_img: '',
                    path: '',
                    sort: '',
                    desc: ''
                },
                ruleValidate: {
                    cate_name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    pid: [
                        { required: true, message: '所属编号不能为空', trigger: 'blur' }
                    ],
                    id: [
                        { required: true, message: '编号不能为空', trigger: 'blur' }
                    ],
                    
                }
            }
        },
        created() {
            // if(this.editInfo !=null){
            //     this.formValidate = this.editInfo;
            // }   
        },
        computed: {
            // formValidate(){
            //     return this.editInfo;
            // }
            getFormData () {
                this.initForm()
                return this.formValidate
            },
        },
        props: [
            'isEdit', 
            'editInfo'],
        methods: {
            handleSubmit (name) {
                alert(this.formValidate.cate_name);
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        this.$emit('update:isEdit', false);
                    } else {
                        this.$Message.error('Fail!');
                    }
                })                 
            },
            handleCancel(){
                 this.$emit('update:isEdit', false);
            },
            initForm () {
                for (const key in this.editInfo) {
                    this.formValidate[key] = this.editInfo[key]
                }
            }
        }
    }
</script>