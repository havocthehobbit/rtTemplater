// Native Dom and Browser based commands that can be used for useful functionality

let $lnd={}

// Download text file generated on front end
export const  download=(filename, text)=>{
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}
$lnd.download=download




export default $lnd


