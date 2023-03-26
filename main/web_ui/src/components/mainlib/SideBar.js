import React,{Component} from 'react' 




export class SideBar extends Component{
    constructor(props){
        super(props)

        let tt=this
        let tmp=""
        
        tmp='background'
        if (typeof(props[tmp])!=="undefined"){
            tt[tmp]=props[tmp]
        }

        tmp='backgroundBar'
        if (typeof(props[tmp])!=="undefined"){
            tt[tmp]=props[tmp]
        }

        tmp='pin'
        if (typeof(props[tmp])!=="undefined"){
            tt.sideBarisPined=props[tmp]
        }       

        tmp='widthOpen'
        if (typeof(props[tmp])!=="undefined"){
            tt.sidebarWidthOpen=props[tmp]
        }

        tmp='widthClosed'
        if (typeof(props[tmp])!=="undefined"){
            tt.sidebarWidthClosed=props[tmp]
        }

        tmp='open'
        if (typeof(props[tmp])!=="undefined"){
            tt.sideBarisOpen=props[tmp]
        }
  
        this.state={
            name : "sidebar",
            tmplOut : "",
            animationName : "", openclose : true
        }
    }

    componentDidMount(){

    }

    backgroundBar="lightblue"
    background="white"

    // animation
    sidebarWidthOpen=250
    sidebarWidthClosed=20    
    sideBarisOpen=false
    sideBarisPined=false
    //
    animationBusy=false
    addStylesheetRules(rules) {
        var styleEl = document.createElement("style")
        document.head.appendChild(styleEl)
        var styleSheet = styleEl.sheet
        styleSheet.insertRule(rules, 0)
    }
    animationClickHdl=(showhide)=>{
        let tt=this        

        let animationName 
        
        let keyframes =""
        //if (tt.state.openclose){
        if (showhide===false){
            
            animationName = `animation${250}`;  
            keyframes =`
                @-webkit-keyframes ${animationName} 
                {
                    from {                    
                        width: ${tt.sidebarWidthOpen}px;
                    }
                    
                    to {                        
                        width: ${tt.sidebarWidthClosed}px;
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
                        width: ${tt.sidebarWidthClosed}px;
                    }
                    
                    to {                        
                        width: ${tt.sidebarWidthOpen}px;
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


    render(){
        let tt=this

        let backgroundBar=tt.backgroundBar
        let background=tt.background

        let sideBarWidthCurr=tt.sidebarWidthClosed
        if (tt.sideBarisOpen){
            sideBarWidthCurr=tt.sidebarWidthOpen
        }

        let style_def={ position : "fixed",overflow : "hidden", zIndex : 9999, left : 0,top : 0,height : "100%", width : sideBarWidthCurr, background : background  }

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
            <div
            style={style}
            //onClick={tt.animationClickHdl.bind(tt)}                        
            onClick={()=>{
                //tt.animationClickHdl(false)
            }}
            onMouseEnter={()=>{
                if (tt.sideBarisPined===false){
                    if (tt.sideBarisOpen===false){
                        if (tt.animationBusy===false){ // prevent from kicking off too many animations at once 
                            tt.animationBusy=true
                            setTimeout(()=>{tt.animationBusy=false; tt.sideBarisOpen=true ;tt.forceUpdate() },100)
                            tt.animationClickHdl(true)
                        }
                    }
                }
            }}
            onMouseLeave={()=>{
                if (tt.sideBarisPined===false){
                    if (tt.sideBarisOpen===true){
                        if (tt.animationBusy===false){ // prevent from kicking off too many animations at once 
                            tt.animationBusy=true
                            setTimeout(()=>{tt.animationBusy=false; tt.sideBarisOpen=false;tt.forceUpdate()},100)
                            tt.animationClickHdl(false)
                        }
                    }
                }
            }}                    
        >            
                <div
                        style={{position : "absolute",  
                                left : 0 , top : 0, zIndex : 999,
                                width : 20, height : "100%",
                                background : backgroundBar
                    }}
                >
                </div>
                <div
                        style={{position : "absolute",  
                                right : 0 , top : 0, zIndex : 999,
                                width : 3, height : "100%",
                                background : backgroundBar
                    }}
                />

            
                {tt.props.children}

        </div>
        )
    }
}