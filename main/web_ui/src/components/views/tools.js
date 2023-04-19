import { useState,useEffect ,useRef} from 'react'

export const Tools=(props,refs)=>{
    let minHeight=25
    let minOpacity=0.4
    let [min,setMin]=useState({ "inputsPinHeightBool" : false,"inputsPinHeight" : minHeight,"inputsPinOpacity" : minOpacity})

    let style_def={ background :  "linear-gradient(grey ,80%,lightgrey)", width : "100%", 
                        height : minHeight + 10, position : "absolute", top : 0 , left : 0,
                        
    }
    let style0={ ...style_def,...props.style}
    let style={ ...style0,...{ height : min[ "inputs" + "Pin" + "Height"],overflow :min[ "inputs" + "Pin" + "HeightOverflow"],
                borderBottom : "thin solid grey",   opacity : min.inputsPinOpacity, 
    }}

    return (
        <>
            <div
                style={{...style0,...{background : "transparent",position : "relative"}}}
            >
                
            </div>
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
                            nr[ "inputs" + tmpName + "Height"]=minHeight
                            nr[ "inputs" + tmpName + "HeightBool"]=true
                            nr[ "inputs" + tmpName + "HeightOverflow"]="hidden"
                            nr[ "inputs" + tmpName + "Opacity"]=minOpacity

                            if (min[ "inputs" + tmpName + "HeightBool"]){
                                nr[ "inputs" + tmpName + "Height"]=150
                                nr[ "inputs" + tmpName + "HeightBool"]=false
                                nr[ "inputs" + tmpName + "HeightOverflow"]="hidden" // undefined
                                nr[ "inputs" + tmpName + "Opacity"]=1
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
        </>
    )
}