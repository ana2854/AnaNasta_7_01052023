const Post = require ("./Post")
const User = require("./User")

//réf à la clé étrangère de la table post (clé principale de la table user)
Post.belongsTo(User, { foreignKey: 'user_id' }); 
User.hasMany(Post, { foreignKey: 'user_id' }); 


