import React,{ Component } from 'react';
import "../../App.css";
//import { ContextStore } from '../common/contextStore';
import { RenderTmpl } from '../mainlib/render';
import { TemplateItem } from '../mainlib/templateItem';
import { getAllStringVarsDetails } from './render'

import { v4 as uuid } from 'uuid';

let $cn=require("../common/libNative").$cn
let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb
let feach=$cn.each

export class BaseTemplate extends Component {
    constructor(props){
        super(props)
        let tt=this

        let tmp=""

        this.uuid=uuid()
        if (!isUn(props.iter)){
            tt.iter=props.iter
        }

        if (props.startEx){
            let startEx=props.startEx
            let useexample=false
            let startExI=0
            
            if (tof(startEx)==="boolean"){ 
                if (startEx===true){}  
            }
            if (tof(startEx)!=="number"){ startExI=0 }

            if (useexample){
                tmp="schemaBase"
                tt[tmp]=tt.examples[startExI].data[tmp]
                tmp="loopOption"
                tt[tmp]=tt.examples[startExI].data[tmp]
                tmp="schema"
                tt[tmp]=tt.examples[startExI].data[tmp]
                tmp="template"
                tt[tmp]=tt.examples[startExI].data[tmp]
            }
            
        }

        
        let state={
            name : "", name2 : "",
            tmplOut : "", runRenderAllFns : {},
            templatetxt : "",
            datatxt : "",
            data : {},  
            mainTitle : "mainTitle", 

            inputsTemplateHeightBool : true,
            minAll : false,
        }

        if (tt.props.mainTitle){
            state.mainTitle=tt.props.mainTitle
        }
     
        this.state=state
    }
    

    componentDidMount(){
        let tt=this  
        
        if (tt.props.refData){
            //tt.props.refData.current[tt.uuid]={}
            tt.props.refData.current[tt.iter]={}
            tt.props.refData.current[tt.iter].get=tt.getDetails
            tt.props.refData.current[tt.iter].set=tt.setDetails                  
        }

        tt.setState({ 
            templatetxt : tt.template.tables,
            template : tt.template.tables ,
            data : tt.schema.tables,
            datatxt : JSON.stringify( tt.schema.tables,null, 2),
            dataExtxt : JSON.stringify( tt.schema,null, 2),
            loopOption : JSON.stringify(tt.loopOption,null, 2),            
        },
            ()=>{
                setTimeout(()=>{
                    tt.runRenderAll(()=>{tt.validate()})    
                }
                , 2000)
        })

    }
    
    componentDidUpdate(prevProps){
        let tt=this
        if (prevProps !==tt.props){
            if (tt.props.refData){
                //tt.props.refData.current[tt.uuid]={}
                tt.props.refData.current[tt.iter]={}    
                tt.props.refData.current[tt.iter].get=tt.getDetails
                tt.props.refData.current[tt.iter].set=tt.setDetails                  
            }
        }
    }

    uuid=0
    iter=-1

    runRender={ fn : ()=>{}}
    
    runRenderAllFns={}
    runRenderAll=(...args)=>{
        let tt=this
        //{ fn : ()=>{}}
        $cn.each(tt.state.runRenderAllFns,(r,i)=>{
            if (tof(r.fn)==="function"){
                r.fn()
            }
            

        })

        if (tof(args[0])==="function"){            
            args[0]()
        }
    }

    name="JSNodeMongo"
    type="JSNodeMongo"

    schemaBase={}

    loopOption={}

    schema={}

    reactTmplate0=""
    template={}   
    
