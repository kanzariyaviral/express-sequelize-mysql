
const db = require('../model/authenticate')

// onotoONe 
var oneToOne = async (req, res) => {
    let data = await db.User.findAll({
        attributes: ['name', 'email'],
        include: [{
            model: db.posts,
            attributes: ['titel', 'content']
        }],
        where: { id: 6 }
    })

    res.status(200).json({
        data: data
    })
}

// belongsto
var belongsTo = async (req, res) => {
    let data = await db.posts.findAll({
        attributes: ['titel', 'content'],
        include: [{
            model: db.User,
            attributes: ['name', ['email', 'gmail']]
        }]

    })

    res.status(200).json({
        data: data
    })
}


// one to many relationship
var oneToMany = async (req, res) => {
    let data = await db.user.findAll({

        attributes: ['name', 'email'],
        include: [{
            model: db.posts,
            attributes: ['titel', 'content']
        }],
        where: { id: 6 }
    })
}


// many to many relationship
var manyToMany = async (req, res) => {
    // // -------post to tags-------//
    // let data = await db.posts.findAll({
    //     attributes: ['titel', 'content'],
    //     include: [{
    //         model: db.tags,
    //         attributes: ['name']
    //     }]
    // })
    // -------tags to post-------//
    let data = await db.tags.findAll({
        attributes: ['name'],
        include: [{
            model: db.posts,
            attributes: ['titel', 'content']
        }]
    })
    
    res.status(200).json({ data: data })
}



module.exports = {
    oneToOne,
    belongsTo,
    oneToMany,
    manyToMany
}