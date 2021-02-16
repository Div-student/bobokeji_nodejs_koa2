const Router = require('koa-router')
const router = new Router()

const callCloudDataBase = require('../../utils/callCloudDataBase.js')
const callCloudFile = require('../../utils/callCloudFile.js')

// @ts-ignore
router.get('/lunbotu', async(ctx) => {
  let query = `db.collection('lunbotu').get()`
  let lunbotu = await callCloudDataBase('databasequery', query)
  const picMap = {}
  let fileList = lunbotu.data.map(element => {
    if(!picMap[JSON.parse(element).url]){
      picMap[JSON.parse(element).url] = JSON.parse(element)._id
    }
    return {
      "fileid": JSON.parse(element).url,
			"max_age": 7200
    }
  });
  let resultList = await callCloudFile('batchdownloadfile', "file_list", fileList)
  let lunbotuList = resultList.file_list.map(item => {
    return {
      download_url: item.download_url,
      fileid: item.fileid,
      pic_id: picMap[item.fileid]
    }
  })
  ctx.body = {
    lunbotu: lunbotuList,
    code: 200
  }
})

module.exports = router