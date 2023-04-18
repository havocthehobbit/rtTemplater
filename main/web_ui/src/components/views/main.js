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

    localAllProjFile="rtTemplaterProjects"

    loadtextProj=(loaddataSTR,nameIn)=>{
        let tt=this
        let cancel=false
        let all

        if (isUn(nameIn)){ nameIn="__default" }

        if (tof(loaddataSTR)==="string"){
            try {
                all=JSON.parse(loaddataSTR)                
            } catch (error) {
                alert("load err : ", error)
            }

            if (cancel===true){
                return
            }

            if (isOb(all)){
                cl("all " , all)
                let proj=all.projects[nameIn]
                let JSNodeMongoTemp
                
                
                tt.setState({data : proj.data },()=>{
                    if (isOb(tt.state.data.JSNodeMongo)){
                        //JSNodeMongoTemp=proj.data.JSNodeMongo
                        //tt.reactmongoDBSetDataRun(JSNodeMongoTemp)
                    }else{
                        //tt.reactmongoDBSetDataRuns()
                        tt.alltoolitems.forEach((r,i)=>{
                            r.SetRefsRuns()
                        })
                    }
                })

                
            }else{                
                alert("load error ")
            }            
        }
    }
    loadDataLocal=(nameIn)=>{
        let tt=this
        
        let loaddataSTR=localStorage.getItem( tt.localAllProjFile )        

        if (isUn(nameIn)){ nameIn="__default" }
        tt.loadtextProj(loaddataSTR, nameIn)
        
    }

    downloadDataLocal=(nameIn)=>{
        let tt=this
        let cancel=false
        let loaddataSTR=localStorage.getItem( tt.localAllProjFile )
        let all
        let str

        if (isUn(nameIn)){ nameIn="__default" }

        if (tof(loaddataSTR)==="string"){
            try {
                $lnd.download( nameIn + ".json" ,loaddataSTR)
            } catch (error) {
                alert("load err : ", error)
            }

         
        }
    }

    importBrowseButtonRef=undefined    
    importProjLocal=(e)=>{
        let tt=this
        let files= e.target.files && e.target.files[0]
        
        e.target.value = null; // clear out files on element
        //cl("files : " , files )
        

        var reader = new FileReader();
        reader.onload = function() {
            var text = reader.result;            

            tt.loadtextProj(text)

            
        };
        reader.readAsText(files);
        //reader.readAsDataURL(files)

    }
    importProjLocalClickHndl=(e )=>{
        this.importProjLocal(e)
    }
    importBrowseInputButtonActivate=(e)=>{
        this.importBrowseButtonRef.current.click()        
    }

    saveDataLocal=(nameIn)=>{
        let tt=this
        let def={

        }
        let cancel=false
        
        let loaddataSTR=localStorage.getItem( tt.localAllProjFile )
        let loadedFile
        if (tof(loaddataSTR)==="string"){
            try {
                loadedFile=JSON.parse(loaddataSTR)                
            } catch (error) {
                alert("save err unable to load file before saving : ", error)        
            }
        }

        if (cancel===true){
            return
        }

        if (isUn(nameIn)){ nameIn="__default" }

        let newProj={ data : {},name : "",lastUpdated : new Date() }
        let all
        if (isOb(loadedFile)){
            all=loadedFile
        }else{
            all={projects : {} , lastProj : "" }
        }

        all.projects[nameIn]=newProj
        newProj.name=nameIn
        newProj.lastUpdated=new Date()
        
        

        //let JSNodeMongoTemp

        //JSNodeMongoTemp=tt.reactmongoDBGetDataRun()

        //JSNodeMongoTemp=tt.reactmongoDBGetDataRuns()

        tt.alltoolitems.forEach((r,i)=>{

        })

        try {
            let saveFile=""
            all.lastProj=nameIn
            //newProj.data["JSNodeMongo"]=JSNodeMongoTemp

            tt.alltoolitems.forEach((r,i)=>{
                newProj.data[r.name]=r.GetRefsRuns()                
            })

            saveFile=JSON.stringify(all,null,2)
            localStorage.setItem( tt.localAllProjFile , saveFile )              
        } catch (error) {
            alert("save err : ", error)
        }
        
        
    }


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
        
                let addbuttonE=(()=>{
                    itot++
                    let i=itot
                    return (
                        <button
                            nameref={nameref}
                            onClick={
                                (e)=>{
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
                            }
                        >
                            add {nameref}
                        </button>
                    )
                })()
        
                return (
                    <div>
                        {addbuttonE}
                        {Es}
                    </div>
                )
            }

            tt.alltoolitems.push(tool) 
        }

        if (true){
            let tool=new tt.toolItemsO()
            
            tool.name="JSNodeAPI2"
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
        
                let addbuttonE=(()=>{
                    itot++
                    let i=itot
                    return (
                        <button
                            nameref={nameref}
                            onClick={
                                (e)=>{
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
                            }
                        >
                            add {nameref}
                        </button>
                    )
                })()
        
                return (
                    <div>
                        {addbuttonE}
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
        
                let addbuttonE=(()=>{
                    itot++
                    let i=itot
                    return (
                        <button
                            nameref={nameref}
                            onClick={
                                (e)=>{
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
                            }
                        >
                            add {nameref}
                        </button>
                    )
                })()
        
                return (
                    <div>
                        {addbuttonE}
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
        height : "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        //font-size: calc(10px + 2vmin),
        color: "white",
        width : "100%",
    }

    render(){
        let tt=this
        
        let mainStyle=tt.mainStyle

        //let JSNodeMongoEs
        //JSNodeMongoEs=(tt.JSNodeMongo)()
        
        let alltoolitemsE=[]
        
        tt.alltoolitems.forEach((r,i)=>{
            let E=r.main()
            alltoolitemsE.push(
                <div key={i} style={{ position : "relative",left :35,width :undefined}}>                    
                    {E}
                </div>
            )            
        })

        
        return (
            <div style={mainStyle}> 
                <Background />

                <Tools style={{zIndex :99}} />
               
                <div
                     style={{ position : "relative"}}
                >
                    <HeaderPanel/>
                </div>     

               
                

                {alltoolitemsE}
                
                <HTtree/>

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
                <SideBar>
                    <div
                        style={{ color : "black"  }}
                    >
                        {"==========="}
                    </div>
                    
                    <button
                        onClick={()=>{
                            tt.loadDataLocal()
                        }}
                    >
                        load local
                    </button>
                    <br/>
                    <button
                        onClick={()=>{
                            tt.saveDataLocal()
                        }}
                    >
                        save local
                    </button>
                    <button
                        onClick={()=>{
                          tt.downloadDataLocal()
                        }}
                    >
                        download local
                    </button>
                    <button
                        style={{}}
                        onClick={(e)=>{
                            tt.importBrowseInputButtonActivate(e)
                        }}
                    >
                        import project
                        <input
                            ref={tt.importBrowseButtonRef}
                            style={{display : "none"}}
                            type="file"
                            accept={"*" /* "image/star" for images filtered   */ }
                            onChange={(e)=>{
                                tt.importProjLocal(e)
                            }}
                        />
                    </button>
                    

                </SideBar>

            </div>
        )
    }
}
