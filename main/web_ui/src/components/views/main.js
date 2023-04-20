import React,{ Component, useRef } from 'react';
//import "../../App.css";
//import { ContextStore } from '../common/contextStore';
import { RenderTmpl } from '../mainlib/render';
import { TemplateItem } from '../mainlib/templateItem';
import { JSNodeMongo } from '../mainlib/JSNodeMongo';
import { SideBar } from '../mainlib/SideBar';
import $lnd from  "../common/libNativeDom"
import { HeaderPanel } from './headerPanel';
import { Tools } from './tools';
import { Background } from './common/backround'
import { saveload } from './common/saveload'

import './main.css'

import { TextEditor } from './common/textEditor';
import { HTtree } from './common/httree'

import {$gl} from "../common/global"

let $cn=require( "../common/libNative").$cn

let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb

export class Main extends Component {
    constructor(props){
        super(props)

        
        this.testText=React.createRef(); 
        
        this.importBrowseButtonRef=React.createRef()
        
        
        this.HTtreeRef =React.createRef()

        

        this.state={
            name : "", name2 : "",
            tmplOut : "",  
            data :{} ,        
        }

        this.createAlltoolItems()
    }

    componentDidMount(){
        let tt=this
        // add global CSS stylesheet string as ref eg for creating a local library later similar to style-components
        if (true){
            let myStyle = document.createElement("style")
            document.head.appendChild(myStyle)
            let styleSheet = myStyle.sheet        
            styleSheet.insertRule(`button { background: green;border-radius : 5px;padding : 10px; margin : 3px;font-size : 18px;color : white ;border : none}`, 0)
        } 
        
        
        
    }

    data={
        tools : [],
    }

    importBrowseButtonRef=undefined     

    alltoolitems=[]
    toolItemsO=(...args)=>{
        let tt=this

        let obj={
            name :  "",
            title : "",
            tt : tt,
            Refs : {},
            main : undefined,
            GetRefsRuns : undefined,
            SetRefsRuns : undefined,
            addbutton : undefined,
            addFn : undefined,

            toolbuttonClass :"",
            toolbuttonStyle : { background : "lightyellow",color : "black",fontSize : 13 },
            
            
            init : (...args)=>{
                obj.Refs=React.createRef(); obj.Refs.current={}
        
            }
        }

        obj.init.apply(this,args)

        return obj 
    }

