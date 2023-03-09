'use strict';
exports.main = async (event, context) => {
	const dbJQL = uniCloud.databaseForJQL({event,context})
    let {articleId} = event
    let res = ''
	try{
	    res = await dbJQL.collection('articles').where(`_id == "${articleId}"`).remove()
	}catch(e){
	    uni.showModal({
	        title: '提示',
	        content: e.message
	    })
	}
	
	//返回数据给客户端
	return res
};
