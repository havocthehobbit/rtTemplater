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
let $cn=require( "../common/libNative").$cn

let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb

export class Main extends Component {
    constructor(props){
        super(props)

        this.reactmongoDBDataRefs=React.createRef(); this.reactmongoDBDataRefs.current={}
        this.JSNodeAPIRefs=React.createRef(); this.JSNodeAPIRefs.current={}
        
        this.importBrowseButtonRef=React.createRef()

        this.state={
            name : "", name2 : "",
            tmplOut : "",  
            data :{} ,        
        }
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
                        JSNodeMongoTemp=proj.data.JSNodeMongo
                        tt.reactmongoDBSetDataRun(JSNodeMongoTemp)
                    }else{
                        tt.reactmongoDBSetDataRuns()
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
        
        

        let JSNodeMongoTemp

        //JSNodeMongoTemp=tt.reactmongoDBGetDataRun()

        JSNodeMongoTemp=tt.reactmongoDBGetDataRuns()

        try {
            let saveFile=""
            all.lastProj=nameIn
            newProj.data["JSNodeMongo"]=JSNodeMongoTemp
            saveFile=JSON.stringify(all,null,2)
            localStorage.setItem( tt.localAllProjFile , saveFile )              
        } catch (error) {
            alert("save err : ", error)
        }
        
        
    }


    reactmongoDBDataRefs={}
    reactmongoDBGetDataRuns=()=>{
        let tt=this
        let data=[]
        $cn.each(tt.reactmongoDBDataRefs.current,(r,i)=>{
            if (tt.reactmongoDBDataRefs.current[r.uuid]){
                
                //data[r.uuid]=tt.reactmongoDBDataRefs.current[r.uuid].get()                
                data.push(tt.reactmongoDBDataRefs.current[r.uuid].get())               
               
            }else{
                if (tt.reactmongoDBDataRefs.current[i]){
                    
                    //data[i]=tt.reactmongoDBDataRefs.current[i].get()                    
                    data.push(tt.reactmongoDBDataRefs.current[i].get())                   
                    
                }
            }
        })
        return data
    }
    reactmongoDBSetDataRuns=()=>{
        let tt=this

        if (tof(tt.state.data.JSNodeMongo)==="array"){
            tt.state.data.JSNodeMongo.forEach((r,i)=>{
                let data=r
                if (tt.reactmongoDBDataRefs.current[r.uuid]){
                    if (tt.reactmongoDBDataRefs.current[r.uuid].set){
                        tt.reactmongoDBDataRefs.current[r.uuid].set(data)
                    }    
                }else{
                    if (tt.reactmongoDBDataRefs.current[i]){
                        tt.reactmongoDBDataRefs.current[i].set(data)
                    }  
                }
                
            })
        }        
    }

    JSNodeAPIRefs={}
    JSNodeAPIGetRefsRuns=()=>{
        let nameref="JSNodeAPI"
        let tt=this
        let data=[]
        $cn.each(tt[nameref + "Refs"].current,(r,i)=>{
            if (tt[nameref + "Refs"].current[r.uuid]){
                
                //data[r.uuid]=tt.reactmongoDBDataRefs.current[r.uuid].get()                
                data.push(tt[nameref + "Refs"].current[r.uuid].get())               
               
            }else{
                if (tt[nameref + "Refs"].current[i]){
                    
                    //data[i]=tt.reactmongoDBDataRefs.current[i].get()                    
                    data.push(tt[nameref + "Refs"].current[i].get())                   
                    
                }
            }
        })
        return data
    }
    JSNodeAPISetRefsRuns=()=>{
        let nameref="JSNodeAPI"
        let tt=this

        if (tof(tt.state.data[nameref])==="array"){
            tt.state.data[nameref].forEach((r,i)=>{
                let data=r
                if (tt[nameref + "Refs"].current[r.uuid]){
                    if (tt[nameref + "Refs"].current[r.uuid].set){
                        tt[nameref + "Refs"].current[r.uuid].set(data)
                    }    
                }else{
                    if (tt[nameref + "Refs"].current[i]){
                        tt[nameref + "Refs"].current[i].set(data)
                    }  
                }
                
            })
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

        

        let JSNodeMongoEs
        JSNodeMongoEs=(()=>{
            let Es=[]
            let i=0
            let itot=0
            // array or single object
            if (isOb(tt.state.data.JSNodeMongo)){}else{                
                if (typeof(tt.state.data.JSNodeMongo)==="object"){ 
                    //tt.reactmongoDBDataRefs=[]
                    
                    tt.state.data.JSNodeMongo.forEach((r ,i) => {                      
                        Es.push(
                            <div key={i}>
                                <JSNodeMongo  mainTitle={"JS <----> MongoDb tables"} refData={tt.reactmongoDBDataRefs} iter={i} startEx={false}/>
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
                        onClick={
                            ()=>{
                                let data={...tt.state.data}

                                if (isUn(data.JSNodeMongo)){
                                    data={}
                                }
                                if (isUn(data.JSNodeMongo)){
                                    data.JSNodeMongo=[]
                                }

                                let nr={}
                                data.JSNodeMongo.push(nr)
                           
                                
                                tt.setState({ data : data })
                            }
                        }
                    >
                        add mongo/js
                    </button>
                )
            })()

            return (
                <div>
                    {addbuttonE}
                    {Es}
                </div>
            )
        })()

        
        let JSNodeAPI
        JSNodeAPI=(()=>{
            let nameref="JSNodeAPI"
            let Es=[]
            let i=0
            let itot=0
            // array or single object
            if (isOb(tt.state.data[nameref])){}else{                
                if (typeof(tt.state.data[nameref])==="object"){ 
                    //tt.reactmongoDBDataRefs=[]
                    
                    tt.state.data[nameref].forEach((r ,i) => {                      
                        Es.push(
                            <div key={i}>
                                <JSNodeMongo  mainTitle={"JS <----> API"} refData={tt[nameref + "Refs"]} iter={i} startEx={false}/>
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
                        onClick={
                            ()=>{
                                let nameref="JSNodeAPI"
                                let data={...tt.state.data}

                                if (isUn(data[nameref])){
                                    data={}
                                }
                                if (isUn(data[nameref])){
                                    data[nameref]=[]
                                }

                                let nr={}
                                data[nameref].push(nr)
                           
                                
                                tt.setState({ data : data })
                            }
                        }
                    >
                        add NodeAPI/js
                    </button>
                )
            })()

            return (
                <div>
                    {addbuttonE}
                    {Es}
                </div>
            )
        })()


        return (
            <div style={mainStyle}> 
                <Background />

                <Tools style={{zIndex :99}} />
               
                <div
                     style={{ position : "relative"}}
                >
                    <HeaderPanel/>
                </div>     

                <div style={{ position : "relative",left :35,width :undefined}}>                    
                    {JSNodeAPI}
                </div>

                <div style={{ position : "relative",left :35,width :undefined}}>                    
                    {JSNodeMongoEs}
                </div>

              

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
