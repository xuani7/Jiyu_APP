'use strict';
exports.main = async (event, context) => {
	const dbJQL = uniCloud.databaseForJQL({
		event,
		context
	})
	let {
		targetText
	} = event

	let old = await dbJQL.collection('targetList').where('user_id == $cloudEnv_uid').get()
	let len = old.data[0].target_list.length
	console.log(old.data[0].target_list[len-1]);
	old.data[0].target_list[len-1].isFinish = true
	let res =await dbJQL.collection('targetList').where('user_id == $cloudEnv_uid').update({
		"user_id": dbJQL.getCloudEnv(`$cloudEnv_uid`),
		"target_list": old.data[0].target_list

	})
	//返回数据给客户端
	return res
};