    examples=[
        {
            name : "example1",
            data : {
                name : "JSNodeMongo",
                type : "JSNodeMongo",
                schemaBase : {
                    tables : {
                                col1 : {
                                        name : "",
                                        indexs : {},
                                        cols : {}
                                }
                            }
                },
            
                loopOption : {
                    hasRecords : true ,
                    name : "tables",
                    titleVar : "name",
                        
                },
            
                schema :{
            
                    "tables" : {
                                "users" : {
                                        "name" : "users",
                                        "indexs" : {},
                                        "cols" : {}
                                },
                                "user_details" : {
                                    "name" : "user_details",
                                    "indexs" : {},
                                    "cols" : {}
                                },
                                "groups" : {
                                "name" : "groups",
                                "indexs" : {},
                                "cols" : {}
                            }
                            },
                    "object" :{            
                        "objname" : "generalDbFN",
                        "objname2" : "gen",
                    },
                },

                template : {        
                    tables : `\`
                    let \${dataEx.object.objname}={
                        name : "\${dataEx.object.objname}",
                        db : undefined,
                        \${data.name} : {
                            get\${data.name} : (params, cbp)=>{
                                let db=\${dataEx.object.objname}.db 
                                let temp=""
                                let details=undefined       
                                let view=undefined       
            
                                let cb=()=>{}
                                if (typeof(cbp)==="function"){
                                    cb=cbp
                                }
            
                                searchBy={}
                                temp="\${data.name}id"
                                if (tof(params[temp])!=="undefined"){
                                    details=params[temp]
                                }        
                                temp="id"
                                if (tof(params[temp])!=="undefined"){
                                    details=params[temp]
                                }                
                                temp="email"
                                if (tof(params[temp])!=="undefined"){
                                    details=params[temp]
                                }        
                                temp="details"
                                if (tof(params[temp])!=="undefined"){
                                    details=params[temp]
                                }        
                                temp="view"
                                if (tof(params[temp])!=="undefined"){
                                    details=params[temp]
                                }
            
                                let \${data.name}=db.collection("\${data.name}")
                                    \${data.name}.findOne(searchBy)
                                .then((dt)=>{
                                    cb(dt)
                                })
                                .catch((err)=>{
                                    cb([], err)
                                })
                                
                                return
                            }
            
                            get\${data.name} : ()=>{
                                db.collection("\${data.name}")
                                
                                return
                            }
            
                            update\${data.name} : ()=>{
                                db.collection("\${data.name}")
                                
                                return
                            }
            
                            delete\${data.name} : ()=>{
                                db.collection("\${data.name}")
                                
                                return
                            }
                        }
                    }
                        
                    \``
                },
            }


        },
    ]

    validate=()=>{
        let tt=this
        let tmp=getAllStringVarsDetails(tt.template.tables, tt.schema)
        tt.setState({properties : JSON.stringify(tmp,null,2) })
    }

    getDetails=()=>{
        let tt=this
        let dt={ schemadata : tt.schema, template : tt.template,loopOption : tt.loopOption }        
        return dt
    }

    setDetails=(dt)=>{
        let tt=this

        tt.schema=dt.schemadata
        tt.template=dt.template
        tt.loopOption=dt.loopOption

        tt.setState({ 
            templatetxt : tt.template.tables,
            template : tt.template.tables ,
            data : tt.schema.tables,
            datatxt : JSON.stringify( tt.schema.tables,null, 2),
            dataExtxt : JSON.stringify( tt.schema,null, 2),
            loopOption : JSON.stringify(tt.loopOption,null, 2),
        },
            ()=>{
                setTimeout(()=>{
                    tt.runRenderAll()    
                }
                , 2000)
        })

        return dt
    }

