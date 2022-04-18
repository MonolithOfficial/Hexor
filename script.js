var loadFile = function(){
    var imageTag = document.getElementById('output');
    var src = URL.createObjectURL(event.target.files[0]);
    // console.log(event.target.files[0].width)
    imageTag.src = src;
    loadImageOntoCanvas(src);
}

var loadImageOntoCanvas = function(src){
    var ctx = document.getElementById('canvas');
    var colorsHolder = document.getElementById('colors');
    var canvas = ctx.getContext('2d');
    var img1 = new Image();
    var imagePixelData;

    img1.onload = function () {
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
            coloredDiv.style.width = 300 + "px";
            coloredDiv.style.height = 300 + "px";
            coloredDiv.style.backgroundColor  = rgba;

            colorsHolder.appendChild(coloredDiv);
        }
    };

    img1.src = src;
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