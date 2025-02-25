const FormulaElem = document.getElementById("formulaTXT");
const cvs = document.getElementById("cvs");
const calcButton = document.getElementById("calc");
CvsCtx = cvs.getContext('2d'); 
/*CvsCtx.translate(0,cvs.height); 
CvsCtx.scale(1,-1)*/

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
    Nchildren(child){
        this.children.push(child);   
    }
};


function findNum(len,index,txt){
    var k = index
    var num = ""
    while(isNaN(txt[k])==false && k<len){
        num += txt[k]
        k += 1
    }
    if(txt[k] == "("){
        num = persetext(len,k+1,txt);
        k = num[1]
        num = num[0]
    }
    return [num,k];
}
function perseMultipler(len,index,txt,numA){
    var formulaIn;
    var numB;
    var i = index;
    formulaIn = new Node(txt[i],numA)
    i += 1
    numB = findNum(len,i,txt);
    i = numB[1];
    numB = numB[0];
    if((typeof numB) == "string"){  
        numB = Number(numB);
    }
    
    if(i<len && (txt[i]=="*" || txt[i]=="/" || txt[i]=="^")){
        numB = perseX(len,i,txt,numB);
        formulaIn.Nchildren(numB[0]);
        i = numB[1]
        //return [formulaIn,numB[1]];
    }
    else if(i<len && (txt[i]=="+" || txt[i]=="-")){
        formulaIn = persePlus(len,i,txt,formulaIn);
        //formulaIn.Nchildren(numB[0]);
        i = formulaIn[1];
        formulaIn = formulaIn[0];
    }
    else {                            //if(i<len && (txt[i]=="+" || txt[i]=="-"))
        formulaIn.Nchildren(numB);
        //return [formulaIn,i];
    }
    return [formulaIn,i];
}
function perseX(len,index,txt,numA){
    var formulaIn;
    var numB;
    var i = index;
    formulaIn = new Node(txt[i],numA);
    i += 1
    numB = findNum(len,i,txt);
    i = numB[1];
    numB = numB[0];
    if((typeof numB) == "string"){  
        numB = Number(numB);
    }
    
    if(i<len && (txt[i]=="*" || txt[i]=="/" || txt[i]=="^")){
        numB = perseX(len,i,txt,numB);
        formulaIn.Nchildren(numB[0]);
        i = numB[1];
        //return [formulaIn,numB[1]];
    }
    else if(i<len && txt[i]=="^"){
        numB = perseMultipler(len,i,txt,numB);
        formulaIn.Nchildren(numB[0]);
        i = numB[1];
        //return [formulaIn,numB[1]];
    }
    else if(i<len && (txt[i]=="+" || txt[i]=="-")){
        formulaIn.Nchildren(numB[0]);
        formulaIn = persePlus(len,i,txt,formulaIn);
        //formulaIn.Nchildren(numB[0]);
        i = formulaIn[1];
        formulaIn = formulaIn[0];
    }
    else {                            //if(i<len && (txt[i]=="+" || txt[i]=="-"))
        formulaIn.Nchildren(numB);
        //return [formulaIn,i];
    }
    return [formulaIn,i];
}
function persePlus(len,index,txt,numA){
    var formulaIn;
    var numB;
    var i = index;
    formulaIn = new Node(txt[i],numA);
    i += 1
    numB = findNum(len,i,txt);
    i = numB[1];
    numB = numB[0];
    if((typeof numB) == "string"){  
        numB = Number(numB);
    }
    
    if(i<len && (txt[i]=="*" || txt[i]=="/" || txt[i]=="^")){
        numB = perseX(len,i,txt,numB);
        formulaIn.Nchildren(numB[0]);
        i = numB[1]
        
        //return [formulaIn,numB[1]]
    }
    else if(i<len && (txt[i]=="+" || txt[i]=="-")){
        numB = persePlus(len,i,txt,numB);
        formulaIn.Nchildren(numB[0]);
        i = numB[1]
        //return [formulaIn,numB[1]]
    }
    else if(i<len && txt[i]=="^"){
        numB = perseMultipler(len,i,txt,numB);
        formulaIn.Nchildren(numB[0]);
        i = numB[1]
        //return [formulaIn,numB[1]];
    }
    else {                            //if(i<len && (txt[i]=="+" || txt[i]=="-"))
        formulaIn.Nchildren(numB);
        //return [formulaIn,i];
    }
    return [formulaIn,i];
}
function persetext(len,index,txt){   //()内の解析
  //var len = txt.length;
    var numA = "";
    var formulaIn = "";
    j = index
  /*for(var j=index;j<len;j++)*/ while(txt[j]!=")" && j<len){
    
        numA = findNum(len,j,txt);
        j = numA[1];
        numA = numA[0];
        if((typeof numA) == "string"){  
            numA = Number(numA);
        }
        /*if(txt[j]=="("){
            numA = persetext(len,j+1,txt); // "("の次から読む
            j = numA[1]
            numA = numA[0];
        }
        else*/ if(txt[j]=="+" || txt[j]=="-"){
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

function Calc(x,y,formula){
    var operator = formula.node_type;
    console.log(formula.children.length);
    var numA = formula.children[0];
    var numB = formula.children[1];
    
    var ans;
    if(isNaN(numA)){
        numA = Calc(x,y,numA);
    }
    if(isNaN(numB)){
        numB = Calc(x,y,numB);
    }
    if(operator == "+"){
        ans = numA + numB;
    }
    else if(operator == "-"){
        ans = numA - numB;
    }
    else if(operator == "*"){
        ans = numA * numB;
    }
    else if(operator == "/"){
        ans = numA / numB;
    }
    else if(operator == "^"){
        ans = numA ** numB;
    }
    return ans;
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
    var len = formulatxt.length -1;
    console.log(formulatxt);
    formula = persetext(len,0,formulatxt)[0];
    console.log(formula);
    ans = Calc(0,0,formula);
    console.log(ans);
  /*for (let x = -250; x < 250; x++) {
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
  }*/
ctx.putImageData(imgData, 0, 0);
}

//ctx.putImageData(imgData, -canvas.width / 2, -canvas.height / 2);
calcButton.addEventListener("click",draw);
