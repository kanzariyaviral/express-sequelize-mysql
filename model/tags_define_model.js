module.exports = (sequelize,Sequelize)=>{
    const tags=sequelize.define('tags',{
        name:Sequelize.STRING   
    },
    {
        CreatedAt:'creat_at',
        UpdateAt:'modified_at'
    }
    );
    return tags
}