// const {Sequelize,DataType}=require('sequelize');
const Sequelize=require('sequelize');
const sequelize=new Sequelize('mens','root','',{
    host:'localhost',
     dialect:'mysql',
     logging:true,
     operatorsAliases: false,
});
sequelize.authenticate()
.then(() => {
    console.log('Connection established successfully.');
  })
.catch(err => {
    console.error('Unable to connect to the database:', err);
  })


const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.sequelize.sync({force:false})
.then(()=>{
  console.log("yes re-sync");
})

db.User=require("./user_define_model")(sequelize,Sequelize);
db.posts=require("./post_define_model")(sequelize,Sequelize);

db.tags=require("./tags_define_model")(sequelize,Sequelize);
db.post_tag=require("./post_tag_define")(sequelize,Sequelize);

db.Video=require("./video_define_model")(sequelize,Sequelize);
db.Image=require("./image_define_model")(sequelize,Sequelize);
db.Comment=require("./comment_define_model")(sequelize,Sequelize);

db.taggable=require('./tag_taggable_define_model')(sequelize,Sequelize);

db.Student=require("./student_defind_model")(sequelize,Sequelize);
db.employees=require("./employes_define_model")(sequelize,Sequelize);


// relationship
// ------------one ot one-------------//
// db.User.hasOne(db.posts,{foreignKey:'User_id'});

// -----------one to many-------------//
db.User.hasMany(db.posts);
db.posts.belongsTo(db.User,{foreignKey:'User_id'});



// ------------many to many------------//
db.posts.belongsToMany(db.tags,{through:'post_tag'});
db.tags.belongsToMany(db.posts,{through:'post_tag'});

//-----------polymorphic one to many--------------//
db.Image.hasMany(db.Comment,{
  foreignKey:'commentableId',
  constraints:false,
  scope:{
    commentableType:'image'
  }

});

db.Video.hasMany(db.Comment,{
  foreignKey:'commentableId',
  constraints:false,
  scope:{
    commentableType:'video'
  }

});


db.Comment.belongsTo(db.Image,{  foreignKey:'commentableId',  constraints:false,});
db.Comment.belongsTo(db.Video,{  foreignKey:'commentableId',  constraints:false,});

//---------------image to tag-----------------------//
db.Image.belongsToMany(db.tags,{
  through:{
    model:db.taggable,
    unique:false,
    scope:{
      tagtaggableType:'image'
    }
  },
  
  foreignKey:'tagtaggableId',
  constraints:false
})

//---------------tag to image-----------------------//

db.tags.belongsToMany(db.Image,{
  through:{
    model:db.taggable,
    unique:false,
    scope:{
      tagtaggableType:'image'
    }
  },
  
    foreignKey:'tagId',
    constraints:false
  
})


//---------------video to tag-----------------------//
db.Video.belongsToMany(db.tags,{
  through:{
    model:db.taggable,
    unique:false,
    scope:{
      tagtaggableType:'video'
    }
  },
  
  foreignKey:'tagtaggableId',
  constraints:false
})

//---------------tag to video-----------------------//

db.tags.belongsToMany(db.Video,{
  through:{
    model:db.taggable,
    unique:false,
    scope:{
      tagtaggableType:'video'
    }
  },
  
    foreignKey:'tagID',
    constraints:false
  
})




// ------------scope------------//
db.User.addScope('checkStatus',{
  where:{
    status:1
    // gender:'male'
  }
})
db.User.addScope('checkgender',{
  where:{
    gender:'male'
  }
})

db.User.addScope('selectATT',{
  attributes:['name','email','gender']
})

db.User.addScope('addmodel',{
  include:{
    model:db.posts,
    attributes:['titel','name']
  }
})


db.Comment.addScope('image',{
  where:{
    commentableType:'image'
  }
})

db.User.addScope('limit',{
  limit:1
})

module.exports=db;
 
