const FormulaElem = document.getElementById("formulaTXT");
const cvs = document.getElementById("cvs");
CvsCtx = cvs.getContext('2d'); 
CvsCtx.translate(0,cvs.height); 
CvsCtx.scale(1,-1)

const width = 500;
const height = 500;
correctX = Math.floor(width/2);
correctY = Math.floor((height/2)-1);

let imgData = CvsCtx.getImageData(0, 0, cvs.width, cvs.height);
let data = imgData.data;

class Node{
    node_type;
    children = [];
    constructor(node_type,child){
        this.node_type = node_type;
        if(child != "?"){
          this.children.push(child);
        }
    }
    Nchildren(ch){
      this.children.push(child);   
    }
};

function setPixel(x,y,r,g,b,a){
  var index = (canvasY * width + canvasX) * 4;
  data[index] = r;
  data[index + 1] = g;
  data[index + 2] = b;
  data[index + 3] = a;
}
function findNum(len,index,txt){
  var k = index
  var num = ""
  while(isNaN(txt[k] == false) && k<len){
    num += txt[k]
  }
  return [num,k];
}
function persetext(len,index,txt){
  //var len = txt.length;
  var numX = "";
  var formulaIn;
  for(var j=index;j<len;j++){
    
    numX = findNum(len,j,txt);
    j = numX[1];
    numX = numX[0];
    if(numX != ""){  
      numX = Number(numX);
    }
    if(txt[j]=="("){
      formulaIn = new Node(txt[j],numX);
      var numYi = persetext(len,j+1);
      formulaIn.Nchildren(numY[0]);
      return [formulaIn,numY[1]];
      break
    }
    
    else if(txt[j]=="+" || txt[j]=="-"){
      formulaIn = new Node(txt[j],numX);
      var numYi = persetext(len,j+1);
      formulaIn.Nchildren(numY[0]);
      return [formulaIn,numY[1]];
      break
    }
    else if(txt[j]=="*" || txt[j]=="/" || txt[j]=="^"){
      formulaIn = new Node(txt[j],numX);
      var numYi;
      if(txt[j+1] == "("){
        numYi = persetxt(len,j+1,txt);
        j = numYi[1]
      }
      else{
        numYi = findNum(len,j+1,txt);
        j = numYi[1]
      }
      formulaIn.Nchildren(numYi[0]);
    }
    
    else if(txt[j]==")"){
      
    }
  } 
}
function Makeformula(len,txt){
  //var len = txt.length;
  var formula = new Node("(","?");
  var numA = "";
  for(var i=0;i<len;i++){
    if(isNaN(txt[i]) == false){
      numA += txt[i];
    }else{
    if(numA != ""){  
      numA = Number(numA);
    }
    if(txt[i]=="("){
      //formula = new Node("()","?");
      var child = persetext(len,index+1); //()内のノード
      formula.Nchildren(child);
      
    }
    else if(txt[i]=="+"){
      formula = new Node("+",numA);
      var child = persetext(len,index,txt);
      formula.Nchildren(child);
    }
    else if(txt[i]=="-"){
      formula = new Node("-",numA);
      var child = persetext(len,index,txt);
      formula.Nchildren(child);
    }
    else if(txt[i]=="*"){
      formula = new Node("*","?");
      var child = persetext(len,index,txt);
      formula.Nchildren(child);
    }
    else if(txt[i]=="/"){
      formula = new Node("/","?");
      var child = persetext(len,index,txt);
      formula.Nchildren(child);
    }
    else if(txt[i]=="^"){
      formula = new Node("/","?");
      var child = persetext(len,index,txt);
      formula.Nchildren(child);
    }
    }
  }
}
function Calc(x,y,formula){
  
}
function draw(){
  var formulatxt = FormulaElem.value;
  var len = formulatxt.length;
  console.log(formulatxt);
  formula = Makeformula(len,formulatxt);
  for (let x = -250; x < 250; x++) {
    for (let y = -250; y < 250; y++) {
      if (Calc(x,y,formula)) { // 例: 半径100以内の円
        let canvasX = x + correctX;
        let canvasY = correctY - y;
        setPixel(x, y, 255, 0, 0, 255); // 赤で塗る
      }
      else{
        setPixel(x, y, 0, 255, 0, 255);
      }
    }
  }
  
}

ctx.putImageData(imgData, -canvas.width / 2, -canvas.height / 2);
