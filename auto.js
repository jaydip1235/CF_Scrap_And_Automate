var myArgs = process.argv; // id, password, probleLink, email

const puppeteer = require("puppeteer");
const sendEmail = require("./sendEmail");

const id = myArgs[2];

let pname;
let heading1;
let prob;
const pw = myArgs[3];
const email = myArgs[5];
const fs  = require("fs");
let solution = []
let browser

async function submit(myArgs){
  try{
     browser = await puppeteer.launch({
        headless: false,
        visible : true,
        defaultViewport: null,
        args: ["--start-maximized"],
      });


    //console.log(myArgs[2])
      let pages = await browser.pages();
      let tab = pages[0];


    await tab.goto("https://write-box.appspot.com/")
      let cl = await tab.waitForSelector("#editor")
      cl.click()
      let f1KaData = await fs.promises.readFile("./code.txt");
     let da = (f1KaData + "");

     await tab.type("#editor",da)
     await tab.keyboard.down("Control");
     await tab.keyboard.press("A");
     await tab.keyboard.press("X");
     await tab.keyboard.up("Control");



  
      await tab.goto(myArgs[4])
    

      await tab.waitForTimeout(4000);

      await tab.click("#header > div.lang-chooser > div:nth-child(2) > a:nth-child(1)");
   

      await tab.waitForTimeout(4000);
      await tab.type("#handleOrEmail", id);
      await tab.type("#password",pw)

      await tab.click("#enterForm > table > tbody > tr:nth-child(4) > td > div:nth-child(1) > input");
      

      await tab.waitForTimeout(4000);
  
      try{
          let upbutton = await tab.waitForSelector("body > div.button-up")
          await upbutton.click();
          await tab.waitForTimeout(2000)  

      }catch(e){
          //console.log(e.message)
          //console.log("Up button not found")
      }
      try{
        await tab.waitForTimeout(2000)
       pname = await tab.$eval("#pageContent > div.problemindexholder > div.ttypography > div > div.header > div.title",el => el.textContent)
      //console.log(pname)
    }
      catch(e){
       // console.log(e.message)
      }

      let submitButton = await tab.waitForSelector('a[href="/problemset/submit"]')
      await submitButton.click();
      await tab.waitForTimeout(2000);
      try{
        let upbutton = await tab.waitForSelector("body > div.button-up")
        await upbutton.click();
        await tab.waitForTimeout(2000)  

    }catch(e){
       //console console.log(e.message)
        //console.log("Up button not found 2")
    }
    
      await tab.waitForTimeout(4000);
     

    let bb = await tab.waitForSelector("#editor > div.ace_scroller > div > div.ace_layer.ace_text-layer > div")
     await bb.click()
    try{
        await tab.keyboard.down("Control");
        await tab.keyboard.press("V");
        await tab.keyboard.up("Control");
      
    }catch(e){
        console.log(e.message)
    }
    await tab.evaluate( () => {
        window.scrollBy(0, window.innerHeight);
    });
    await tab.waitForTimeout(3000)
    let message;
    let flag;
    
      try{
      await tab.click('input[type="submit"]');
      //console.log("Done")
     
      tab.waitForTimeout(3000)
      await tab.waitForSelector("#pageContent > div.datatable > div:nth-child(6) > table > tbody > tr:nth-child(2) > td.status-cell.status-small.status-verdict-cell.dark")
      
      await tab.waitForTimeout(10000)
      heading1 = await tab.$eval("#pageContent > div.datatable > div:nth-child(6) > table > tbody > tr:nth-child(2) > td.status-cell.status-small.status-verdict-cell.dark", el => el.textContent);
      //console.log(heading1)
      prob = await tab.$eval("#pageContent > div.datatable > div:nth-child(6) > table > tbody > tr:nth-child(2) > td:nth-child(4) > a", el => el.textContent)
      //console.log(prob)
    }catch(e){
      flag = 1
    }
    if(flag==1){
      heading1 = "You have submitted the same code before"
      prob = pname
    }

      message = `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="x-apple-disable-message-reformatting">
        <title></title>
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
        <style>
          table, td, div, h1, p {font-family: Arial, sans-serif;}
        </style>
      </head>
      <body style="margin:0;padding:0;">
        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
          <tr>
            <td align="center" style="padding:0;">
              <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
                <tr>
                  <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">
                  <a href="https://ibb.co/Dt1HkCz"><img src="https://i.ibb.co/Dt1HkCz/cfimg.jpg" alt="Image" border="0"></a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:36px 30px 42px 30px;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                      <tr>
                        <td style="padding:0 0 36px 0;color:#153643;">
                          <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">${heading1}</h1>
                          <h2 style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><p>${prob}</p></h2>
                          <h2 style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="${myArgs[4]}" style="color:#ee4c50;text-decoration:underline;">Problem Link</a></h2>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0;">
                          <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                            <tr>
                              <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
                                <p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><img src="https://miro.medium.com/max/879/1*dBsZGAmSrwFfudCmkObuBQ.png" alt="" width="260" height="200" style="height:200;display:block;" /></p>
                
                               
                              </td>
                              <td style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
                              <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
                                <p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><img src="https://codeforces.org/s/60345/images/codeforces-telegram-square.png" alt="" width="260" height="200" style="height:200;display:block;" /></p>
                                
                                
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px;background:#ee4c50;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                      <tr>
                        <td style="padding:0;width:50%;" align="right">
                          <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                            <tr>
                                <td style="padding:0;width:50%;" align="left">
                                    <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                                        &reg; CF Status 2021<br/>
                                    </p>
                                </td>
                              <td style="padding:0 0 0 10px;width:38px;">
                                <a href="http://www.facebook.com/" style="color:#ffffff;"><img src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                              </td>
                              <td style="padding:0 0 0 10px;width:38px;">
                                <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="https://www.creativefreedom.co.uk/wp-content/uploads/2017/06/Twitter-featured.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
            `

            if (email == undefined) {
              
              console.log("Email not sent");
              console.log(prob)
              console.log(heading1)
              process.exit(1)
            }
          try{
              await sendEmail ({ 
                  to : email,
                  subject : "CF Problem Status",
                  text : message
              })
              console.log("Email sent")
          }catch(error){
              console.log("Email cannot be sent")
          }
        }catch(error){
          console.log("Something went wrong!! Try again :)")
          process.exit(1)
        
        }
        
          browser.close()
}


submit(myArgs)
