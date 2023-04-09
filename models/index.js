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

db.user = require("../models/userModel.js")(sequelize, DataTypes);
db.role = require("../models/role.model.js")(sequelize, DataTypes);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, DataTypes);


db.products = require('./productModel.js')(sequelize, DataTypes);
db.reviews = require('./reviewModel.js')(sequelize, DataTypes);
db.categories = require('./categoryModel.js')(sequelize, DataTypes);
db.addresses = require('./addressModel.js')(sequelize, DataTypes);
db.users = require('./userModel.js')(sequelize, DataTypes);
db.comments = require("./comment.model.js")(sequelize, DataTypes);
db.tutorials = require("./tutorial.model.js")(sequelize, DataTypes);

const Role = db.role;
const User = db.user;

db.sequelize.sync({ force: false })
    .then(() => {
        initial();
        initialUser();
        console.log('yes re-sync done!');
    });



function initial() { //create 3 roles principales
    Role.create({
        id: 1,
        name: "ROLE_GUEST"
    });

    Role.create({
        id: 2,
        name: "ROLE_MEMBER"
    });

    Role.create({
        id: 3,
        name: "ROLE_ADMIN"
    });
}

function initialUser() { //create 3 usuarios base
    User.create({
        id: 1,
        username: "admin",
        email: "admin@admin.com",
        password: "$2y$10$5CGKRFgnzih.ef5zg8Z85.cU2Q4FR.91kWKINnKpe24uQW4hiQWlS", //password
        role: "ROLE_ADMIN",
    });

    User.create({
        id: 2,
        username: "member",
        email: "moderator@moderator.com",
        password: "$2y$10$5CGKRFgnzih.ef5zg8Z85.cU2Q4FR.91kWKINnKpe24uQW4hiQWlS", //password
        role: "ROLE_MEMBER",
    });

    User.create({
        id: 3,
        username: "guest",
        email: "guest@guest.com",
        password: "$2y$10$5CGKRFgnzih.ef5zg8Z85.cU2Q4FR.91kWKINnKpe24uQW4hiQWlS", //password
        role: "ROLE_GUEST",
    });
}


// 1 to Many Relation
//products
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

//tutorials

db.comments.belongsTo(db.tutorials, {
    foreignKey: "tutorialId",
    as: "product",
});


db.categories.belongsTo(db.tutorials, {
    foreignKey: 'tutorialId',
    as: 'tutorial'
});


// many to many
db.products.hasMany(db.reviews, { as: "reviews" });
db.products.hasMany(db.categories, { as: "categories" });

db.tutorials.hasMany(db.comments, { as: "comments" });
db.tutorials.hasMany(db.categories, { as: "categories" });

db.users.hasMany(db.products, { as: 'products' });
db.users.hasMany(db.addresses, { as: 'addresses' });
db.users.hasMany(db.tutorials, { as: 'tutorials' });
db.users.hasMany(db.comments, { as: 'comments' });
db.users.hasMany(db.reviews, { as: 'reviews' });


//roles
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId',
    targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId',
    targetKey: 'id'
});

db.ROLES = ["guest", "admin", "member"];


module.exports = db;