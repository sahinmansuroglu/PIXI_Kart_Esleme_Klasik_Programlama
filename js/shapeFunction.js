function applyDropShadow(graphics, alpha = 1, blur = 2, distance = 20, color = 0x000020) {
    const dropShadowFilter = new PIXI.filters.DropShadowFilter();
    dropShadowFilter.color = color;
    dropShadowFilter.alpha = alpha;
    dropShadowFilter.blur = blur;
    dropShadowFilter.distance = distance;

    graphics.filters = [dropShadowFilter];

}