/**
 * Created by naveen on 12/21/2017.
 */


var CONFIG = {};

CONFIG.PORT = (process.env.VCAP_APP_PORT || 3000);
CONFIG.DB_URL = 'mongodb://localhost:27017/nodeProject';
CONFIG.SECRET_KEY = "nodeProjectSecret"


module.exports = CONFIG;