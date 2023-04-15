export const Background=()=>{
    return (
        <div 
            style={{
                position : "absolute",
                top : 0,
                left : 0,
                zIndex : -10,
                background : "linear-gradient(black ,70%, darkblue)",
                //background : "linear-gradient(purple, darkblue)",
                //background : "#282c34",
                width : "100%",
                height : "100%",
                position : "absolute",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",

            }}
        />  
    )
}
