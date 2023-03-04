'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
    let {_id} = event
	//返回数据给客户端
	return await db.collection('articles').doc(_id).get()
};
