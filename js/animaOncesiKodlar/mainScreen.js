let app;
let keys = {};
let keyDiv;

let bgSprite;
let screenWidth = 1440;
let screenHeight = 800;

window.onload = function() {
    app = new PIXI.Application({
        width: screenWidth,
        height: screenHeight,
        backgroundColor: 0x000000,
        view: canvas,
        antialias: true
    });
    window.addEventListener('resize', resize);

    //bgSprite = new PIXI.Sprite.from("assets/images/bg.png");
    // bgSprite.width = screenWidth;
    //bgSprite.height = screenHeight;


    new Game(app);

    //app.stage.addChild(bgSprite);
    resize();

}

function resize() {


    var canvasRatio = screenHeight / screenWidth; ////canvas genişlik ve canvas yükseklik
    var windowRatio = window.innerHeight / window.innerWidth;
    if (windowRatio < canvasRatio) {
        h = window.innerHeight;
        w = h / canvasRatio;

    } else {
        w = window.innerWidth;
        h = w * canvasRatio;
    }
    app.view.style.width = w + 'px';
    app.view.style.height = h + 'px';

}