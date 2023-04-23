import { useState,useEffect ,useRef} from 'react'
import "./headerPanel.css"
export const HeaderPanel=()=>{
    let [state,setState]=useState({  }) // "heightBoolWorkflow" : false,"heightWorkflow" : 5,
    
    return (
        <div 
            style={{ 
                //position : "relative",
                //width : "100vw"
            }}
        >
            <div
                className="headerPanels"
                style={{
                    float : "left",
                    background : "orange", height : state["height" + "Workflow"], borderRadius : 8,
                    margin : 3, padding : 5,overflow : "hidden"
                }}
                onClick={()=>{}}
            >
                <h4>workflows</h4>

                <div
                    style={{position : "absolute", right : 1,top : 0,color : "black"}}
                    onClick={()=>{
                        let nr={...state}
                        let tmp="Workflow"

                        if (state["heightBool" + tmp]){
                            nr["heightBool" + tmp]=false
                            nr["height" + tmp]=10
                        }else{
                            nr["heightBool" + tmp]=true
                            nr["height" + tmp]=100
                        }

                        setState(nr)
                    }}
                >pin</div>
            </div>
            <div
                className="headerPanels"
                style={{
                    float : "left",
                    background : "lightblue", height : state["height" + "Views"], borderRadius : 8,
                    margin : 3, padding : 5, overflow : "hidden"
                }}
                onClick={()=>{}}
            >
                <h4>views</h4>
                <div
                    style={{position : "absolute", right : 1,top : 0,color : "black"}}
                    onClick={()=>{
                        let nr={...state}
                        let tmp="Views"

                        if (state["heightBool" + tmp]){
                            nr["heightBool" + tmp]=false
                            nr["height" + tmp]=10
                        }else{
                            nr["heightBool" + tmp]=true
                            nr["height" + tmp]=100
                        }

                        setState(nr)
                    }}
                >pin</div>
            </div>
            <div
                className={"headerPanels headerPanel3" }
                style={{
                    float : "left",
                    background : "lightgreen",height : state["height" + "Data"], borderRadius : 8,
                    margin : 3, padding : 5,
                }}
                onClick={()=>{}}
            >
                <h4>data</h4>
                <div
                    style={{position : "absolute", right : 1,top : 0,color : "black"}}
                    onClick={()=>{
                        let nr={...state}
                        let tmp="Data"

                        if (state["heightBool" + tmp]){
                            nr["heightBool" + tmp]=false
                            nr["height" + tmp]=10
                        }else{
                            nr["heightBool" + tmp]=true
                            nr["height" + tmp]=100
                        }

                        setState(nr)
                    }}
                >pin</div>
            </div>
            <div style={{clear :"left"}}/>
        </div>

    )
}