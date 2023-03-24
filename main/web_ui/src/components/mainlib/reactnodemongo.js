import React,{ Component } from 'react';
import "../../App.css";
//import { ContextStore } from '../common/contextStore';
import { RenderTmpl } from '../mainlib/render';
import { TemplateItem } from '../mainlib/templateItem';

let $cn=require("../common/libNative").$cn
let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb
let feach=$cn.each

export class ReactNodeMongo extends Component {
    constructor(props){
        super(props)

        let state={
            name : "", name2 : "",
            tmplOut : "", runRenderAllFns : {},
            templatetxt : "",
            datatxt : "",
            data : {},  

            inputsTemplateHeightBool : true
        }
     
        this.state=state
    }
    

    componentDidMount(){
        let tt=this       

        tt.setState({ 
            templatetxt : tt.nodeTmplates.tables,
            template : tt.nodeTmplates.tables ,
            data : tt.dbSchema.tables,
            datatxt : JSON.stringify( tt.dbSchema.tables,null, 2),
            dataExtxt : JSON.stringify( tt.dbSchema,null, 2)
        },
            ()=>{
                setTimeout(()=>{
                    tt.runRenderAll()    
                }
                , 2000)
        })

        if (tt.props.getDetails){
            tt.props.getDetails.fn=tt.getDetails
        }

        if (tt.props.refData){
            tt.props.refData.current.fn=tt.getDetails
        }

        
        

    }

    runRender={ fn : ()=>{}}
    
    runRenderAllFns={}
    runRenderAll=()=>{
        let tt=this
        //{ fn : ()=>{}}
        $cn.each(tt.state.runRenderAllFns,(r,i)=>{
            if (tof(r.fn)==="function"){
                r.fn()
            }
            

        })
    }

    dbSchemaTmplbase={

        tables : {
                    col1 : {
                            name : "",
                            indexs : {},
                            cols : {}
                     }
                }
    }

    dbSchema={

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
    }


    reactTmplate0=""
    nodeTmplates={        
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
    }
    mongoTemplate0=""

    getDetails=()=>{
        let tt=this
        let dt={ data : tt.dbSchema, template : tt.nodeTmplates }
        alert(JSON.stringify(dt))
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

        let nodejsmongoCrudCollFnsE
        nodejsmongoCrudCollFnsE=(()=>{
            let E=[]
            let dt=tt.dbSchema.tables

            let i=0
            $cn.each(dt,(r,p)=>{

                if (typeof(tt.state.runRenderAllFns[r.name])==="undefined"){
                    tt.state.runRenderAllFns[r.name]={ fn : undefined}
                }
                let re=<TemplateItem 
                            title={r.name}
                            data={r}                             
                            dataEx={tt.dbSchema}
                            template={tt.nodeTmplates.tables}
                            runRender={tt.state.runRenderAllFns}
                            showRenderButton={false}
                        />
                E.push( 
                    <div
                        key={i}
                    >                        
                        {re}
                    </div>
                )



                i++
            })


            return (
                <div>
                    <h5>JS {"<---->"}  MongoDb tables</h5>
                    {E}
                </div>
                
            )
        })()
        

        return (
            <div>
                
                <button
                    onClick={()=>{
                        tt.runRenderAll()
                    }}
                >
                    render tables
                </button>

                <div style={{ clear : "left" }}/>

                <div style={{ position : "relative",float : "left",padding : 5,border : "blue solid thin", borderRadius : 10,
                                height : tt.state.inputsTemplateHeight, overflow : tt.state.inputsTemplateHeightOverflow
                            }} 
                >
                    <div style={{ position : "relative"}} >
                        <label 
                            style={{ color : "white",fontSize : 14,height:5,padding : 0,margin : 0,cursor : "pointer" }}
                            onClick={()=>{
                                if (!tt.state.inputsTemplateHeightBool){
                                    tt.setState({ inputsTemplateHeight : 16,inputsTemplateHeightBool : true, inputsTemplateHeightOverflow : "hidden"})
                                }else{
                                    tt.setState({ inputsTemplateHeight : undefined,inputsTemplateHeightBool : false, inputsTemplateHeightOverflow : undefined})
                                }
                                
                            }}
                        >template</label>
                        <div
                            style={{ background : "white",borderRadius : 10,overflow : "hidden",margin : 2}}
                        >                                           
                            <textarea
                                value={tt.state.templatetxt}
                                style={{width : 600, height : 220 , borderRadius : 10, border : "none"}}
                                onChange={(e)=>{
                                    tt.setState({ templatetxt : e.target.value })
                                }}
                                onBlur={(e)=>{  
                                    tt.nodeTmplates.tables= e.target.value                             
                                    tt.setState({ template : e.target.value })
                                }}
                            />
                        </div>
                        <label style={{ color : "white",fontSize : 14,padding : 0,margin : 0}}>data</label>
                        <div
                            style={{ background : "white",borderRadius : 10,overflow : "hidden",margin : 2}}
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
                                        tt.dbSchema.tables=jsnO
                                        tt.setState({ data : jsnO })
                                    } catch (error) {
                                        alert("error : " +  error)
                                    }
                                    
                                }}
                            />
                        </div>
                        <label style={{ color : "white",fontSize : 14,padding : 0,margin : 0}}>data extra</label>
                        <div
                            style={{ background : "white",borderRadius : 10,overflow : "hidden",margin : 2}}
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
                                        tt.dbSchema=jsnO
                                        tt.setState({ dataEx : jsnO })
                                    } catch (error) {
                                        alert("error : " +  error)
                                    }
                                    
                                }}
                            />
                        </div>
                    </div >
                </div>
                 <div style={{ position : "relative",float : "left",width : 670,margin : 8,padding : 10,overflow : "hidden", borderRadius:10,border : "blue solid thin" }} >  
                    <div style={{ position : "relative", overflow : "auto",padding : 50,width : 600, height : 600 }} >  
                    
                            {nodejsmongoCrudCollFnsE}
                        
                    </div>
                </div>


                <div style={{ clear : "left" }}/>
                
            </div>
        )
    }
}
