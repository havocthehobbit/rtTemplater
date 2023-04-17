import React,{ useState, useEffect, useRef } from "react"
import { v4 as uuid } from 'uuid';

export const TextEditor=(props,refs)=>{
    let [text, setText]=useState("")
    let thisE=useRef()
    let [state,setState]=useState({})
    let tt=useRef({})
    let init=useRef(true)
    let uid=useRef(uuid())

    let style_def={ background : "white", color : "black", width : 400 , height : 200 , border : "solid thin black", textAlign: "left", }
    let style={...style_def,...props.style}

    useEffect(()=>{
        console.log("use effect text", text)
    },[text])



    useEffect(()=>{
        if (init.current){ 
            init.current=false 

            if (!window.relems){ window.rtElems={} }
            if (!window.rtElems.textEditor){ window.rtElems.textEditor={} }
            //window.rtElems.textEditor
            
            console.log("refs :",refs)

            let e=thisE.current
            e.addEventListener("input",(...args)=>{
                inputPutFN(args[0]) 
            })  
            e.focus()
        }
    },[])
    let keycode=""
    let inputPutFN=(...args)=>{
        let e=thisE.current  


        if ( args[0].inputType==="insertParagraph"){ // hack to prevent carot/cursor focus out from element
            return
        }        
        
        let cb=()=>{}

        const sel = window.getSelection();
        const node = sel.focusNode;
        const offset = sel.focusOffset;
        
        const pos = getCursorPosition(e, node, offset, { pos: 0, done: false });
        if (offset === 0) pos.pos += 0.5;                
        
        e.innerHTML = parse(e.innerHTML);
       
        //e.focus() ;return 

        sel.removeAllRanges();
        let  range = setCursorPosition(e, document.createRange(), {
            pos: pos.pos,
            done: false,
        });
        range.collapse(true);
        sel.addRange(range);

        cb( { pos : pos ,e : e,sel : sel,})

        console.log("args" ,args ,args[0].inputType )
       
    }

    function getCursorPosition(parent, node, offset, stat) {
        if (stat.done) return stat;
      
        let currentNode = null;
        if (parent.childNodes.length == 0) {
          stat.pos += parent.textContent.length;
        } else {
          for (let i = 0; i < parent.childNodes.length && !stat.done; i++) {
            currentNode = parent.childNodes[i];
            if (currentNode === node) {
              stat.pos += offset;
              stat.done = true;
              return stat;
            } else getCursorPosition(currentNode, node, offset, stat);
          }
        }
        return stat;
    }

    //find the child node and relative position and set it on range
    function setCursorPosition(parent, range, stat) {
        if (stat.done) return range;
    
        if (parent.childNodes.length == 0) {
        if (parent.textContent.length >= stat.pos) {
            range.setStart(parent, stat.pos);
            stat.done = true;
        } else {
            stat.pos = stat.pos - parent.textContent.length;
        }
        } else {
        for (let i = 0; i < parent.childNodes.length && !stat.done; i++) {
            let currentNode = parent.childNodes[i];
            setCursorPosition(currentNode, range, stat);
        }
        }
        return range;
    }

    let allert=()=>{
        alert('dfsf')
    }

    function parse(text) {
        //use (.*?) lazy quantifiers to match content inside
        //return text;

        return (
          text
            .replace(/\*{2}(.*?)\*{2}/gm, "**<strong>$1</strong>**") // bold
            .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/gm, "*<em>$1</em>*") // italic
            // handle special characters
            .replace(/\n/gm, "<br>")
            .replace(/\t/gm, "&#9;")
            .replace(/ the /gm, " <span onclick='allert()' style='color:orange'>the</span> ") // bold

        );
    }


    let textUpdate=()=>{
       // thisE.current.innerHTML=text       
        //setText(thisE.current.innerHTML)

        //thisE.current.textContent=text
        setText(thisE.current.textContent)
    }


    return (
        <div
            style={{padding : 5,background : "lightgrey"}}
            
        >
            <button
                onClick={()=>{
                    thisE.current.innerHTML=""
                    setText(thisE.current.innerHTML)
                }}
            >
                test button
            </button>
            <div
                style={style}
                contentEditable={"true"}
                ref={
                    thisE
                   // e=>thisE.current=e                
                }
                onInput={(e)=>{
                    //console.log("test :",text)                                        
                    //console.log("thisE text :",thisE.current.innerHTML)
                    //setText(e.currentTarget.textContent)

                    // let pos=getCaretPosition(e)
                   
                    // console.log("pos :", thisE.current)

                    //console.log("e :", e)
                    //textUpdate(e.currentTarget.innerHTML)       
                    
                    //textUpdate()
                     
                }}
                onClick={(e)=>{
                    e.stopPropagation()
                 

                    
                }}
                onKeyUp={(e)=>{
                    keycode=e.code
                    //if (e.code==="Enter"){
                        
                        //alert()
                        //console.log("test", e)
                        //inputPutFN( e)
                    //}
                }}

            ></div>
        </div>
    )

}