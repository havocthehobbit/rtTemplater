import { useState,useEffect ,useRef} from 'react'

export const Tools=(props,refs)=>{
    let [min,setMin]=useState({ "inputsPinHeightBool" : false})

    let style_def={ background : "lightgrey", width : "100%", height : 80, position : "absolute", top : 0 , left : 0,}
    let style0={ ...style_def,...props.style}
    let style={ ...style0,...{ height : min[ "inputs" + "Pin" + "Height"],overflow :min[ "inputs" + "Pin" + "HeightOverflow"]}}

    return (
        <div
            style={style}
        >
            <div
                style={{ color : "black",position : "absolute",right : 0, top : 0,margin : 6,
                            cursor : "pointer"
                }}
                onClick={()=>{
                    let nr={}
                    let tmpName="Pin"
                    nr[ "inputs" + tmpName + "Height"]=30
                    nr[ "inputs" + tmpName + "HeightBool"]=true
                    nr[ "inputs" + tmpName + "HeightOverflow"]="hidden"

                    if (min[ "inputs" + tmpName + "HeightBool"]){
                        nr[ "inputs" + tmpName + "Height"]=style0.height
                        nr[ "inputs" + tmpName + "HeightBool"]=false
                        nr[ "inputs" + tmpName + "HeightOverflow"]=undefined
                    }
                    //tt.setState(nr)
                    setMin(nr)
                    
                }}
            >
                <label style={{ pointerEvents : "none", userSelect : "none" }}>pin</label>
            </div>
            <div
                style={{ padding : 10, color : "black", }}
            >
                <label>stuff</label>
            </div>
            
        </div>
    )
}