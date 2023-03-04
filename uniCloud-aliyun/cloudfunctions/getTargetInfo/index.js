'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	// let {userId} = event
	//返回数据给客户端
	return await db.collection('target').where({
		// "user_id":"21safa87x787"
		"user_id":"2978saa77837"
	}).field({'targetDate':true,'targetText':true}).get()
};
