import React,{ Component, useRef } from 'react';
//import "../../App.css";
//import { ContextStore } from '../common/contextStore';
import { RenderTmpl } from '../mainlib/render';
import { TemplateItem } from '../mainlib/templateItem';
import { JSNodeMongo } from '../mainlib/JSNodeMongo';
import { SideBar } from '../mainlib/SideBar';
import $lnd from  "../common/libNativeDom"
let $cn=require( "../common/libNative").$cn

let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb

export class Main extends Component {
    constructor(props){
        super(props)

        this.reactmongoDBDataRef=React.createRef(); this.reactmongoDBDataRef.current={}        

        this.importBrowseButtonRef=React.createRef()

        this.state={
            name : "", name2 : "",
            tmplOut : "",            
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
  


    data={}

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
                let JSNodeMongoTemp=proj.data.JSNodeMongo

                tt.reactmongoDBSetDataRun(JSNodeMongoTemp)
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
            console.log("text : ", text)

            tt.loadtextProj(text)

            //if reader.readAsDataURL is used ...for binary only
            if (false){
                let b64encodedhash = text.split(',')[1];
                let mimetype = text.split(',')[0].split(':')[1].split(';')[0];
                //
                    let data = atob(b64encodedhash); //ascii to binary            
                //converting to Uint8Array
                    let blob
                    var ab = new ArrayBuffer(data.length); 
                    var ia = new Uint8Array(ab);
                    for(var i = 0;i<data.length;i++){
                        ia[i] = data.charCodeAt(i);
                    }
                    blob = new Blob([ia],{ "type": mimetype});          
                // Downloadable binary as link
                    let filenamenew="somefile.ext"
                    let file = new File([blob], filenamenew);
                    //let link= document.createElement('a');
                    //link.href = window.URL.createObjectURL(file); // element.setAttribute('href', `data:${mimetype};charset=utf-8,` + encodeURIComponent(file)); // mimetype : text/plain may need to replace ;charset=utf-8
                    //link.download = filenamenew; // link.setAttribute('download', filename);
                    //link.click();
                //cl("b64decoded : ",b64encodedhash)
                //cl("mimetype : ",mimetype)
                //cl("data : ",data)
                // cl("blob : ",blob)
            }
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
        
        

        let JSNodeMongoTemp=tt.reactmongoDBGetDataRun()
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

    reactmongoDBDataRef={}
    reactmongoDBGetDataRun=()=>{
        if (this.reactmongoDBDataRef.current.get){
            let data={}
            data=this.reactmongoDBDataRef.current.get()
            //cl(data)
            return data
        }
        
    }
    
    reactmongoDBSetDataRun=(data)=>{
        if (this.reactmongoDBDataRef.current.set){
            this.reactmongoDBDataRef.current.set(data)
        }
        
    }


    mainStyle={
        backgroundColor: "#282c34",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        //font-size: calc(10px + 2vmin),
        color: "white",
        width : "100%"
      }


    
    render(){
        let tt=this       
        
        let mainStyle=tt.mainStyle

        return (
            <div style={mainStyle}>                
                <div style={{ position : "relative",left :35,width :undefined}}>
                    <JSNodeMongo  mainTitle={"JS <----> MongoDb tables"} refData={tt.reactmongoDBDataRef}  startEx={false}/>
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
