function newText(icindekiYazi, boyut, container = null) {
    const textContainer = new PIXI.Container();
    let style = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: boyut,
        fill: "white",
        stroke: '#C8D8EB',
        strokeThickness: 3,
        dropShadow: true,
        dropShadowColor: "#000000",
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
    });
    let text = new PIXI.Text(icindekiYazi, style);
    textContainer.addChild(text);
    if (container != null) {

        textContainer.x = (container.width - textContainer.width) / 2;
        textContainer.y = (container.height - textContainer.height) / 2;;
    }


    return textContainer
}