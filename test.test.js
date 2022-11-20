const { downloadPages, parseDict, parseIndex, scrapeSite } = require('./app.js')

describe('Simple tests just to run the various functions', () => {
    jest.setTimeout(100000)

    test('gets the relevant pages for a letter as a html string', async () => {
        const {dict, index} = await downloadPages('a')
        expect(typeof dict).toBe('string')
        expect(typeof index).toBe('string')
    })

    test('parse dict page into rows for each word', async () => {
        const {dict, index} = await downloadPages('a')
        const result = parseDict(dict)
        expect(result.length).toBeGreaterThan(0)
    })

    test('parse index page', async () => {
        const {index} = await downloadPages('a')
        const result = parseIndex(index)
        expect(result.length).toBeGreaterThan(0)

    })

    test('run workflow for whole site, logging all content to console', async () => {
        await scrapeSite()
    })


})