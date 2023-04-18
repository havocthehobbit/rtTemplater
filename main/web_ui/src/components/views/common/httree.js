import  React,{ Component } from "react";
import {$gl} from "../../common/global"

let $cn=require( "../../common/libNative").$cn

let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb


export class HTtree extends Component{
    constructor(props){
        super(props)


        this.state={}
        
        this.createTreeInstance()
    }
    	
    componentDidMount(){
        
    }

    global_trees={}
    tree_instances={
        ht_tree_Inst : {        name_code : "_ht_tree01_",

            component_catagories : [{ name : "html" , code : "html"} , { name : "fav" , code : "fav"}  ,  { name : "diag" , code : "diag"},{ name : "js" , code : "js"}],
            component_selected_catagory : "html",
            components : [
                { name : "div" ,cat : "html" ,tc_code : "div" },
                { name : "image" , cat : "html" ,tc_code : "image"},
                { name : "plaintext" , cat : "html" ,tc_code : "plaintext"},
                { name : "p" , cat : "html" ,tc_code : "p"},
                { name : "br" , cat : "html" ,tc_code : "br"},
                { name : "h1" , cat : "html" ,tc_code : "h1"},
                { name : "h2" , cat : "html" ,tc_code : "h2"},
                { name : "h3" , cat : "html" ,tc_code : "h3"},
                { name : "input" , cat : "html" ,tc_code : "input"},
                { name : "textarea" , cat : "html" ,tc_code : "textarea"},
                { name : "button" , cat : "html" ,tc_code : "button"},                
                { name : "menu" , cat : "html" ,tc_code : "menu"},
                { name : "link" , cat : "html" ,tc_code : "link"},
                { name : "table" , cat : "html" ,tc_code : "table"},
                { name : "tbody" , cat : "html" ,tc_code : "tbody"},
                { name : "th" , cat : "html" ,tc_code : "th"},
                { name : "tr" , cat : "html" ,tc_code : "tr"},
                { name : "td" , cat : "html" ,tc_code : "td"},
                
                { name : "data fetch" , cat : "code" ,tc_code : "data_fetch"},
                { name : "upload" , cat : "code" ,tc_code : "upload"},
                { name : "function" , cat : "code" ,tc_code : "function"},
                { name : "object" , cat : "code" ,tc_code : "object"},
        
            ] , 

            styles : { 
                components : { main : { background : "lightgrey",borderRadius : 8,padding : 5,margin : 5, width : 150} },
                props : { main : { color : "black",height : 100,width : 900, background : "lightgrey", overflow : "auto",borderRadius : 8, padding : 5,margin : 5} },
                myTree : { main : { background : "lightgrey", color : "black", height : 250,width : 300, margin : undefined ,borderRadius : 8, padding : 5,margin : 5} } ,
                text : { main : { color : "black",width : 300 , height : 200, margin : 10 ,borderRadius : 8, padding : 5,margin : 5} } ,                
                //components_groups :  { background : "lightgrey" } ,
                layout : { main : { background : "transparent" } }
            },

            layout_fn : function(d1 ,d2, tt , t){
                
                /*
                    var d1={
                        r : r,
                        i :  i,
                        l_E :  l_E,
                        l_txt : l_txt,
                        l_ntd : l_ntd,
                        extra :  extra,
                        par : par,
                        indent : indent,
                        lvl : extra.lvl
                    }

                    var d2={                            
                        ret_E : ret_E,
                        ret_status : ret_status,
                        tmp_code : tmp_code,
                        ret_treeData : ret_treeData,
                    }
                */

                    var r=d1.r,i=d1.i,l_E=d1.l_E,l_txt=d1.l_txt,l_ntd=d1.l_ntd,extra=d1.extra,par=d1.par,indent=d1.indent,lvl=d1.extra.lvl
                    var ret_E=d2.ret_E,ret_status=d2.ret_status,tmp_code=d2.tmp_code,ret_treeData=d2.ret_treeData
        

                ////////////////////////////////////////////////////////
                ////////////////////// your code here //////////////////

                    var _this_main_proj_obj=tt

                    var valme=function(){
                        var args=arguments
                        var argsl=arguments.length
                
                        var cb=function(){}                    
                        var data

                        if ( args.length > 0){
                            if (isOb(args[0])){
                                if (!isUn(args[0].data)){
                                    data=args[0].data
                                }

                                if (!isUn(args[0].cb)){
                                    cb=args[0].cb
                                }
                            
                            }

                            if (args.length > 1){
                                cb=args[1];
                            }
                            if (tof(args[0])==="function" ){
                                cb=args[0]
                            }
                        }

                        //////////////////////////


                        //////////////////////////

                        cb()
                    }


                    { // create elements
                        ret_treeData=d1.l_ntd
                        ret_E=(
                            <div     key={i} >
                                <h3>ooo</h3>
                                {l_E}
                            </div>
                        )


                        var styles={}
                        var recstyles={}
                        if (isUn(r.propvars)){
                            r.propvars={}
                        }
                        if (!isUn(r.propvars.customcss)){
                            recstyles={...r.style, ...r.propvars.customcss}
                            styles=JSON.stringify(recstyles)                        
                        }else{
                            recstyles=r.style
                            styles=JSON.stringify(recstyles)                        
                        }

                        var linkedcodes={ events : {} }
                        var event_type=""                    

                        if (isUn(r.propvars.linkedcodes)){  
                            r.propvars.linkedcodes=linkedcodes
                        }

                        var linkedID_codeTXT=""
                        var linkedID_codeFN=()=>{}
                        var linkedID_code=""
                        var remTablinked_code=""
                        var js_tree=undefined


                        event_type="onClick"
                        if (!isUn(r.propvars.linkedcodes[event_type])){   // need to create a property of events list window to link different events to
                        }    

                        if (!isUn(r.propvars[ "linkedID_code" + "_" + event_type])){  
                            //if (!_.isEmpty(r.propvars[ "linkedID_code" + "_" + event_type])){  
                            if (Object.keys(r.propvars["linkedID_code"+ "_" + event_type]).length !== 0){ 
                            
                                /////////////////////////////////////////////////////
                                    var has_remotetab_link=false
                                    if (!isUn(r.propvars["remTablinked_code"+ "_" + event_type])){  
                                        //if (!_.isEmpty(r.propvars["remTablinked_code"+ "_" + event_type])){
                                        if (Object.keys(r.propvars["remTablinked_code"+ "_" + event_type]).length !== 0){  
                                            has_remotetab_link=true
                                            remTablinked_code=r.propvars["remTablinked_code"+ "_" + event_type]
                                        }
                                    }

                                    if (!has_remotetab_link){
                                        js_tree=_this_main_proj_obj.all_trees.current.tree_objs.js_tree
                                    }else{
                                        if (isUn(_this_main_proj_obj.all_trees.all[remTablinked_code])){
                                            return
                                        }
                                        js_tree=_this_main_proj_obj.all_trees.all[remTablinked_code].tree_objs.js_tree                                    
                                    }


                                /////////////////////////////////////////////////////



                                linkedID_code=r.propvars[ "linkedID_code" + "_" + event_type]
                                
                                if (!isUn(js_tree)){ // need to store remote tree linking in here somehow = tt.all_trees.all["remote tree id"].tree_objs.js_tree
                                    if (!isUn(js_tree.myTree_index.id[linkedID_code])){
                                        //tt.js_tree.myTree_index.id[linkedID_code].propvars.varname
                                        var llobj=js_tree.myTree_index.id[linkedID_code]
                                        var varname=js_tree.myTree_index.id[linkedID_code].attributes.varname
                                        linkedID_codeFN=()=>{alert( varname )} // eval() to be validated and replace this 
                                        linkedID_codeTXT=varname + "(e)"
                                    }
                                }
                            }
                        }


                        ///////////////////////////////////////////////// 
                        let ele_fn=function(a1){
                            var args=arguments
                            var args_l=args.length

                            let use_varGlobal=false
                            if (!isUn(a1.use_varGlobal)){
                                use_varGlobal=a1.use_varGlobal
                            }

                            if (!use_varGlobal){
                                let r={}
                                if (!isUn(a1.r)){
                                    r=a1.r
                                }

                                let ret_E=undefined
                                if (!isUn(a1.ret_E)){
                                    ret_E=a1.ret_E
                                }

                                let l_E=undefined
                                if (!isUn(a1.l_E)){
                                    l_E=a1.l_E
                                }

                                let tmp_code=""
                                if (!isUn(a1.l_E)){
                                    tmp_code=a1.tmp_code
                                }
                            }

                            

                            if (r.type==="div"){
                                tmp_code+=indent + "<div\n"                           
                                    tmp_code+=indent + "\t" + `style={${styles}}`  + "\n"
                                tmp_code+=indent + ">\n"                            
                                    tmp_code+=indent + "\t" + l_txt + "\n"
                                tmp_code+=indent + "</div>\n"

                                ret_E=(
                                    <div
                                        key={i}
                                        style={recstyles}
                                    >                            
                                        {l_E}
                                    </div>
                                )

                            }

                            if (r.type==="button"){
                                
                                var onclick=()=>{}
                                var onclicktxt="onClick={(e)=>{}}"

                                if (linkedID_code!==""){
                                    onclick=(e)=>{
                                        linkedID_codeFN(e)
                                    }
                                    onclicktxt=  `onClick={(e)=>{ ${linkedID_codeTXT} }}`
                                }
                                
                                

                                tmp_code+=indent + "<button\n"                            
                                    tmp_code+=indent + "\t" + `style={${styles}}`  + "\n"
                                    tmp_code+=indent + "\t" + onclicktxt  + "\n"
                                tmp_code+=indent + ">\n"
                                    tmp_code+=indent + "\t" +  r.value + "\n"
                                    tmp_code+=indent + "\t" + l_txt + "\n"
                                
                                

                                tmp_code+=indent + "</button>\n"
                                ret_E=(
                                    <button
                                        key={i}
                                        style={recstyles}
                                        onClick={onclick}
                                    >    
                                        {r.value}                        
                                        {l_E}
                                    </button>
                                )

                            }

                            if (r.type==="image"){

                                tmp_code+=indent + "<img\n"
                                    tmp_code+=indent + "\t" + `style={${styles}}`  + "\n"
                                    tmp_code+=indent + "\t" + `src={"${r.src}"}`  + "\n"

                                tmp_code+=indent + "/>\n"
                                

                                
                                ret_E=(
                                    <img 
                                        key={i}
                                        style={recstyles}
                                        src={r.src}
                                    />                            
                                        
                                )

                            }

                        

                            if (r.type==="plaintext"){
                                tmp_code+=indent + "\t" + r.value  + "\n"                                        
                                ret_E=(
                                    r.value                         
                                )

                            }

                            if (r.type==="p"){
                                tmp_code+=indent + "<p\n"
                                    tmp_code+=indent + "\t" + `style={${styles}}`  + "\n"                       
                                tmp_code+=indent + ">\n"
                                
                                    //tmp_code+=extra_data_main.tmp_code_child_ret
                                    tmp_code+=indent + "\t" + r.value + "\n"  
                                    tmp_code+=l_txt
                                    
                                tmp_code+=indent + "</p>\n"
                                
                                ret_E=(
                                    <p
                                        key={i}
                                        style={recstyles}
                                    >  
                                    {r.value}
                                    {l_E}                          
                                    </p>                            
                                
                                )

                            }

                            if (r.type==="h1"){
                                tmp_code+=indent + "<h1\n"
                                    tmp_code+=indent + "\t" + `style={${styles}}`  + "\n"
                                //tmp_code+=indent + "\t" + "onChange={(e)=>{}}"  + "\n"
                                tmp_code+=indent + ">\n"
                                
                                    //tmp_code+=extra_data_main.tmp_code_child_ret
                                    tmp_code+=indent + "\t" + r.value  + "\n"                        
                                    
                                tmp_code+=indent + "</h1>\n"
                                
                                ret_E=(
                                    <h1
                                        key={i}
                                        style={recstyles}
                                    >  
                                    {r.value}                                                
                                    </h1>                            
                                
                                )

                            }
                            if (r.type==="h2"){
                                tmp_code+=indent + "<h2\n"
                                tmp_code+=indent + "\t" + `style={${styles}}`  + "\n"                        
                                tmp_code+=indent + ">\n"
                                
                                    //tmp_code+=extra_data_main.tmp_code_child_ret
                                    tmp_code+=indent + "\t" + r.value + "\n"
                                    
                                tmp_code+=indent + "</h2>\n"
                                
                                ret_E=(
                                    <h2
                                        key={i}
                                        style={recstyles}
                                    >  
                                    {r.value}                                                
                                    </h2>                            
                                
                                )

                            }
                            if (r.type==="h3"){
                                tmp_code+=indent + "<h3\n"
                                    tmp_code+=indent + "\t" + `style={${styles}}`  + "\n"                        
                                tmp_code+=indent + ">\n"
                                
                                    //tmp_code+=extra_data_main.tmp_code_child_ret
                                    tmp_code+=indent + "\t" + r.value + "\n"                          
                                    
                                tmp_code+=indent + "</h3>\n"
                                
                                ret_E=(
                                    <h3
                                        key={i}
                                        style={recstyles}
                                    >  
                                    {r.value}                                                
                                    </h3>                            
                                
                                )

                            }


                            if (r.type==="br"){
                                
                                tmp_code+=indent + "<br\n"                       
                                tmp_code+=indent + "/>\n"
                                ret_E=(
                                    <br
                                        key={i}
                                    />                            
                                        
                                )

                            }

                            if (r.type==="input"){
                                
                                tmp_code+=indent + "<input\n"
                                    tmp_code+=indent + "\t" + `value={${r.value}}`  + "\n"
                                    tmp_code+=indent + "\t" + `style={${styles}}`  + "\n"
                                    tmp_code+=indent + "\t" + `onChange={(e)=>{}}`  + "\n"
                                tmp_code+=indent + "/>\n"
                                ret_E=(
                                    <input
                                        key={i}
                                        value={r.value}
                                        style={recstyles}
                                        onChange={()=>{}}
                                    />                            
                                        
                                )

                            }


                            
                            if (r.type==="textarea"){
                                tmp_code+=indent + "<textarea\n"
                                    tmp_code+=indent + "\t" + `value={${r.value}}`  + "\n"
                                    tmp_code+=indent + "\t" + `style={${styles}}`  + "\n"
                                    tmp_code+=indent + "\t" + `onChange={(e)=>{}}`  + "\n"
                                tmp_code+=indent + ">\n"
                                
                                    //tmp_code+=extra_data_main.tmp_code_child_ret
                                    tmp_code+=indent + "\t" + l_txt + "\n"
                                tmp_code+=indent + "</textarea>\n"
                                
                                ret_E=(
                                    <textarea
                                        key={i}
                                        value={r.value}
                                        style={recstyles}
                                        onChange={()=>{}}
                                    >
                                    {r.value}  
                                    {l_E}                          
                                    </textarea>                            
                                
                                )

                            }

                            if (r.type==="link"){
                                tmp_code+=indent + "<a\n"
                                    tmp_code+=indent + "\t" + `style={${styles}}`  + "\n"
                                    tmp_code+=indent + "\t" + `href={"${r.href}"}`  + "\n"
                                    tmp_code+=indent + "\t" + `src={"${r.src}"}`  + "\n"
                                tmp_code+=indent + ">\n"
                                    //tmp_code+=extra_data_main.tmp_code_child_ret
                                    tmp_code+=indent + "\t" + l_txt + "\n"
                                tmp_code+=indent + "</a>\n"
                                ret_E=(
                                    <a
                                        key={i}
                                        style={recstyles}
                                        href={r.href}
                                        src={r.src}
                                    >
                                    {r.value} 
                                    {l_E}                           
                                    </a>                            
                                        
                                )

                            }

                            if (r.type==="table"){
                                tmp_code+=indent + "<table\n"     
                                    tmp_code+=indent + "\t" + `style={${styles}`  + "\n"       
                                tmp_code+=indent + ">\n"
                                    //tmp_code=extra_data_main.tmp_code_child_ret
                                    tmp_code+=indent + "\t" + l_txt + "\n"
                                tmp_code+=indent + "</table>\n"

                                ret_E=(
                                    <table
                                        key={i}
                                        style={recstyles}
                                    >                            
                                    {l_E}
                                    </table>                            
                                )

                            }


                            if (r.type==="thead"){
                                tmp_code+=indent + "<thead\n" 
                                    tmp_code+=indent + "\t" + `style={${JSON.stringify(r.style)}}`  + "\n"                                
                                tmp_code+=indent + ">\n"
                                    //tmp_code=extra_data_main.tmp_code_child_ret
                                    tmp_code+=indent + "\t" + l_txt + "\n"
                                tmp_code+=indent + "</thead>\n"

                                ret_E=(
                                    <thead
                                        key={i}
                                        style={r.style}
                                    >                            
                                    {l_E}
                                    </thead>                            
                                )

                            }

                            if (r.type==="tbody"){
                                tmp_code+=indent + "<tbody\n"     
                                    tmp_code+=indent + "\t" + `style={${styles}}`  + "\n"                 
                                tmp_code+=indent + ">\n"
                                    //tmp_code=extra_data_main.tmp_code_child_ret
                                    tmp_code+=indent + "\t" + l_txt + "\n"
                                tmp_code+=indent + "</tbody>\n"

                                ret_E=(
                                    <tbody
                                        key={i}
                                        style={recstyles}
                                    >
                                    {r.value}                            
                                    {l_E}
                                    </tbody>                            
                                )

                            }
                            if (r.type==="th"){
                                tmp_code+=indent + "<th\n"                                 
                                    tmp_code+=indent + "\t" + `style={${styles}}`  + "\n"
                                tmp_code+=indent + ">\n"
                                    //tmp_code=extra_data_main.tmp_code_child_ret
                                    tmp_code+=indent + "\t" + l_txt + "\n"
                                tmp_code+=indent + "</th>\n"

                                ret_E=(
                                    <th  
                                        key={i}                          
                                        style={recstyles}
                                    >  
                                    {r.value}                           
                                    {l_E}
                                    </th>                            
                                )

                            }

                            if (r.type==="td"){
                                tmp_code+=indent + "<td\n"                                  
                                    tmp_code+=indent + "\t" + `style={${styles}}`  + "\n"
                                tmp_code+=indent + ">\n"                                
                                    tmp_code+=indent + "\t" + l_txt + "\n"
                                tmp_code+=indent + "</td>\n"

                                ret_E=(
                                    <td
                                        key={i}
                                        style={recstyles}
                                    >   
                                    {r.value}                          
                                    {l_E}
                                    </td>                            
                                )

                            }

                            if (r.type==="tr"){
                                tmp_code+=indent + "<tr\n"     
                                    tmp_code+=indent + "\t" + `style={${styles}}`  + "\n"            
                                tmp_code+=indent + ">\n"
                                    //tmp_code=extra_data_main.tmp_code_child_ret
                                    tmp_code+=indent + "\t" + l_txt + "\n"
                                tmp_code+=indent + "</tr>\n"

                                ret_E=(
                                    <tr
                                        key={i}
                                        style={recstyles}
                                    > 
                                    {r.value}                           
                                    {l_E}
                                    </tr>                            
                                )

                            }
                        
                            
                            a1.tmp_code=tmp_code

                        }

                        var newr={use_varGlobal : true,r : r,i : i , ret_E : ret_E,l_E :l_E ,tmp_code : tmp_code , extra : extra}
                        ele_fn(newr)
                        tmp_code=newr.tmp_code
                        
                    }

                //////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////
                
                d1.r=r
                d1.i =i
                d1.l_E =l_E
                d1.l_txt=l_txt
                d1.l_ntd=l_ntd
                d1.extra=extra
                d1.par=par
                d1.indent=indent
                d1.lvl=extra.lvl
                

                
                d2.ret_E=ret_E
                d2.ret_status=ret_status
                d2.tmp_code=tmp_code
                d2.ret_treeData=ret_treeData
                
                return { tempfn_data1 : d1 , tempfn_data2 : d2}
            },
            props_fn : function(d1 , d2, tt , t){
                var tt=d1.tt
                var t=d1.t
                
                if (isUn(tt.state)){
                    tt={ state : t.sstate}
                }

                var prop_attributes_varname=d1.prop_attributes_varname
                var ret_E=d2.ret_E
                
                //////////////////////////////////////////////////////////
                /////////////////// your code here ///////////////////////
                    var valmeEmpty=function(){
                        var args=arguments
                        var argsl=arguments.length
                
                        var cb=function(){}                    
                        
                        var val=args[0]

                        //////////////////////////


                        //////////////////////////

                        cb()
                    }

                    ret_E=(
                                <div style={{ position : "relative", float : "left" , fontSize : 11, }}>
                                    <div style={{ position : "relative", float : "left",marginLeft : 5 , height : 300 }}>
                                        name : {tt.state["prop_curr_name" + t.name_code]}
                                        <br/>
                                        type : {tt.state["prop_curr_type" + t.name_code]}
                                        <br/>
                                        id : {tt.state["prop_curr_id" + t.name_code]} 
                                        <br/>
                                        parent : {tt.state["prop_curr_parent" + t.name_code]}
                                        <br/>
                                        path : {JSON.stringify(tt.state["prop_curr_path" + t.name_code])}

                                        <div stlye={{clear : "left",}}/>
                                    </div>   
                                

                                    { /* value ; note */}
                                    <div style={{ position : "relative", float : "left",marginLeft : 5 , height : 300}}>
                                        <p style={{margin : 0,padding : 0}}>value</p>                       
                                        <textarea 
                                            style={{ width : undefined }}
                                            value={tt.state["prop_prop_value" + t.name_code]} 
                                            onChange={(e)=>{                    
                                                    var sr={}
                                                    sr["prop_prop_value" + t.name_code]= e.target.value
                                                    tt.setState(sr)
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="value"                                    
                                                    //var us={} ;us[cssv]= e.target.value
                                                    //t.myTree_index.id[id].style=ns
                                                    t.myTree_index.id[id][cssv]=e.target.value                                    
                                                    
                                                    var sr={}
                                                    sr["prop_state_updated" + t.name_code]= new Date()
                                                    tt.setState(sr)            
                                                
                                                }
                                            }}
                                        
                                        /> 
                                        <br/>
                                        
                                        notes : <br/>
                                        <textarea 
                                            style={{ width : 100 }}
                                            value={tt.state["prop_" + "propvars" + "_" + "notes" + t.name_code]} 
                                            defaultValue={""}
                                            onChange={(e)=>{              
                                                    var st={}                      
                                                    st["prop_" + "propvars" + "_" + "notes"+ t.name_code]=e.target.value
                                                    tt.setState(st)
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="notes"   
                                                    var sobj="propvars"                                 
                                                    var us={} ;us[cssv]= e.target.value  // if one value not object  // var us={} ;us[cssv]=parseInt( e.target.value) // if limiting to an int
                                                    //var us={} ;us[cssv]={} // if object

                                                    var ns={...t.myTree_index.id[id][sobj] , ...us }
                                                    t.myTree_index.id[id][sobj]=ns
                                                    //tt.prop.style=ns
                                                    var sr={}
                                                    sr["prop_state_updated" + t.name_code]= new Date()
                                                    tt.setState(sr)  
                                                    
                                                }
                                            }}
                                            />
                                    </div>
                                    
                                    { /* poistion ; padding ; margin ; display */}
                                    <div style={{ position : "relative", float : "left",marginLeft : 5 , height : 300}}>
                                        <h4 style={{margin : 0,padding : 0}} >style</h4>
                                        <p style={{margin : 0,padding : 0,float : "left", }} >position</p>    
                                        <input
                                            style={{ width : 50 }}                                     
                                            value={tt.state["prop_style_position"+ t.name_code]} 
                                            onChange={(e)=>{
                                                    var st={}                      
                                                    st["prop_style_position"+ t.name_code]=e.target.value
                                                    tt.setState(st)                                    
                                                    
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="position"                                    
                                                    var us={} ;us[cssv]= e.target.value
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns

                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]=new Date()
                                                    tt.setState(st)   
                                                    
                                                }
                                            }}
                                        
