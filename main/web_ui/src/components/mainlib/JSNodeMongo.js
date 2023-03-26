import React,{ Component } from 'react';
import "../../App.css";
//import { ContextStore } from '../common/contextStore';
import { RenderTmpl } from '../mainlib/render';
import { TemplateItem } from '../mainlib/templateItem';
import { BaseTemplate } from "./BaseTemplate"
let $cn=require("../common/libNative").$cn
let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb
let feach=$cn.each

export class JSNodeMongo extends BaseTemplate {
    constructor(props){
        super(props)
    }

    /*
    loopOption = {
        hasRecords : true ,
        name : "tables",
        titleVar : "name",
            
    }

    schema ={

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

    template = {        
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
    */
    
}
