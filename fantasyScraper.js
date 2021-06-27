const puppeteer = require('puppeteer');

const getInfo = async (homeCountry,awayCountry) => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const URL = `https://www.11v11.com/teams/${homeCountry}/tab/opposingTeams/opposition/${awayCountry}/`
    await page.goto(URL);

    const data = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('table tr td'))
        return tds.map(td => td.innerText)
      });
    //   console.log('all the data: ', data);
    let slicedArr = data.slice(6)

      let finalArr = [];
    //   console.log('sliced data: ', slicedArr.length);

      let numberOfMatches = slicedArr.length/5;

        for (let i = 0; i < numberOfMatches; i++) {
            // for every numberOfMatches (0-4) / (5-9) / (10-14) ==> 3 Matches
            // create a new object 
                let childObj = {
                    //date = 1st entry
                    "date": slicedArr[0],
                    //match = 2nd entry
                    "match": slicedArr[1],
                    //result = 3rd entry
                    "result": slicedArr[2],
                    //score = 4th entry
                    "score": slicedArr[3],
                    //competition = 5th entry
                    "competition": slicedArr[4]
                }
                // add to finalArr
                finalArr.push(childObj)
                // remove next 5 entries
                slicedArr.shift()
                slicedArr.shift()
                slicedArr.shift()
                slicedArr.shift()
                slicedArr.shift()
        }
      let infoObject = {
        gamesWon:`${data[1]}`,
        gamesDrawn: `${data[3]}`,
        gamesLost: `${data[5]}`
      }

      finalArr.push(infoObject)
      console.log('this is the finalArr: ', finalArr);

    //   console.log('info object: ', infoObject);
      await browser.close();
}

getInfo("italy", "austria")
