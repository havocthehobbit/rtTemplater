import { v4 as uuid } from 'uuid';

let $cn=require("../common/libNative").$cn
let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb
let feach=$cn.each

export const $gl={}

$gl.uuid=uuid

let  main_loop_tree=function( l_obj,l_extra_data, l_cb){ // rt's generic recursion fn
    
    var l_E=[] // used to generate react element objects that can be rendered
    var txt="" // for building text trees , can be used to convert json to xml or to html or to some other text format
    var ntd=[] // for biuilding new tree formats ,helps with converting tree data or transposing from one format to another                
    if (isUn(l_extra_data)){
        l_extra_data={}
    }
    l_extra_data.cancel_all=false

    if (isUn(l_extra_data.lvl)){
        l_extra_data.lvl=0
    }else{
        l_extra_data.lvl++
    }

    
    l_extra_data.cancel=false
    if (!l_obj.children){
        l_obj.children=[]    
    }
    l_obj.children.forEach(function(r,i){                                
        if (l_extra_data.cancel){ // cancel last iteration
            return;
        }
        if(l_extra_data.cancel_all){
            return;
        }

        var par=l_obj // set parent, that can be used by children call backs

        var ret_temp_lE=main_loop_tree( r ,l_extra_data, l_cb  ) // children
        var new_L_Eobj=l_cb( r ,i, ret_temp_lE.E ,ret_temp_lE.txt, ret_temp_lE.ntd,l_extra_data, par)
        
        if (l_extra_data.cancel){ // cancel last iteration
            return;
        }
        if(l_extra_data.cancel_all){
            return;
        }

        if ( new_L_Eobj.success ){
            l_E.push(new_L_Eobj.E)
            txt+=new_L_Eobj.txt                        
            ntd.push(new_L_Eobj.treedata)
        }
    })

    l_extra_data.children_orig=l_obj.children
    

    l_extra_data.lvl--
    return { E :l_E , txt : txt, new_tree : ntd   }
}
$gl.main_loop_tree=main_loop_tree


