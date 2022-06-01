const { json } = require('express/lib/response');
const { sequelize, Sequelize } = require('../model/authenticate');
const db = require('../model/authenticate')

var scopes = async (req, res) => {
    let data = await db.User.scope(['checkStatus', 'checkgender', 'limit', 'selectATT', 'addmodel']).findAll({});
    res.status(200).json(data);
}

var poly = async (req, res) => {
    let data = await db.Image.findAll({
        include: {
            model: db.Comment
        }

    })

    res.status(200).json(data)
}

var polyy = async (req, res) => {
    // let data=await db.Video.findAll({
    //     include:{
    //         model:db.Comment
    //     }
    let data = await db.Comment.scope('image').findAll({
        include: [db.Image],

    })
    res.status(200).json(data)
}


var polyMany = async (req, res) => {
    // image to tag
    // let data= await db.Image.findAll({
    //     include:{
    //         model:tags
    //     }
    // })

    // video to tag
    // let data= await db.Video.findAll({
    //     include:{
    //         model:tags
    //     }
    // })

    // tag to viddeo and image
    let data = await db.tags.findAll({
        include: [db.Image, db.Video]
    })

    res.status(200).json(data)
}

var loading = async (req, res) => {
    //-----------lazy loading-----------------//
    // let data =await db.User.findOne({where:{id:6}})
    // let post=await data.getPosts();
    // res.status(200).json([data,post])


    //-----------Eager loading-----------------//
    let data = await db.User.findOne(
        {
            include: [{
                required: true,
                model: db.posts
            }],
            where: { id: 10 }
        })
    // let post=await data.getPosts();
    res.status(200).json(data)
}

var paranoid = async (req, res) => {

    // get deleted data with paranoid
    // let data =await db.employees.findAll({
    //     paranoid:false
    // })


    // delete data with paranoid
    // let data = await db.employees.destroy(
    //     {
    //      where:{id:1}
    //     })

    // restore data into delete at
    // let data=await db.employees.restore({
    //     where:{id:1}
    // })

    // show all data
    let data = await db.employees.findAll({})
    res.status(200).json(data)
}


var transaction = async (req, res) => {
    const t = await sequelize.transaction()
    try {
        const user = await db.User.create({ name: 'r', email: 'r@gmail.com', gender: 'male', status: 1 }, {
            transaction: t
        });
        console.log('commit');
        t.commit();
    } catch (e) {
        console.log('rollback');
        t.rollback();

    }

    res.status(200).json('ok')
}


var hooks=async(req,res)=>{
var data=await db.User.create({name:'hooks',email:'hooks4@gmail.com',gender:'male',status:0})
res.status(200).json(data)
}

const queryInterface=sequelize.getQueryInterface();

var query=async(req,res)=>{
 
    // create table using queryinterface
    // queryInterface.createTable('avon',{
    //     name:Sequelize.STRING
    // })

    // add column
    // queryInterface.addColumn('avon','email',{
    //     type:Sequelize.STRING
    // })

    // change in column  (alter)
    // queryInterface.changeColumn('avon','email',{
    //     type:Sequelize.STRING
    // })

// remove column
// queryInterface.removeColumn('avon','email')

// delete table
queryInterface.dropTable('avon')
    res.status(200).json('done')
    }

module.exports = {
    scopes,
    poly,
    polyy,
    polyMany,
    loading,
    paranoid,
    transaction,
    hooks,
    query
}