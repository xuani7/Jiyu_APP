'use strict';

exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({
    		event,
    		context 
    })
	let {targetText,targetDate} = event
	// targetDate -= Date.now()
    let num = await dbJQL.collection('target').where('user_id==$cloudEnv_uid').count()
    let res = ''
    if(num.total == 0){
        res = await dbJQL.collection('target').add({
            user_id : dbJQL.getCloudEnv(`$cloudEnv_uid`),
            targetText : targetText,
            targetDate : targetDate,
            dot_list : []
        })
    }else{
        res =await dbJQL.collection('target')
        .where("user_id==$cloudEnv_uid").update({
            "targetText" : targetText,
            "targetDate" : targetDate
        })
    }
    
	//返回数据给客户端
	return res
};
