const { sequelize, Op ,QueryTypes} = require('sequelize');
const { User, Sequelize } = require('../model/authenticate');
const db = require('../model/authenticate')

// add row in mysql using sequelize
var addUser = async (req,res) => {
    const user = {
        name: 'gtc',
        email: 'gtc@gmail.com',
        gender: 'male'
    };
    await db.User.create(user)
        .then(data => {
            console.log('insert data successfully')
            // res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error ahead"
            });
        })
        res.status(200).json({ data: 'ok' })
}

// add row in mysql using post  sequelize
var addUserp = async (req, res) => {
    try {
        var uname = req.body.name;
        var ugmail = req.body.email;
        var ugendar = req.body.gender
        var user = {
            name: uname,
            email: ugmail,
            gender: ugendar
        };
        let add = await db.User.create(user)

        console.log('insert data successfully')
        res.status(200).json({ message: 'ok' })
        // res.status(200).json(data)
    }
    catch (e) {
        const messages = {};
        e.errors.forEach((error) => {
            let message;
            switch (error.validatorekey) {
                case 'is_null':
                    message = error.message
                    break;
            }
            messages[error.path] = message;
            console.log(messages);
        })
    }

}

// update row in mysql using sequelize
var updateRow = async (req, res) => {

    let update = await user.update(
        { name: 'update name' },
        { where: { id: 12 } })
        .then(data => {

            console.log('update successfully')
        })
    res.send('update successfully')
}

// update row using post method
var updateRowp = async (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    let update = await db.User.update(
        { name: name },
        { where: { id: Number(id) } })
        .then(data => {

            console.log('update successfully')
        })
    res.send('update successfully')
}

// delete row in mysql using sequelize
var deleteRow = async (req, res) => {
    var uid = 7;
    var d = await db.User.destroy(
        { where: { id: uid } })
        .then(data => {

            console.log(`delete data of id ${uid} successfully`)
        })
    res.send('delete data successfully')
}

// delete row in mysql using post method sequelize
var deleteRowp = async (req, res) => {
    var uid = req.body.id;
    var d = await db.User.destroy(
        { where: { id: Number(uid) } })
        .then(data => {

            console.log(`delete data of id ${uid} successfully`)
        })
    res.send(`delete data  ${uid} successfully`)
}

// count row in table
var countRows = async (req, res) => {

    let n = await db.User.count();
    console.log(`There are ${n} rows`);
    res.status(200).send(`total entry are ${n}`)
}

// get data of all rows
//  var findAllRows = async(req,res)=> {

//     let notes = await db.User.findAll({
//         attributes:[
//             'name',
//             ['email','emailID'],
//             // 'gender'
//         ]
//      });
//     console.log(notes);
//     res.status(200).json({
//         detailes:notes
//     })

// }



// get data of all rows and concat data and exclude attribute
// var findAllRows = async(req,res)=> {

//     let notes = await db.User.findAll({
//         attributes:{exclude:['createdAt','updatedAt'],
//         include:[
//             [Sequelize.fn('CONCAT',Sequelize.col('name'),' bhai'),'fullname']
//         ]}
//      });
//     console.log(notes);
//     res.status(200).json({
//         detailes:notes
//     })
// }

// findAll
// findByPk
// findOne
// findAndCountALL
// findOrCreate
// get or set link:-https://sequelize.org/docs/v6/core-concepts/getters-setters-virtuals/


// get data of all rows 
var findAllRows = async (req, res) => {

    let notes = await db.User.findAll({
        where: {
            // id:{
            //     [Op.eq]:2
            // }
            name: {
                [Op.eq]: 'gtc'

                //all sequelize oprater:- https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
                // offset,group
            }
        }
    });
    console.log(notes);
    res.status(200).json({
        detailes: notes
    })

}

// get data of all rows
var findAllnamesp = async (req, res) => {
    var uname = req.body.name;
    let notes = await db.User.findAll({ where: { name: uname } });
    console.log(notes);
    res.status(200).json({
        detailes: notes
    })

}

// find by id using get method 
var findid = async (req, res) => {
    let da = await dbb.User.findOne({ where: { id: 1 } })
        .then()
    console.log(da);
    res.status(200).json({ useinfo: da });
}

// find by id using post method
var findidp = async (req, res) => {
    var uid = req.body.id
    let da = await db.User.findOne({ where: { id: Number(uid) } })
        .then(da => {
            console.log(da);
            res.status(200).json({ useinfo: da })
        })



}
//validation check
var validation = async (req, res) => {
    try {
        const user = {
            name: 'test',
            email: 'gtcsysdsddh',
            gender: 'male'
        };
        await db.User.create(user)
        res.status(200).json({ message: 'validation completed' })
    } catch (e) {
        const messages = {}
        e.errors.forEach((error)=> {
            let message;
            switch (error.validatorKey) {
                case 'not_unique':
                    message = 'email already exist'
                    break;
                case 'isIn':
                    message = 'please enter gender male or female'
                    break;
                case 'is_null':
                    message = "please enter all values";
                    break;
                case 'isEmail':
                    message = 'please enter email in email formate'
                    break;

            }
            // console.log(e)
            messages[error.path] = message;
            console.log(message)
            res.status(404).json({
                    error: message
                });
        });
    }

}

// rawquery
var rawquery=async(req,res)=>{
    const users= await db.sequelize.query("Select * from gtcs where gender= $gender",{
        type:QueryTypes.SELECT,
        // model:user,
        // mapToModel:true,
        // raw:true,
        // replacements:{gender:'male'}   //gender=gender
        // replacements:['male'] //gender=?
        // replacements:{gender:['male','female']}  //gender IN(;gender)
        // replacements:{searchEmail:'%@gmail'} //gmail LIKE :searEmail
        bind:{gender:'male'} //gender=$gender
    });
    console.log(users)
    res.status(200).json({
        rawquery:users
    })
}


module.exports = {
    addUser,
    updateRow,
    deleteRow,
    countRows,
    findAllRows,
    updateRowp,
    deleteRowp,
    findid,
    findidp,
    findAllnamesp,
    addUserp,
    validation,
    rawquery
}
