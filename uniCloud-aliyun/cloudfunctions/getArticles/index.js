'use strict';
exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({
    		event,
    		context 
    	})
    let {page} = event
    
    let user_article = await dbJQL.collection('user_article').where(`user_id == $cloudEnv_uid`).field("isLike,isCollect,article_id,user_id").getTemp()
    let article = await dbJQL.collection('articles').getTemp()
    let user = await dbJQL.collection('uni-id-users').field("nickname,username,avatar_file.url as avatarUrl,_id").getTemp()
	let res =await dbJQL.collection(article,user,user_article).orderBy("publishTime","desc").skip(5 * (page-1)).limit(5 * page).get()
    
	//返回数据给客户端
	return res
};
