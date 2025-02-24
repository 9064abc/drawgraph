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

function setPixel(x,y,r,g,b,a){
  var index = (canvasY * width + canvasX) * 4;
  data[index] = r;
  data[index + 1] = g;
  data[index + 2] = b;
  data[index + 3] = a;
}
function Makeformula(txt){
  
}
function Calc(x,y,formula){
  
}
function draw(){
  var formulatxt = FormulaElem.value;
  var len = formulatxt.length;
  console.log(formulatxt);
  formula = Makeformula(formulatxt);
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
