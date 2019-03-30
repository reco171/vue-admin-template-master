<template>
    <div>
        <div class="query-c">
            查询：
            <Input search placeholder="请输入查询内容" style="width: auto" />
        </div>
        <br>
        <Table border stripe :columns="columns1" :data="data1"></Table>
        <br>
        <Page :total="30" show-sizer show-elevator/>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            test:'1',
            data1: [],
            columns1:[
                {
                    title: '编号',
                    key: 'id'
                },
                {
                    title: '类别名称',
                    key: 'cate_name',
                    "sortable": true
                },
                {
                    title: '图片',
                    key: 'cate_img'
                },
                {
                    title: '路径',
                    key: 'path'
                },
                {
                    title: '创建时间',
                    key: 'created_at'
                },
                {
                    title: '更新时间',
                    key: 'updated_at'
                }
                ,
                {
                    title: '优先级',
                    key: 'sort'
                },
                {
                    title: 'Action',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, 'View'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, 'Delete')
                        ]);
                    }
                }
            ]
        }
    },
    created() {
        var this1 = this;
        // 为给定 ID 的 user 创建请求
        this.$axios.get('/cate/get_cate')
        .then(function (response) {
            this1.data1 = response.data.data;
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
</script>

<style scoped>

</style>