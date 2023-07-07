const Post = require ("./Post")
const User = require("./User")
const Like = require("./Like")

try {
Post.belongsTo(User, { foreignKey: 'userId' }); 

//réf à la clé étrangère de la table post (clé principale de la table user)
User.hasMany(Post, { foreignKey: 'userId' }); 

User.hasMany(Like,{foreignKey : "userId"} )

Post.hasMany(Like, {foreignKey: "postId" })

Like.belongsTo(Post, {foreignKey: "postId"})
Like.belongsTo(User, {foreignKey: "userId"})


} catch (error) {
    console.log("Erreur association des modeles ", error);
    throw error
}




