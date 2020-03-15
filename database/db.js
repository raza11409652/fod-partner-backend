const Sequilize = require('sequelize') ; 
const db = {}
const sequelize = new Sequilize('fod' , 'root' , '',{
    host:'localhost'  ,
    dialect:'mysql' , 
    operatorsAliases:false , 
    define:{
        freezeTableName:true
    },
    pool:{
        max :5 , 
        min:0 , 
        acquire:30000 , 
        idle : 10000
    }
}) ; 
db.Sequilize = Sequilize ; 
db.sequelize = sequelize ; 
module.exports = db ; 