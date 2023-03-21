let $cn=require("../common/linNative").$cn
let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb


export const RenderTmpl=function(tDataIn, tTmplIn, stateVarIn, useStateIn,cbi){
    let tt=this
    let args=arguments
    let tData={}        
    let tTmpl=""
    let tmpState={}
    let stateVar=""
    let NewState={}
    let tmplOut
    let cb=()=>{}
    let useState=false

    if (tof(cbi)==="function"){ cb=cbi}

    // test
    //tData.name="rob"
    //tTmpl="`hello ${tData.name}`"
    //stateVar="tmplOut"
    ///////////////

    //params
    if (isOb(args[0])){
        let a=args[0]
        let temp=""

        temp="tData"
        if (a[temp]){
            tData=a[temp]
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
            tData=a[0]
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

    tmplOut=eval(tTmpl)

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