'use strict';
exports.main = async (event, context) => {
	const dbJQL = uniCloud.databaseForJQL({event,context})
    let {val} = event
	let old = await dbJQL.collection('lock').where('user_id == $cloudEnv_uid').field({'lock_list':true}).get()
	old.data[0].lock_list.push({
            "lockTime": val,
            "isDo": false
        })
    let res = ''
	try{
	    res = await dbJQL.collection('lock').where(`user_id==$cloudEnv_uid`).update({
			"user_id": dbJQL.getCloudEnv(`$cloudEnv_uid`),
			"lock_list": old.data[0].lock_list
		})
	}catch(e){
		console.log(e);
	}
	//返回数据给客户端
	return res
};
