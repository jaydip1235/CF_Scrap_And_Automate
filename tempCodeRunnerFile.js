    function processData3(html){
            console.log(html)
            let myDocument3 = cheerio.load(html)
            let questionBody = myDocument3("#pageContent > div.problemindexholder > div.ttypography > div > div:nth-child(2)").find("p").text()
            console.log(questionBody)
        }