'use strict';

exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({ 
    		event,
    		context 
    	})
	return await dbJQL.collection('target').where(
        "user_id==$cloudEnv_uid"
    ).field({'targetDate':true,'targetText':true}).get()
};
