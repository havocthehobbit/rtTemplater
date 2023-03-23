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

     
        this.state={
            name : "", name2 : "",
            tmplOut : "", runRenderAllFns : {},
            templatetxt : "",
            datatxt : "",
            data : {},
        }
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
                
                <div style={{ position : "relative",}} >
                    <label style={{ color : "white",fontSize : 14,height:5,padding : 0,margin : 0 }}>template</label>
                    <div
                        style={{ background : "white",borderRadius : 10,overflow : "hidden",margin : 2}}
                    >                                           
                        <textarea
                            value={tt.state.templatetxt}
                            style={{width : 600, height : 120 , borderRadius : 10, border : "none"}}
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
                            style={{width : 600, height : 140 , borderRadius : 10, border : "none"}}
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
                            style={{width : 600, height : 140 , borderRadius : 10, border : "none"}}
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

                {nodejsmongoCrudCollFnsE}

                
            </div>
        )
    }
}
