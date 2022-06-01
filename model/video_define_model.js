module.exports=(sequelize,Sequelize)=>{
    const Video=sequelize.define('video',{
        title:Sequelize.STRING,
        text:Sequelize.STRING
    },{

    });
    return Video
}