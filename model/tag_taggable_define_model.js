
module.exports = (sequelize,Sequelize)=>{
    const taggable=sequelize.define('tag_taggable',{
       tagId:Sequelize.INTEGER,
       tagtaggableId:Sequelize.INTEGER,
       tagtaggableType:Sequelize.STRING
    },
    {
        CreatedAt:'creat_at',
        UpdateAt:'modified_at'
    }
    );
    return taggable
}