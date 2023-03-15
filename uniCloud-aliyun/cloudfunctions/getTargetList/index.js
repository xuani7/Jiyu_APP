'use strict';

exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({ 
    		event,
    		context 
    	})
	return await dbJQL.collection('targetList').where(
        "user_id==$cloudEnv_uid"
    ).field("target_list").orderBy("desc").get()
};
