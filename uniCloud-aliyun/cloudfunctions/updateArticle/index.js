'use strict';
exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({
    		event,
    		context 
    })
	let {id,detail,picurls} = event
	let res = await dbJQL.collection('articles').where(`_id == "${id}"`).update({
        "content": detail.content,
        "imgList": picurls,
	})
	//返回数据给客户端
	return res
};
