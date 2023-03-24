import React,{ Component } from 'react';
//import "../../App.css";
//import { ContextStore } from '../common/contextStore';
import { RenderTmpl } from '../mainlib/render';
import { TemplateItem } from '../mainlib/templateItem';
import { ReactNodeMongo } from '../mainlib/reactnodemongo';
let $cn=require( "../common/libNative").$cn
let cl=$cn.l
let tof=$cn.tof

export class Main extends Component {
    constructor(props){
        super(props)

        this.reactmongoDBDataRef=React.createRef(); this.reactmongoDBDataRef.current={}        

        this.state={
            name : "", name2 : "",
            tmplOut : "",
            animationName : "", openclose : true
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

        /*
            setTimeout(()=>{
                tt.reactmongoDBSetDataRun({ schema : {
                    "tables" : {
                        "users" : {
                                    "name" : "some",
                                    "indexs" : {},
                                    "cols" : {}
                                        },
                                    
                                },
                        "object" :{            
                            "objname" : "",
                            "objname2" : "",
                        },

                }, template : "" })
            },3000)
        */


    }
  

    // animation
    animationBusy=false
    sideBarisOpen=true
    addStylesheetRules(rules) {
        var styleEl = document.createElement("style")
        document.head.appendChild(styleEl)
        var styleSheet = styleEl.sheet
        styleSheet.insertRule(rules, 0)
    }
    animationClickHdl=(showhide)=>{
        let tt=this        

        let animationName 
        
        let keyframes =""
        //if (tt.state.openclose){
        if (showhide===false){
            
            animationName = `animation${250}`;  
            keyframes =`
                @-webkit-keyframes ${animationName} 
                {
                    from {                    
                        width: 250;
                    }
                    
                    to {                        
                        width: 20px;
                    }
                }
            `;
        }
        //else{
        if (showhide===true){
            animationName = `animation${20}`;  
            keyframes =`
                @-webkit-keyframes ${animationName} 
                {
                    from {                    
                        width: 20px;
                    }
                    
                    to {                        
                        width: 250;
                    }
                }
            `;
        }
    
        this.addStylesheetRules(keyframes);
    
        this.setState({
          animationName: animationName, 
          //openclose : !tt.state.openclose
        });
    }

    data={}

    loadDataLocal=(nameIn)=>{
        let tt=this
        let loaddataSTR=localStorage.getItem( "rtTemplaterProjects" )
        if (tof(loaddataSTR)==="string"){
            try {
                let str=JSON.parse(loaddataSTR)
                tt.reactmongoDBSetDataRun(str)
                
            } catch (error) {
                alert("load : ", error)
            }
            
        }
    }

    saveDataLocal=(nameIn)=>{
        let tt=this
        let def={

        }

        let newProj={}
        let temp=tt.reactmongoDBGetDataRun()
        try {
            newProj=JSON.stringify(temp)
            localStorage.setItem( "rtTemplaterProjects" , newProj )  
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
        
        let style_def={ position : "fixed",overflow : "hidden", zIndex : 9999, left : 0,top : 0,height : "100%", width : 250,background : "white" }

        // animation
        let style_anima = {
            animationName: this.state.animationName,
            animationTimingFunction: "ease-in-out",
            animationDuration: "0.6s",
            animationDelay: "0.0s",
            animationIterationCount: 1,
            animationDirection: "normal",
            animationFillMode: "forwards"
        }

        let style={...style_def,...style_anima }

        let mainStyle=tt.mainStyle

        return (
            <div style={mainStyle}>                
                <div style={{ position : "relative",left :35,width :undefined}}>
                    <ReactNodeMongo  refData={tt.reactmongoDBDataRef} />
                </div>

                { /* left sidebar */}
                <div
                    style={style}
                    //onClick={tt.animationClickHdl.bind(tt)}                        
                    onClick={()=>{
                        //tt.animationClickHdl(false)
                    }}
                    onMouseEnter={()=>{
                        if (tt.sideBarisOpen===false){
                            if (tt.animationBusy===false){ // prevent from kicking off too many animations at once 
                                tt.animationBusy=true
                                setTimeout(()=>{tt.animationBusy=false; tt.sideBarisOpen=true ;tt.forceUpdate() },300)
                                tt.animationClickHdl(true)
                            }
                        }
                    }}
                    onMouseLeave={()=>{
                        if (tt.sideBarisOpen===true){
                            if (tt.animationBusy===false){ // prevent from kicking off too many animations at once 
                                tt.animationBusy=true
                                setTimeout(()=>{tt.animationBusy=false; tt.sideBarisOpen=false;tt.forceUpdate()},300)
                                tt.animationClickHdl(false)
                            }
                        }
                    }}                    
                >
                    <div
                        style={{ color : "black"  }}
                    >
                        {"==========="}
                    </div>
                        <div
                                style={{position : "absolute",  
                                        left : 0 , top : 0, zIndex : 999,
                                        width : 20, height : "100%",
                                        background : "lightblue"
                            }}
                        >
                        </div>
                        <div
                                style={{position : "absolute",  
                                        right : 0 , top : 0, zIndex : 999,
                                        width : 3, height : "100%",
                                        background : "lightblue"
                            }}
                        />

                    
                        <button
                            onClick={()=>{
                                tt.loadDataLocal()
                            }}
                        >
                            load
                        </button>
                        <br/>
                        <button
                            onClick={()=>{
                                tt.saveDataLocal()
                            }}
                        >
                            save
                        </button>

                </div>

            </div>
        )
    }
}
