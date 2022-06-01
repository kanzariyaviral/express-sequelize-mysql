const express =require('express');
const app=express()
const port =process.env.PORT || 8080;
require('./model/authenticate')
const userctrl=require('./controller/userController')
const postctrl=require('./controller/postcontroller');
const scopectrl = require('./controller/scopescontroller');
app.use(express.json())
app.get('/',(req,res)=>{
    res.status(200).json({
        message:"hello"
    })
})
// const db =require('./model/index')
// db.sequelize.sync();

app.get('/add',userctrl.addUser)
app.post('/add',userctrl.addUserp)

app.get('/update',userctrl.updateRow)
app.post('/update',userctrl.updateRowp)

app.get('/delete',userctrl.deleteRow)
app.post('/delete',userctrl.deleteRowp)

app.get('/count',userctrl.countRows)

app.get('/findall',userctrl.findAllRows)

app.post('/findallname',userctrl.findAllnamesp)

app.get('/validation',userctrl.validation)

app.get('/rawquery',userctrl.rawquery)

app.get('/findid',userctrl.findid)
app.post('/findid',userctrl.findidp)

app.get('/oneToOne',postctrl.oneToOne)
app.get('/belongsTo',postctrl.belongsTo)

app.get('/oneToMany',postctrl.oneToMany)

app.get('/manyToMany',postctrl.manyToMany)

app.get('/scope',scopectrl.scopes)
app.get('/poly',scopectrl.poly)
app.get('/polyy',scopectrl.polyy)

app.get('/polymany',scopectrl.polyMany)

app.get('/loading',scopectrl.loading)
app.get('/paranoid',scopectrl.paranoid)
app.get('/transaction',scopectrl.transaction)
app.get('/hooks',scopectrl.hooks)
app.get('/query',scopectrl.query)


app.use('*',(req,res)=>{
    res.status(401).json({
        err:'path not found'
    })
})
app.listen(port,()=>{
    console.log(`server use port no ${port}`)
})