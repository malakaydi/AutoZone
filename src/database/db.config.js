const config=require('../config/config');
const mongoose=require('mongoose');
const db={};
mongoose.Promise=global.Promise;
mongoose.set('strictQuery',false);
db.mongoose=mongoose;
db.url=config.DB_URL;
db.agents=require('../api//models/agents.model')(mongoose);
db.showrooms=require('../api/models/showroom.model')(mongoose);
db.sales=require('../api/models/sales.model')(mongoose);
db.vehicles=require('../api/models/vehicles.model')(mongoose);

module.exports=db;