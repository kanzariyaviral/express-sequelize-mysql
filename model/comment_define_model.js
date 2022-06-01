module.exports=(sequelize,Sequelize)=>{
    const Comment=sequelize.define('comment',{
        title:Sequelize.STRING,
        commentableId:Sequelize.INTEGER,
        commentableType:Sequelize.STRING
    })
    return Comment;
    }