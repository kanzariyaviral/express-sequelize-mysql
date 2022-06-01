

module.exports = (sequelize,Sequelize)=>{
    const posts=sequelize.define('post',{
        name:Sequelize.STRING,
        titel:Sequelize.STRING,
        content:Sequelize.STRING,
        User_id:Sequelize.INTEGER
    },
    {
        underscored:true,
        CreatedAt:'creat_at',
        UpdateAt:'modified_at'
    }
    );
    return posts
}