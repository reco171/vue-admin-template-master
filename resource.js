import request from '@/utils/http'

// 多条件查询目录
export function queryByCondition(param) {
  if(param == "type"){
      return request({
        url: '/metaData/distinctResourceFormat',
        method: 'post',
      })
  } else if(param == "catalog"){
    return request({
      url: '/metaData/distinctResourceCatalog',
      method: 'post',
    })
  } else if(param == "origin"){
    return request({
      url: '/metaData/distinctResourceOrigin',
      method: 'post',
    })
  } else if(param == "year"){
    return request({
      url: '/metaData/distinctStartTime',
      method: 'post',
    })
  }
}

// 获取关键字
export function getKeywords() {

  return request({
    url: '/metaData/getKeywords',
    method: 'get',
  })
}
// 按条件磨合查询求并集
export function pagedCriteriaOrQuery(currentPage, pageSize,array) {

  return request({
    url: '/metaData/pagedCriteriaOrQuery',
    method: 'post',
    data:{
      pageNumber:currentPage, 
      pageSize:pageSize,
      param:array
    }
  })
}

// 下载
export function downloadById(id) {

  return request({
    url: '/metaData/downloadById',
    method: 'post',
    data:{
      id:id
    }
  })
}

// 下载排名
export function downloadAmount() {

  return request({
    url: '/metaData/downloadAmount',
    method: 'post',
    data:{
      pageNumber:0, 
      pageSize:10
    }
  })
}

// 全文模糊查询, 求并集
export function likeQuery(currentPage, pageSize,value) {

  return request({
    url: '/metaData/likeQuery',
    method: 'post',
    data:{
      pageNumber:currentPage, 
      pageSize:pageSize,
      param:value
    }
  })
}

// 全文查询
export function queryAll(param) {
  const data = {
    param
  }
  return request({
    url: '/metaData/criteriaLikeQuery',
    method: 'post',
    data
  })
}
// 分页查询
export function queryAllPaged(pageNumber,pageSize,param) {
  const data = {
    pageNumber,pageSize,param
  }
  return request({
    url: '/metaData/pagedCriteriaLikeQuery',
    method: 'post',
    data
  })
}

export function queryById(id) {
  const data = {
    id
  }
  return request({
    url: "/metaData/queryById",
    method: 'post',
    data
  })
}
//矢量数据添加（4个文件）
export function addShpResource(data) {
  return request({
    url: '/metaData/add2pg',
    method: 'post',
    data,
    isFormData: true
  })
}

//非结构化数据
export function addftpResource(data) {
  return request({
    url: '/metaData/add2ftp',
    method: 'post',
    data,
    isFormData: true
  })
}

//影像数据
export function addTiffResource(data) {
  return request({
    url: '/metaData/add2hdfs',
    method: 'post',
    data,
    isFormData: true
  })
}

export function addResource(data) {
  return request({
    url: '/metaData/add2pg',
    method: 'post',
    data,
    isFormData: true
  })
}

export function deleteResource(id) {
  const data = {
    id
  }
  return request({
    url: '/metaData/del',
    method: 'post',
    data
  })
}

export function updateResource(data) {
  return request({
    url: '/metaData/update/' + data.id,
    method: 'put',
    data,
    isFormData: true
  })
}

export function queryResource(pageNumber, pageSize) {
  const data = {
    pageNumber,
    pageSize
  }
  return request({
    url: '/metaData/pagedCriteriaLikeQuery',
    method: 'post',
    data
  })
}

export function queryResourceCriteria(pageNumber, pageSize, param) {
  const data = {
    pageNumber,
    pageSize,
    param
  }
  return request({
    url: '/metaData/pagedCriteriaLikeQuery',
    method: 'post',
    data
  })
}

export function likeQueryAndCondition(pageNumber, pageSize, param, condition) {
  const data = {
    pageNumber,
    pageSize,
    param,
    condition
  }
  return request({
    url: '/metaData/likeQueryAndCondition',
    method: 'post',
    data
  })
}
//  tif获取缩略图
export function tifPreview(path) {
  return request({
    url: '/preview',
    method: 'get',
    params:{
      height:'200',
      layer:path,
      width:'200'
    }
  })
}


//quickViewById word,excel预览
export function quickViewById(id) {
  const data = {
    id
  }
  return request({
    url: '/metaData/quickViewById',
    method: 'post',
    data
  })
}

//矢量预览
export function shpPreview(tableName) {
  const data = {
    tableName
  }
  return request({
    url: '/ShpToWKT/getAll',
    method: 'post',
    data
  })
}

//资源编辑
export function updateData(data) {
  return request({
    url: '/metaData/updateData',
    method: 'put',
    data,
    isFormData: true
  })
}
