let $cn=require("../common/libNative").$cn
let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb

let exp={}
 const RenderTmpl=function(tDataIn, tTmplIn, stateVarIn, useStateIn,cbi){
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
exp.RenderTmpl=RenderTmpl

let preValidateTemplate=(tp)=>{
    let newTp=""
    newTp=tp



    return newTp
}
exp.preValidateTemplate=preValidateTemplate



const splitObjectPathDelimKeep=(str,...args)=>{ // loop through arrary of
    //let splitstr=str.split(/(\.+|\[+|\]+)/);  // keep delimeters
    //let splitstr=str.split(/\.|\[|\]/); // round braces make regex keep delims
    
    var rx,searchreg
    //rx=new RegExp( "(\.+|\[+|\]+)" , "s") 
    searchreg=escapeStringRegExp( ".|[|]| " ) // at special character cariage prefix "\"
    
    if (typeof(args[0])==="object"){
        if (Array.isArray(args[0])){
            let tmp=""
            args[0].forEach((v,i)=>{
                if (i<args[0].length - 1){
                    tmp+=v + "|"
                }else{
                    tmp+=v
                }
            })

            searchreg=escapeStringRegExp(tmp)            
        }
    }

    var expressionResult = searchreg 
    //rx=new RegExp( "(\\.+|\\[+|\\]+|\\s+)" , "s")   
    rx=new RegExp( expressionResult , "s")   
    //let splitstr=str.split(/\.|\[|\]/); // round braces make regex keep delims
    let splitstr
    splitstr=str.split(rx).filter(Boolean); // filter boolean removed null/empty string '' 
    return splitstr

}
exp.splitObjectPathDelimKeep=splitObjectPathDelimKeep



const splitObjectPath=(str,...args)=>{ // loop through arrary of
    //let splitstr=str.split(/(\.+|\[+|\]+)/);  // keep delimeters
    var rx,searchreg
    //rx=new RegExp( "(\.+|\[+|\]+)" , "s") 
    searchreg=escapeStringRegExp("(" + ".|[|]| "+  ")") // at special character cariage prefix "\"
    
    if (typeof(args[0])==="object"){
        if (Array.isArray(args[0])){
            let tmp=""
            args[0].forEach((v,i)=>{
                if (i<args[0].length - 1){
                    tmp+=v + "|"
                }else{
                    tmp+=v
                }
            })

            searchreg=escapeStringRegExp("(" + tmp +")")            
        }
    }

    var expressionResult = searchreg 
    //rx=new RegExp( "(\\.+|\\[+|\\]+|\\s+)" , "s")   
    rx=new RegExp( expressionResult , "s")   
    //let splitstr=str.split(/\.|\[|\]/); // round braces make regex keep delims
    let splitstr
    splitstr=str.split(rx).filter(Boolean); // filter boolean removed null/empty string '' 
    return splitstr
}
exp.splitObjectPath=splitObjectPath

//window.splitObjectPath=splitObjectPath

const findTemplateStartEnds=(params,...args)=>{
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
    

    if (params.in.length <=  0 || openPos=== -1 || closePos === -1 ){
        return arr
    }
    arr.push(nr)
    params.arr=arr
    params.in=nextTemp
    
    arr=findTemplateStartEnds(params)
        
    return arr
}
exp.findTemplateStartEnds=findTemplateStartEnds

//window.findTemplateStartEnds=findTemplateStartEnds

let checkContainsOpenCloseChars=(inp)=>{
    let ret={ closePos: -1 }
    
    let opChar=inp.opChar
    let clChar=inp.clChar
    let newtmp1=inp.in

    let regexStr=escapeStringRegExp( opChar + "|" + clChar)            
            //returns { closePos , openSeqCount , openTotal,  closeTotal, hasFinalClose }
            //const rg0=new RegExp("\\${|}","g"); // g, is important for global find all
            const rg0=new RegExp(regexStr,"g"); // g, is important for global find all
            let bbb=[...newtmp1.matchAll(rg0)];  
            
            let prevOpen=true
            let currOpen=false
            let countOpenClose=0
            let openSeqCount=0
            let closeSeqCount=0
            let openTotal=0
            let closeTotal=0
            let lastidxPos=-1

            let exitloop=false             
            if (bbb.length>0){
                if (bbb[0]===clChar){
                    // done, no need to look deeper
                }else{
                    // need to look deeper for nested
                    //console.log("bbb ",newtmp1,bbb)
                    // count open closes until we get to out close
                                       
                    bbb.forEach((v,i)=>{
                        let idx=v.index
                        let val=v[0]
                        if (!exitloop){
                            currOpen=false                          
                            if (val===opChar){ // clChar                            
                                currOpen=true
                            }                           

                            if (currOpen===true ){
                                openSeqCount++
                                openTotal++
                                
                            }
                            if (currOpen===false){
                                openSeqCount--
                                closeTotal++
                                
                            }
                                                                                   
                            prevOpen=currOpen
                            if (openSeqCount===0){
                                lastidxPos=idx

                                exitloop=true                                
                            }
                        }
                    })                     
                }
            }
            if (openSeqCount===0){
                ret.closePos=lastidxPos    
                ret.hasFinalClose=true           
            }
            ret.openSeqCount=openSeqCount
            ret.openTotal=openTotal
            ret.closeTotal=closeTotal

        return ret
}

const findTemplateStartEndsMulti=(params,...args)=>{ // ret {data} // & { closePos: 2,data,dataLen,stOp,stCl,startPosGlob,endPosGlob,inGlobLen,i }    
    let opChar=params.stOp
    let clChar=params.stCl
    let str=params.in
    
    let arr=params.arr
    let currSearchRec={}
    let tmp,tmp0,temp1    
    // need array loop of opens, to find the nearest
    let openPosType
    let openPos=-1
    let newtmp1=-1
    let startData0=[]
    let startData1=[]
    if (typeof(params.i)==="undefined"){
        params.i=0
    }
    if (typeof(params.inGlob)==="undefined"){
        params.inGlob=str
    }
    

    // open chars 
    let arrOut=params.arrOut    
    arr.forEach((r,i)=>{
        let tmp0=str.indexOf(r.stOp ) 
        if (tmp0 === -1 ){ return }

        tmp0=tmp0  + r.stOp.length    
        startData0.push(tmp0)        

        let tmp1=str.substr(tmp0)
        startData1.push(tmp1)  
    })    

    if (startData0.length===0){
        return arrOut
    }
    let si=indexOfSmallest(startData0)
    currSearchRec=arr[si]
    openPos=si
    newtmp1=startData1[si]    
    opChar=currSearchRec.stOp

    // close chars 
    let closePos
    let midTemp
    let midTempUntrimmed
    let nextTemp    
    let hasClose=false 
    clChar=currSearchRec.stCl            
    closePos=newtmp1.indexOf(clChar)      

    if ( closePos !== -1 ){    
        hasClose=true

        //#todo need to check between the 2( midTemp ), to see if there are other open and closing attributs, for things like openings that dont have closing elements
        let ccOC=checkContainsOpenCloseChars({ in : newtmp1, opChar : opChar, clChar : clChar  })  //return { closePos , openSeqCount , openTotal,  closeTotal, hasFinalClose }
        console.log("newtmp1 :", opChar + newtmp1)
        
        if (ccOC.hasFinalClose){
            closePos=ccOC.closePos
        }

        midTempUntrimmed=newtmp1.substr(0, closePos )
        midTemp=midTempUntrimmed.trim()
        
        nextTemp=newtmp1.substr(closePos + 1 + clChar.length )    
    }else{
        nextTemp=newtmp1//.substr(closePos + 1 + clChar.length )    
    }
    ////////////////////////////////////////////////////////////////////                        

    ///
    if (true){
        let nr={ openPos : openPos ,closePos : closePos , 
                    data :  midTemp, dataLen : midTemp.length,
                    stOp : opChar, stCl : clChar ,
                    startPosGlob : (params.inGlob.length - str.length ) + midTemp.length  , 
                    endPosGlob : (params.inGlob.length - str.length ) + midTemp.length + closePos , 
                    inGlobLen : params.inGlob.length, i : params.i, 
        }
        
        if (params.in.length <=  0 || openPos=== -1 ){
            return arrOut
        }
        if (hasClose){
            arrOut.push(nr)
        }
        
        params.arrOut=arrOut
        params.in=nextTemp    

        params.i++
        arrOut=findTemplateStartEndsMulti(params)
    }
        
    return arrOut
}
exp.findTemplateStartEndsMulti=findTemplateStartEndsMulti

//window.findTemplateStartEnds=findTemplateStartEnds



const  validateObjPath=(str, data)=>{ // loop through arrary of          
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
exp.validateObjPath=validateObjPath

//window.validateObjPath=validateObjPath

// test //getAllStringVarsDetails( 'let ${ data.name }  and ${ data.name2 } with ${ data.age }', { name : "rob"},
const getAllStringVarsDetails=(tmpltStrIn , dataIn,dataExtraIn, options)=>{ // checks for errors in template and checks if variables exist in data
    
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
exp.getAllStringVarsDetails=getAllStringVarsDetails

//window.getAllStringVarsDetails=getAllStringVarsDetails

const parseLang=(params)=>{
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
    let lineTxtEnd="\r\n"
    let lineTxtEnd2="\n"  
    
    
    let tokens={


    }

    let runTokenRules=(lines,lt)=>{
        let ret={
            isTrue : false
        }
        
        lines.forEach((lv, li)=>{
           // console.log("lv :",lv.words)
            lv.words.forEach((wv, wi)=>{
                //console.log("words :" ,wv)
                let tokenRec=lt.tokens[wv.word]
                if ( tokenRec){
                    let tr=tokenRec
                    if (tr.lkahd){
                        
                    }
                    if (tr.lkbhd){

                    }


                    console.log("tr :",tr)
                }
            })
        })


        return ret
    }


    //split lines up
    let lines=[]
    let lineTxtTmp=[]
    let linesTmp=[]
    //let rg00=new RegExp( "\r\n|\n" , "")
    let rg00=new RegExp( lineTxtEnd + "|" + lineTxtEnd , "")
    //lineTxtTmp=params.text.split(lineTxtTmp)
    lineTxtTmp=params.text.split(rg00).filter(Boolean)
    console.log("lineTxtTmp :",lineTxtTmp)
    //console.log("lineTxtTmp :",params.text)
    
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
        let rgS=new RegExp("( |[\t]+|\{+|\}+|[\(+]|[\)+]|\[+|\]+|\;+\"+|\'+|\:+)", "g") //  ([\(]+)
        //nr.wordsTxt=v.split(/(\s+|\t+|\{+|\}+|\(+|\)+|\[+|\]+|\;+\"+|\'+|\:+)/g).filter(Boolean)
        nr.wordsTxt=v.split(rgS).filter(Boolean)
        //nr.wordsTxt=splitObjectPath(v,[ " " ,"{","}"])
        
        nr.wordCount=nr.words.length
        
        nr.lastCharNo=v.length
        nr.lastCharReal=v[ v.length -1 ] 

       // console.log("nr.wordsTxt :",nr.wordsTxt)
        nr.wordsTxt.forEach((vw,iw)=>{
            let nrw={
                word : "",
                nextChar : "",
                nextWord : "",
                prevChar : "",
                prevWord : "",
                lineNo :  nr.lineNo,
                wordNo : iw,
            }

            let isLastWord=false
            if ( iw <= nr.wordsTxt.length - 1 ){ // last word
                isLastWord=true
            }

            if ( iw > 1 ){
                nrw.prevWord=nr.wordsTxt[ iw - 1 ]
            }

            if (isLastWord){
                nrw.nextWord=nr.wordsTxt[ iw + 1 ]
                nrw.prevChar=nrw.prevWord[ nrw.prevWord.length - 1 ]
            }

            nrw.word=vw

            nr.words.push(nrw)
        })

        //nr.firstCharNo= // num without blanks or tabs // usefull later for finding indentation

        lines.push(nr)
    })

    ret.lines=lines

    let langTkns={}
    if (params.langFile){
        langTkns=params.langFile
    }
    tokens=runTokenRules( lines,langTkns)

    //console.log("tokens",tokens)

    return ret
} 
exp.parseLang=parseLang

escapeStringRegExp.matchOperatorsRe = /[\\{}[\]^$+*?.]/g;
function escapeStringRegExp(str) {
    return str.replace(escapeStringRegExp.matchOperatorsRe, '\\$&');
}

exp.arrnumSmallest=arrnumSmallest
function arrnumSmallest(a) {
    let ret=0
    let smallest
    let smallestIdx    
    
    a.forEach((v,i)=>{           
        //let prVal                  
        if (i===0){
            smallest=v
            smallestIdx=i
        }else{            
            //prVal=a[ i - 1 ]
            a.forEach((v2,i2)=>{                
                if (i2===i){
                }else{                    
                    let curr_smallest=v2
                    let curr_smallestidx=i2
                    if (v < v2){
                        curr_smallest=v
                        curr_smallestidx=i
                    }                        
                    if (curr_smallest<smallest){
                        smallest=curr_smallest
                        smallestIdx=curr_smallestidx
                    }                    
                }
            })
        
        }
    })
    ret={ v : smallest, i : smallestIdx}
    return ret
}   
exp.arrnumSmallest=arrnumSmallest

function indexOfSmallest(a) {
    return  arrnumSmallest(a).i
}
exp.indexOfSmallest=indexOfSmallest

function valueOfSmallest(a) {
    return  arrnumSmallest(a).v
}
exp.valueOfSmallest=valueOfSmallest;

export const ps=exp
//module.exports.$ps=exp;