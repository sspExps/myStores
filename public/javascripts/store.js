$(document).ready(function () {
    var tData = ($('#msg').html()) ? JSON.parse($('#msg').html().split(',')) : ""
        , height = 205;
    if (tData.msg) {
        height = 205;
        $('#type').html(tData.msg);
    }
    (tData.textColor) ? $('#type').css('color', tData.textColor): '';
    (tData.bgColor) ? $('body').css('background-color', tData.bgColor): '';
    $("#menu-scroll").height($(document).height() - height);
    //    $('#dd').css('width', $(document).width() - 365)
    $(window).resize(function () {
        $("#menu-scroll").height($(document).height() - height);
        //        $('#dd').css('width', $(document).width() - 365);
    });
});

minRadius = 5;
maxRadius = 100;
minVel = -3;
maxVel = 3;
maxNumberOfCircles = 30;
circleColor = '#B3E1E5';
$(document).ready(function () {
    var browser = new checkBrowser();
    $('canvas').attr('width', browser.width).attr('height', browser.height);
    main();
})

function main() {
    circles = new Array();

    for (i = 0; i < maxNumberOfCircles; i++) {
        circles[i] = buildCircle();
    }

    setInterval(circleDrawing, 70);
}

//DRAWS THE CIRCLES
function circleDrawing() {
    var canvas = document.getElementById('canvas');
    //CLEARS CANVAS
    canvas.width = canvas.width;
    var browser = checkBrowser();
    for (i = 0; i < maxNumberOfCircles; i++) {
        circles[i].x = circles[i].x + circles[i].xVel;
        circles[i].y = circles[i].y + circles[i].yVel;

        //IF CIRCLE IS TOO FAR OFF SCREEN, REBUILD
        if (((circles[i].x > (browser.width + circles[i].radius) + 10) || circles[i].x < ((0 - circles[i].radius) - 10)) || ((circles[i].y > (browser.height + circles[i].radius) + 10) || circles[i].y < ((0 - circles[i].radius) - 10))) {
            circles[i] = buildCircle();

        }

        drawCircle(circles[i]);
    }
}

//RETURNS VARIABLES OF THE BROWSER
function checkBrowser() {
    browser = new Object();
    browser.height = document.documentElement.clientHeight;
    browser.width = document.documentElement.clientWidth;
    //IF BROWSER HEIGHT OR WIDTH HAS CHANGED, FIX
    if (($('canvas').attr('width') != browser.width) || $('canvas').attr('height') != browser.height) {
        $('canvas').attr('width', browser.width).attr('height', browser.height);
    }
    return browser;
}

function buildCircle() {
    var browser = new checkBrowser();
    var circle = new Object();
    circle.radius = randomXToY(minRadius, maxRadius);

    //DETERMINES WHERE TO START OFF SCREEN, HAS TO BE THIS LENGTHY
    if (betweenZeroAnd(2) == 1) {
        //ANYWHERE ON THE Y AXIS
        circle.y = randomXToY(0 - circle.radius, browser.height + circle.radius);

        if (betweenZeroAnd(2) == 1) {
            //LEFT SIDE
            circle.x = 0 - circle.radius;
        } else {
            //RIGHT SIDE
            circle.x = browser.width + circle.radius;
        }
    } else {
        //ANYWHERE ON THE X AXIS
        circle.x = randomXToY(0 - circle.radius, browser.width + circle.radius);
        if (betweenZeroAnd(2) == 1) {
            //TOP SIDE
            circle.y = 0 - circle.radius;
        } else {
            //BOTTOM SIDE
            circle.y = browser.height + circle.radius;
        }
    }

    if (circle.x < 0) {
        circle.xVel = randomXToY(0, maxVel);
    } else {
        circle.xVel = randomXToY(minVel, minVel + maxVel);
    }

    if (circle.y < 0) {
        circle.yVel = randomXToY(0, maxVel);
    } else {
        circle.yVel = randomXToY(minVel, maxVel - minVel);
    }
    //ENSURE CIRCLE IS NOT STATIONARY;
    if (circle.xVel == 0 && circle.yVel == 0) {
        circle.yVel = 1;
    }
    return circle
}

//DRAWS CIRCLE
function drawCircle(obj) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = circleColor;
    ctx.globalAlpha = 0.4;
    ctx.arc((obj.x), (obj.y), (obj.radius), 0, Math.PI * 2, false);
    ctx.fill();


}

function betweenZeroAnd(num) {
    return Math.floor(Math.random() * (num))
}

//RETURNS NUMBER BETWEEN X AND Y, FLOAT VAL IS DECIMAL PLACES
function randomXToY(minVal, maxVal, floatVal) {
    var randVal = minVal + (Math.random() * (maxVal - minVal));
    return typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
}