                                        /> 

                                        <div stlye={{clear : "left",}}/>

                                        <p style={{margin : 0,padding : 0 ,float : "left", }} >padding</p>                       
                                        <input
                                            style={{ width : 20 }}                                   
                                            value={tt.state["prop_style_padding"+ t.name_code]} 
                                            onChange={(e)=>{   
                                                    var st={}                      
                                                    st["prop_style_padding"+ t.name_code]=e.target.value
                                                    tt.setState(st)                                                                           
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="padding"                                    
                                                    var us={} ;us[cssv]=parseInt( e.target.value)
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns

                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]=new Date()
                                                    tt.setState(st)   
                                                }
                                            }}
                                        
                                        /> 
                                        
                                        <div stlye={{clear : "left",}}/>
                                        
                                        <p style={{margin : 0,padding : 0,float : "left", }} >margin</p>                       
                                        <input
                                            style={{ width : 20 }} 
                                            value={tt.state["prop_style_margin"+ t.name_code]} 
                                            onChange={(e)=>{   
                                                    var st={}                      
                                                    st["prop_style_margin"+ t.name_code]=e.target.value
                                                    tt.setState(st)
                                                
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="margin"                                    
                                                    var us={} ;us[cssv]=parseInt( e.target.value)
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns

                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]=new Date()
                                                    tt.setState(st)                                            
                                                }
                                            }}
                                        
                                        /> 
                                        
                                        <div stlye={{clear : "left",}}/>         

                                        <p style={{margin : 0,padding : 0,float : "left" }} >display</p>                       
                                        <input
                                            style={{ width : 35 }} 
                                            value={tt.state["prop_style_display"+ t.name_code]} 
                                            onChange={(e)=>{                                    
                                                    var st={}                      
                                                    st["prop_style_display"+ t.name_code]=e.target.value
                                                    tt.setState(st)                                            
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="display"                                    
                                                    var us={} ;us[cssv]= e.target.value
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns

                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st)                                                               
                                                }
                                            }}
                                        
                                        /> 
                                        
                                        <div stlye={{clear : "left",}}/>                              

                                    </div> 

                                    { /* left , right , top , bottom , */}
                                    <div style={{ position : "relative", float : "left",marginLeft : 5, height : 300 }}>
                                        <p style={{margin : 0,padding : 0, float : "left" }} >left</p>                        
                                        <input 
                                            style={{ width : 20 }}
                                            value={tt.state["prop_style_left"+ t.name_code]} 
                                            onChange={(e)=>{  
                                                    var st={}                      
                                                    st["prop_style_left"+ t.name_code]=e.target.value
                                                    tt.setState(st)                      
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="left"                                    
                                                    var us={} ;us[cssv]=parseInt( e.target.value)
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        /> 

                                        <div stlye={{clear : "left",}}/>

                                        <p style={{margin : 0,padding : 0, float : "left" }} >right</p>
                                        <input 
                                            style={{ width : 20 }}
                                            value={tt.state["prop_style_right"+ t.name_code]} 
                                            onChange={(e)=>{
                                                    var st={}                      
                                                    st["prop_style_right"+ t.name_code]=e.target.value
                                                    tt.setState(st)                                                    
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="right"                                    
                                                    var us={} ;us[cssv]=parseInt( e.target.value)
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        />

                                        <div stlye={{clear : "left",}}/>

                                        <p style={{margin : 0,padding : 0, float : "left" }} >top</p>
                                        <input 
                                            style={{ width : 20 }}
                                            value={tt.state["prop_style_top"+ t.name_code]} 
                                            onChange={(e)=>{
                                                    var st={}                      
                                                    st["prop_style_top"+ t.name_code]=e.target.value
                                                    tt.setState(st)                                           
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="top"                                    
                                                    var us={} ;us[cssv]=parseInt( e.target.value)
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        />

                                        <div stlye={{clear : "left",}}/>
                                            
                                        <p style={{margin : 0,padding : 0, float : "left" }} >bottom</p>
                                        <input 
                                            style={{ width : 20 }}
                                            value={tt.state["prop_style_bottom"+ t.name_code]} 
                                            onChange={(e)=>{
                                                    var st={}                      
                                                    st["prop_style_bottom"+ t.name_code]=e.target.value
                                                    tt.setState(st)                                                
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="bottom"                                    
                                                    var us={} ;us[cssv]=parseInt( e.target.value)
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        />
                                        <div stlye={{clear : "left",}}/>

                                    </div>
                                    
                                    { /* width, height , float , background color  */}
                                    <div style={{ position : "relative", float : "left",marginLeft : 5, height : 300 }}>
                                        <p style={{margin : 0,padding : 0, float : "left" }} >width</p>
                                        <input 
                                            style={{ width : 20 }}
                                            value={tt.state["prop_style_width"+ t.name_code]} 
                                            onChange={(e)=>{
                                                    var st={}                      
                                                    st["prop_style_width"+ t.name_code]=e.target.value
                                                    tt.setState(st)
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="width"                                    
                                                    var us={} ;us[cssv]=parseInt( e.target.value)
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        />

                                        <div stlye={{clear : "left",}}/>

                                        <p style={{margin : 0,padding : 0, float : "left" }} >height</p>
                                        <input 
                                            style={{ width : 20 }}
                                            value={tt.state["prop_style_height"+ t.name_code]} 
                                            onChange={(e)=>{ 
                                                    var st={}                      
                                                    st["prop_style_height"+ t.name_code]=e.target.value
                                                    tt.setState(st)        
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="height"                                    
                                                    var us={} ;us[cssv]=parseInt( e.target.value)
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        />

                                        <div stlye={{clear : "left",}}/>

                                        <p style={{margin : 0,padding : 0, float : "left" }} >float</p>
                                        <input 
                                            style={{ width : 20 }}
                                            value={tt.state["prop_style_float"+ t.name_code]} 
                                            onChange={(e)=>{
                                                    var st={}                      
                                                    st["prop_style_float"+ t.name_code]=e.target.value
                                                    tt.setState(st)
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="float"
                                                    var us={} ;us[cssv]=e.target.value
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        />

                                        <div stlye={{clear : "left",}}/>

                                        <p style={{margin : 0,padding : 0, float :undefined }}>background=color</p>
                                        <input
                                            style={{ width : 100 }}
                                            value={tt.state["prop_style_background"+ t.name_code]} 
                                            onChange={(e)=>{
                                                    var st={}                      
                                                    st["prop_style_background"+ t.name_code]=e.target.value
                                                    tt.setState(st)
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    var cssv="background"
                                                    var us={} ;us[cssv]=e.target.value
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                                return
                                               
                                            }}
                                        
                                        />
                                        <div stlye={{clear : "left",}}/>
                                    </div>
                                    
                                    { /* font size, color  , font  */}
                                    <div style={{ position : "relative", float : "left",marginLeft : 5, height : 300 }}>
                                        
                                        <p style={{margin : 0,padding : 0, float : "left" }} >font-size</p>
                                        <input 
                                            style={{ width : 20 }}
                                            value={tt.state["prop_style_fontSize"+ t.name_code]} 
                                            onChange={(e)=>{  
                                                    var st={}                      
                                                    st["prop_style_fontSize"+ t.name_code]=e.target.value
                                                    tt.setState(st)                            
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="fontSize"                                    
                                                    var us={} ;us[cssv]=parseInt( e.target.value)
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        />                                     

                                        <div stlye={{clear : "left",}}/>

                                        <p style={{margin : 0,padding : 0, float : "left" }} >font-color</p> 
                                        <input 
                                            style={{ width : 20 }}
                                            value={tt.state["prop_style_color"+ t.name_code]} 
                                            onChange={(e)=>{ 
                                                    var st={}                      
                                                    st["prop_style_color"+ t.name_code]=e.target.value
                                                    tt.setState(st)                        
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="color"                                    
                                                    var us={} ;us[cssv]= e.target.value
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        />

                                        <div stlye={{clear : "left",}}/>

                                        <p style={{margin : 0,padding : 0, float : "left" }} >font</p>
                                        <input 
                                            style={{ width : 60 }}
                                            value={tt.state["prop_style_font"+ t.name_code]} 
                                            onChange={(e)=>{        
                                                    var st={}                      
                                                    st["prop_style_font"+ t.name_code]=e.target.value
                                                    tt.setState(st)                        
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="font"                                    
                                                    var us={} ;us[cssv]= e.target.value
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        />  

                                        <div stlye={{clear : "left",}}/>

                                    </div>               

                                    { /* border , border radius, custom css  */}
                                    <div style={{ position : "relative", float : "left",marginLeft : 5 }}>
                                    
                                        <p style={{margin : 0,padding : 0, float : "left" }} >border</p>
                                        <input 
                                            style={{ width : 100 }}
                                            value={tt.state["prop_style_border"+ t.name_code]} 
                                            onChange={(e)=>{      
                                                    var st={}                      
                                                    st["prop_style_border"+ t.name_code]=e.target.value
                                                    tt.setState(st)     
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="border"                                    
                                                    var us={} ;us[cssv]= e.target.value
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        />  

                                        <div stlye={{clear : "left",}}/>

                                        <p style={{margin : 0,padding : 0, float : "left" }} >border-radius</p>
                                        <input 
                                            style={{ width : 20 }}
                                            value={tt.state["prop_style_borderRadius"+ t.name_code]} 
                                            onChange={(e)=>{          
                                                    var st={}                      
                                                    st["prop_style_borderRadius"+ t.name_code]=e.target.value
                                                    tt.setState(st) 
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="borderRadius"                                    
                                                    var us={} ;us[cssv]=parseInt( e.target.value)
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        /> 

                                        <div stlye={{clear : "left",}}/>

                                        <p style={{margin : 0,padding : 0}}>custom css</p>                       
                                        <textarea 
                                            style={{ width : undefined }}
                                            value={tt.state["prop_" + "propvars" + "_" + "customcss"  + t.name_code]} 
                                            defaultValue={ "{\n  \n\n}"  }
                                            onChange={(e)=>{              
                                                    var st={}                      
                                                    st["prop_" + "propvars" + "_" + "customcss" + t.name_code]=e.target.value
                                                    tt.setState(st)
                                                    
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="customcss"   
                                                    var sobj="propvars"                                 
                                                    //var us={} ;us[cssv]= e.target.value  // if one value not object  // var us={} ;us[cssv]=parseInt( e.target.value) // if limiting to an int
                                                    var us={} ;us[cssv]={} // ig pnkrvy
                                                    
                                                    var validateTest="success"
                                                    var newObj={}
                                                    try {
                                                        newObj=JSON.parse(e.target.value)
                                                        us[cssv]=newObj
                                                    } catch (error) {
                                                        validateTest="failed"
                                                    }
                                                    if (validateTest==="failed"){
                                                        alert ('not valid js object or json format!!! eg ... { "prop" : "value", } ...')
                                                        return
                                                    }

                                                    //var ns={...t.myTree_index.id[id][sobj], ...us }
                                                    var ns={...us }
                                                    t.myTree_index.id[id][sobj]=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        /> 
                                        <br/>

                                        <div stlye={{clear : "left",}}/>
                                    </div>
                                    
                                    { /* zIndex , opacity/transparency , linked ID  */}
                                    <div style={{ position : "relative", float : "left",marginLeft : 5 }}>                           
                                    
                                        <div stlye={{clear : "left",}}/>

                                        <p style={{margin : 0,padding : 0, float : "left" }} >Z-index</p>
                                        <input 
                                            style={{ width : 20 }}
                                            value={tt.state["prop_style_" + "zIndex" + t.name_code]} 
                                            onChange={(e)=>{                         
                                                    var nr={}
                                                    nr["prop_style_" + "zIndex" + t.name_code]=e.target.value
                                                    tt.setState(nr)
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="zIndex"                                    
                                                    var us={} ;us[cssv]=parseInt( e.target.value)
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code + t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        /> 

                                        <div stlye={{clear : "left",}}/>
                                        <p style={{margin : 0,padding : 0, float : "left" }} >tranpar/opacity</p>
                                        <input 
                                            style={{ width : 20 }}
                                            value={tt.state["prop_style_" + "opacity" + t.name_code]} 
                                            onChange={(e)=>{                         
                                                    var nr={}
                                                    nr["prop_style_" + "opacity" + t.name_code]=e.target.value
                                                    tt.setState(nr)
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="opacity"                                    
                                                    var us={} ;us[cssv]=parseFloat( e.target.value)
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns
                                                    
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        /> 

                                        <div stlye={{clear : "left",}}/>

                                        <div stlye={{clear : "left",}}/>
                                        <p style={{margin : 0,padding : 0, float : "left" }} >transform</p>
                                        <input 
                                            style={{ width : 20 }}
                                            value={tt.state["prop_style_" + "transform" + t.name_code]} 
                                            onChange={(e)=>{                         
                                                    var nr={}
                                                    nr["prop_style_" + "transform" + t.name_code]=e.target.value
                                                    tt.setState(nr)
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="transform"                                    
                                                    var us={} ;us[cssv]= e.target.value
                                                    var ns={...t.myTree_index.id[id].style, ...us }
                                                    t.myTree_index.id[id].style=ns                                                
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        /> 

                                        <div stlye={{clear : "left",}}/>

                                        <p style={{margin : 0,padding : 0}}>remote tab onClick</p>                       
                                        <input
                                            style={{ width : 100 }}
                                            value={tt.state["prop_" + "propvars" + "_" + "remTablinked_code"  + "_" + "onClick"  + t.name_code]} 
                                            defaultValue={""}
                                            onChange={(e)=>{              
                                                    var st={}                      
                                                    st["prop_" + "propvars" + "_" + "remTablinked_code" + "_" + "onClick"  +  t.name_code]=e.target.value
                                                    tt.setState(st)
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="remTablinked_code"  + "_" + "onClick" 
                                                    var sobj="propvars"                                 
                                                    var us={} ;us[cssv]= e.target.value  // if one value not object  // var us={} ;us[cssv]=parseInt( e.target.value) // if limiting to an int
                                                    //var us={} ;us[cssv]={} // if object

                                                    var ns={...t.myTree_index.id[id][sobj], ...us }
                                                    t.myTree_index.id[id][sobj]=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        /> 
                                        <br/>

                                        <div stlye={{clear : "left",}}/>
                                        <p style={{margin : 0,padding : 0}}>linked ID onClick</p>                       
                                        <input
                                            style={{ width : 100 }}
                                            value={tt.state["prop_" + "propvars" + "_" + "linkedID_code" + "_" + "onClick"  + t.name_code]} 
                                            defaultValue={""}
                                            onChange={(e)=>{              
                                                    var st={}                      
                                                    st["prop_" + "propvars" + "_" + "linkedID_code" + "_" + "onClick"  + t.name_code]=e.target.value
                                                    tt.setState(st)
                                                }
                                                
                                            }

                                            onBlur={(e)=>{
                                                var id=tt.state["prop_curr_id" + t.name_code]
                                                var obj=t.myTree_index.id[id]
                                                if (!isUn(obj)){
                                                    //obj.style.background=e.target.value
                                                    var cssv="linkedID_code" + "_" + "onClick"
                                                    var sobj="propvars"                                 
                                                    var us={} ;us[cssv]= e.target.value  // if one value not object  // var us={} ;us[cssv]=parseInt( e.target.value) // if limiting to an int
                                                    //var us={} ;us[cssv]={} // if object

                                                    var ns={...t.myTree_index.id[id][sobj], ...us }
                                                    t.myTree_index.id[id][sobj]=ns
                                                    //tt.prop.style=ns
                                                    
                                                    var st={}                      
                                                    st["prop_state_updated"+ t.name_code]= new Date()
                                                    tt.setState(st) 
                                                }
                                            }}
                                        
                                        /> 
                                        <br/>

                                        <div stlye={{clear : "left",}}/>

                                    
                                    </div>

                                </div>
                        
                    )
                
                //////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////

                d2.ret_E=ret_E

                return ret_E

            },

            text_fn : function(d1 ,d2, tt , t){
                var tt=d1.tt
                var t=d1.t
                
                if (isUn(tt.state)){
                    tt={ state : t.sstate}
                }
                
                var ret_E=d2.ret_E

                //////////////////////////////////////////////////////////
                /////////////////// your code here ///////////////////////
                var text= `<div style={${JSON.stringify(t.myTree.style) }} >\n\n` + d1.text + "\n\n</div>"
                
                ret_E=<textarea style={t.styles.text.main} value={text} onChange={(e)=>{}} />
                t.text=text

                //////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////

                d2.ret_E=ret_E

                return ret_E
            }


        }, 
    }
    createTreeInstance=()=>{
        let tt=this
        let tmp="ht"
        tt.global_trees[tmp]={}
        tt.global_trees[tmp].tree=new $gl.tree_template_O({this : tt , inst : tt.tree_instances[tmp + "_tree_Inst"]})
    }

    render(){
        let tt=this

        tt.global_trees["ht"].tree.render()

        return (
            <div>
                <div style={{ float : "left"}}>
                    {tt.global_trees["ht"].tree.components_E}
                </div>
                
                <div style={{ float : "left"}}>
                    {tt.global_trees["ht"].tree.layout_E}
                </div>
                <div style={{ float : "left"}}>
                    
                </div>

                <div style={{ float : "left"}}>
                    {tt.global_trees["ht"].tree.myTree_E}
                    {tt.global_trees["ht"].tree.text_E}
                </div>                                
                <div style={{clear : "left"}} />
                <div>
                    {tt.global_trees["ht"].tree.props_E}                    
                </div>
            </div>
        )
    }

}