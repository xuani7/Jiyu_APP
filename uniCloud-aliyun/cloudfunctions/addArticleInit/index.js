'use strict';
exports.main = async (event, context) => {
	const dbJQL = uniCloud.databaseForJQL({
			event,
			context 
	})
    let res = ''
    let allUser = await dbJQL.collection('uni-id-users').field('_id').get()
    for(let i = 0 ; i < allUser.data.length; i++){
        res  = dbJQL.collection('user_article').add({
            user_id : allUser.data[i]._id,
            article_id : event.articleId,
            isLike : false,
            isCollect : false
        })
    }
	
	//返回数据给客户端
	return res
};
