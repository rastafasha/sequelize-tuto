const dbConfig = require("../config/db.config");
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('connected..');
    })
    .catch(err => {
        console.log('Error' + err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./productModel.js')(sequelize, DataTypes);
db.reviews = require('./reviewModel.js')(sequelize, DataTypes);
db.categories = require('./categoryModel.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!');
    });



// 1 to Many Relation

db.products.hasMany(db.reviews, {
    foreignKey: 'product_id',
    as: 'review'
});

db.products.hasMany(db.categories, {
    foreignKey: 'product_id',
    as: 'category'
});

db.reviews.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'product'
});

db.categories.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'product'
});





module.exports = db;