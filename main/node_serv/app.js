const fs=require('fs')
let progargs=require("./l_node_modules/execRunParams.js").args
progargs.proc_params_init()

//let installApp=require("./l_node_modules/install.js").install.init()
let $cnn=require("./l_node_modules/libNativeNode.js").$cnn
let $cn=require("./l_node_modules/libNative.js").$cn

let settingsMod=require('./l_node_modules/settings.js').settingsMod
let settings=new settingsMod({}).settings
console.log("starting : ", settings.name , " ," , new Date())

let ApiInst=require('./l_node_modules/apiInit.js').ApiInst
let gdb=require("./modules/generalDbFns.js").generalDbFns
let lgsO=require("./l_node_modules/logs.js").logs
let lgs=new lgsO("../logs/log.txt")

let cl=$cn.l
let tof=$cn.tof

lgs.add(`start ${settings.name} ${settings.host}`)


let httpAppParams= { useHttpServer : true}

gdb.progParams.adminProgParamResetPass( httpAppParams , ()=>{})
gdb.progParams.adminProgParamListUsers( httpAppParams , ()=>{})



//cl( "httpServer : " , useHttpServer )

let app
if (httpAppParams.useHttpServer===true){ // prevent starting https server if a prog parameter requires something , like prompt input
    // initlise http server
    ApiInst.init({}, ()=>{
        // initialisation of listener complete        
    })
    app=ApiInst.app
}else{
    app={
            get:()=>{},
            post:()=>{}
        }
}

//==============================================================================================================
//==============================================================================================================

app.get("/test" ,function(req , res){    
        res.send( "testing get" )    
})


