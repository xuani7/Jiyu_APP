'use strict';
exports.main = async (event, context) => {
	const dbJQL = uniCloud.databaseForJQL({
			event,
			context 
	})

    let num  = await dbJQL.collection('user_article').where('user_id == $cloudEnv_uid').count()
    let res = ''
    if(num.total == 0){
        console.log("创建连接")
        let allArticle = await dbJQL.collection('articles').field('_id').get()
        for(let i = 0 ; i < allArticle.data.length; i++){
            res  = dbJQL.collection('user_article').add({
                user_id : dbJQL.getCloudEnv(`$cloudEnv_uid`),
                article_id : allArticle.data[i]._id,
                isLike : false,
                isCollect : false
            })
        }
    }else{
        res = "已有连接"
    }
	
	//返回数据给客户端
	return res
};