    createAlltoolItems=()=>{
        let tt=this

        if (true){
            let tool=new tt.toolItemsO()
            
            tool.name="JSNodeAPI"
            tool.toolbuttonClass={...tool.toolbuttonClass, ...{}}
            tool.toolbuttonStyle={...tool.toolbuttonStyle, ...{}}

            tool.GetRefsRuns=()=>{
                let nameref=tool.name
                let tt=this
                let data=[]
                $cn.each(tool.Refs.current,(r,i)=>{
                    if (tool.Refs.current[r.uuid]){
                        
                        //data[r.uuid]=tt.reactmongoDBDataRefs.current[r.uuid].get()                
                        data.push(tool.Refs.current[r.uuid].get())               
                    
                    }else{
                        if (tool.Refs.current[i]){
                            
                            //data[i]=tt.reactmongoDBDataRefs.current[i].get()                    
                            data.push(tool.Refs.current[i].get())                   
                            
                        }
                    }
                })
                return data
            }
            tool.SetRefsRuns=()=>{
                let nameref=tool.name
                let tt=this
        
                if (tof(tt.state.data[nameref])==="array"){
                    tt.state.data[nameref].forEach((r,i)=>{
                        let data=r
                        if (tool.Refs.current[r.uuid]){
                            if (tool.Refs.current[r.uuid].set){
                                tool.Refs.current[r.uuid].set(data)
                            }    
                        }else{
                            if (tool.Refs.current[i]){
                                tool.Refs.current[i].set(data)
                            }  
                        }
                        
                    })
                }        
            }
            tool.main=()=>{
                let tt=this
                let nameref=tool.name
                let Es=[]
                let i=0
                let itot=0
                // array or single object
                if (isOb(tt.state.data[nameref])){}else{                
                    if (typeof(tt.state.data[nameref])==="object"){                   
                        tt.state.data[nameref].forEach((r ,i) => {                      
                            Es.push(
                                <div key={i}>
                                    <JSNodeMongo  mainTitle={"JS <----> API"} refData={tool.Refs} iter={i} startEx={false}/>
                                </div>
                            )
                            itot=i
                        });
                        
                    }
                }
        
                tool.addFn=(e)=>{
                    let nameref=e.target.getAttribute("nameref")
                    let data={...tt.state.data}

                    if (isUn(data)){
                        data={}
                    }
                    if (isUn(data[nameref])){
                        data[nameref]=[]
                    }

                    let nr={}
                    data[nameref].push(nr)
            
                    let stnr={}
                    stnr["data"]=data

                    tt.setState(stnr)
                }
        
                tool.addbutton=(()=>{
                    itot++
                    let i=itot
                    return (
                        <button
                            className={tool.toolbuttonClass}
                            style={tool.toolbuttonStyle}
                            nameref={nameref}
                            onClick={
                                tool.addFn
                            }
                        >
                            add {nameref}
                        </button>
                    )
                })()
        
                return (
                    <div>
                        {
                            //    addbuttonE
                        }
                        {Es}
                    </div>
                )
            }

            tt.alltoolitems.push(tool) 
        }

        if (true){
            let tool=new tt.toolItemsO()
            
            tool.name="JSNodeMongo"
            tool.GetRefsRuns=()=>{
                let nameref=tool.name
                let tt=this
                let data=[]
                $cn.each(tool.Refs.current,(r,i)=>{
                    if (tool.Refs.current[r.uuid]){
                        
                        //data[r.uuid]=tt.reactmongoDBDataRefs.current[r.uuid].get()                
                        data.push(tool.Refs.current[r.uuid].get())               
                    
                    }else{
                        if (tool.Refs.current[i]){
                            
                            //data[i]=tt.reactmongoDBDataRefs.current[i].get()                    
                            data.push(tool.Refs.current[i].get())                   
                            
                        }
                    }
                })
                return data
            }
            tool.SetRefsRuns=()=>{
                let nameref=tool.name
                let tt=this
        
                if (tof(tt.state.data[nameref])==="array"){
                    tt.state.data[nameref].forEach((r,i)=>{
                        let data=r
                        if (tool.Refs.current[r.uuid]){
                            if (tool.Refs.current[r.uuid].set){
                                tool.Refs.current[r.uuid].set(data)
                            }    
                        }else{
                            if (tool.Refs.current[i]){
                                tool.Refs.current[i].set(data)
                            }  
                        }
                        
                    })
                }        
            }
            tool.main=()=>{
                let tt=this
                let nameref=tool.name
                let Es=[]
                let i=0
                let itot=0
                // array or single object
                if (isOb(tt.state.data[nameref])){}else{                
                    if (typeof(tt.state.data[nameref])==="object"){                   
                        tt.state.data[nameref].forEach((r ,i) => {                                                  
                            Es.push(
                                <div key={i}>
                                    <JSNodeMongo  mainTitle={"JS <----> API"} refData={tool.Refs} iter={i} startEx={false}/>
                                </div>
                            )
                            
                            

                            itot=i
                        });                        
                    }
                }

                tool.addFn=(e)=>{
                    let nameref=e.target.getAttribute("nameref")
                    let data={...tt.state.data}

                    if (isUn(data)){
                        data={}
                    }
                    if (isUn(data[nameref])){
                        data[nameref]=[]
                    }

                    let nr={}
                    data[nameref].push(nr)
            
                    let stnr={}
                    stnr["data"]=data

                    tt.setState(stnr)
                }
        
                tool.addbutton=(()=>{
                    itot++
                    let i=itot
                    return (
                        <button
                            className={tool.toolbuttonClass}
                            style={tool.toolbuttonStyle}
                            nameref={nameref}
                            onClick={
                                tool.addFn
                            }
                        >
                            add {nameref}
                        </button>
                    )
                })()
        
                return (
                    <div>
                        {
                            //    addbuttonE
                        }
                        {Es}
                    </div>
                )
            }

            tt.alltoolitems.push(tool) 
        }

        if (true){
            let tool=new tt.toolItemsO()
            
            tool.name="httree"
            tool.GetRefsRuns=()=>{ //fetch components data
                let nameref=tool.name
                let tt=this
                let data=[]
                $cn.each(tool.Refs.current,(r,i)=>{
                    if (tool.Refs.current[r.uuid]){                        
                        if (tool.Refs.current[r.uuid].get){                        
                            data.push(tool.Refs.current[r.uuid].get())               
                        }
                    }else{
                        if (tool.Refs.current[i]){
                            if (tool.Refs.current[i].get){                                                        
                                data.push(tool.Refs.current[i].get())                   
                                
                            }else{
                                let eleRef=tool.Refs.current[i].instanceRef.current
                                let httree=eleRef.global_trees["ht"].tree
                                httree.save_data_fn()
                                data.push(httree.save_data)                   
                                
                                
                            }
                        }
                    }
                })
                return data
            }
            tool.SetRefsRuns=()=>{ // load compnent data
                let nameref=tool.name
                let tt=this
        
                if (tof(tt.state.data[nameref])==="array"){                    
                    tt.state.data[nameref].forEach((r,i)=>{
                        let data=r
                        if (tool.Refs.current[r.uuid]){
                            if (tool.Refs.current[r.uuid].set){
                                tool.Refs.current[r.uuid].set(data)
                            }    
                        }else{
                            if (tool.Refs.current[i]){
                                //if (tool.Refs.current[i].set){ // use defualt set data function 
                                  //  tool.Refs.current[i].set(data)
                                //}else{
                                    //tool.Refs.current[i]
                                   // cl("tree :",tool.Refs.current[i])
                                    let eleRef=tool.Refs.current[i].instanceRef.current
                                    let httree=eleRef.global_trees["ht"].tree
                                    httree.load_data_fn(tt.state.data.httree[i]) 
                                    tt.forceUpdate()
                                     
                                //} 
                            }  
                        }
                        
                    })
                }        
            }

            tool.main=()=>{
                let tt=this
                let nameref=tool.name
                let Es=[]
                let i=0
                let itot=0

                if (isOb(tt.state.data[nameref])){}else{
                    if (typeof(tt.state.data[nameref])==="object"){
                        tt.state.data[nameref].forEach((r ,i) => {  
                            // alternative to of doing this inside component with refData prop
                            if (isUn(tool.Refs.current[i])){
                                tool.Refs.current[i]={
                                    instanceRef : React.createRef({})
                                }
                            }

                            Es.push(
                                <div key={i}>
                                    <HTtree 
                                        ref={tool.Refs.current[i].instanceRef
                                                // tt.HTtreeRef // singular ref
                                        }
                                     />
                                </div>
                            )
                            itot=i
                        })
                    }
                }

                tool.addFn=(e)=>{
                    let nameref=e.target.getAttribute("nameref")
                    let data={...tt.state.data}

                    if (isUn(data)){
                        data={}
                    }
                    if (isUn(data[nameref])){
                        data[nameref]=[]
                    }

                    let nr={}
                    data[nameref].push(nr)
            
                    let stnr={}
                    stnr["data"]=data

                    tt.setState(stnr)
                }
        
                tool.addbutton=(()=>{
                    itot++
                    let i=itot
                    return (
                        <button
                            className={tool.toolbuttonClass}
                            style={tool.toolbuttonStyle}
                            nameref={nameref}
                            onClick={
                                tool.addFn
                            }
                        >
                            add {nameref}
                        </button>
                    )
                })()
        
                return (
                    <div>
                        {
                            //    addbuttonE
                        }
                        {Es}
                    </div>
                )
            }
            tt.alltoolitems.push(tool)     
        }
        
        
    }

   

