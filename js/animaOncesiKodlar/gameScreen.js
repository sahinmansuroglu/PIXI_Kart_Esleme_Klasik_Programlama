class Game {

    constructor(app) {
        this.app = app;
        this.as = "arda";
        this.animalUrl = ["bird.png", "dog.png", "fish.png",
            "fish1.png", "fish2.png", "fox.png",
            "horse.png"
        ];
        // this.animalUrl = ["1.jpg", "2.jpg", "3.jpg",
        //     "4.jpg", "5.jpg", "6.jpg",

        // ];
        this.tween = null;
        this.loader = new LoaderConfig(this.app, "assets", "images");

        this.loader.topluDosyaEkleme(this.animalUrl, "images", "res");
        this.loader.tekDosyaEkle("click.mp3", "sounds", "click");
        this.loader.tekDosyaEkle("alkisKisa.mp3", "sounds", "alkis");
        this.loader.tekDosyaEkle("yanlis.mp3", "sounds", "yanlis");
        this.loader.tekDosyaEkle("dogru.mp3", "sounds", "dogru");
        this.loader.tekDosyaEkle("buttonBg.png", "images", "kartPng");
        this.loader.tekDosyaEkle("buttonBg.png", "images", "buttonPng");
        this.loader.tekDosyaEkle("bg.png", "images", "bg");

        this.kartContainer = new PIXI.Container();
        this.buttonContainer = new PIXI.Container();
        this.progressBarBox = new kutu(450, 400, 500, 100, 0x000000, false, 1);
        this.progressBarText = newText("Oyun Yükleniyor % ", 40, this.progressBarBox);
        this.progressBarBox.addChild(this.progressBarText);
        this.app.stage.addChild(this.progressBarBox);

        this.app.loader.onComplete.add((e) => this.doneLoading(e));
        this.app.loader.onProgress.add((e) => this.showProgress(e));
        this.app.loader.load();


        this.aktifKapak = null;
        this.test = null;

        this.animationObject = null;

        this.ticker = PIXI.Ticker.shared;
        this.animationState = this.play();
        this.ticker.autoStart = false;

        //console.log(this.app.ticker);

        // this.app.ticker.stop();

    }
    gameLoop(delta) {
        //console.log("Burası okkkkkkkkkk222222222");
        //Update the current game state:;
        this.animationState(delta);
        //console.log("deger ", this.degisken);
        // this.kartContainer.children[0].x += 1;
    }
    bostaBekle(delta) {

    }
    play(delta, kale) {

        //Burada kaldın şahin animation state çalışıyor
        console.log("Burası okkkkkkkkkk");
        //Move the cat 1 pixel to the right each frame
        // if (this.animationObject != null) {
        //     this.animationObject.alpha -= 0.01;
        // }
        //  // console.log(this.kartContainer.children[0].width)
        // if (this.kartContainer.children[0].width > 600)
        //      this.animationState = this.bostaBekle();

    }
    showProgress(e) {
        // console.log(this.progressBarText.children[0].text);
        this.progressBarText.children[0].text = "Oyun Yükleniyor %" + Math.floor(e.progress);
        //  console.log(e.progress);
    }
    sesCal(sesEtiketi) {
        this.app.loader.resources[sesEtiketi].sound.play();
    }
    doneLoading(e) {

        this.progressBarBox.visible = false;
        bgSprite = new PIXI.Sprite.from(this.app.loader.resources["bg"].texture);
        bgSprite.width = screenWidth;
        bgSprite.height = screenHeight;
        this.app.stage.addChild(bgSprite);
        // console.log("All DONE LOADİNG");
        this.createButton();
        this.startGame(2, 2);


    }
    createButton() {
        let kutucuk22 = new kutu(0, 0, 200, 100, 0Xffffff, false, 0.5, this.app.loader.resources["buttonPng"].texture);

        //applyDropShadow(kutucuk22.children[0]);
        //console.log("Kutuv:", kutucuk22.children[0]);
        kutucuk22.addChild(newText("2 X 2", 50, kutucuk22));
        let kutucuk24 = new kutu(0, 120, 200, 100, 0XA7C6ED, false, 0.5, this.app.loader.resources["buttonPng"].texture);
        kutucuk24.addChild(newText("2 X 4", 50, kutucuk24));
        let kutucuk34 = new kutu(0, 240, 200, 100, 0XA7C6ED, false, 0.5, this.app.loader.resources["buttonPng"].texture);
        kutucuk34.addChild(newText("3 X 4", 50, kutucuk34));
        kutucuk22.interactive = true;
        kutucuk24.interactive = true;
        kutucuk34.interactive = true;
        kutucuk22.on("pointerdown", (e) => {
            this.removeChild(this.kartContainer);
            this.startGame(2, 2);
        });
        kutucuk24.on("pointerdown", (e) => {
            this.removeChild(this.kartContainer);
            this.startGame(2, 4);
        });
        kutucuk34.on("pointerdown", (e) => {
            this.removeChild(this.kartContainer);
            this.startGame(3, 4);
        });
        this.buttonContainer.addChild(kutucuk22);
        this.buttonContainer.addChild(kutucuk24);
        this.buttonContainer.addChild(kutucuk34);
        this.buttonContainer.x = 30;
        this.buttonContainer.y = (800 - this.buttonContainer.height) / 2;;
        this.app.stage.addChild(this.buttonContainer);
        // console.log(this.kartContainer.children.length);
        this.idlist = null;


    }
    removeChild(container) {
        for (var i = container.children.length - 1; i >= 0; i--) {
            container.removeChild(container.children[i]);
        };

    }

    listeOlustur(elemanSayisi) {
        let idlist = []
        for (var i = 1; i <= elemanSayisi / 2; i++) {
            idlist.push(i);
            idlist.push(i);
        }
        return idlist;
    }
    containerDanResimSil(conatiner) {
        const index = conatiner.children.indexOf(conatiner.image);
        conatiner.removeChild(conatiner.children[index]);
    }
    startGame(satir, sutun) {
        this.sesCal("click");

        this.idlist = this.listeOlustur(satir * sutun);
        let konumX = 0;
        let konumY = 0;
        //console.log(this.idlist);
        for (var i = 0; i < satir; i++) {
            for (var j = 0; j < sutun; j++) {

                const random = Math.floor(Math.random() * this.idlist.length); // [0,9)
                // console.log("Önce:", this.idlist)
                const id = this.idlist[random];
                this.idlist = this.idlist.filter((item, index) => index != random);
                //console.log("Sonra:", this.idlist)
                //console.log("random", random, "id:", id, );
                let kutucuk = new kutu(konumX, konumY, 200, 200, 0XA7C6ED, false, 1, this.app.loader.resources["kartPng"].texture, id, this.app.loader.resources[`res${id}`].texture);



                kutucuk.interactive = true;
                kutucuk.on("pointerdown", (e) => {
                    this.sesCal("click");
                    const target = e.currentTarget;
                    this.animationObject = target;
                    if (this.test == null) {


                        this.animationState = this.play;
                        this.app.ticker.add(this.gameLoop.bind(this));

                        //this.app.ticker.stop();
                        //console.log("Kart Container:", this.kartContainer.getChildAt(0));

                        //this.app.ticker.stop();
                        target.image.visible = false;

                        if (this.aktifKapak == null) {

                            this.aktifKapak = target;

                        } else {
                            this.acikResim = 0;
                            this.test = 1;
                            //Eşleme Yapılmıssa if blogu çalışır
                            if (target.value == this.aktifKapak.value) {

                                setTimeout(this.sil.bind(this), 500, this.kartContainer, this.aktifKapak, target);

                                // console.log("Tamamdırrrrr.");

                            } else {
                                setTimeout(this.eskiDurumaDon.bind(this), 1000, target.image, this.aktifKapak.image);

                            }

                            this.aktifKapak = null;
                        }

                    }
                });
                this.kartContainer.addChild(kutucuk);

                konumX += 220;
            }
            konumY += 220;
            konumX = 0;
        }
        //   console.log(this.kartContainer.width, this.kartContainer.height);
        this.kartContainer.x = (1440 - this.kartContainer.width) / 2;
        this.kartContainer.y = (800 - this.kartContainer.height) / 2;
        this.app.stage.addChild(this.kartContainer);
        //  console.log(this.kartContainer.children.length);
    }
    eskiDurumaDon(im1, im2, player) {
        im1.visible = true;
        im2.visible = true;
        this.sesCal("yanlis");

        this.test = null;

    }

    sil(container, aktif, pasif) {
        container.removeChild(aktif);
        container.removeChild(pasif);
        this.sesCal("dogru");
        //  console.log(this.kartContainer.children.length);
        if (this.kartContainer.children.length == 0)
            this.sesCal("alkis");
        this.test = null;
    }


}