let  tree_template_O=function(){
    var tt=this
    var obj={            
        tt : tt,
        extended : {},
        myTree_E : undefined,
        props_E : undefined,
        components_E : undefined,
        layout_E : undefined,
        text_E : undefined,
        name : "",
        name_code : "_ht_tree_",
        desc : "",
        temp : {},
        sstate : { forceUpdate : function(){ var cb=()=>{}; if (!isUn(arguments[0])){cb=arguments[0]} ; cb() },setState: function(){ var cb=()=>{}; if (!isUn(arguments[1])){cb=arguments[1]} ; cb() }},
        states : {
            prop_curr_id : "0",
            prop_curr_parent : "0",
            tree_expanded_paths : [["root"]],
            tree_current_select_type : "cmpt",
            tree_panel_filter_txt : "",
            prop_curr_id_child : "",
        },
        set_states_init : function(){
            var tt=this.tt
            var t=this
            let st={}
            feach(t.states,(v,p)=>{
                st[ p + t.name_code]=v  
                tt.state[ p + t.name_code]=v                    
            })
            
        },

        text : "",
        
        myTree : {
            "children" : [], 
            "name" : "root",          
            "id" : "0" ,
            "style" : {}  
        },
        myTree_index : {},      
        
        component_mode : "addtotree",
        modes : ["addtotree","select_tool"],
        component_mode_selected_tool : "",
        component_selected_catagory : "code",
        component_catagories : [{ name : "code" ,  code : ""}],

        save_data : {},
        loaded_data : {},

        add_cmpt_to_tree : function(){
            var tt=this.tt
            var t=this
            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }

            var args=arguments;
            var argsl=args.length;
    
            var params={}
            var p=params;
    
            var cb=()=>{}
    
            if (argsl > 0){
                if (isOb(args[0]) ){
                    params={...params, ...args[0] }
                    p=params
                }           
                
                
                if (tof(args[0])==="string"){
                    params.type=args[0]    
                    p=params            
                }
                if (argsl>1){
    
                    if (tof(args[1])==="string"){
                        params.parent=args[1]
                        p=params      
                    }
                    if (tof(args[1])==="function"){
                        cb=args[1]
                    }
    
                }            
        
            }

            var c
            
            c=new t.components_O(p)

            var path=[ "root" ] ;
            var parent="0" ;
    
            var selected_parent="0"
            var parent_obj={}

            if (isUn(p.parent) ){
                selected_parent=tt.state["prop_curr_parent" + t.name_code]
                parent=selected_parent
                
                
                if (tt.state["tree_current_select_type" + t.name_code]==="cmpt"){
                    parent_obj=t.myTree_index.id[parent]
                }
                if (tt.state["tree_current_select_type" + t.name_code]==="child"){
                    parent_obj=t.myTree_index.id[tt.state["prop_curr_id" + t.name_code]]
                    selected_parent=tt.state["prop_curr_id" + t.name_code]
                    parent=selected_parent
    
                }
            }else{
                selected_parent=p.parent
                parent=selected_parent                
                //if (tt.state["tree_current_select_type" + t.name_code]==="cmpt"){
                //    parent_obj=t.myTree_index.id[parent]
                //}
                //if (tt.state["tree_current_select_type" + t.name_code]==="child"){
                    //parent_obj=t.myTree_index.id[tt.state["prop_curr_id" + t.name_code]]
                    parent_obj=t.myTree_index.id[p.parent]
                    //selected_parent=tt.state["prop_curr_id" + t.name_code]
                    selected_parent=p.parent
                    parent=selected_parent
    
                //}


            }


            c.parent=parent;
            
            var name=c.name;
            if (!isUn(t.myTree_index.name[c.name])){ // check if name exists and assign it a increment
                t.myTree_index["__schema__name"].cnt++ // keeps the counter to use for unique naming
                name=c.name + "_" + t.myTree_index["__schema__name"].cnt
                t.myTree_index.name[name]={ name : c.name , id : c.id }            
            }else{
                t.myTree_index["__schema__name"].cnt++
                t.myTree_index.name[c.name]={ name : c.name , id : c.id }
                
            }

            c.name=name

            t.myTree_index.id[c.id]=c ;
    
            if (selected_parent==="0"){
                t.myTree.children.push(c)
                path.push( c.name)
                c.path=path;
            }else{
                parent_obj.children.push(c)
    
                path.push( c.name)
                path=[ ...parent_obj.path]
                path.push( c.name)
                c.path=path;
            }

            if (!isUn(p.children)){
                p.children.forEach((r,i)=>{
                    r.parent=c.id
                    t.add_cmpt_to_tree(r)
                })
            }

            tt.forceUpdate(()=>{
                cb()
            });


        },
        component_click : function(){
            //var tt=this.tt
            var t=this

            var args=arguments
            //var argsl=args.length
            
            if (t.component_mode==="addtotree"){
                t.add_cmpt_to_tree(args[0])
            }
            
        },
        component_set_catagory : function(){
            var tt=this.tt
            var _this=this

            if (isUn(tt.state)){
                tt={ state : _this.sstate}
            }

            var args=arguments;
            //var argsl=args.length;

            _this.component_selected_catagory=args[0]
            tt.forceUpdate()

        },

        delfromtree : function(){
            var tt=this.tt
            var t=this

            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }

            var args=arguments
            var argsl=args.length

            var cb=()=>{}
            if (argsl > 1){
                if ( args[1] ){ if (tof(args[1] )==="function"){ cb=args[1]}  }
            }

            var id="0"

            if (tof(args[0])==="string"){
                id=args[0];
            }

            //t.curr=id

            var tree_arr_2E=[]
            var some_extra_data_to_play_with={tmp_code_child_ret : ""}
            tree_arr_2E=t.main_loop( t.myTree ,some_extra_data_to_play_with , function(r,i , l_E ,l_txt, l_ntd,extra , par){
                var ret_E
                var ret_treeData // can be used the same ret_E , to create new tree data for conversion tree structures
                var ret_status=true
                var tmp_code=""
                
                //////////////////////////////////////////////////////////

                if (isUn(extra.tmp_code_child_ret)){
                    extra.tmp_code_child_ret=""
                }                

                //////////
                
                if (id==="0"){
                    t.myTree={...t._template_myTree}
                    t.myTree_index={...t.schemas.myTree_index.template}
                    t.myTree_index.tt=t
                    t.myTree_index.init()
                }else{
                
                    if (r.id===id){
                        par.children.splice( i ,1)
                        delete t.myTree_index.id[id]
                        delete t.myTree_index.name[r.name]                            
                    }
                }
                
                ////////////////
                
                return { E : ret_E , success : ret_status , txt : tmp_code , tree_data : ret_treeData }
            })

            tt.forceUpdate(()=>{
                cb();
            });

        },

        onClick_item : undefined,
        
        propvars__custdyn : {},
        propvars__custdyn__groups : {},
        propvars__custdyn__links : {},
        calc_dynvars : function(r,recID , recName , cb_l){
            var tt=this.tt
            var t=this

            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }
            var has_remotetab_linkID=false
            if (isUn(cb_l)){
                cb_l=()=>{}
            }
            
                //nrbt1 linkname
            //if (!_.isEmpty(recID)){
            if (Object.keys(recID).length !== 0){
                //nrbt_li.value=r.propvars__custdyn__links.id
                //linked_value=recID
                has_remotetab_linkID=true
            }
            
        

            // set main value to linked
            if (has_remotetab_linkID){ // #todo ,this needs to also go into the render layout
                
                if (!isUn(t.propvars__custdyn[recID])){
                    var linkedremObjIDo=t.propvars__custdyn[recID]
                    var linkedremObjID=linkedremObjIDo.source_cmpt_id
                    //var linkedremObjPropname=linkedremObjID[]

                    if (!isUn(t.myTree_index.id[linkedremObjID])){
                        var linkedremObj=t.myTree_index.id[linkedremObjID]                                                                                                         
                        //r.value=linkedremObj.value
                        var par_prop_root_name="par_prop_root_name"
                        var par_prop="par_prop"
                        if (!isUn(linkedremObj[ linkedremObjIDo[par_prop_root_name] ])){
                            if (!isUn(linkedremObj[ linkedremObjIDo[par_prop_root_name] ][linkedremObjIDo[par_prop]])){
                                
                                var tmp_par_prop_root_name=linkedremObjIDo[par_prop_root_name]
                                var temp_par_prop=linkedremObjIDo[par_prop]
                                
                                var dest_par_prop_root_name=r.propvars__custdyn__links[recName].par_prop_root_name
                                var dest_par_prop=r.propvars__custdyn__links[recName].varname
                                //"___attributes___varname"
                                //par_prop_root_name : "attributes"
                                //varname : "varname"                                        
                                var ret_r={
                                    linkedremObjIDo : linkedremObjIDo,
                                    linkedremObj : linkedremObj,

                                    dest_par_prop_root_name :dest_par_prop_root_name,
                                    dest_par_prop :dest_par_prop,

                                    tmp_par_prop_root_name :tmp_par_prop_root_name,
                                    temp_par_prop :  temp_par_prop,
                                }
                                //r[dest_par_prop_root_name][dest_par_prop]=linkedremObj[tmp_par_prop_root_name][temp_par_prop]
                                cb_l(ret_r)

                            }
                        }
                    //nrbt0.value=linkedremObj[nrbt0.propparentprop][nrbt0.name]
                    ///////////linked_curr_updated_value=linkedremObj[nrbt0.propparentprop][nrbt0.name]
                        //obj[nrbt0.propparentprop][nrbt0.name]=linkedremObj[nrbt0.propparentprop][nrbt0.name]
                    }
                }
            }
        },

        props : {
            name : "properties",
            type : "panel",
            subtype : "",
            subtypes : [],
            path : "",
            parent : "",
            tt : undefined,
            t_myTreeO : undefined,
            curr : "",
            value : "",
            style :{},
            attributes :{},
            propvars :{},
            propvars__custdyn__haslinks : false,
            propvars__custdyn : {},
            propvars__custdyn__links : {},
            propvars__custdyn__groups : {},
            propvars__custdyn__order : [],

            set_curr : function(){
                var t_main_reactcomponent=this.tt // 
                var t=this.t_myTreeO // 
                var tt=this
                
                if (isUn(t_main_reactcomponent.state)){
                    t_main_reactcomponent={ state : t.sstate}
                }
    
                var args=arguments
                var argsl=args.length
                
                var cb=()=>{}
                if (argsl > 1){
                    if ( args[1] ){ if (tof(args[1] )==="function"){ cb=args[1]}  }
                }
    
                var id="0"
    
                if (tof(args[0])==="string"){
                    id=args[0];
                }
    
                var nst={}
               
                tt.curr=id
               
                tt.name=t.myTree_index.id[id].name
                tt.type=t.myTree_index.id[id].type
                tt.subtype=t.myTree_index.id[id].subtype
                tt.subtypes=t.myTree_index.id[id].subtypes
                tt.parent=t.myTree_index.id[id].parent
                tt.path=t.myTree_index.id[id].path
                tt.value=t.myTree_index.id[id].value
                //tt.propvars__custdyn__haslinks=t.myTree_index.id[id].propvars__custdyn__haslinks
                
                
                //tt.style.background=t.myTree_index.id[id].style.background
                tt.style={...t.myTree_index.id[id].style}
                tt.attributes={...t.myTree_index.id[id].attributes}
                tt.propvars={...t.myTree_index.id[id].propvars}
                tt.propvars__custdyn={...t.myTree_index.id[id].propvars__custdyn}
                tt.propvars__custdyn__links={...t.myTree_index.id[id].propvars__custdyn__links}
                tt.propvars__custdyn__groups={...t.myTree_index.id[id].propvars__custdyn__groups}
                

                
                
               
                //if (!).isUndefined){
                    
                   // tt.style_background=prop_style_background
                //}
                
                nst["prop_curr_name" + t.name_code]=tt.name
                nst["prop_curr_id" + t.name_code]=tt.curr
                nst["prop_curr_type" + t.name_code]=tt.type
                nst["prop_curr_subtype" + t.name_code]=tt.subtype
                nst["prop_curr_subtypes" + t.name_code]=tt.subtypes                
                nst["prop_curr_parent" + t.name_code]=tt.parent
                nst["prop_curr_path" + t.name_code]=tt.path
                nst["prop_prop_value" + t.name_code]=tt.value 
                
                                                
    
                // initialised t.schemas.myTree_index.template
                feach(t.myTree_index.id[id].style,(v,p)=>{
                    var us={} ;us[p]=v
                    var ns={...tt.style , ...us }
                    tt.style=ns              
                    nst["prop_style_" + p + t.name_code]=tt.style[p]
                })
    
    
                feach(t.myTree_index.id[id].attributes,(v,p)=>{
                    var us={} ;us[p]=v
                    var ns={...tt.attributes , ...us }
                    tt.attributes=ns
                  
                    nst["prop_attributes_" + p + t.name_code]=tt.attributes[p]
                })

                feach(t.myTree_index.id[id].propvars,(v,p)=>{
                    var us={} ;us[p]=v
                    var ns={...tt.propvars , ...us }
                    tt.propvars=ns
                  
                    nst["prop_propvars_" + p + t.name_code]=tt.propvars[p]
                })
              
                var tmp="propvars__custdyn"
                feach(t.myTree_index.id[id][tmp],(v,p)=>{
                    var us={} ;us[p]=v
                    var ns={...tt[tmp] , ...us }
                    tt[tmp]=ns
                  
                    nst["prop_" + tmp + p + t.name_code]=tt[tmp][p]
                })

                var tmp="propvars__custdyn__links"
                feach(t.myTree_index.id[id][tmp],(v,p)=>{
                    var us={} ;us[p]=v
                    var ns={ ...tt[tmp] , ...us }
                    tt[tmp]=ns
                  
                    nst["prop_" + tmp + p + t.name_code]=tt[tmp][p]
                })

                var tmp="propvars__custdyn__groups"
                feach(t.myTree_index.id[id][tmp],(v,p)=>{
                    var us={} ;us[p]=v
                    var ns= { ...tt[tmp] , ...us }
                    tt[tmp]=ns
                  
                    nst["prop_" + tmp + p + t.name_code]=tt[tmp][p]
                })
               
                t_main_reactcomponent.setState( 
                     nst,
                    function(){
                        cb()
                    }
                )
            },

            init : function(){

            }
        },
        
        schemas : {
            myTree : {
                schema : {
                },
                template : {
                    "children" : [], 
                    "name" : "root",
                    "id" : "0" ,
                    "style" : {},  
                    "attributes" : {},
                    "propvars" : {},
                    "propvars__custdyn" : {},
                    "propvars__custdyn__links": {},
                    "propvars__custdyn__groups": {},
                      
                }
            },
            myTree_index : {
                template : {
                    tt : undefined,
                    id : { "0" : undefined  },
                    path : {},
                    name : {},

                    "__schema__id" : {
                        name : "id",
                        format : "uuid",
                        desc : "used to retrieve instance by id",
                        schema  : {
                        }
                    },

                    "__schema__path" : {
                        name : "path",
                        format : "uuid",
                        desc : "used to retrieve instance by path",
                        schema  : {
                        }
                    },


                    "__schema__name" : {
                        name : "name",
                        format : "uuid",
                        desc : "used to find duplicate or rename with a counter",
                        cnt : 0,
                        schema  : {
                            name : "",
                            id : "",               
                        }
                    },

                    init : function(){
                        var t=this.tt // main react object element
                        var tt=this
                        
                        tt.id["0"]=t.myTree
                    }
                }
            }
        },

        styles : { 
                components : { 
                    main : {},
                    p : { background : "white" ,color : "black", padding : undefined ,margin : 3 , cursor : "pointer" }  
                },
                components_groups : { 
                    main : {},
                    p : { background : "white" ,color : "black", padding : undefined ,margin : 3 , cursor : "pointer",borderRadius :6 }
                },
                props : {
                        main : { position : "relative",background : "lightgrey" ,color : "black" , overflow : "auto",width : "100%", 
                        height : 400, textAlign : "left", paddingLeft :10 , fontSize : 13
                    }

                },
                myTree : {
                    main : { position : "relative",background : "lightgrey" ,color : "black" , overflow : "auto",width : 400, height : 350,padding : 10}
                },
                layout : {
                    main : {position : "relative", width : 800,padding : 15, background : "black",border : "thin solid grey", color : "black", fontSize : 13, height : 300 ,overflow : "auto"},

                },
                text : {
                    main : {}
                }
            },

        
            components : { 
            all : [                                        
                { name : "newline" , cat : "code" ,tc_code : "newline"},
                { name : "function" , cat : "code" ,tc_code : "function"},
               
            ],
        },
        
        components_O : function(){
            //var tt=this.tt
            //var t=this

            var inst={
                name : "new_cmpt", // should be unique per a parent
                type : "button",
                subtype : "",
                subtypes : [],
                desc : "desc",
                value : "",
                value_type : "string" ,
                id : "0",
                style : {},
                propvars : {},
                propvars__custdyn__haslinks : false,
                propvars__custdyn : {},
                propvars__custdyn__groups : {},
                propvars__custdyn__links : {},
                propvars__custdyn__order : [],
                attributes : {},
                class : [],
                parent : "",
                path : ["root"],
                children : [],
                children_temp : [],
                inputs : [],
                outputs : [],
                tags : [],
                init : function(){
                    var args=arguments
                    var argsl=arguments.length
                    var t=inst
    
                    //var params={}
                    
                    var id=""
                    if (argsl>0){
                        if (isOb(args[0])){
                            var a=args[0];
                            if (!isUn(a.type)){
                                t.type=a.type
                            }
    
                            var temp="parent"
                            if (!isUn(a[temp])){
                                t[temp]=a[temp]
                            }
    
                            //var temp="name"
                            if (!isUn(a[temp])){
                                t[temp]=a[temp]
                            }

                            //var temp="children_temp"
                            if (!isUn(a[temp])){
                                t[temp]=a[temp]
                            }                           
                           

                            //var temp="id"
                            if (!isUn(a[temp])){
                                id=a[temp]
                            }
                            
    
                            
    
                        }else{
                            t.type=args[0]
                            if (argsl >0){
                                t.parent=args[1]
                                
                            }
                            if (argsl >1){
                                t.name=args[2]
                            }
                        }
                    }
                    
                    if (id===""){
                        t.id=$gl.uuid()
                    }else{
                        t.id=id
                    }

    
                    return t;
                }
            }
    
            inst=inst.init.apply(this, arguments)
            return  inst
        },

        components_fn : function(){
            var tt=this.tt
            var t=this

            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }

            var main_tool_E=[]
            var tools_cat_E=[]

            t.components.all.forEach((r,i)=>{

                if (r.cat===t.component_selected_catagory){
                    main_tool_E.push(
                        <p  
                            key={i}
                            style={t.styles.components_groups.p} 
                            tc_code={r.tc_code}
                            onClick={(e)=>{
                                    var tc_code=e.target.getAttribute("tc_code")
                                    var obj
                                    var found=false
                                    t.components.all.forEach((r1,i1)=>{
                                        if (r1.tc_code===tc_code){
                                            if (!isUn(r1.params)){                                                
                                                found=true

                                                obj={...r1.params}

                                                if (isUn(r1.params.type)){
                                                    obj.type=tc_code
                                                }

                                            }
                                            

                                        }
                                    })
                                    if (found){                                        
                                        t.component_click(obj)
                                    }else{
                                        t.component_click(e.target.getAttribute("tc_code"))
                                    }
                                    
                                }
                            }
                        >
                            {r.name}
                        </p>
                
                    )
                        }
            })

            t.component_catagories.forEach((r,i)=>{
                tools_cat_E.push(
                    
                    <p 
                        key={i}
                        style={t.styles.components_groups.p} 
                        cat={r.code}
                        onClick={(e)=>{
                                    t.component_set_catagory(e.target.getAttribute("cat"))
                            }
                        }
                    >
                        {r.name}
                    </p>
                
                )
            })

            t.components_E= (
                <>
                    <div                            
                        onClick={(e)=>{
                            tt.setState({})
                        }}
                    >                            
                        <h3 style={{paddingTop : 2, marginTop : 2}}>components</h3>
                    </div>
                    
                    <div style={t.styles.components.main}>   
                        <div
                            style={{ position : "relative", float : "left", width : 45,fontSize : 12}} 
                        >                      
                            {tools_cat_E}
                        </div>                                             
                        
                        <div
                            style={{ position : "relative", float : "left", width : 70,fontSize : 14 }}
                        >
                            {main_tool_E}
                        </div>
                            
                        <div
                            style={{ position : "relative", float : "left", width : 105,fontSize : 12, border : "solid thin lightgrey"}} 
                        >
                            
                        </div>                                             
                        <div style={{ clear : "left" }} />                                             
                    </div>
            </>
            )

        },
        props_fn_2 : function(d1 , d2){
            var tt=d1.tt
            var t=d1.t
            
            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }

            var prop_attributes_varname=d1.prop_attributes_varname
            var ret_E=d2.ret_E
            
            //////////////////////////////////////////////////////////
            /////////////////// your code here ///////////////////////

            ret_E=(

                <div style={{ position : "relative", float : undefined , fontSize : 11 }}>

                            
                    <div style={{ position : "relative", float :undefined, marginLeft : 5 , height : undefined }}>
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
                
                    <div style={{ position : "relative", float : undefined,marginLeft : 5 , height : undefined}}>
                        <h4 style={{margin : 0,padding : 0}} >Attributes</h4>
                        <p style={{margin : 0,padding : 0,float : "left", }} >{"var name : "}</p>    
                        <input
                            style={{ width : 50 }}                                     
                            value={prop_attributes_varname} 
                            
                            onChange={(e)=>{
                                    var sr={}
                                    sr["prop_attributes_varname" + t.name_code]= e.target.value
                                    tt.setState(sr)                                             
                                }                                        
                            }

                            onBlur={(e)=>{
                                var id=tt.state["prop_curr_id" + t.name_code]
                                var obj=t.myTree_index.id[id]
                                if (!isUn(obj)){                                            
                                    var cssv="varname"                                    
                                    var cssv_ob="attributes"                                    
                                    var us={} ;us[cssv]= e.target.value
                                    var ns={...t.myTree_index.id[id][cssv_ob] , ...us }
                                    t.myTree_index.id[id][cssv_ob]=ns
                                    
                                    var sr={}
                                    sr["prop_state_updated" + t.name_code]= new Date()
                                    tt.setState(sr)               
                                    
                                }
                            }}
                        
                        /> 

                        <div stlye={{clear : "left",}}/>

                                                

                    </div> 
                                            
                    <div style={{ position : "relative", float : undefined ,marginLeft : 5 , height : 300}}>
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
                    
                                    var cssv="value"                                    
                    
                                    t.myTree_index.id[id][cssv]=e.target.value     
                                    
                                    var sr={}
                                    sr["prop_state_updated" + t.name_code]= new Date()
                                    tt.setState(sr)
                                }
                            }}
                        
                        /> 
                        <br/>
                        
                        notes : <br/><textarea value={tt.state["prop_note_txt" + t.name_code]} onChange={(e)=>{ 
                            var sr={}
                            sr["prop_note_txt" + t.name_code]= e.target.value
                            tt.setState(sr)

                            
                        }}/>
                    </div>
                    
                    

                </div>
            )
            
            //////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////
            d2.ret_E=ret_E

            return ret_E

        },
        props_fn : function(){
            var tt=this.tt
            var t=this
            
            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }

            //var e_E=[]
            var prop_attributes_varname=tt.state["prop_attributes_varname" + t.name_code]
            if (isUn(prop_attributes_varname)){
                prop_attributes_varname=""
            } 

            var d1={ 
                    tt : tt, 
                    t : t ,
                    prop_attributes_varname : prop_attributes_varname
            }

            var ret_E=undefined

            var d2={ ret_E : ret_E }

            t.props_fn_2(d1 , d2,tt,t)

            t.props_E=( 
                <div style={t.styles.props.main}>
                    {d2.ret_E}
                  
                </div>
            )
                          
        },

        layout_fn_2 :  function(){},
        layout_fn : function(){
            var args=arguments
            var argsl=args.length
            var tt=this.tt
            var t=this

            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }

            var using_default=true
            var data={}
            var some_extra_data_to_play_with={tmp_code_child_ret : ""}

            if (argsl>0){
                if (isOb(args[0])){
                    var a0=args[0]
                    if (!isUn(a0.data)){
                        data=a0.data
                        using_default=false
                    }else{
                        console.log("argument 0 ,is an object that requires a data variable member named data eg --> layout_fn( {data : {} })")
                    }

                    if (!isUn(a0.some_extra_data_to_play_with)){
                        some_extra_data_to_play_with=a0.some_extra_data_to_play_with
                    }

                }else{
                    data=t.myTree    
                }
            }else{
                // defualt is this tree
                data=t.myTree
            }
            
            ///////////////////////////////////////////

            var temp=t.main_loop(data ,some_extra_data_to_play_with,function(r,i , l_E ,l_txt, l_ntd,extra , par){
                var ret_E
                var ret_treeData // can be used the same ret_E , to create new tree data for conversion tree structures
                var ret_status=true
                var tmp_code=""
                
                //////////////////////////////////////////////////////////

                if (isUn(extra.tmp_code_child_ret)){
                    extra.tmp_code_child_ret=""
                }

                var indent=function(){
                    var ret="\t" // starting off with a root tab space, make it blank if you dont want and initial tab
                    for (let index = 0; index < extra.lvl ; index++) {
                        ret+="\t"                        
                    }

                    return ret
                }()

                

                //////////////////////////////////////////////////////////
                    // main loop actions
                    var tempfn_data1={
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

                    var tempfn_data2={                            
                        ret_E : ret_E,
                        ret_status : ret_status,
                        tmp_code : tmp_code,
                        ret_treeData : ret_treeData,
                    }

                    t.layout_fn_2(tempfn_data1 , tempfn_data2 , tt , t)

                    ret_E=tempfn_data2.ret_E
                    ret_status=tempfn_data2.ret_status  
                    tmp_code=tempfn_data2.tmp_code 
                    ret_treeData=tempfn_data2.ret_treeData

           
                ////////////////
                            
                return { E : ret_E , success : ret_status , txt : tmp_code , tree_data : ret_treeData }
            })

            t.text=temp.txt
            
            var layout_E=(
                <div
                    style={t.styles.layout.main}
                >   
                    <div
                        style={t.myTree.style}
                    >
                        {temp.E}
                    </div>
                    
                </div>
            )
            if (using_default){
                t.layout_E=layout_E
            }else{
                return {
                    E : temp.E,
                    temp : temp,
                    layout_E : layout_E
                }
            }
            

            
        },
        text_fn_2 :  undefined,
        text_fn : function(){
            var tt=this.tt
            var t=this

            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }

            if (isUn(t.text_fn_2)){
                t.text_E=<textarea style={t.styles.text.main} value={t.text} onChange={(e)=>{}} />
            }else{
                var d1={ 
                    tt : tt, 
                    t : t , 
                    text : t.text                  
                }

                var ret_E=undefined

                var d2={ ret_E : ret_E }

                t.text_fn_2(d1 , d2)

                t.text_E=d2.ret_E
            }


        },

        main_loop : function( l_obj,extra_data, cb){ // rt's generic recursion fn
            var tt=this.tt
            var t=this

            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }

            var l_E=[] // used to generate react element objects that can be rendered
            var txt="" // for building text trees , can be used to convert json to xml or to html or to some other text format
            var ntd=[] // for biuilding new tree formats ,helps with converting tree data or transposing from one format to another                
            if (isUn(extra_data)){
                extra_data={}
            }
            extra_data.cancel_all=false
    
            if (isUn(extra_data.lvl)){
                extra_data.lvl=0
            }else{
                extra_data.lvl++
            }
    
            
            extra_data.cancel=false
            if (!l_obj.children){
                l_obj.children=[]    
            }
            l_obj.children.forEach(function(r,i){                                
                if (extra_data.cancel){ // cancel last iteration
                    return;
                }
                if(extra_data.cancel_all){
                    return;
                }
    
                var par=l_obj // set parent, that can be used by children call backs
    
                var ret_temp_lE=t.main_loop( r ,extra_data, cb  ) // children
                var new_L_Eobj=cb( r ,i, ret_temp_lE.E ,ret_temp_lE.txt, ret_temp_lE.ntd,extra_data, par)
                
                if (extra_data.cancel){ // cancel last iteration
                    return;
                }
                if(extra_data.cancel_all){
                    return;
                }
    
                if ( new_L_Eobj.success ){
                    l_E.push(new_L_Eobj.E)
                    txt+=new_L_Eobj.txt                        
                    ntd.push(new_L_Eobj.treedata)
                }
            })
    
            extra_data.children_orig=l_obj.children
            
    
            extra_data.lvl--
            return { E :l_E , txt : txt, new_tree : ntd   }
        },
        tree_fn : function(){ // tree
            var tt=this.tt
            var t=this

            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }


            /////////////////////////////////////////////

            var def_bg_col="transparent"
            var def_col="black"
            var sel_bg_col="yellow"
            //var sel_col="black"

            var cs_col=def_col;
            var cs_bgcol=def_bg_col;

            var def_bg_col_child="transparent"
            //var def_col_child="black"
            var sel_bg_col_child="orange"
            
            //var cs_col_child=def_col_child;
            var cs_bgcol_child=def_bg_col_child;
            var is_child_expanded=false;

            var some_extra_data_to_play_with={tmp_code_child_ret : ""}

            var temp=t.main_loop(t.myTree ,some_extra_data_to_play_with,function(r,i , l_E ,l_txt, l_ntd,extra , par){
                var ret_E
                var ret_treeData // can be used the same ret_E , to create new tree data for conversion tree structures
                var ret_status=true
                var tmp_code=""
                
                //////////////////////////////////////////////////////////

                if (isUn(extra.tmp_code_child_ret)){
                    extra.tmp_code_child_ret=""
                }
                //////////////////////////////////////////////////////////

                var found=false

                if (  r.name.toLowerCase().includes( tt.state["tree_panel_filter_txt" + t.name_code ].toLowerCase()) ){
                    found=true;
                }

                if ( r.type.toLowerCase().includes( tt.state["tree_panel_filter_txt" + t.name_code ].toLowerCase())){
                    found=true;
                }

                if(tt.state["tree_panel_filter_txt" + t.name_code ]===""){
                    //var found=true
                }       

                var xpp=[...tt.state[ "tree_expanded_paths" + t.name_code ] ]

                // is expanded
                var temp_obj_path_s_is_ex=JSON.stringify(r.path).toString()
                //xpp.forEach(function(rx1,ix1){ // need to build up , get this  object ID's path and compare tit to the tree path , not iterate through each as this is a bug that prevents closure
                feach(xpp ,function(rx1,ix1){ // need to build up , get this  object ID's path and compare tit to the tree path , not iterate through each as this is a bug that prevents closure
                        var temp_path_s_is_ex=JSON.stringify(rx1).toString()                            
                        if (temp_path_s_is_ex===temp_obj_path_s_is_ex){
                            is_child_expanded=true
                        }                           
                })

                var is_child_expanded_css="none"
                if (is_child_expanded){
                    is_child_expanded_css="block"
                }

                cs_bgcol=def_bg_col;
                if (tt.state["prop_curr_id" + t.name_code]===r.id){
                    cs_bgcol=sel_bg_col
                }

                cs_bgcol_child=def_bg_col_child;
                if (tt.state["tree_current_select_type" + t.name_code] === "child"){
                    if (tt.state["prop_curr_id_child" + t.name_code]===r.id){
                        cs_bgcol_child=sel_bg_col_child
                    }
                }

                if (isUn( extra.indent )){
                    extra.indent=0
                }
                
                //var found=false

                if (  r.name.toLowerCase().includes( tt.state["tree_panel_filter_txt" + t.name_code ].toLowerCase()) ){
                    found=true;
                }

                if ( r.type.toLowerCase().includes( tt.state["tree_panel_filter_txt" + t.name_code ].toLowerCase())){
                    found=true;
                }

                if(tt.state["tree_panel_filter_txt" + t.name_code ]===""){
                    //var found=true
                }  
                
                
                if (found){

                ////////////////
                    // main loop actions

                    ret_E=(
                        <div key={i}
                            style={{ position : "relative", background : cs_bgcol ,color : cs_col , textAlign : "left",overflow : "auto", fontSize : 13, width : "100%"}}
                            cid={r.id}  
                        >
                            <div
                                style={{ position : "relative", float : "left" , cursor : "se-resize"}}                                    
                                key={i}
                                cid={r.id}
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    var id=e.target.getAttribute("cid")
                                    var l_obj=t.myTree_index.id[id]

                                    var xpp=[...tt.state["tree_expanded_paths" + t.name_code]]

                                    var found=false;
                                    //var found_path
                                    var found_path_i
                                    //xpp.forEach(function(rx1,ix1){ 
                                    feach(xpp, function(rx1,ix1){ 
                                        var temp_path_s=JSON.stringify(rx1).toString()
                                        var temp_obj_path_s=JSON.stringify(l_obj.path).toString()
                                        if (temp_path_s===temp_obj_path_s){
                                            found=true
                                            //let found_path=rx1
                                            found_path_i=ix1
                                        }
                                        
                                        rx1.forEach(function(rx2,ix2){  })
                                    })

                                    if (found){                                            
                                        xpp.splice(found_path_i ,1 )
                                    }else{
                                        xpp.push( [...l_obj.path] )
                                    }         
                                    
                                    var lr={}
                                    lr["tree_expanded_paths" + t.name_code]=xpp

                                    tt.setState(lr)
                                    
                                }}
                            >
                                [+]
                            </div>

                            
                            <div   
                                style={{ position : "relative", float : "left",overflow : "auto" , cursor : "pointer"} }
                                cid={r.id}   
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    var id=e.target.getAttribute("cid")         
                                    t.props.set_curr(id,function(){                                            
                                        var lr={}
                                        lr["tree_current_select_type" + t.name_code ]="cmpt"
                                        lr["prop_curr_id_child" + t.name_code ]=0
                                        tt.setState(lr,function(){  })                                        
                                    })
                                }}
                            >
                                &nbsp; {r.type} {r.name} 
                            </div>

                            <div
                                style={{ position : "relative", float : "right" , cursor : "se-resize"}}
                                cid={r.id}  
                            >
                                <button  cid={r.id}
                                    style={{fontSize : 10, padding : 4 ,paddingLeft : 8,paddingRight : 8, marginLeft : 2, marginRight : 1 }}
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        var id=e.target.getAttribute("cid") 
                                        t.delfromtree(id , function(){ })
                                    }}
                                >del</button>
                            </div>                            
                            <div
                                style={{ position : "relative", float : "right" , cursor : "se-resize"}}
                                cid={r.id}  
                            >
                                <button  cid={r.id}
                                    style={{fontSize : 10, padding : 4 ,paddingLeft : 8,paddingRight : 8, marginLeft : 2, marginRight : 1 }}
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        var id=e.target.getAttribute("cid")  
                                        t.cutcopy_paste_put(id)                                              
                                    }}
                                >pst</button>
                            </div>
                            <div
                                style={{ position : "relative", float : "right" , cursor : "se-resize"}}
                                cid={r.id}  
                            >
                                <button  cid={r.id}
                                    style={{fontSize : 10, padding : 4 ,paddingLeft : 8,paddingRight : 8, marginLeft : 2, marginRight : 1 }}
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        var id=e.target.getAttribute("cid")  
                                        t.cut_paste_get(id)                                      
                                    }}
                                >cut</button>
                            </div>
                            <div
                                style={{ position : "relative", float : "right" , cursor : "se-resize"}}
                                cid={r.id}  
                            >
                                <button  cid={r.id}
                                    style={{fontSize : 10, padding : 4 ,paddingLeft : 8,paddingRight : 8, marginLeft : 2, marginRight : 1 }}
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        var id=e.target.getAttribute("cid")  
                                        t.copy_paste_get(id)                                      
                                    }}
                                >copy</button>
                            </div>


                            <div style={{ clear : "both" }}/>

                            <div 
                                 style={{ background : cs_bgcol_child, display : is_child_expanded_css , position : "relative", left : 10 , cursor : "pointer" , width : "100%"}}
                                 cid={r.id}
                                 onClick={(e)=>{
                                    e.stopPropagation();
                                    var id=e.target.getAttribute("cid")         
                                    t.props.set_curr(id,function(){
                                        //tt.setState({tree_current_select_type : "cmpt" },function(){
                                            var lr={}
                                            lr["tree_current_select_type" + t.name_code ]="child"
                                            lr["prop_curr_id_child" + t.name_code ]=id
                                            tt.setState(lr,function(){
                                         
                                            })
                                        //})
                                    })
                                }}
                            >
                                children :  {"["} 
                                    <div 
                                        style={{ position : "relative" ,left : 10 }}
                                        cid={r.id}   
                                    >
                                        &nbsp; {l_E} 
                                    </div>
                                    {"]"}
                            </div>

                        </div>
                    )

                ////////////////
                }

                return { E : ret_E , success : ret_status , txt : tmp_code , tree_data : ret_treeData }
            })

            var tree_root_E=function(){
                cs_bgcol=def_bg_col;
                if (tt.state["prop_curr_id"+ t.name_code ]==="0"){
                    cs_bgcol=sel_bg_col
                }
                return (
                    <div style={{position:"relative", fontSize : 13 ,textAlign : "left"}}>                        
                        <div 
                            style={{ background : cs_bgcol,position:"relative", fontSize : 13 ,textAlign : "left" ,cursor : "pointer"}}
                            cid="0"
                            onClick={(e)=>{
                                e.stopPropagation();
                                var id=e.target.getAttribute("cid")         

                                    t.props.set_curr(id,function(){
                                        var lr={}
                                        lr["tree_current_select_type" + t.name_code ]="child"
                                        
                                        tt.setState(lr,function(){
                                        
                                        })                                        
                                        
                                    })

                            }}
                        
                        >
                            {"[/] root"}
                            <div
                                style={{ position : "relative", float : "right" , cursor : "se-resize"}}
                                cid="0"  
                            >
                                <button  cid="0"
                                        style={{fontSize : 10, padding : 4 ,paddingLeft : 8,paddingRight : 8, marginLeft : 3, marginRight : 3 }}
                                        onClick={(e)=>{
                                            e.stopPropagation();
                                            var id=e.target.getAttribute("cid") 
                                            t.delfromtree(id , function(){ })
                                        }}
                                    >del</button>
                                </div>
                     
                        </div>
                        
                        <div style={{ position : "relative",left:7}}
                            onClick={(e)=>{}}
                        >
                            {temp.E}
                        </div>
                    </div> 
                )
            }()
           
            var filter_E=function(){

                return <div>
                            filter : 
                            <input 
                                style={{ width : undefined}}
                                onChange={(e)=>{
                                    var lr={}
                                    lr["tree_panel_filter_txt" + t.name_code ]=e.target.value
                                    tt.setState(lr)
                                }}
                            />
                        </div>
            }()

            t.tt.textE=temp.txt
            
            t.myTree_E=(
                <div
                    style={t.styles.myTree.main}
                >   
                    {filter_E}
                    {tree_root_E}                    
                </div>
            )

        },

        render : function(){ // this needs to go into react render function
            var tt=this.tt
            var t=this

            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }
            
            t.components_fn()
            t.tree_fn()
            t.props_fn()
            t.layout_fn()
            t.text_fn()
        },

        save_data_fn: function(){
            var tt=this.tt
            var t=this
            var args=arguments;
            //var argsl=args.length;


            var cb=function(){}

            //var data={}
            //var options={}

            if ( args.length > 0){
                if (isOb(args[0])){
                    //data=args[0]

                    if (args.length > 1){
                        if (isOb(args[1])){
                            //options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (tof(args[args.length -1])==="function" ){
                        cb=args[args.length -1];
                    }
                }
                if (tof(args[0])==="function" ){
                    cb=args[0]
                }
            }
    

            //tt.proj_data.myTree=tt.myTree
            //index
            //tt.proj_data.index=tt.myTree_index // linked object cause cyclic error, which cant be  linked anyway in serialisation in the same way that js needs to lookup
            var idx={}
            // excuiding tt.myTree_index.id index as it is full object links and causes recursion error while stringing
            
            idx.id={}
            idx.path=t.myTree_index.path
            idx.name=t.myTree_index.name
            idx["__schema__id"]=t.myTree_index["__schema__id"]
            idx["__schema__path"]=t.myTree_index["__schema__path"]
            idx["__schema__name"]=t.myTree_index["__schema__name"]    
            
            t.save_data.myTree_index= {...idx}
            t.save_data.myTree={...t.myTree}

            t.save_data.propvars__custdyn={...t.propvars__custdyn}
            t.save_data.propvars__custdyn__groups={...t.propvars__custdyn__groups}
            t.save_data.propvars__custdyn__order={...t.propvars__custdyn__order}

            

            t.states.prop_curr_id = tt.state["prop_curr_id"+ t.name_code ]
            t.states.prop_curr_parent = tt.state["prop_curr_parent"+ t.name_code ]
            t.states.tree_expanded_paths = tt.state["tree_expanded_paths"+ t.name_code ]//[["root"]],
            t.states.tree_current_select_type = tt.state["tree_current_select_type"+ t.name_code ]//"cmpt"
            t.states.tree_panel_filter_txt = tt.state["tree_panel_filter_txt"+ t.name_code ]
            t.states.prop_curr_id_child = tt.state["prop_curr_id_child"+ t.name_code ]
            
            t.save_data.states={...t.states}

            
            cb()
            
        },
        load_data_fn : function(){ // take data.mytree , data,
            //var tt=this.tt
            var t=this
            var args=arguments;
            //var argsl=args.length;

            var data={}
            //var options={}

            var cb=function(){}

            if ( args.length > 0){
                if (isOb(args[0])){
                    data=args[0]

                    if (args.length > 1){
                        if (isOb(args[1])){
                            //options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (tof(args[args.length -1])==="function" ){
                        cb=args[args.length -1];
                    }
                }
                if (tof(args[0])==="function" ){
                    cb=args[0]
                }
            }
            
            t.myTree=data.myTree

            t.propvars__custdyn=data.propvars__custdyn
            t.propvars__custdyn__groups=data.propvars__custdyn__groups
            t.propvars__custdyn__order=data.propvars__custdyn__order
            
            t.states=data.states
            


            t.myTree_index=data.myTree_index
            t.rebuild_myTree_index_id_object_links()

            t.loaded_data=data

            t.set_states_init()
            cb(data)
        },

        rebuild_myTree_index_id_object_links : function(){ // rebio;d id
            var tt=this.tt
            var t=this

            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }

            var args=arguments;
            var argsl=args.length;

            var data={}
            //var options={}

            //var cb=function(){}

            if ( args.length > 0){
                if (isOb(args[0])){
                    data=args[0]

                    if (args.length > 1){
                        if (isOb(args[1])){
                            //options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (tof(args[args.length -1])==="function" ){
                        //cb=args[args.length -1];
                    }
                }
                if (tof(args[0])==="function" ){
                    //cb=args[0]
                }
            }
            
            var myTree_temp
            if (isOb(args[0])){
                if (!isUn(args[0].myTree)){    
                    myTree_temp=data
                }
            }else{                    
                myTree_temp=t.myTree
            }

            //var e_E=[]
            //var code_txt=""
        
            var tree_arr_2E=[]
                    
            var some_extra_data_to_play_with={tmp_code_child_ret : ""}
            tree_arr_2E=t.main_loop( myTree_temp ,some_extra_data_to_play_with , function(r,i , l_E ,l_txt, l_ntd,extra){
                var ret_E
                var ret_treeData // can be used the same ret_E , to create new tree data for conversion tree structures
                var ret_status=true
                var tmp_code=""
                
                //////////////////////////////////////////////////////////
    
                if (isUn(extra.tmp_code_child_ret)){
                    extra.tmp_code_child_ret=""
                }
    
                //////////                        
                    t.myTree_index.id[r.id]=r // updating index                    
                ////////////////                                    
                
                return { E : ret_E , success : ret_status , txt : tmp_code , tree_data : ret_treeData }
            }
            )

            if (argsl===0){
                t.myTree=myTree_temp
                t.myTree_index.id["0"]=t.myTree        
            }else{
                if (isOb(args[0])){                        
                        t.myTree=myTree_temp
                        t.myTree_index.id["0"]=t.myTree                                
                }else{                    
                    t.myTree=myTree_temp
                    t.myTree_index.id["0"]=t.myTree      
                }
            }
            
        },


        rebuild_path_recursive: function(){ // rebio;d id
            var tt=this.tt
            var t=this

            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }

            var args=arguments;
            //var argsl=args.length;

            var data={}
            var parObj={}
            var parID=""
            
            //var options={}

            //var cb=function(){}

            if ( args.length > 0){
                if (isOb(args[0])){
                    data=args[0]                    
                }
                if (isOb(args[1])){
                    parObj=args[1] 
                    parID=parObj.id 
                }
                if (tof(args[1])==="string"){
                    parID=args[1]                    
                    parObj=t.myTree_index.id[parID]                  
                }



                if (args.length > 1){
                    if (tof.isFunction(args[args.length -1])==="function" ){
                        //cb=args[args.length -1];
                    }
                }
                if (tof(args[0])==="function" ){
                    //cb=args[0]
                }
            }
            
            var myTree_temp
            if (isOb(args[0])){            
                    myTree_temp=data            
            }else{
                return
            }


            // rebuild for this object first before its children
            myTree_temp.parID=parID
            myTree_temp.path= {...parObj.path}
            myTree_temp.path.push(myTree_temp.name)


            //var e_E=[]
            //var code_txt=""
        
            var tree_arr_2E=[]
                    
            var some_extra_data_to_play_with={tmp_code_child_ret : ""}
            tree_arr_2E=t.main_loop( myTree_temp ,some_extra_data_to_play_with , function(r,i , l_E ,l_txt, l_ntd,extra,par){
                var ret_E
                var ret_treeData // can be used the same ret_E , to create new tree data for conversion tree structures
                var ret_status=true
                var tmp_code=""
                
                //////////////////////////////////////////////////////////
    
                if (isUn(extra.tmp_code_child_ret)){
                    extra.tmp_code_child_ret=""
                }
    
                //////////                        
                    // // t.myTree_index.id[r.id]=r // updating index                    
                    //var id=r.id
                    //var parid=par.id
                   
                    r.path={...par.path}
                    r.path.push(r.name)
                ////////////////                                    
                
                return { E : ret_E , success : ret_status , txt : tmp_code , tree_data : ret_treeData }
            }
            )

            
            
        },

        newIDs_recursive: function(){ // rebio;d id
            var tt=this.tt
            var t=this

            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }

            var args=arguments;
            //var argsl=args.length;

            var data={}
            var parObj={}
            var parID=""
            
            //var options={}

            //var cb=function(){}

            if ( args.length > 0){
                if (isOb(args[0])){
                    data=args[0]                    
                }
                if (isOb(args[1])){
                    parObj=args[1] 
                    parID=parObj.id 
                }
                if (tof(args[1])==="string"){
                    parID=args[1]                    
                    parObj=t.myTree_index.id[parID]                  
                }



                if (args.length > 1){
                    if (tof(args[args.length -1])==="function" ){
                        //cb=args[args.length -1];
                    }
                }
                if (tof(args[0])==="function" ){
                    //cb=args[0]
                }
            }
            
            var myTree_temp
            if (isOb(args[0])){            
                    myTree_temp=data            
            }else{
                return
            }


            // rebuild for this object first before its children            
                // id
                    var new_id=$gl.uuid()            
                    t.myTree_index.id[new_id]=myTree_temp
                    myTree_temp.id=new_id
                // new name 
                    var r=myTree_temp
                    var c=r
                    var tmp_last_underscore=c.name.lastIndexOf("_")
                    var tmp_name_without_num=c.name.substr( 0  , tmp_last_underscore)
                    c.name=tmp_name_without_num
                    var name=c.name;
                    if (!isUn(t.myTree_index.name[c.name])){ // check if name exists and assign it a increment
                        t.myTree_index["__schema__name"].cnt++ // keeps the counter to use for unique naming
                        name=c.name + "_" + t.myTree_index["__schema__name"].cnt
                        t.myTree_index.name[name]={ name : c.name , id : c.id }            
                    }else{
                        t.myTree_index["__schema__name"].cnt++
                        t.myTree_index.name[c.name]={ name : c.name , id : c.id }
                        
                    }

                    c.name=name




            //var e_E=[]
            //var code_txt=""
        
            var tree_arr_2E=[]
                    
            var some_extra_data_to_play_with={tmp_code_child_ret : ""}
            tree_arr_2E=t.main_loop( myTree_temp ,some_extra_data_to_play_with , function(r,i , l_E ,l_txt, l_ntd,extra,par){
                var ret_E
                var ret_treeData // can be used the same ret_E , to create new tree data for conversion tree structures
                var ret_status=true
                var tmp_code=""
                
                //////////////////////////////////////////////////////////
    
                if (isUn(extra.tmp_code_child_ret)){
                    extra.tmp_code_child_ret=""
                }
    
                //////////                        
                    // new id
                        var new_id=$gl.uuid()
                        t.myTree_index.id[new_id]=r
                        r.id=new_id

                    // new name 
                        var c= t.myTree_index.id[new_id]
                        var tmp_last_underscore=c.name.lastIndexOf("_")
                        var tmp_name_without_num=c.name.substr( 0  , tmp_last_underscore)
                        c.name=tmp_name_without_num
                        var name=c.name;
                        if (!isUn(t.myTree_index.name[c.name])){ // check if name exists and assign it a increment
                            t.myTree_index["__schema__name"].cnt++ // keeps the counter to use for unique naming
                            name=c.name + "_" + t.myTree_index["__schema__name"].cnt
                            t.myTree_index.name[name]={ name : c.name , id : c.id }            
                        }else{
                            t.myTree_index["__schema__name"].cnt++
                            t.myTree_index.name[c.name]={ name : c.name , id : c.id }
                            
                        }

                        c.name=name

                ////////////////                                    
                
                return { E : ret_E , success : ret_status , txt : tmp_code , tree_data : ret_treeData }
            }
            )

            
            
        },

        getTree_realpathSTR_from_ID :function(id, arg_obj){ // #todo
            //var tt=this.tt
            //var t=this
            var realpath_s=""

            //var obj=arg_obj
            if (isUn(arg_obj)){
                //obj=t.myTree
            }

            //var rp=[]

            return realpath_s
        },
        
        delete_from_treeobj_ID :function(id,arg_obj){
            //var tt=this.tt
            var t=this
            //var args=arguments;
            //var argsl=args.length;

            var obj=arg_obj
            //var tree
            if (isUn(arg_obj)){
                obj=t.myTree_index.id[id]
            }
            
            var obj_par=t.myTree_index.id[obj.parent]

            obj_par.children.forEach((r,i)=>{
                if (r.id===id){
                    obj_par.children.splice( i ,1) 
                }
            })                
            
        },       

        cut_paste_get :function(){
            var tt=this.tt
            var t=this

            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }

            var args=arguments;
            //var argsl=args.length;

            t.temp.current_cp={}

            t.temp.current_cp.type="cut"
            t.temp.current_cp.time=new Date()
            t.temp.current_cp.srcID=args[0]   
            
            var name=t.myTree_index.id[args[0]].name
            var type=t.myTree_index.id[args[0]].type
            
            tt.setState({ mode : "cut - " + name + " = " + type + " - " + args[0]})
            
        },

        cut_paste_put :function(){
            //var tt=this.tt
            var t=this
            var args=arguments;
            //var argsl=args.length;

            //if (_.isEmpty(t.temp.current_cp)){
            if (Object.keys(t.temp.current_cp).length !== 0){
                return
            }

            t.temp.current_cp.type="cut" // cut_batch
            t.temp.current_cp.time2=new Date()
            t.temp.current_cp.destID=args[0]

            t.cut( {...t.temp.current_cp } )

            //var name=t.myTree_index.id[args[0]].name
            //var type=t.myTree_index.id[args[0]].type

            
        },

        copy_paste_get :function(){
            var tt=this.tt
            var t=this

            if (isUn(tt.state)){
                tt={ state : t.sstate}
            }

            var args=arguments;
            //var argsl=args.length;

            t.temp.current_cp={}

            t.temp.current_cp.type="copy"
            t.temp.current_cp.time=new Date()
            t.temp.current_cp.srcID=args[0]   
            
            var name=t.myTree_index.id[args[0]].name
            var type=t.myTree_index.id[args[0]].type
            
            tt.setState({ mode : "copy - " + name + " = " + type + " - " + args[0]})
            
        },

        copy_paste_put :function(){
            // tt=this.tt
            var t=this
            var args=arguments;
            //var argsl=args.length;

            //if (_.isEmpty(t.temp.current_cp)){
            if (Object.keys(t.temp.current_cp).length === 0){
                return
            }

            t.temp.current_cp.type="copy" // cut_batch
            t.temp.current_cp.time2=new Date()
            t.temp.current_cp.destID=args[0]

            t.copy( {...t.temp.current_cp } )

            //var name=t.myTree_index.id[args[0]].name
            //var type=t.myTree_index.id[args[0]].type

            
        },


        cutcopy_paste_put : function(){
            //var tt=this.tt
            var t=this
            var args=arguments;
            //var argsl=args.length;

            //if (_.isEmpty(t.temp.current_cp)){
            if (Object.keys(t.temp.current_cp).length === 0){
                return
            }

            if (t.temp.current_cp.type==="copy"){
                t.copy_paste_put(args[0])
            }
            if (t.temp.current_cp.type==="cut"){
                t.cut_paste_put(args[0])
            }
            
        },

        //pasteType : "", // should be in temp
        cut :function(){
            var tt=this.tt
            var t=this
            var args=arguments;
            //var argsl=args.length;

            var data={}
            //var options={}

            //var cb=function(){}
            
            if ( args.length > 0){
                if (isOb(args[0])){
                    data=args[0]

                    if (args.length > 1){
                        if (isOb(args[1])){
                           // options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (tof(args[args.length -1])==="function" ){
                        //cb=args[args.length -1];
                    }
                }
                if (tof(args[0])==="function" ){
                    //cb=args[0]
                }
            }


            var obj=t.myTree_index.id[data.srcID]
            var obj_par=t.myTree_index.id[obj.parent]

            var status="success"
            var br={ id : "" , name : "" , srcID : "" , status : "success" , err : "" , data : {} }
            
            br.name="cut_" + new Date()
            br.srcID=data.srcID
            br.destID=t.temp.current_cp.destID
            
            // 1. copy to temp
            var tmp_obj=t.copy_branch_to_temp(br)

            // 2. delete branch from src tree

            obj_par.children.forEach((r,i)=>{
                if (r.id===data.srcID){
                    obj_par.children.splice( i ,1) 
                }
            })

            // 3. copy to new destination from temp
            
            //var tmp_id=tmp_obj.id
            
            var dobj=t.myTree_index.id[tmp_obj.destID]
            var dobj_par=t.myTree_index.id[dobj.parent]

            var desttmp
            if (tt.state["tree_current_select_type" + t.name_code]==="child"){
                desttmp=dobj //.children
            }else{
                desttmp=dobj_par//.children
            }
            if (0===tmp_obj.destID){
                desttmp=t.myTree
                desttmp.children.push(tmp_obj.obj)
            }else{
                var destIter=desttmp.children.length
                var found=false
                desttmp.children.forEach((r,i)=>{
                    if (r.id===tmp_obj.destID){
                        destIter=i
                        found=true
                    }                    
                })                
                if (found){
                    desttmp.children.splice( destIter,0, tmp_obj.obj)
                }else{
                    desttmp.children.push( tmp_obj.obj)
                }
                
                
            }
            
            // 4. parent...field's id value with new parent , only if its a copy , cuts/move can retain same ID
                tmp_obj.obj.parent=desttmp.id    

            // 5. rebuild id , only if its a copy , cuts/move can retain same ID
          
            
            // 6. rebuild paths

              t.rebuild_path_recursive(tmp_obj.obj,desttmp)

            // 7. look into removing expanded of deleted items 

            // 10. clean up
            if (status==="success"){
                t.del_branch_from_temp(tmp_obj)
            }else{
                t.restore_branch_from_temp(br)
            }

            t.temp.current_cp={}

            tt.forceUpdate()
        },            
        copy :function(){
            var tt=this.tt
            var t=this
            var args=arguments;
            //var argsl=args.length;

            var data={}
            //var options={}

            //var cb=function(){}
            
            if ( args.length > 0){
                if (isOb(args[0])){
                    data=args[0]

                    if (args.length > 1){
                        if (isOb(args[1])){
                            //options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (tof(args[args.length -1])==="function" ){
                        //cb=args[args.length -1];
                    }
                }
                if (tof(args[0])==="function" ){
                    //cb=args[0]
                }
            }


            //var obj=t.myTree_index.id[data.srcID]
            //var obj_par=t.myTree_index.id[obj.parent]

            var status="success"
            var br={ id : "" , name : "" , srcID : "" , status : "success" , err : "" , data : {} }
            
            br.name="cut_" + new Date()
            br.srcID=data.srcID
            br.destID=t.temp.current_cp.destID
            
            // 1. copy to temp
            var tmp_obj=t.copy_branch_to_temp(br)

            // 2. delete branch from src tree , only delte for cut

            

            // 3. copy to new destination from temp
            
            //var tmp_id=tmp_obj.id
            
            var dobj=t.myTree_index.id[tmp_obj.destID]
            var dobj_par=t.myTree_index.id[dobj.parent]

            var new_obj={...tmp_obj.obj}
            
            var desttmp
            if (tt.state["tree_current_select_type" + t.name_code]==="child"){
                desttmp=dobj //.children
            }else{
                desttmp=dobj_par//.children
            }
            if (0===tmp_obj.destID){
                desttmp=t.myTree
                desttmp.children.push(new_obj)
            }else{
                var destIter=desttmp.children.length
                var found=false
                desttmp.children.forEach((r,i)=>{
                    if (r.id===tmp_obj.destID){
                        destIter=i
                        found=true
                    }                    
                })                
                if (found){
                    desttmp.children.splice(destIter,0,new_obj)
                }else{
                    desttmp.children.push(new_obj)
                }
                
                
            }
            
            // 4. parent...field's id value with new parent, cuts/move can retain same ID
                //tmp_obj.obj.parent=desttmp.id    

            // 5. rebuild id , only if its a copy , cuts/move can retain same ID
                t.newIDs_recursive(new_obj)
            
            // 6. rebuild paths

              t.rebuild_path_recursive(new_obj,desttmp)

            // 7. look into removing expanded of deleted items 

            // 10. clean up
            if (status==="success"){
                t.del_branch_from_temp(tmp_obj)
            }else{
                t.restore_branch_from_temp(br)
            }

           //t.temp.current_cp={}

            tt.forceUpdate()
        },   
        paste :function(){
            //var tt=this.tt
            //var t=this
            var args=arguments;
            //var argsl=args.length;

            //var data={}
            //var options={}

            //var cb=function(){}

            if ( args.length > 0){
                if (isOb(args[0])){
                    //data=args[0]

                    if (args.length > 1){
                        if (isOb(args[1])){
                            //options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (tof(args[args.length -1])==="function" ){
                        //cb=args[args.length -1];
                    }
                }
                if (tof(args[0])==="function" ){
                    //cb=args[0]
                }
            }
        },
        copy_branch_to_temp :function(){
            //var tt=this.tt
            var t=this
            var args=arguments;
            //var argsl=args.length;

            var data={}
            //var options={}

            //var cb=function(){}

            if ( args.length > 0){
                if (isOb(args[0])){
                    data=args[0]

                    if (args.length > 1){
                        if (isOb(args[1])){
                            //options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (tof(args[args.length -1])==="function" ){
                        //cb=args[args.length -1];
                    }
                }
                if (tof(args[0])==="function" ){
                    //cb=args[0]
                }
            }

            var nr={}
            var tmp={}

            nr.id=$gl.uuid()
            nr.obj=t.myTree_index.id[data.srcID]

            tmp={nr , ...data }

            //tmp.treerec=t.myTree.


            nr=tmp

            t.temp[nr.id]=nr

            return t.temp[nr.id]
        },
        del_branch_from_temp :function(){
            //var tt=this.tt
            var t=this
            var args=arguments;
            //var argsl=args.length;

            //var data={}
            //var //options={}

            //var cb=function(){}

            if ( args.length > 0){
                if (isOb(args[0])){
                    //data=args[0]

                    if (args.length > 1){
                        if (isOb(args[1])){
                            //options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (tof(args[args.length -1])==="function" ){
                        //cb=args[args.length -1];
                    }
                }
                if (tof(args[0])==="function" ){
                    //cb=args[0]
                }
            }

            delete t.temp["data.id"]
        },
        restore_branch_from_temp :function(){ // #todo
            //var tt=this.tt
            //var t=this
            var args=arguments;
            //var argsl=args.length;

            //var data={}
            //var options={}

            //var cb=function(){}

            if ( args.length > 0){
                if (isOb(args[0])){
                    //data=args[0]

                    if (args.length > 1){
                        if (isOb(args[1])){
                            //options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (tof(args[args.length -1])==="function" ){
                        //cb=args[args.length -1];
                    }
                }
                if (tof(args[0])==="function" ){
                    //cb=args[0]
                }
            }
        },
        init2 : function(){},
        init_first : function(){},
        init : function(){   // remember this is not this obj its the parent functions this scope                                             
            var t=obj
            var args=arguments
            var argsl=args.length                

            if (!isUn(args[0].inst)){
                var inst=args[0].inst

                
                var tmp="name_code"
                if (!isUn(inst[tmp])){
                    t[tmp]=inst[tmp]
                }

                var tmp="init2"
                if (!isUn(inst[tmp])){
                    t["init2"]=inst[tmp]
                }
                var tmp="init_after"
                if (!isUn(inst[tmp])){
                    t["init2"]=inst[tmp]
                }

                var tmp="init_first"
                if (!isUn(inst[tmp])){
                    t[tmp]=inst[tmp]
                }

                var tmp="styles"
                if (!isUn(inst[tmp])){
                    t[tmp]={...t[tmp] , ...inst[tmp] }
                }
                
                var tmp="components"
                if (!isUn(inst[tmp])){
                    t[tmp].all=inst[tmp]
                }                    

                var tmp="component_catagories"
                if (!isUn(inst[tmp])){
                    t[tmp]=inst[tmp]
                }
                
                var tmp="component_selected_catagory"
                if (!isUn(inst[tmp])){
                    t[tmp]=inst[tmp]
                }

                var tmp="layout_fn"
                if (!isUn(inst[tmp])){
                    t["layout_fn_2"]=inst[tmp]
                }

                var tmp="props_fn"
                if (!isUn(inst[tmp])){
                    t["props_fn_2"]=inst[tmp]
                }

                var tmp="text_fn"
                if (!isUn(inst[tmp])){
                    t["text_fn_2"]=inst[tmp]
                }


            }

            t.init_first({ args : args, t : t , argsl : argsl })


            if (!isUn(args[0].this)){
                t.tt=args[0].this                
            }
            
            t.props.tt=obj.tt
            t.props.t_myTreeO=obj
            
            //t.mytree.tt=obj.tt
            
            t.myTree_index={...t.schemas.myTree_index.template}            
            t.myTree_index.tt=obj.tt

            t.myTree={...t.schemas.myTree.template}               
            t.myTree_index.id["0"]=t.myTree          
            t.myTree_index.name["root"]={name : "root" , id : "0"}

            t.set_states_init()   
            
            
            t.init2({ args : args, t : t , argsl : argsl },t)
            
            //t.rebuild_myTree_index_id_object_links()

            return t
        }
    }        
   
    obj=obj.init.apply(this ,arguments)
    return obj
}

$gl.tree_template_O=tree_template_O






