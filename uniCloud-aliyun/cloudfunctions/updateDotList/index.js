'use strict';
exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({
    		event,
    		context 
    })
    let {dotList} = event
    let newList = Array.from(new Set(dotList))
	let res = await dbJQL.collection('target').where('user_id == $cloudEnv_uid').update({
		"dot_list" : newList
	})
	//返回数据给客户端                  
	return res
};