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
            tmplOut : "", runRenderAllFns : {}
        }
    }


    componentDidMount(){
        let tt=this
        setTimeout(()=>{
            tt.runRenderAll()    
        }
        , 2000)

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
                    }
                },
        "object" :{            
            "objname" : "generalDbFN",
        },
    }


    reactTmplate0=""
    nodeTmplates={
        
        tables : `\`
        let generalDbFns={
            name : "generalproj",
            db : undefined,
            \${data.name} : {
                get\${data.name} : (params, cbp)=>{
                    let db=generalDbFns.db 
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
                            data_db={tt.dbSchema.object}
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
                {nodejsmongoCrudCollFnsE}

                
            </div>
        )
    }
}
