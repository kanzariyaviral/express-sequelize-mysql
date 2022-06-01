module.exports=(sequelize,Sequelize)=>{
    const employees=sequelize.define('employee',{
        name:Sequelize.STRING,
        userId:Sequelize.INTEGER
    },{
       
        paranoid:true,
        underscored:true
    })
    return employees
}