'use strict';
exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({
    		event,
    		context 
    })
	let {article_id,isLike,likeNumber,isCollect,collectNumber} = event
     
    let articleId = article_id[0]._id
	let resFlag =await dbJQL.collection('user-article')
    .where("'user_id == $cloudEnv_uid && article_id =='+articleId").update({
		"isLike" : isLike,
        "isCollect" : isCollect
	})
    let resNumber = 1
 //    let resNumber = await dbJQL.collection('articles')
 //    .where("_id == article_id[0]._id").update({
	// 	"likeNumber": likeNumber,
 //        "collectNumber": collectNumber
	// })
	//返回数据给客户端
	return {resFlag,resNumber}
};
