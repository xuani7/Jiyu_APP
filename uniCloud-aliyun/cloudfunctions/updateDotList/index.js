'use strict';
exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({
        event,context
    })
    let {dotList} = event
    let newList = Array.from(new Set(dotList))
    let num = await dbJQL.collection('target').where('user_id==$cloudEnv_uid').count()
    let res = ''
    if (num.total == 0) {
        res = await dbJQL.collection('target').add({
            user_id: dbJQL.getCloudEnv(`$cloudEnv_uid`),
            targetText: '',
            targetDate: 0,
            dot_list: newList
        })
    } else {
        res = await dbJQL.collection('target').where('user_id == $cloudEnv_uid').update({
            "dot_list": newList
        })
    }
    //返回数据给客户端                  
    return res
};
