var express = require('express');
var cors = require('cors');
var convert = require('color-convert'); 
var app = express();
app.use(cors());
app.get('/', function(req, res) {

    var color = req.query.color || '';

    var definedColor = defineColor(color);

    res.send(definedColor);

}).listen(3000, () => {
    console.log('app started');
});

function defineColor(color){

    let normalColor = '';
    if (color) {
        color = color.trim();
        if (color.search(/hsl/g) !== -1 && color.search(/#/) === -1) {
            if (color.search(/%/) === -1) {
                console.log('Invalid color');
                return 'Invalid color';
                return;
            }
            color = color.replace(/%20/g, '');
            color = color.replace(/[hsl()%]/gi, '');
            const colorArr = color.split(/,/);
            if (colorArr.length !== 3) {
                console.log('Invalid color');
                return 'Invalid color';
                return;
            }
            if (+colorArr[1] > 100 || +colorArr[1] < 0 || +colorArr[2] > 100 || +colorArr[2] < 0) {
                console.log('Invalid color');
                return 'Invalid color';
                return;
            }
            if (+colorArr[1] > 0 && +colorArr[2] === 0) {
                console.log('Invalid color');
                return 'Invalid color';
                return;
            }
            console.log(colorArr[0].trim(), colorArr[1].trim(), colorArr[2].trim());
            color = convert.hsl.hex(+colorArr[0].trim(), +colorArr[1].trim(), +colorArr[2].trim());
        }
        if (color.search(/rgb/g) !== -1 && color.search(/#/) === -1) {
            color = color.replace(/[rgb()]/gi, '');
            const colorArr = color.split(/,/);
            if (colorArr.length !== 3) {
                console.log('Invalid color');
                return 'Invalid color' ;
                return;
            }
            if (+colorArr[0] > 255 || +colorArr[1] > 255 || +colorArr[2] > 255) {
                console.log('Invalid color');
                return 'Invalid color';
                return;
            }
            console.log(colorArr[0].trim(), colorArr[1].trim(), colorArr[2].trim());
            color = convert.rgb.hex(+colorArr[0].trim(), +colorArr[1].trim(), +colorArr[2].trim());
            //color = rgbToHex(+colorArr[0].trim(), +colorArr[1].trim(), +colorArr[2].trim());
        }
        color = color.replace(/#/, '');
        console.log(color);
        if (color.search(/[g-zG-Z-]/) === -1 && (color.length === 3 || color.length === 6)) {
            if (color.length === 3) {
                normalColor = `${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}`;
            } else {
                normalColor = color;
            }
            normalColor = normalColor.toLowerCase();
            console.log(normalColor);
            return `#${normalColor}`;
            return;
        }
    }
    console.log('Invalid color');
    return 'Invalid color';
    return;


}

function getRGBValue(searchString) {
    var ingredients = searchString.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
    console.log('ingredients: ',ingredients);
    var rgbItems = [];
    if(parseInt(ingredients[1]) >= 0 && parseInt(ingredients[1]) <= 255) rgbItems.push(ingredients[1]);
    if(parseInt(ingredients[2]) >= 0 && parseInt(ingredients[2]) <= 255) rgbItems.push(ingredients[2]);
    if(parseInt(ingredients[3]) >= 0 && parseInt(ingredients[3]) <= 255) rgbItems.push(ingredients[3]);

    var color = '';
    console.log('rgbItems: ',rgbItems);
    if(rgbItems.length === 3){
        for (var i=0;  i<3; i++) color += Math.round((rgbItems[i][rgbItems[i].length-1]=="%"?2.55:1)*parseInt(rgbItems[i])).toString(16).replace(/^(.)$/,'0$1');
    }

    return color;
}