import React,{ Component } from 'react';
import "../../App.css";
import { ContextStore } from '../common/contextStore';
import { RenderTmpl } from './render';

let $cn=require("../common/libNative").$cn
let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb


export class TemplateItem extends Component {
    constructor(props){
        super(props)

        let tt=this
        let state={}
        let o={}
        let temp=""        
        
        temp="title"
        if (!isUn(props[temp])){ o[temp]=props[temp]}

        temp="data"
        if (!isUn(props[temp])){ 
            o[temp]=props[temp]
        }

        temp="template"
        if (!isUn(props[temp])){ 
            o[temp]=props[temp]
        }       


        temp="onClick"
        if (!isUn(props[temp])){ o[temp]=props[temp]}

        

        temp="showRenderButton"
        if (!isUn(props[temp])){ o[temp]=props[temp]}
        

        temp="style"
        if (!isUn(props[temp])){ tt[temp]=props[temp]}
        
        let defState={
            title : "output",

            data : {},
            tmplOut : "",

            name : "", name2 : "",

            showRenderButton : true
            
        }

        state={...defState,...o}

        temp="render" // runs this render function from outside of this component using prop drilling
        if (!isUn(props[temp])){ 
            if (isOb(props[temp])){
                props[temp][props.title].render=tt.runRender
                props[temp][props.title].runRender=tt.runRender
                props[temp][props.title].run=tt.runRender
                props[temp][props.title].fn=tt.runRender
            }            
        }
        temp="runRender"
        if (!isUn(props[temp])){ 
            if (isOb(props[temp])){
                props[temp][props.title].render=tt.runRender
                props[temp][props.title].runRender=tt.runRender
                props[temp][props.title].run=tt.runRender
                props[temp][props.title].fn=tt.runRender
            }            
        }

        this.state=state
    }

    itemType=""

    style={}

    componentDidMount(){
        
    }
    

    renderTemplateState=(...args)=>{ 
            return RenderTmpl.apply(this,args)  // with state 
            
    }
    
    onClick=()=>{
        let tt=this
    }

    renderTemplate=RenderTmpl

    runRender=(cby)=>{
        let tt=this
        let cb=()=>{}
        if (tof(cby)==="function"){ cb=cby}
        tt.renderTemplate({ tData : tt.state.data , tTmpl : tt.state.template }, (dt)=>{
            tt.setState({ tmplOut : dt },()=>{              
              cb()
            })
        })
    }
    


    render(){
        let tt=this

        let props=tt.props

        return (
            <div>
             

                <h3
                    style={{padding : 0 , margin : 0}}
                >
                    {tt.state.title}
                </h3>
                <div>
                    {(()=>{
                        if (tt.state.showRenderButton===true){
                            return (
                                <button
                                    style={{padding : 8,margin : 3,fontSize: 20 , borderRadius : 4 , background : "lightgreen" , border : "none"}}
                                    onClick={
                                        (e)=>{
                                            tt.runRender()
                                        }
                                    }
                                >
                                    render
                                </button>
                            )
                        }
                    })()}
                    
                    <br/>
                    <div
                        style={{ background : "white",borderRadius : 10,overflow : "hidden"}}
                    >                    
                        <textarea
                            value={tt.state.tmplOut}
                            style={{width : 600, height : 300 , borderRadius : 10, border : "none"}}
                            onChange={(e)=>{
                                tt.setState({ tmplOut : e.target.value })
                            }}
                        />
                    </div>
                </div>
                

            </div>
        )
    }
}
