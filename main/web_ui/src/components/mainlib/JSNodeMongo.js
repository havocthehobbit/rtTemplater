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
                },
        "object" :{            
            "objname" : "generalDbFN",
        },
    }

    template = {        
        tables : `\`
        let \${dataEx.object.objname}
        let \${data.name}
        
                        
        \``
    }
    
    
}
