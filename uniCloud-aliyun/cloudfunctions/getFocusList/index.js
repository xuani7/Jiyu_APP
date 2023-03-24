'use strict';
exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({
    		event,
    		context 
    	})
	// let {userId} = event
	//返回数据给客户端
	return await dbJQL.collection('focus').where(
		"user_id==$cloudEnv_uid"
	).field({'focus_list':true}).get()
};
