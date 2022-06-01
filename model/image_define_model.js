module.exports=(sequelize,Sequelize)=>{
    const Image=sequelize.define('image',{
        title:Sequelize.STRING,
        url:Sequelize.STRING
    },{

    });
    return Image
}