class kutu extends PIXI.Container {
    constructor(x, y, genislik, yukseklik, dolguRengi, draggable, opacity, resim = null, value = null, ciftResim = null) {
        super();

        this.value = value;
        //this.anchor.set(0.5);
        this.kutucuk = new PIXI.Graphics();
        this.kutucuk.beginFill(dolguRengi);
        this.kutucuk.drawRect(0, 0, genislik, yukseklik);
        this.kutucuk.alpha = opacity;
        this.image = null;
        this.imageGercek = null;



        this.addChild(this.kutucuk);

        if (ciftResim != null) {
            this.imageGercek = new PIXI.Sprite.from(ciftResim);
            this.imageGercek.x = 0;
            this.imageGercek.y = 0;
            this.imageGercek.width = genislik;
            this.imageGercek.height = yukseklik;
            this.imageGercek.alpha = opacity;
            this.imageGercek.zIndex = 2;
            this.addChild(this.imageGercek);

        }
        if (resim != null) {
            this.image = new PIXI.Sprite.from(resim);
            this.image.x = 0;
            this.image.y = 0;
            this.image.width = genislik;
            this.image.height = yukseklik;

            this.image.alpha = opacity;
            this.image.zIndex = 1;
            this.addChild(this.image);
        }

        this.x = x;
        this.y = y;
        this.interactive = true;
        console.log("Boyutlar:", this.width, " ", this.height);
        this.dragging = draggable;
        this.oldX = 0;
        this.oldY = 0;
    }

    get sol() {
        return this.x;
    }
    get sag() {
        return this.x + this.width;
    }
    get ust() {
        return this.y;
    }
    get alt() {
        return this.y + this.height;
    }


}