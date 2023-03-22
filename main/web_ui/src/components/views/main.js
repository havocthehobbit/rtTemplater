import React,{ Component } from 'react';
import "../../App.css";
//import { ContextStore } from '../common/contextStore';
import { RenderTmpl } from '../mainlib/render';
import { TemplateItem } from '../mainlib/templateItem';
import { ReactNodeMongo } from '../mainlib/reactnodemongo';


export class Main extends Component {
    constructor(props){
        super(props)

     
        this.state={
            name : "", name2 : "",
            tmplOut : "",
            animationName : "", openclose : true
        }
    }

    componentDidMount(){
        
        // add global stylesheet
        let myStyle = document.createElement("style")
        document.head.appendChild(myStyle)
        let styleSheet = myStyle.sheet        
        styleSheet.insertRule(`button { background: green;border-radius : 5px;padding : 10px; margin : 3px;font-size : 18px;color : white ;border : none}`, 0)
        

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
        /*
            // stack anim tip 
            let animationName = `animation${300}`;  
            let keyframes = `
                @-webkit-keyframes ${animationName} 
                {
                    10% {
                            -webkit-transform:translate(
                                ${Math.random() * 300}px, 
                                ${Math.random() * 300}px
                            )
                        } 
                    90% {
                            -webkit-transform:translate(
                                ${Math.random() * 300}px, 
                                ${Math.random() * 300}px)
                        }
                    100% {
                            -webkit-transform:translate(
                                ${Math.random() * 300}px, 
                                ${Math.random() * 300}px)
                        }
                }
            `;
        */

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

    loadDataLocal=()=>{
        let loaddataSTR=localStorage.getItem( "rtTemplater" )
    }

    loadDataLocal=()=>{
        let def={

        }

        let newProj={}

        localStorage.setItem( "rtTemplater" , newProj )
    }


    render(){
        let tt=this
        
        let style_def={ position : "fixed",overflow : "hidden", zIndex : 9999, left : 0,height : "100%", width : 250,background : "white" }

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

        return (
            <div>
                
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
                            <button
                                
                            >
                                load
                            </button>
                            <br/>
                            <button
                                
                                >
                                save
                            </button>

                    </div>


                <ReactNodeMongo/>
            </div>
        )
    }
}
