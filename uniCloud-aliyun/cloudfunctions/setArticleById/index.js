'use strict';
exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({
    		event,
    		context 
    })
	let {likeNumber,collectNumber,_id} = event
     
    let articleId = _id._value
    let isLike = _id.user_article[0].isLike
    let isCollect = _id.user_article[0].isCollect
	let resFlag =await dbJQL.collection('user_article')
    .where(`user_id == $cloudEnv_uid && article_id == '${articleId}'`).update({
		"isLike" : isLike,
        "isCollect" : isCollect
	})
    let resNumber = await dbJQL.collection('articles')
    .where(`_id == '${articleId}'`).update({
		"likeNumber": likeNumber,
        "collectNumber": collectNumber
	})
	//返回数据给客户端
	return {resFlag,resNumber}
};
