module.exports=(sequelize,Sequelize)=>{
    const Student=sequelize.define('student',{
        name:Sequelize.STRING
    },{
        underscored:true,
        tableName:'student'
    })
    return Student
}