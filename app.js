const { parse } =  require('node-html-parser')

const puppeteer = require('puppeteer') // chrome browser to open page

async function scrapeSite() {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'z']
    for (const letter of letters) {
        const { dict, index } = await downloadPages(letter)
        parseDict(dict)
        parseIndex(index)
    }
}

async function downloadPages(letter) {
    const dictUrl = `http://suriname-languages.sil.org/Sranan/National/SrananNLDictIndex.html?Dict/${letter}.html`

    const dict = await fetchFrameContentInPage(dictUrl, 'Dict')
    const index = await fetchFrameContentInPage(dictUrl, 'Index')

    return { dict, index }
}

function parseDict(htmlStringOfDictPage) {
    /**
     * http://suriname-languages.sil.org/Sranan/National/gn/a.html
     * For an index page
     */

    const root = parse(htmlStringOfDictPage);
    const allWordRows = root.querySelectorAll('body div')
    for (const row of allWordRows) {
        // TODO
        /**
         * Add your logic for structuring/parsing each row here.
         */
        console.log(row.textContent)
    }
    return allWordRows
}

function parseIndex(htmlStringOfIndexPage) {
    const root = parse(htmlStringOfIndexPage);
    const allWordRows = root.querySelectorAll('body table tbody tr')
    for (const row of allWordRows) {
        // TODO
        /**
         * Add your logic for structuring/parsing each row here.
         */
        console.log(row.textContent)
    }
    return allWordRows
}


// https://github.com/puppeteer/puppeteer
// https://pptr.dev/api/puppeteer.frame/
async function fetchFrameContentInPage(url, frameName) {
    /**
     * http://suriname-languages.sil.org/Sranan/National/SrananNLDictIndex.html?Dict/a.html
     * loads all its content in framesets, which requires a browser to load before the html can be parsed.
     *
     * This functions returns contents of named frame as a string. I.e. a string with all the html loaded.
     */
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForNetworkIdle()
    const frameContent = await page.frames().find(frame => frame.name() === frameName).content();
    await page.close()
    return frameContent;
}

module.exports = { downloadPages, parseDict, parseIndex, scrapeSite }