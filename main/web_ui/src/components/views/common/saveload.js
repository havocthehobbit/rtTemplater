import $lnd from  "../../common/libNativeDom"
let $cn=require( "../../common/libNative").$cn

let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb


export const data={
    tools : [],
}

export const localAllProjFile="rtTemplaterProjects"

export const loadtextProj=function(loaddataSTR,nameIn){
    let tt=this
    let cancel=false
    let all

    if (isUn(nameIn)){ nameIn="__default" }

    if (tof(loaddataSTR)==="string"){
        try {
            all=JSON.parse(loaddataSTR)                
        } catch (error) {
            alert("load err : ", error)
        }

        if (cancel===true){
            return
        }

        if (isOb(all)){
            cl("all " , all)
            let proj=all.projects[nameIn]
            let JSNodeMongoTemp
            
            
            tt.setState({data : proj.data },()=>{
                if (isOb(tt.state.data.JSNodeMongo)){
                    
                }else{                    
                    tt.alltoolitems.forEach((r,i)=>{
                        r.SetRefsRuns()
                    })
                }

                if (isOb(tt.state.data.httree)){
                    let httree=tt.HTtreeRef.current.global_trees["ht"].tree
                    httree.load_data_fn(tt.state.data.httree) 
                    tt.forceUpdate()
                    //.load_data_fn( rd.data["all_trees"] )     
                }
            })

            
        }else{                
            alert("load error ")
        }            
    }
}
export const loadDataLocal=function(nameIn){
    let tt=this
    
    let loaddataSTR=localStorage.getItem( localAllProjFile )        

    if (isUn(nameIn)){ nameIn="__default" }
    loadtextProj.apply(tt,[loaddataSTR, nameIn])
    
}

export const downloadDataLocal=function(nameIn){
    let tt=this
    let cancel=false
    let loaddataSTR=localStorage.getItem( localAllProjFile )
    let all
    let str

    if (isUn(nameIn)){ nameIn="__default" }

    if (tof(loaddataSTR)==="string"){
        try {
            $lnd.download( nameIn + ".json" ,loaddataSTR)
        } catch (error) {
            alert("load err : ", error)
        }

     
    }
}

let importBrowseButtonRef=undefined    
export const importProjLocal=function(e){
    let tt=this
    let files= e.target.files && e.target.files[0]
    
    e.target.value = null; // clear out files on element
    //cl("files : " , files )
    

    var reader = new FileReader();
    reader.onload = function() {
        var text = reader.result;            

        loadtextProj.apply(tt,[text])

        
    };
    reader.readAsText(files);
    //reader.readAsDataURL(files)

}
export const importProjLocalClickHndl=function(e ){
    this.importProjLocal(e)
}

export const importBrowseInputButtonActivate=function(e){
    this.importBrowseButtonRef.current.click()        
}

export const saveDataLocal=function(nameIn){
    let tt=this
    let def={

    }
    let cancel=false
    
    let loaddataSTR=localStorage.getItem( localAllProjFile )
    let loadedFile
    if (tof(loaddataSTR)==="string"){
        try {
            loadedFile=JSON.parse(loaddataSTR)                
        } catch (error) {
            alert("save err unable to load file before saving : ", error)        
        }
    }

    if (cancel===true){
        return
    }

    if (isUn(nameIn)){ nameIn="__default" }

    let newProj={ data : {},name : "",lastUpdated : new Date() }
    let all
    if (isOb(loadedFile)){
        all=loadedFile
    }else{
        all={projects : {} , lastProj : "" }
    }

    all.projects[nameIn]=newProj
    newProj.name=nameIn
    newProj.lastUpdated=new Date()

    let httree=tt.HTtreeRef.current.global_trees["ht"].tree
    httree.save_data_fn()                        
    //cl("save_data :",httree.save_data)

    try {
        let saveFile=""
        all.lastProj=nameIn
        //newProj.data["JSNodeMongo"]=JSNodeMongoTemp

        tt.alltoolitems.forEach((r,i)=>{
            newProj.data[r.name]=r.GetRefsRuns()                
        })

        newProj.data["httree"]=httree.save_data
        

        saveFile=JSON.stringify(all,null,2)
        localStorage.setItem(localAllProjFile , saveFile )              
    } catch (error) {
        alert("save err : ", error)
    }
    
    
}

export const saveload={
    data : data,
    localAllProjFile : localAllProjFile,
    loadtextProj : loadtextProj,
    loadDataLocal : loadDataLocal,
    downloadDataLocal : downloadDataLocal,
    importBrowseButtonRef : importBrowseButtonRef,
    importProjLocal : importProjLocal,
    importProjLocalClickHndl : importProjLocalClickHndl,
    importBrowseInputButtonActivate : importBrowseInputButtonActivate,
    saveDataLocal : saveDataLocal,
}

