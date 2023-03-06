'use strict';
exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({
    		event,
    		context 
    })
    let {id} = event
	//返回数据给客户端
    let userArticle = await dbJQL.collection('user-article').getTemp()
    let article = await dbJQL.collection('articles').field("likeNumber,collectNumber,_id").getTemp()
    let res = await dbJQL.collection(userArticle,article).where("user_id==$cloudEnv_uid").get()
    
    // let userArticle = await dbJQL.collection('user-article').field("isLike,isCollect,article_id").getTemp()
    // let article = await dbJQL.collection('articles').getTemp()
    // let res = await dbJQL.collection(article,userArticle).where("user_id==$cloudEnv_uid && article_id == id").get()
    return res
};
