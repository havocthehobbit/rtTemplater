let $cn=require("../common/libNative").$cn
let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb


export const RenderTmpl=function(tDataIn, tTmplIn, stateVarIn, useStateIn,cbi){
    let tt=this
    let args=arguments
    let data={}        
    let dataEx={}
    let dataex={}
    let dataExtra={}
    let data_extra={}
    let tTmpl=""
    let tmpState={}
    let stateVar=""
    let NewState={}
    let tmplOut
    let cb=()=>{}
    let useState=false
    let tDataPreValFn=(dt)=>dt

    if (tof(cbi)==="function"){ cb=cbi}
    
    

    // test
    //data.name="rob"
    //tTmpl="`hello ${data.name}`"
    //stateVar="tmplOut"
    ///////////////

    //params
    if (isOb(args[0])){
        let a=args[0]
        let temp=""

        temp="tData"
        if (a[temp]){
            data=a[temp]
        }

        temp="tDataExtra"
        if (a[temp]){
            dataEx=a[temp]
            dataex=a[temp]
            dataExtra=a[temp]
            data_extra=a[temp]
        }

        temp="tTmpl"
        if (a[temp]){
            tTmpl=a[temp]
        }

        temp="stateVar"
        if (a[temp]){
            stateVar=a[temp]
        }

        temp="useState"
        if (a[temp]){
            useState=a[temp]
        }

        temp="tDataPreValFn"
        if (a[temp]){
            if (tof(a[temp])==="function"){
                tDataPreValFn=a[temp]
            }            
        }

        temp="cb"
        if (a[temp]){
            cb=a[temp]
        }

        if (args.length>1){
            cb=args[1]
        }

    }else{
        let a=args
        if (args.length > 0){
            data=a[0]
        }
        if (args.length > 1){
            tTmpl=a[1]
        }
        if (args.length > 2){
            stateVar=a[2]
        }
        if (args.length > 3){
            useState=a[3]
        }
        if (args.le4gth > 4){
            cb=a[4]
        }
    }

    if (typeof(tTmpl)!=="string"){
        return "`ERROR : template is not a string`"
    }

    let temp=tTmpl.trim()
    if (temp[0]!=="`"){
        temp="`" + temp
    }
    if (temp[temp.length - 1]!=="`"){
        temp=temp + "`"
    }
    if (temp==="`"){temp="``"}
    
    tTmpl=preValidateTemplate(temp)
    

    try {
        tmplOut=eval(tTmpl)    
    } catch (error) {
        cb(tmplOut,error)    
        return tmplOut
    }

    tmplOut=(()=>{ 
        let td
        td=tDataPreValFn(tmplOut)
        if (tof(td)==="string"){
            return td
        }else{
            return "`ERROR : custom data validation function issue(tDataPreValFn)`"
        }
    })()
    

    if (typeof(useStateIn)==="bool"){
        useState=useStateIn
    }

    if (useState){
        NewState[stateVar]=tmplOut
        tt.setState(NewState)
    }

    cb(tmplOut)
    
    return tmplOut
}

let preValidateTemplate=(tp)=>{
    let newTp=""
    newTp=tp



    return newTp
}

// test //getAllStringVarsDetails( 'let ${ data.name }  and ${ data.name2 } with ${ data.age }', { name : "rob"},
export const getAllStringVarsDetails=(tmpltStrIn , dataIn,dataExtraIn, options)=>{ // checks for errors in template and checks if variables exist in data
    
    let tmpltStr="" ,data={} , dataExtra={}
    let ret={
        vars : [],
        indexedVars : {},
        errors : "",
        varsErr  : [],
        properties : {
            lineCount : 0,
            wordCount : 0,
        }
    }

    if (!isUn(tmpltStrIn)){
        tmpltStr=tmpltStrIn
    }

    if (!isUn(dataIn)){
        data=dataIn
    }

    if (!isUn(dataExtraIn)){
        dataExtra=dataExtraIn
    }


    // find template fields
        let p={ in : tmpltStr, cbs : [] , arr : [] , stOp : "${",stCl : "}" }
        let nr={ stOp : "${",stCl : "}" ,fnOp : ()=>{},fnCl : ()=>{} }
        p.cbs.push(nr)
        
        let findTemplateStartEnds=(params)=>{
            let opChar=params.stOp
            let clChar=params.stCl
            let str=params.in
            let arr=params.arr
            let openPos=str.indexOf(opChar ) + opChar.length
            let newtmp1=str.substr(openPos)

            let closePos=newtmp1.indexOf(clChar) - 1
            let midTemp=newtmp1.substr(0, closePos ).trim()
            let nextTemp=newtmp1.substr(closePos + 1 + clChar.length )

            let nr={ "openPos" : openPos , "data" :  midTemp ,"closePos" : closePos }
            arr.push(nr)
            params.arr=arr
            params.in=nextTemp
            //cl ("nextTemp : " ,nextTemp)
            //cl ("if  : " , params.in.length ,  " openPos : ", openPos , " closePos : ", closePos )
            if (params.in.length <=  0 || openPos=== -1 || closePos === -1 ){
                return arr
            }
            arr=findTemplateStartEnds(params)
            
            //cl("op : ", openPos , " , opChar : ", opChar)
            //cl("openPos : ", openPos , ", mid data : " , midTemp ,", closePos : " ,closePos )
            
            return arr
        }

        let posdata=[]
        posdata=findTemplateStartEnds(p)
        //cl("p.arr " , p.arr )
        //cl("posdata " , posdata )
        //cl("p.arr len" , p.arr.length )

        let splitObjectPath=(str)=>{ // loop through arrary of
            //let splitstr=str.split(/(\.+|\[+|\]+)/);  // keep delimeters
            let splitstr=str.split(/\.|\[|\]/); // round braces make regex keep delims
            return splitstr
        }


        let validateObjPath=(str, data)=>{ // loop through arrary of
            
            const result = splitObjectPath(str)
            let fnc=(arrObjIn, DataIn )=>{
                let ntmp
                let isValid=true
                arrObjIn.forEach((v,i)=>{
                    let tmp=v
                    
                    if (isValid!==false){
                        if (v==="." | v==="[" | v==="]" ){
                    
                        }else{
                    
                            let nob=DataIn
                            if (( i + 1 )!==arrObjIn.length){
                                if ( typeof(nob[ arrObjIn[ i + 1 ] ])==="undefined" ){
                                    isValid=false
                                    return isValid
                                }else{
                                    
                                    isValid=true      
                                    if (nob[ arrObjIn[ i + 1 ]]){                              
                                        isValid=fnc( arrObjIn.slice(1,arrObjIn.length) , nob[ arrObjIn[ i + 1 ]])
                                        return isValid
                                    }else{
                                        return isValid
                                    }
                                }
                            }
                            
                        }
                    }
                })

                return isValid
            }

            //let tmpO=result.slice(1,result.length)
            let tmpO=result
            let nv=fnc( tmpO , data )
            console.log("nv : ", nv)
            return nv
        }

        let isValid=validateObjPath(posdata[0].data,data)

        posdata.forEach((r,i)=>{
            let tmp=[]
            tmp=r.data.split(".")

           // cl("tmp : " ,tmp)

        });


    return ret
}

window.getAllStringVarsDetails=getAllStringVarsDetails