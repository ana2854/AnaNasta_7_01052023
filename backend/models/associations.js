const Post = require ("./Post")
const User = require("./User")


Post.belongsTo(User, { foreignKey: 'userId' }); 

//réf à la clé étrangère de la table post (clé principale de la table user)
User.hasMany(Post, { foreignKey: 'userId' }); 


