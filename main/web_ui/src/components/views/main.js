import React,{ Component } from 'react';
import "../../App.css";
import { ContextStore } from '../common/contextStore';
import { RenderTmpl } from '../mainlib/render';
import { TemplateItem } from '../mainlib/templateItem';

export class Main extends Component {
    constructor(props){
        super(props)

     
        this.state={
            name : "", name2 : "",
            tmplOut : ""
        }
    }


    componentDidMount(){}

    runRender={ fn : ()=>{}}
  

    render(){
        let tt=this

        return (
            <div>
                <button
                    onClick={()=>{
                        tt.runRender.fn()
                    }}
                >
                    ParRender
                </button>

                <TemplateItem 
                    title={"Db1"} 
                    data={{name : "rob"}} 
                    template={"hello my name is ${data.name}"}
                    runRender={tt.runRender}
                    showRenderButton={false}
                
                />
            </div>
        )
    }
}
