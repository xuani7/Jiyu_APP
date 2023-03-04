'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {_id,isLike,likeNumber,isCollect,collectNumber} = event
	let res =await db.collection('articles').doc(_id).update({
		"isLike" : isLike,
        "likeNumber" : likeNumber,
        "isCollect" : isCollect,
        "collectNumber" : collectNumber
	})
	//返回数据给客户端
	return res
};
