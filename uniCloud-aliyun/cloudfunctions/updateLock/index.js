'use strict';
exports.main = async (event, context) => {
	const dbJQL = uniCloud.databaseForJQL({event,context})
    let {lockList} = event
    let res = ''
	try{
	    res = await dbJQL.collection('lock').where(`user_id==$cloudEnv_uid`).update({
			"user_id": dbJQL.getCloudEnv(`$cloudEnv_uid`),
			"lock_list": lockList
		})
	}catch(e){
		console.log(e);
	}
	//返回数据给客户端
	return res
};
