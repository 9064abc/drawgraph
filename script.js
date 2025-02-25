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

class Node{ //Node("+-*/^" , numA , numB)
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


function findNum(len,index,txt){
    var k = index
    var num = ""
    while(isNaN(txt[k] == false) && k<len){
        num += txt[k]
        k += 1
    }
    return [num,k];
}
function perseMultipler(len,index,txt){
    i = index;
}
function perseX(len,index,txt,numA){
    var formulaIn;
    var numB;
    var i = index;
    formulaIn = new Node(txt[i],numA);
    i += 1
    numB = findNum(len,j,txt);
    i = numB[1];
    numB = numB[0];
    if(numB != ""){  
        numB = Number(numB);
    }
    
    if(i<len && (txt[i]=="*" || txt[i]=="/" || txt[i]=="^")){
        numB = perseX(len,i,txt,numB);
        formulaIn.Nchildren(numB[0]);
        return [formulaIn,numB[1]];
    }
    else if(i<len && txt[i]=="^"){
        numB = perseMultipler(len,i,txt,numB);
        formulaIn.Nchildren(numB[0]);
        return [formulaIn,numB[1]];
    }
    else if(i<len && txt[i]=="("){
        numB = persetext(len,i+1,txt);
        formulaIn.Nchildren(numB[0]);
        return [formulaIn,numB[1]];
    }
    else {                            //if(i<len && (txt[i]=="+" || txt[i]=="-"))
        formulaIn.Nchildren(numB);
        return [formulaIn,i];
    }
}
function persePlus(len,index,txt,numA){
    var formulaIn;
    var numB;
    var i = index;
    formulaIn = new Node(txt[i],numA);
    i += 1
    numB = findNum(len,j,txt);
    i = numB[1];
    numB = numB[0];
    if(numB != ""){  
        numB = Number(numB);
    }
    
    if(i<len && (txt[i]=="*" || txt[i]=="/" || txt[i]=="^")){
        numB = perseX(len,i,txt,numB);
        formulaIn.Nchildren(numB[0]);
        return [formulaIn,numB[1]]
    }
    else {                            //if(i<len && (txt[i]=="+" || txt[i]=="-"))
        formulaIn.Nchildren(numB);
        return [formulaIn,i];
    }
}
function persetext(len,index,txt){   //()内の解析
  //var len = txt.length;
  var numA = "";
  var formulaIn;
  /*for(var j=index;j<len;j++)*/ while(txt[j] != ")"){
    
    numA = findNum(len,j,txt);
    j = numA[1];
    numA = numA[0];
    if(numA != ""){  
      numA = Number(numX);
    }
    if(txt[j]=="("){
      numA = persetext(len,j+1,txt); // "("の次から読む
      j = numA[1]
      numA = numA[0];
    }
    else if(txt[j]=="+" || txt[j]=="-"){
      formulaIn = persePlus(len,j,txt,numA);
      j = formulaIn[1];
      formulaIn = formulaIn[0];
    }
    else if(txt[j]=="*" || txt[j]=="/"){
      numA = perseX(len,j,txt,numA);
      j = numA[1];
      numA = numA[0];
    }
    else if(txt[j] == "^"){
      numA = perseMultipler(len,j,txt,numA);
      j = numA[1];
      numA = numA[0];
    }
  }
  if(formulaIn == ""){
    formulaIn = numA;
  }
  return [formulaIn,j+1];
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
function setPixel(x,y,r,g,b,a){
  var index = (canvasY * width + canvasX) * 4;
  data[index] = r;
  data[index + 1] = g;
  data[index + 2] = b;
  data[index + 3] = a;
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
