import React,{ Component } from 'react';
import "../../App.css";
import { ContextStore } from '../common/contextStore';
import { RenderTmpl } from '../mainlib/render';
import { TemplateItem } from '../mainlib/templateItem';
import { ReactNodeMongo } from '../mainlib/reactnodemongo';

export class Main extends Component {
    constructor(props){
        super(props)

     
        this.state={
            name : "", name2 : "",
            tmplOut : ""
        }
    }


    render(){
        let tt=this

        return (
            <div>
                <ReactNodeMongo/>
            </div>
        )
    }
}
