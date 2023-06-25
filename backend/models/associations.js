const Post = require ("./Post")
const User = require("./User")

try {
Post.belongsTo(User, { foreignKey: 'userId' }); 

//réf à la clé étrangère de la table post (clé principale de la table user)
User.hasMany(Post, { foreignKey: 'userId' }); 

} catch (error) {
    console.log("Erreur association des modeles ", error);
    throw error
}




