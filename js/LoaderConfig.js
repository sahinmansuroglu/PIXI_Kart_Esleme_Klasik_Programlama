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