    render(){
        let tt=this
        
        /*

            <button
                onClick={()=>{
                    // tt.runRender.fn()
                }}
            >
                ParRender
            </button>

            <TemplateItem 
                    title={"Db1"} 
                    data={{name : "rob"}} 
                    template={"hello my name is ${data.name}"}
                    runRender={tt.runRender}
                    showRenderButton={true}
                
                />
        */

        let CollFnsE
        CollFnsE=(()=>{
            let E
            let dt

            
            let loopVarName="tables"
            let titleVar=""
            let title=""
            let template
            let hasRecords=tt.loopOption.hasRecords
            let showRenderButton=false

            if (isUn(hasRecords)){
                hasRecords=false
            }

            if (hasRecords){
                E=[]
                dt=tt.schema[tt.loopOption.name]
                titleVar=tt.loopOption.titleVar
                template=tt.template[tt.loopOption.name]
                showRenderButton=false
                
            }else{
                dt=tt.schema
                template=tt.template          
                showRenderButton=true      
            }
            
            let rEle=(r)=>{
                return (

                    <TemplateItem 
                            title={title}
                            data={r}                             
                            dataEx={tt.schema}
                            template={template}
                            runRender={tt.state.runRenderAllFns}
                            showRenderButton={showRenderButton}
                        />

                )
            }

            if (hasRecords===false){
                if (typeof(tt.state.runRenderAllFns["default"])==="undefined"){
                    tt.state.runRenderAllFns["default"]={ fn : undefined}
                }
                E=rEle(dt)
            }

            if (tt.loopOption.hasRecords===true){
                let i=0            
                $cn.each(dt,(r,p)=>{

                    if (typeof(tt.state.runRenderAllFns[r.name])==="undefined"){
                        tt.state.runRenderAllFns[r.name]={ fn : undefined}
                    }
                    
                    title=r[titleVar]                    

                    let re=rEle(r)
                    E.push( 
                        <div
                            key={i}
                        >                        
                            {re}
                        </div>
                    )

                    i++
                })
            }

            return (
                <div>
                    <div
                            style={{ cursor : "pointer" }}
                            onClick={()=>{
                                if (!tt.state.outputTemplateHeightBool){
                                    tt.setState({ outputTemplateHeight : 30,outputTemplateHeightBool : true, outputTemplateHeightOverflow : "hidden"})
                                }else{
                                    tt.setState({ outputTemplateHeight : undefined,outputTemplateHeightBool : false, outputTemplateHeightOverflow : undefined})
                                }
                                
                            }}
                    >
                        <h5
                            style={{cursor : "",pointerEvents: "none" , userSelect: "none",paddingTop:0,marginTop : 0}}
                        > {tt.state.mainTitle} </h5>
                    </div>
                    <div
                        
                    >
                        {E}
                    </div>
                </div>
                
            )
        })()
        
        let renderbutshow=undefined
        let styleBox={position : "relative",border : "blue thin solid", padding :5,borderRadius : 15}
        if (!tt.state.minAll){
            styleBox.width= 400
            styleBox.height= 45
            styleBox.overflow= "hidden"
            renderbutshow="none"
        }
        return (
            <div
                style={styleBox}
            >    
                <div style={{position : "absolute",background : 'transparent',top : 0,left : 0, width : "100%", height :"100%",
                                opacity : 0.1,zIndex : -1
                }}/>
                <button
                    style={{background : "lightgreen",color : "black" ,display : renderbutshow}}
                    onClick={()=>{
                        tt.runRenderAll()
                    }}
                >
                    render tables
                </button>
                <button
                    style={{background : "lightgreen",color : "black",cursor : "pointer", marginBottom : 10, width : undefined }}
                    onClick={()=>{
                        
                            tt.setState({ minAll : !tt.state.minAll })
                    }}
                >
                     {tt.name} min(-)
                </button>

                <div style={{ clear : "left" }}/>
                <div 
                    style={{ dispaly : renderbutshow}}
                >
                    <div style={{ position : "relative",float : "left",padding : 5,border : "blue solid thin", borderRadius : 10,
                                   // height : tt.state.inputsTemplateHeight, overflow : tt.state.inputsTemplateHeightOverflow
                                }} 
                    >
                        <div style={{ position : "relative"}} >
                            <div
                                style={{ cursor : "pointer" }}
                                onClick={()=>{
                                    if (!tt.state.inputsTemplateHeightBool){
                                        tt.setState({ inputsTemplateHeight : 16,inputsTemplateHeightBool : true, inputsTemplateHeightOverflow : "hidden"})
                                    }else{
                                        tt.setState({ inputsTemplateHeight : undefined,inputsTemplateHeightBool : false, inputsTemplateHeightOverflow : undefined})
                                    }
                                    
                                }}
                            >
                                <label 
                                    style={{ color : "white",fontSize : 14,height:5,cursor : "",pointerEvents: "none" , userSelect: "none"}}
                                    disabled={true}
                                    
                                >template</label>
                            </div>
                            <div
                                style={{ background : "white",borderRadius : 10,overflow : "hidden",margin : 2,
                                            height : tt.state.inputsTemplateHeight, overflow : tt.state.inputsTemplateHeightOverflow,
                                }}
                            >                                           
                                <textarea
                                    value={tt.state.templatetxt}
                                    style={{width : 600, height : 220 , borderRadius : 10, border : "none"}}
                                    onChange={(e)=>{
                                        tt.setState({ templatetxt : e.target.value })
                                    }}
                                    onBlur={(e)=>{  
                                        tt.template.tables= e.target.value                             
                                        tt.setState({ template : e.target.value },()=>{
                                            tt.validate()
                                        })
                                    }}
                                />
                            </div>
                            <div
                                style={{ cursor : "pointer" }}
                                onClick={()=>{
                                    let nr={}
                                    let tmpName="Data"
                                    nr[ "inputs" + tmpName + "Height"]=16
                                    nr[ "inputs" + tmpName + "HeightBool"]=true
                                    nr[ "inputs" + tmpName + "HeightOverflow"]="hidden"

                                    if (!tt.state[ "inputs" + tmpName + "HeightBool"]){
                                        
                                    }else{
                                        nr[ "inputs" + tmpName + "Height"]=undefined
                                        nr[ "inputs" + tmpName + "HeightBool"]=false
                                        nr[ "inputs" + tmpName + "HeightOverflow"]=undefined
                                    }
                                    tt.setState(nr)
                                    
                                }}
                            >
                                <label style={{ color : "white",fontSize : 14,padding : 0,margin : 0,
                                                pointerEvents: "none" , userSelect: "none",
                                }}>data</label>
                            </div>
                            <div
                                style={{ background : "white",borderRadius : 10,overflow : "hidden",margin : 2,
                                            height : tt.state["inputs" + "Data" + "Height"], overflow : tt.state["inputs" + "Data" + "HeightOverflow"],
                                }}
                            >                        
                                <textarea
                                    value={tt.state.datatxt}
                                    style={{width : 600, height : 220 , borderRadius : 10, border : "none"}}
                                    onChange={(e)=>{
                                        tt.setState({ datatxt : e.target.value })
                                    }}
                                    onBlur={(e)=>{
                                        let jsnO
                                        try {
                                            jsnO=JSON.parse(e.target.value)
                                            tt.schema.tables=jsnO
                                            tt.setState({ data : jsnO },()=>{
                                                tt.validate()
                                            })
                                        } catch (error) {
                                            alert("error : " +  error)
                                        }
                                        
                                    }}
                                />
                            </div>
                            <div
                                style={{ cursor : "pointer" }}
                                onClick={()=>{
                                    let nr={}
                                    let tmpName="DataEx"
                                    nr[ "inputs" + tmpName + "Height"]=16
                                    nr[ "inputs" + tmpName + "HeightBool"]=true
                                    nr[ "inputs" + tmpName + "HeightOverflow"]="hidden"

                                    if (!tt.state[ "inputs" + tmpName + "HeightBool"]){
                                        
                                    }else{
                                        nr[ "inputs" + tmpName + "Height"]=undefined
                                        nr[ "inputs" + tmpName + "HeightBool"]=false
                                        nr[ "inputs" + tmpName + "HeightOverflow"]=undefined
                                    }
                                    tt.setState(nr)
                                    
                                }}
                            >
                                <label style={{ color : "white",fontSize : 14,padding : 0,margin : 0,
                                                pointerEvents: "none" , userSelect: "none",
                                }}>data extra</label>
                            </div>
                            <div
                                style={{ background : "white",borderRadius : 10,overflow : "hidden",margin : 2,
                                            height : tt.state["inputs" + "DataEx" + "Height"], overflow : tt.state["inputs" + "DataEx" + "HeightOverflow"],
                                }}
                            >                        
                                <textarea
                                    value={tt.state.dataExtxt}
                                    style={{width : 600, height : 220 , borderRadius : 10, border : "none"}}
                                    onChange={(e)=>{
                                        tt.setState({ dataExtxt : e.target.value })
                                    }}
                                    onBlur={(e)=>{
                                        let jsnO
                                        try {
                                            jsnO=JSON.parse(e.target.value)
                                            tt.schema=jsnO
                                            tt.setState({ dataEx : jsnO },()=>{
                                                tt.validate()
                                            })
                                        } catch (error) {
                                            alert("error : " +  error)
                                        }
                                        
                                    }}
                                />
                            </div>
                            <div
                                style={{ cursor : "pointer" }}
                                onClick={()=>{
                                    let nr={}
                                    let tmpName="Options"
                                    nr[ "inputs" + tmpName + "Height"]=16
                                    nr[ "inputs" + tmpName + "HeightBool"]=true
                                    nr[ "inputs" + tmpName + "HeightOverflow"]="hidden"

                                    if (!tt.state[ "inputs" + tmpName + "HeightBool"]){
                                        
                                    }else{
                                        nr[ "inputs" + tmpName + "Height"]=undefined
                                        nr[ "inputs" + tmpName + "HeightBool"]=false
                                        nr[ "inputs" + tmpName + "HeightOverflow"]=undefined
                                    }
                                    tt.setState(nr)
                                    
                                }}
                            >
                                <label style={{ color : "white",fontSize : 14,padding : 0,margin : 0,
                                                pointerEvents: "none" , userSelect: "none",
                                }}>options</label>
                            </div>
                            <div
                                style={{ background : "white",borderRadius : 10,overflow : "hidden",margin : 2,
                                                height : tt.state["inputs" + "Options" + "Height"], overflow : tt.state["inputs" + "Options" + "HeightOverflow"],                                    
                                }}
                            >                        
                                <textarea
                                    value={tt.state.loopOption}
                                    style={{width : 600, height : 220 , borderRadius : 10, border : "none"}}
                                    onChange={(e)=>{
                                        tt.setState({ loopOption : e.target.value })
                                    }}
                                    onBlur={(e)=>{
                                        let jsnO
                                        try {
                                            jsnO=JSON.parse(e.target.value)
                                            tt.loopOption=jsnO
                                            tt.setState({ loopOption : JSON.stringify(jsnO,null,2) })
                                        } catch (error) {
                                            alert("error : " +  error)
                                        }
                                        
                                    }}
                                />
                            </div>
                            <div
                                style={{ cursor : "pointer" }}
                                onClick={()=>{
                                    let nr={}
                                    let tmpName="Properties"
                                    nr[ "inputs" + tmpName + "Height"]=16
                                    nr[ "inputs" + tmpName + "HeightBool"]=true
                                    nr[ "inputs" + tmpName + "HeightOverflow"]="hidden"

                                    if (!tt.state[ "inputs" + tmpName + "HeightBool"]){
                                        
                                    }else{
                                        nr[ "inputs" + tmpName + "Height"]=undefined
                                        nr[ "inputs" + tmpName + "HeightBool"]=false
                                        nr[ "inputs" + tmpName + "HeightOverflow"]=undefined
                                    }
                                    tt.setState(nr)
                                    
                                }}
                            >
                                <label style={{ color : "white",fontSize : 14,padding : 0,margin : 0,
                                                    pointerEvents: "none" , userSelect: "none",
                                }}>properties</label>
                            </div>
                            <div
                                style={{ background : "white",borderRadius : 10,overflow : "hidden",margin : 2,
                                            height : tt.state["inputs" + "Properties" + "Height"], overflow : tt.state["inputs" + "Properties" + "HeightOverflow"],                                    
                                }}
                            >                           
                                <textarea
                                    value={tt.state.properties}
                                    style={{width : 600, height : 220 , borderRadius : 10, border : "none"}}
                                />
                            </div>
                        </div >
                    </div>
                    <div style={{ position : "relative",float : "left",height : tt.state.outputTemplateHeight, width : 670,margin : 8,padding : 10,paddingTop : 0,overflow : "hidden", borderRadius:10,border : "blue solid thin" }} >  
                        <div 
                            style={{ position : "relative", overflow : "auto",padding : 50,paddingTop : 0,width : 600, height : 600 }}                         
                        >                    
                                {CollFnsE}                        
                        </div>
                    </div>

                    <div style={{ clear : "left" }}/>
                </div>
            </div>
        )
    }
}
