const request = require('request')
const cheerio = require("cheerio");


document.getElementById("bt").addEventListener("click",Hi)
function Hi(){
let number = document.getElementById("rating").value;
rating = parseInt(number)

 

const a2ojLadderLink  = "https://a2oj.com/Ladders.html";


request(a2ojLadderLink,function(err,res,data){
    processData(data)
})

function processData(html){
    let myDocument = cheerio.load(html)
    let allTableRow = myDocument("body > center > table:nth-child(4) > tbody > tr")
    let probableArray = []
    for(let i=1;i<allTableRow.length;i++){
        let singleRow =  myDocument(allTableRow[i])

        for(let j=0;j<singleRow.length;j++){
            let allTds = myDocument(singleRow[j]).find("td");
            let codename;
            if(i<12){
            codename = myDocument(allTds[1]).text().trim();
            }
            else{
                let ss = myDocument(allTds[1]).text()
                codename = ss.substring(0, ss.length - 7).trim();
            }
            let lowerBound = codename.substring(0,5)
            if(lowerBound[0]=='C' && codename.includes("<")){
                lowerBound = 800
            }
            else if(lowerBound[0]=='C' && codename.includes(">=")){
                lowerBound = codename.substring(codename.length - 4)
            }

            let upperBound =  codename.substring(codename.length - 4)
            if(codename.includes(">=")){
                upperBound = 3000
            }

            if(rating>=lowerBound && rating<=upperBound){
                probableArray.push(i)
            }

        }
    }

    let p = Math.random()
    let selectTr;
    if(p<0.5){
        selectTr = 0;
    }
    else{
        selectTr = 1;
    }
    
    let finalRow =  myDocument(allTableRow[probableArray[selectTr]])
    let findrow = myDocument(finalRow).find("td")
         let ll = myDocument(findrow[1]).find("a");
         let link = myDocument(ll).attr("href")

         link = "https://a2oj.com/"+link

    
    request(link , function(err , res , data){
        processData2(data);
    })


    function processData2(html){
        let myDocument2 = cheerio.load(html)
    
        let allTableRow2 = myDocument2("body > center > table:nth-child(3) > tbody> tr")
        

        let index = Math.floor((Math.random() * 200)+1) 

        while(true) {
            let index = Math.floor((Math.random() * 100)+1) 
            let singleRow2 =  myDocument2(allTableRow2[index])

            if(singleRow2==undefined){
                continue;
            }
           
            let findrow2 = myDocument2(singleRow2).find("td")
            let ll = myDocument2(findrow2[1]).find("a");
            let link2 = myDocument2(ll).attr("href")
    
            
            document.getElementById("link").innerText = link2
            getQuestion(link2);
            break;
        }



        function getQuestion(link){

            request(link , function(err , res , data){
             processData3(data);
            })

            function processData3(html){
                let myDocument3 = cheerio.load(html)
        
              

               let qq = myDocument3("#pageContent > div.problemindexholder > div.ttypography > div > div:nth-child(2) > p").text()
               document.getElementById("q").innerText=qq

               let ip = myDocument3("#pageContent > div.problemindexholder > div.ttypography > div > div.input-specification > p").text()
               document.getElementById("i").innerText=ip

               let op = myDocument3("#pageContent > div.problemindexholder > div.ttypography > div > div.output-specification > p").text();
                document.getElementById("o").innerText=op


              
            }


        }
   
     }

    }
}
