

module.exports = (sequelize,Sequelize)=>{
    const post_tag=sequelize.define('post_tag',{
    postId:Sequelize.INTEGER,
     tagId:Sequelize.INTEGER
    },
    {  timestamps:false}
    );
    return post_tag
}