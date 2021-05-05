//Tüm dosya YÜkleme ayarları  Bu sayfada yapılmaktadır..

function loaderFileList(app) {
    const animalUrl = ["bird.png", "dog.png", "fish.png",
        "fish1.png", "fish2.png", "fox.png",
        "horse.png"
    ];
    const loader = new LoaderConfig(app, "assets", "images");
    loader.topluDosyaEkleme(animalUrl, "images", "res");
    loader.tekDosyaEkle("click.mp3", "sounds", "click");
    loader.tekDosyaEkle("alkisKisa.mp3", "sounds", "alkis");
    loader.tekDosyaEkle("yanlis.mp3", "sounds", "yanlis");
    loader.tekDosyaEkle("dogru.mp3", "sounds", "dogru");
    loader.tekDosyaEkle("buttonBg.png", "images", "kartPng");
    loader.tekDosyaEkle("buttonBg.png", "images", "buttonPng");
    loader.tekDosyaEkle("bg.png", "images", "bg");

}

class LoaderConfig {
    constructor(app, baseUrl, ) {
        this.app = app;
        this.app.loader.baseUrl = baseUrl;
    }

    topluDosyaEkleme(urlList, subUrl, isim) {
        this.i = 0;
        for (this.i = 0; this.i < urlList.length; this.i++)
            this.app.loader.add(`${isim}${this.i+1}`, subUrl + "/" + urlList[this.i]);
    }
    tekDosyaEkle(url, subUrl, isim) {
        this.app.loader.add(`${isim}`, subUrl + "/" + url);
    }
}