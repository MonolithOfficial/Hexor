var loadFile = function(){
    var imageTag = document.getElementById('uploadedImage');
    var src = URL.createObjectURL(event.target.files[0]);
    imageTag.src = src;
    imageTag.parentElement.style.border = "1px solid yellow";
    loadImageOntoCanvas(src);
}

test("rgba(0, 0, 0, 0.74)");

var loadImageOntoCanvas = function(src){
    var canvasGenerated = document.createElement('canvas');
    canvasGenerated.id = 'canvas';
    canvasGenerated.width = 0;
    canvasGenerated.height = 0;

    var pageHolder = document.getElementById('pageHolder');
    pageHolder.appendChild(canvasGenerated);
    var ctx = document.getElementById('canvas');
    var colorsHolder = document.getElementById('colors');
    var canvas = ctx.getContext('2d');
    var img1 = new Image();
    var imagePixelData;

    img1.onload = function () {
        colorsHolder.innerHTML = "";
        ctx.height = img1.height;
        ctx.width = img1.width;
        canvas.drawImage(img1, 0, 0);
        canvas.fillStyle = "rgba(255, 255, 255, 0)";
        imagePixelData = canvas.createImageData(img1.width, img1.height);
        var arrayOfPixelsRGBA = [];
        for (let i = 0; i < 5; i++){
            let randomPixel = canvas.getImageData(getRandomFloat(0, img1.width), getRandomFloat(0, img1.height), 1, 1);
            var data = randomPixel.data;
            var rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
            if (!checkIfInArray(arrayOfPixelsRGBA, rgba)){
                arrayOfPixelsRGBA[i] = rgba;
            }
        }

        for (let i = 0; i < 5; i++){
            var rgba = arrayOfPixelsRGBA[i];
            var coloredDiv = document.createElement('div');
            coloredDiv.style.width = 100 + "px";
            coloredDiv.style.height = 100 + "px";
            coloredDiv.style.backgroundColor  = rgba;
            coloredDiv.style.display = 'flex';
            coloredDiv.style.justifyContent = 'center';
            coloredDiv.style.alignItems = 'center';

            colorsHolder.appendChild(coloredDiv);

            var hexCodeEl = document.createElement('p');
            hexCodeEl.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            hexCodeEl.innerText = `#${rgba2hex(rgba)}`;
            coloredDiv.appendChild(hexCodeEl);
        }
        colorsHolder.style.border = "1px solid yellow";

        pageHolder.removeChild(ctx);
    };

    img1.src = src;
}

function rgba2hex(orig) {
    var a, isPercent,
      rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
      alpha = (rgb && rgb[4] || "").trim(),
      hex = rgb ?
      (rgb[1] | 1 << 8).toString(16).slice(1) +
      (rgb[2] | 1 << 8).toString(16).slice(1) +
      (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
  
    if (alpha !== "") {
      a = alpha;
    } else {
      a = 01;
    }
    a = ((a * 255) | 1 << 8).toString(16).slice(1);
    hex = hex + a;
  
    return hex;
  }
  
  function test(colorcode) {
    console.log(colorcode, rgba2hex(colorcode));
  }

function checkIfInArray(array, element){
    for (let i = 0; i < array.length; i++){
        if (array[i] == element){
            return true;
        }
        else {
            return false;
        }
    }
}

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
}