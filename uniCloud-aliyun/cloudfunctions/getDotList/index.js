'use strict';
exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({
    		event,
    		context 
    	})
	// let {userId} = event
	//返回数据给客户端
	return await dbJQL.collection('target').where(
		"user_id==$cloudEnv_uid"
	).field({'dot_list':true}).get()
};

