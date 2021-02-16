const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const Router = require('koa-router')
var bodyParser = require('koa-bodyparser');

const router = new Router()

app.use(koaBody({
  multipart: true, // 开启文件上传
  formidable: {
    maxFileSize: 200*1024*1024,    // 设置上传文件大小最大限制，默认2M
    keepExtensions: true // 保留文件拓展名
  }
}))
app.use(router.routes())
app.use(router.allowedMethods())
app.use(bodyParser())

// 获取我的订单列表 api: /orderList/update
const updateMyOrderList = require('./controller/myProfile/updateOrderList')
router.use('/orderList', updateMyOrderList.routes())

// 核销我的订单 api: /orderList/list
const getMyOrderList = require('./controller/myProfile/getMyOrderList.js')
router.use('/orderList', getMyOrderList.routes())

// 获取轮播图 api: /getPic/lunbotu
const getLunbotu = require('./controller/lunbotu/getLunbotu.js')
router.use('/getPic', getLunbotu.routes())

// 轮播图关联商品 api: /getPic/linkToProduct
const lunbotuId = require('./controller/lunbotu/linktoProduct.js')
router.use('/getPic', lunbotuId.routes())

// 删除轮播图 api: /getPic/delete
const deleteId = require('./controller/lunbotu/deleteLunbotu.js')
router.use('/getPic', deleteId.routes())

// 新增轮播图 api: /getPic/add
const addLunbotu = require('./controller/lunbotu/addLunbotu.js')
router.use('/getPic', addLunbotu.routes())



/*---------------商品管理相关--------------*/
// 获取商品列表 api: /product/get
const getProduct = require('./controller/product/getProductList.js')
router.use('/product', getProduct.routes())

// 更新商品 api: /product/update
const updateProduct = require('./controller/product/updateProduct')
router.use('/product', updateProduct.routes())

// 新增商品 api: /product/add
const addProduct = require('./controller/product/addProduct')
router.use('/product', addProduct.routes())

// 删除商品 api: /product/delete
const deletProduct = require('./controller/product/deleteProduct')
router.use('/product', deletProduct.routes())

/*---------------图片管理相关--------------*/
// 新增图片 api: /pic/add
const addPic = require('./controller/images/addImages.js')
router.use('/pic', addPic.routes())

// 查询图片 api: /pic/query
const queryPic = require('./controller/images/queryImages.js')
router.use('/pic', queryPic.routes())

// 查询图片 api: /pic/delete
const deletePic = require('./controller/images/deletImages.js')
router.use('/pic', deletePic.routes())

// 获取图片分类 api: /pic/getInageClass
const getInageClass = require('./controller/images/getImageClass.js')
router.use('/pic', getInageClass.routes())

// 更新图片分类 api: /pic/updataInageClass
const updataInageClass = require('./controller/images/deletImageClass.js')
router.use('/pic', updataInageClass.routes())

/*---------------全局配置相关--------------*/
// 获取全局配置 api: /config/get
const getConfigs = require('./controller/myProfile/getConfigs')
router.use('/config', getConfigs.routes())

// 更新全局配置 api: /config/update
const updateConfigs = require('./controller/myProfile/updateConfigs')
router.use('/config', updateConfigs.routes())

app.listen(3000)
console.log('The server is on localhost:3000')