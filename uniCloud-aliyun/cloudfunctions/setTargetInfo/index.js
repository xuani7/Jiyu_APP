'use strict';

exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({
    		event,
    		context 
    })
	let {targetText,targetDate} = event
	targetDate -= Date.now()
	let res =await dbJQL.collection('target')
    .where("user_id==$cloudEnv_uid").update({
		"targetText" : targetText,
        "targetDate" : targetDate
	})
	//返回数据给客户端
	return res
};
