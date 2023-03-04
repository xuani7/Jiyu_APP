'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {targetText,targetDate} = event
	targetDate -= Date.now()
	let res =await db.collection('target').where({
		"user_id":"2978saa77837"
	}).update({
		"targetText" : targetText,
        "targetDate" : targetDate
	})
	//返回数据给客户端
	return res
};
