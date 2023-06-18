// permissions.js

const isAdmin = (req) => {
    //si admin
    return req.user.role === 'admin';
  };
  
  const isPostOwner = (req) => {
    
    return req.params.id === req.user.userId;
  };
  
  module.exports = {
    isAdmin,
    isPostOwner,
  };
  