    mainStyle={
        //backgroundColor: "#282c34",
        // minHeight: "100vh",
        height : "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        //font-size: calc(10px + 2vmin),
        color: "white",
        width : "100vw",
        overflowX : 'auto'
        
    }

    render(){
        let tt=this
        
        let mainStyle=tt.mainStyle   
        
        let alltoolitemsE=[]
        
        // all tools 
        tt.alltoolitems.forEach((r,i)=>{
            let E=r.main()
            alltoolitemsE.push(
                <div key={i} style={{ position : "relative",left :35,width :undefined}}>                    
                    {E}
                </div>
            )            
        })

        let alltoolitemsButtonsE;
        // all button
        (
            ()=>{
                    let arrE=[]
                    tt.alltoolitems.forEach((r,i)=>{
                        let E=r.addbutton
                        arrE.push(
                            <div key={i} style={{ 
                                                    position : "relative",
                                                    float : "left",
                                                    width :undefined
                                                }}>                    
                                {E}
                            </div>
                        )            
                    })

                    alltoolitemsButtonsE=(
                        <div>
                            {arrE}
                            <div style={{clear : "left"}} />
                        </div>
                    )
            }
        )();

        
        return (
            <div style={mainStyle}> 
                <Background />

                <Tools style={{zIndex :99}} />
                
                <div
                    style={{ 
                        //position : "relative", 
                            //height : "100%",
                }}
                >
                    <HeaderPanel/>
                </div>  

                {alltoolitemsButtonsE}

                <div
                     className='mainboxTools'
                    style={{ 
                        overflow : "hidden",
                        //position : "relative",
                        "--heighth" : "100%",height : "calc(var(--heighth) )",margin : 20
                        //"--widthw" : "100%", width :"calc(var(--widthw) - 800px)",
                        //,height : 790,width : 1482
                    }}
                >
                    <div
                       
                        style={{ 
                            overflowX : "auto",overflowY : "auto", 
                            //position : "relative",
                            //height : "var(--heighth)",
                            //height : "calc(var(--heighth) + 17px )",
                            height : "calc(100% + 17px )",
                            width : "calc(100% + 17px )",
                            //width :"var(--widthw)",
                            //height : "100%"
                            //height : 750,width : 1400,padding : 50
                        }}
                    >
                        {alltoolitemsE}
                   
                        { 
                            /*
                            <button
                                onClick={()=>{
                                    console.log(tt.testText.current.getText())
                                }}
                            >
                                testText
                            </button>
                            <TextEditor ref={tt.testText} />
                            */ 
                        }
                    </div>
                </div>

                <SideBar>
                    <div
                        style={{ color : "black"  }}
                    >
                        {"==========="}
                    </div>
                    
                    <button
                        onClick={()=>{
                            saveload.loadDataLocal.apply(tt,[])
                        }}
                    >
                        load local
                    </button>
                    <br/>
                    <button
                        onClick={()=>{
                            saveload.saveDataLocal.apply(tt,[])
                        }}
                    >
                        save local
                    </button>
                    <button
                        onClick={()=>{
                            saveload.downloadDataLocal.apply(tt,[])
                        }}
                    >
                        download local
                    </button>
                    <button
                        style={{}}
                        onClick={(e)=>{
                            saveload.importBrowseInputButtonActivate.apply(tt,[e])
                        }}
                    >
                        import project
                        <input
                            ref={tt.importBrowseButtonRef}
                            style={{display : "none"}}
                            type="file"
                            accept={"*" /* "image/star" for images filtered   */ }
                            onChange={(e)=>{
                                saveload.importProjLocal.apply(tt,[e])
                            }}
                        />
                    </button>
                    

                </SideBar>

            </div>
        )
    }
}
