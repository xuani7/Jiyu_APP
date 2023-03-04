'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
    let {page } = event
	let res =await db.collection('articles').orderBy("publishTime","desc").limit(5 * page).skip(5 * (page-1)).get()
	//返回数据给客户端
	return res
};
