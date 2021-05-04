class Game {

    constructor(app) {
        this.app = app;
        this.as = "arda";
        this.animalUrl = ["bird.png", "dog.png", "fish.png",
            "fish1.png", "fish2.png", "fox.png",
            "horse.png", "kartPng.png", "kartPng1.png",
            "buttonBg.png", "arkaPlanButton.jpg", "click.mp3"
        ];


        this.loader = new LoaderConfig(this.app, "assets", "images");

        this.loader.topluDosyaEkleme(this.animalUrl, "images", "res");
        //this.loader.topluDosyaEkleme(this.musicUrl, "sounds", "music");

        this.loader.tekDosyaEkle("click.mp3", "sounds", "click");
        this.loader.tekDosyaEkle("alkisKisa.mp3", "sounds", "alkis");
        this.loader.tekDosyaEkle("yanlis.mp3", "sounds", "yanlis");
        this.loader.tekDosyaEkle("dogru.mp3", "sounds", "dogru");

        this.app.loader.onComplete.add((e) => this.doneLoading(e));
        this.app.loader.load();

        this.kartContainer = new PIXI.Container();
        this.buttonContainer = new PIXI.Container();
        this.aktifKapak = null;
    }

    sesCal(sesEtiketi) {
        this.app.loader.resources[sesEtiketi].sound.play();
    }
    doneLoading(e) {


        console.log("All DONE LOADİNG");
        this.createButton();

    }
    createButton() {
        let kutucuk22 = new kutu(0, 0, 200, 100, 0XA7C6ED, false, 0.7, this.app.loader.resources["res11"].texture);
        kutucuk22.addChild(newText("2 X 2", 50, kutucuk22));
        let kutucuk24 = new kutu(0, 120, 200, 100, 0XA7C6ED, false, 0.7, this.app.loader.resources["res11"].texture);
        kutucuk24.addChild(newText("2 X 4", 50, kutucuk24));
        let kutucuk34 = new kutu(0, 240, 200, 100, 0XA7C6ED, false, 0.7, this.app.loader.resources["res11"].texture);
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
        console.log(this.kartContainer.children.length);
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
        console.log(this.idlist);
        for (var i = 0; i < satir; i++) {
            for (var j = 0; j < sutun; j++) {

                const random = Math.floor(Math.random() * this.idlist.length); // [0,9)
                console.log("Önce:", this.idlist)
                const id = this.idlist[random];
                this.idlist = this.idlist.filter((item, index) => index != random);
                console.log("Sonra:", this.idlist)
                console.log("random", random, "id:", id, );
                let kutucuk = new kutu(konumX, konumY, 200, 200, 0XA7C6ED, false, 1, this.app.loader.resources[`res9`].texture, id, this.app.loader.resources[`res${id}`].texture);



                kutucuk.interactive = true;
                kutucuk.on("pointerdown", (e) => {
                    this.sesCal("click");
                    const target = e.currentTarget;
                    target.image.visible = false;
                    if (this.aktifKapak == null) {

                        this.aktifKapak = target;
                    } else {



                        //Eşleme Yapılmıssa if blogu çalışır
                        if (target.value == this.aktifKapak.value) {
                            setTimeout(this.sil.bind(this), 500, this.kartContainer, this.aktifKapak, target);

                            console.log("Tamamdırrrrr.");
                        } else {
                            setTimeout(this.eskiDurumaDon.bind(this), 1000, target.image, this.aktifKapak.image);

                        }

                        this.aktifKapak = null;
                    }


                });
                this.kartContainer.addChild(kutucuk);

                konumX += 220;
            }
            konumY += 220;
            konumX = 0;
        }
        console.log(this.kartContainer.width, this.kartContainer.height);
        this.kartContainer.x = (1440 - this.kartContainer.width) / 2;
        this.kartContainer.y = (800 - this.kartContainer.height) / 2;
        this.app.stage.addChild(this.kartContainer);
        console.log(this.kartContainer.children.length);
    }
    eskiDurumaDon(im1, im2, player) {
        im1.visible = true;
        im2.visible = true;
        this.sesCal("yanlis");
    }

    sil(container, aktif, pasif) {
        container.removeChild(aktif);
        container.removeChild(pasif);
        this.sesCal("dogru");
        console.log(this.kartContainer.children.length);
        if (this.kartContainer.children.length == 0)
            this.sesCal("alkis");
    }


}