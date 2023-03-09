'use strict';
exports.main = async (event, context) => {
	const dbJQL = uniCloud.databaseForJQL({
			event,
			context 
	})
    let {articleId} = event
    let res = await await dbJQL.collection('user_article').where(`article_id == "${articleId}"`).remove()
	//返回数据给客户端
	return res
};
