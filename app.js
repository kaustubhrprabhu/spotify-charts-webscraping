const puppeteer = require("puppeteer");
const url = "https://charts.spotify.com/home";

async function scraper() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url);
        await page.click(".ChartsHomeEntries__ChartEntries-kmpj2i-0.gunxSo");
        await page.waitForSelector(".ChartsHomeEntries__Title-kmpj2i-2.jCURRv");
        var element = await page.$$(".ChartsHomeEntries__Title-kmpj2i-2.jCURRv");

        var data = [];

        for (let item of element) {
            let res = await page.evaluate(item => {
                return { "Track": item.children[0].innerHTML, "Artist": item.children[1].children[0].innerHTML };
            }, item);

            data.push(res);
        }

        console.table(data);
    } catch (err) {
        console.log("Something went wrong!");
        console.log(`Log: ${err}`);
    }

    await browser.close();
}

scraper();