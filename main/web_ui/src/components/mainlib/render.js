let ps=require("./parser.js").ps
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

export const splitObjectPathDelim=(str)=>{ // loop through arrary of
    //let splitstr=str.split(/(\.+|\[+|\]+)/);  // keep delimeters
    let splitstr=str.split(/\.|\[|\]/); // round braces make regex keep delims
    return splitstr
}

export const splitObjectPath=(str)=>{ // loop through arrary of
    //let splitstr=str.split(/(\.+|\[+|\]+)/);  // keep delimeters
    let splitstr=str.split(/\.|\[|\]/); // round braces make regex keep delims
    return splitstr
}
window.splitObjectPath=splitObjectPath

export const findTemplateStartEnds=(params)=>{
    let opChar=params.stOp
    let clChar=params.stCl
    let str=params.in
    let arr=params.arr
    let openPos=str.indexOf(opChar ) + opChar.length
    let newtmp1=str.substr(openPos)

    let closePos=newtmp1.indexOf(clChar)
    let midTemp=newtmp1.substr(0, closePos ).trim()
    let nextTemp=newtmp1.substr(closePos + 1 + clChar.length )

    let nr={ "openPos" : openPos , "data" :  midTemp ,"closePos" : closePos }
    arr.push(nr)
    params.arr=arr
    params.in=nextTemp
    if (params.in.length <=  0 || openPos=== -1 || closePos === -1 ){
        return arr
    }
    arr=findTemplateStartEnds(params)
        
    return arr
}
window.findTemplateStartEnds=findTemplateStartEnds

export const  validateObjPath=(str, data)=>{ // loop through arrary of          
    let fnc=(arrObjInArr, DataIn )=>{
        let ntmp
        let isValid=true
        let arrObjIn=arrObjInArr.slice(1,arrObjInArr.length) // remove first rec from array as it should be the the main data object
        let nobj={}
        let nobj2=DataIn
        let ret=false
        let retrec={ isValid : true , fullPath : str ,invalidaPath : arrObjInArr[0]  , type : "" }
        arrObjIn.forEach((v,i)=>{            
            if (ret===true){return} // continue / break hack                        
            if (isValid!==false){
                if (v==="." | v==="[" | v==="]" ){
            
                }else{
                    let prfx="."
                    //if (i===0){ prfx="" }

                    if (typeof(nobj2[v])==="undefined"){
                        isValid=false
                        retrec.isValid=isValid
                        retrec.invalidaPath+=prfx + v
                        ret=false
                        return
                    }
                    nobj=nobj2[v]
                    nobj2=nobj
                    let tpo=typeof(nobj)
                    if (tpo==="object"){
                        if (Array.isArray(nobj)){
                            tpo="array"
                        }
                    }   

                    retrec.type=tpo


                    retrec.invalidaPath+= prfx + v
                }
            }
        })

        return retrec
    }
    
    const result = splitObjectPath(str)
    let tmpO=result
    let nv=fnc( tmpO , data )
    
    return nv
}
window.validateObjPath=validateObjPath

// test //getAllStringVarsDetails( 'let ${ data.name }  and ${ data.name2 } with ${ data.age }', { name : "rob"},
export const getAllStringVarsDetails=(tmpltStrIn , dataIn,dataExtraIn, options)=>{ // checks for errors in template and checks if variables exist in data
    
    let tmpltStr="" ,data={} , dataExtra={}
    let ret={
        vars : [],
        indexedVars : {},
        errors : "",
        varsErr  : [],
        lineCount : 0,
        lines : [],
        wordCount : 0,
        words : [],
        hasInvalid : false,
        invalidPaths : [],

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
        
        let posdata=[]
        posdata=findTemplateStartEnds(p) // get all templated variables

    let isValid=true
    let isValidRec={}
    let hasInvalid=false
    //let posDataLoopBreak=false
    posdata.forEach((r,i)=>{           
        //if (posDataLoopBreak===true){return}
        let vars={ name : r.data }
        ret.vars.push(vars)
        ret.indexedVars[r.data]={ i : i}

        // check for incalid variables (i.e. dont exist in data)
        isValidRec=validateObjPath(r.data,data)
        isValid=isValidRec.isValid
        let invalidPath=""
        if (isValid===false){
            hasInvalid=true  
            invalidPath=isValidRec.invalidaPath  
            ret.invalidPaths.push({ path : r.data, invalidaPath : isValidRec.invalidaPath })
            ret.errors+=`invalid template variable "${r.data}" ;\n`
        }

        let idxVar=ret.indexedVars[r.data].i
        ret.vars[idxVar].type=isValidRec.type
        ret.vars[idxVar].isValid=isValid
        ret.vars[idxVar].invalidPath=invalidPath

        //if (isValid===false){posDataLoopBreak=true}
    });
    ret.hasInvalid=hasInvalid

    let lines=tmpltStrIn.split("\n")
    ret.lineCount=lines.length
    ret.lines=lines.length
    
    let wordsTMP=tmpltStrIn.split(/\s+|\t+/)
    let words=[]
    wordsTMP.forEach((v,i)=>{
        if (v==="${" || v==="}" ){
            return
        }
        words.push({ name : v })
    })
    ret.wordCount=words.length
    ret.words=words        
    return ret
}
window.getAllStringVarsDetails=getAllStringVarsDetails

export const parseLang=(params)=>{
    let ret={}

    let keywords=[]
    let keywordCodeTypes={} // maped keywords linked to , records that have types like "loop" { "for" : { type "loop", }   }
    let strictSpacing=false
    let openSubCodeBlock="{"
    let closeSubCodeBlock="}"
    let openFunctionParenth="("
    let closeFunctionParenth=")"
    let openArrParenth="["
    let closeArrParenth="]"
    let lineEndChar=";"
    let requiresLineEnd=false
    let lineTxtEnd="\n"

    //split lines up
    let lines=[]
    let lineTxtTmp=[]
    let linesTmp=[]
    lineTxtTmp=params.text.split(lineTxtEnd)

    ret.lineCount=lineTxtTmp.length

    lineTxtTmp.forEach((v,i)=>{
        let nr={ 
            lineNo : i ,  
            charCount : v.length ,  
            lastCharNo : -1 ,  
            lastChar : "" ,  
            lastCharReal : "" ,  
            firstCharReal : "" ,  
            firstChar : "" ,  
            firstCharNo : -1 ,  
            text : "",
            wordsTxt : [],
            words : [],
            wordCount : 0
        
        }

        nr.txt=v

        nr.wordsTxt=v.split(/\s+|\t+/)
        nr.wordCount=nr.words.length
        
        nr.lastCharNo=v.length
        nr.lastCharReal=v[ v.length -1 ] 


        nr.wordsTx.forEach((vw,iw)=>{
            let nrw={
                word : "",
                nextChar : "",
                nextWord : "",
                prevChar : "",
                prevWord : "",
            }

            let isLastWord=false
            if ( iw <= nr.wordsTx.length - 1 ){ // last word
                isLastWord=true
            }

            if ( iw > 1 ){
                nrw.prevWord=nr.nextWord=nr.wordsTx[ iw - 1 ]
            }

            if (isLastWord){
                nrw.nextWord=nr.wordsTx[ iw + 1 ]
                nrw.prevChar=nrw.nextWord[ nrw.prevChar.length - 1 ]
            }

            nrw.word=vw

            nr.words.push(nrw)
        })

        //nr.firstCharNo= // num without blanks or tabs // usefull later for finding indentation

        lines.push(nr)
    })




    

    return ret
} 
window.parseLang=parseLang


