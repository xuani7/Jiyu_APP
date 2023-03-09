'use strict';
exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({
    		event,
    		context 
    })
	let {detail,picurls} = event
	let res =await dbJQL.collection('articles').add({
        "publishTime": Date.now(),
        "content": detail.content,
        "imgList": picurls,
        "likeNumber": 0,
        "collectNumber": 0,
        "user_id": dbJQL.getCloudEnv(`$cloudEnv_uid`)
	})
	//返回数据给客户端
	return res
};
