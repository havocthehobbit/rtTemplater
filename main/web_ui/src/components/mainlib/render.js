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

export const getAllStringVarsDetails=(tmpltStrIn , dataIn,dataExtraIn)=>{ // checks for errors in template and checks if variables exist in data
    
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



    return ret
}