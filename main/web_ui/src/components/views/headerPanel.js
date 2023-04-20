import "./headerPanel.css"
export const HeaderPanel=()=>{

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
                    background : "orange", height : 100, borderRadius : 8,
                    margin : 3, padding : 5,
                }}
                onClick={()=>{}}
            >
                <h4>workflows</h4>
            </div>
            <div
                className="headerPanels"
                style={{
                    float : "left",
                    background : "lightblue", height : 100, borderRadius : 8,
                    margin : 3, padding : 5,
                }}
                onClick={()=>{}}
            >
                <h4>views</h4>
            </div>
            <div
                className={"headerPanels headerPanel3" }
                style={{
                    float : "left",
                    background : "lightgreen",height : 100, borderRadius : 8,
                    margin : 3, padding : 5,
                }}
                onClick={()=>{}}
            >
                <h4>data</h4>
            </div>
            <div style={{clear :"left"}}/>
        </div>

    )
}