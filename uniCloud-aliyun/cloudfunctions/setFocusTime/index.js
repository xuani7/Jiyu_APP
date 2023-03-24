'use strict';
exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({
    		event,
    		context 
    	})
	let {focusTime,focusDate} = event
	//返回数据给客户端
	return await dbJQL.collection('focus').where(
		"user_id==$cloudEnv_uid"
	).update({
		"user_id": dbJQL.getCloudEnv(`$cloudEnv_uid`),
		"focus_list": [
			{
				"focusTime": focusTime,
				"focusDate": focusDate
			}
		]
	})
};

