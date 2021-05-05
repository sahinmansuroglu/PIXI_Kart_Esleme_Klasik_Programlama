class Game {

    constructor(app) {
        this.app = app;
        this.as = "arda";


        this.kartContainer = new PIXI.Container();
        this.buttonContainer = new PIXI.Container();
        this.progressBarBox = new kutu(450, 400, 500, 100, 0x000000, false, 1);
        this.progressBarText = newText("Oyun Yükleniyor % ", 40, this.progressBarBox);
        this.progressBarBox.addChild(this.progressBarText);
        this.app.stage.addChild(this.progressBarBox);
        loaderFileList(app);
        this.app.loader.onComplete.add((e) => this.doneLoading(e));
        this.app.loader.onProgress.add((e) => this.showProgress(e));
        this.app.loader.load();


        this.aktifKapak = null;
        this.test = null;

        this.animationObject = null;
        this.animationObject1 = null;
        this.ticker = PIXI.Ticker.shared;
        this.app.ticker.add(this.gameLoop.bind(this));
        this.animationState = this.bostaBekle;
        this.ticker.autoStart = false;
        this.rotationTick = 0;

    }


    gameLoop(delta) {
        this.animationState(delta);
    }
    bostaBekle(delta) {}
    play(delta) {

        if (this.animationObject != null) {
            this.rotationTick++;
            this.animationObject.alpha -= 1 / 12;
            if (this.rotationTick == 12) {
                this.rotationTick = 0;
                this.animationState = this.bostaBekle;

            }

        }
    }

    donerekOrtayaCik(delta) {

        this.animationObject.alpha += (1 / 12);
        this.animationObject1.alpha += (1 / 12);
        this.animationObject.rotation += (Math.PI / 180) * 30;
        this.animationObject1.rotation += (Math.PI / 180) * 30;
        this.rotationTick++;
        if (this.rotationTick == 12) {
            this.rotationTick = 0;
            this.animationState = this.bostaBekle;
        }

    }
    buyuyerekOrtadanKaybol(delta) {
        this.animationObject.alpha += (1 / 12);
        this.animationObject1.alpha += (1 / 12);

        this.animationObject.rotation += (Math.PI / 180) * delta * 30;
        this.animationObject1.rotation += (Math.PI / 180) * delta * 30;

        this.rotationTick++;
        if (this.rotationTick == 12) {
            this.rotationTick = 0;
            this.kartContainer.removeChild(this.animationObject);
            this.kartContainer.removeChild(this.animationObject1);
            this.animationState = this.bostaBekle;
            if (this.kartContainer.children.length == 0)
                this.sesCal("alkis");
        }


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
        this.aktifKapak = null;
        this.test = null;
        this.animationObject = null;
        this.animationObject1 = null;
        this.rotationTick = 0;
        this.animationState = this.bostaBekle;
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

                    if (this.test == null) {



                        this.animationObject = target.image;
                        this.animationState = this.play;

                        if (this.aktifKapak == null) {

                            this.aktifKapak = target;

                        } else {
                            this.acikResim = 0;
                            this.test = 1;
                            //Eşleme Yapılmıssa if blogu çalışır
                            if (target.value == this.aktifKapak.value) {

                                setTimeout(this.sil.bind(this), 1000, this.kartContainer, this.aktifKapak, target);


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
        //im1.alpha = 1;
        //im2.alpha = 1;
        this.animationState = this.bostaBekle;
        this.sesCal("yanlis");

        this.animationObject1 = im2;

        this.animationObject = im1;
        this.animationState = this.donerekOrtayaCik;
        this.test = null;

    }

    sil(container, aktif, pasif) {

        this.animationObject1 = aktif;
        this.animationObject = pasif;
        this.animationState = this.buyuyerekOrtadanKaybol;


        this.sesCal("dogru");
        //  console.log(this.kartContainer.children.length);

        this.test = null;
    }


}
