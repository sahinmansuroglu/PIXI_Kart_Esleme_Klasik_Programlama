class LoaderConfig {
    constructor(app, urlList, baseUrl) {
        this.app = app;
        this.app.loader.baseUrl = baseUrl;
        this.i = 0;
        for (this.i = 0; this.i < urlList.length; this.i++)

            this.app.loader.add(`res${this.i+1}`, urlList[this.i]);


    }
}