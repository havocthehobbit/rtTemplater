import React,{ Component } from 'react';
import "../../App.css";
import { ContextStore } from '../common/contextStore';
import { RenderTmpl } from '../mainlib/render';

export class Main extends Component {
    constructor(props){
        super(props)

     
        this.state={
            name : "", name2 : "",
            tmplOut : ""
        }
    }


    componentDidMount(){}

    renderTemplateState=(...args)=>{ 
            return RenderTmpl.apply(this,args)  // with state 
            
    }

    renderTemplate=RenderTmpl

    render(){
        let tt=this

        return (
            <div>
                <div>
                    <div>
                        <input 
                            type="checkbox" 
                        
                        />
                        <label>has DB</label>
                        
                        <input 
                            type="checkbox" 
                        
                        />
                        <label>has read</label>

                        <input 
                            type="checkbox" 
                        
                        />
                        <label>has insert</label>

                        <input 
                            type="checkbox" 
                        
                        />
                        <label>has update</label>

                        <input 
                            type="checkbox" 
                        
                        />
                        <label>has delete rec</label>

                        


                    </div>

                    <label>name : </label>
                    <input 
                        value={tt.state.name}
                        onChange={(e)=>{
                            tt.setState({ name : e.target.value })
                        }}
                    />
                </div>

                <h3>output</h3>
                <div>
                    <button
                        onClick={
                            (e)=>{
                                tt.renderTemplate({ tData : {name :"rob"} , tTmpl : "`hello ${tData.name}`" }, (dt)=>{
                                    tt.setState({ tmplOut : dt })
                                })
                            }
                        }
                    >
                        render
                    </button>
                    <label>name : </label><br/>
                    <textarea
                        value={tt.state.tmplOut}
                        style={{width : 300, height : 300}}
                        onChange={(e)=>{
                            tt.setState({ tmplOut : e.target.value })
                        }}
                    />
                </div>
                

            </div>
        )
    }
}
