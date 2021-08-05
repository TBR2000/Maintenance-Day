require('dotenv').config();

/*
curl -X 
GET 
--header 
'Accept: application/json' 
--header 
'Authorization: Bearer '`${process.env.Bearer}` 
'http://2banfield.sebuildings.com.au:8083/Values/01%252FASB-L11-AhuCE%252FBACnet%2520Interface%252FIP%2520Network%252FVavL10CE02%252FApplication%252FSetPoints%252FZnTmpSpAct'

//Sting to double encode
01/ASB-L11-AhuCE/BACnet Interface/IP Network/VavL10CE02/Application/SetPoints/ZnTmpSpAct


//buildstring from db options


//fetchcode
const url = "https://api.wit.ai/message?v=20140826&q=";

const options = {
  headers: {
    Authorization: "Bearer 6Q************"
  }
};

fetch(url, options)
  .then( res => res.json() )
  .then( data => console.log(data) );


function getParams(){

}*/

const axios = require('axios')
/*
console.log('here')
getData = async() =>{
  console.log('here')
 const data = await axios({
    method: 'get',
    url: 'http://2banfield.sebuildings.com.au:8083/Values/01%252FASB-L11-AhuCE%252FBACnet%2520Interface%252FIP%2520Network%252FVavL10CE02%252FApplication%252FSetPoints%252FZnTmpSpAct',
    {
      headers: { 
      Authorization: 'Bearer AQAAANCMnd8BFdERjHoAwE_Cl-sBAAAAQ8iVoPanaECupNGB7siC4AAAAAACAAAAAAAQZgAAAAEAACAAAACbdZxDghKhpBZrNc4eGEEhlWTw5r9Kr0ixfecDO-wZnAAAAAAOgAAAAAIAACAAAACqHVo1D3y0FES7XiaJNL_HBSu9LkB8Qi4LtGkmy-Zkz9ABAAB4u2xknCsKNItefU4xixa6CA9h8Oz7Hxfgk451PPa-gYlQIcN8PNGMEXDnlWZAl7UPxMCxl_AfZlLOte9f48HNPRE0ySAx22woIY7fKVgSdfXOhun4Rbo_lnwp4cHY5EvYpTwiESWJJmFi_HrzOFc5NS9C4e4cmmGJ9otgcBhimmKJJgE2LBrkPcRglFMhrflzOeHzNPyZWGEa0d4RXjTQVoiUwteHD9AXy6nI159Bk0TLNhNvuPXsNiDcfc1Dt2Du_RkNwOKydEov1upwGjR2gOTH2ENdxhfLNF_XJa-FzVbge2DfE4253VkN0mXmK8p1ZNWBjHWREsu_4rnwbL-nEqauZapxX7kbibdZkMJrK26OPjaLZ6rQVII6U1b09HQPlyy8xwkE26ucZiQAzVkGHeVT9v0s0l8HKVG_T0iit685ttNzTtishR6t_L7o6xLQ5h4pq5Nb50vhxaz-DbyKx6UcHEs8vgFkvofdhgRmjDkuRH1db2rkxXBY_WAYyTASNbcuf1B0guM-A8o8OJziUT0j7sGRDOOLMATsiC8e5WKDxMSQHxy1DpliopM_9ZuPJxD3DuS5AIUEAMVidknjHWp-EJyw24mCdwNbBruDskAAAAAfTce7rsMZSfeIPr2AN6jgABEvb1xp7Tkt6WXs_hjqY012--vzorMmBoARlyp5ZTTOKmovO43L1jRekAbT2Rbu',
      'Content-Type': 'application/json',
    }}
    },
  )
  console.log('here')
  console.log(await data.json)
}*/
/*
const AuthStr = 'Bearer AQAAANCMnd8BFdERjHoAwE_Cl-sBAAAAQ8iVoPanaECupNGB7siC4AAAAAACAAAAAAAQZgAAAAEAACAAAACbdZxDghKhpBZrNc4eGEEhlWTw5r9Kr0ixfecDO-wZnAAAAAAOgAAAAAIAACAAAACqHVo1D3y0FES7XiaJNL_HBSu9LkB8Qi4LtGkmy-Zkz9ABAAB4u2xknCsKNItefU4xixa6CA9h8Oz7Hxfgk451PPa-gYlQIcN8PNGMEXDnlWZAl7UPxMCxl_AfZlLOte9f48HNPRE0ySAx22woIY7fKVgSdfXOhun4Rbo_lnwp4cHY5EvYpTwiESWJJmFi_HrzOFc5NS9C4e4cmmGJ9otgcBhimmKJJgE2LBrkPcRglFMhrflzOeHzNPyZWGEa0d4RXjTQVoiUwteHD9AXy6nI159Bk0TLNhNvuPXsNiDcfc1Dt2Du_RkNwOKydEov1upwGjR2gOTH2ENdxhfLNF_XJa-FzVbge2DfE4253VkN0mXmK8p1ZNWBjHWREsu_4rnwbL-nEqauZapxX7kbibdZkMJrK26OPjaLZ6rQVII6U1b09HQPlyy8xwkE26ucZiQAzVkGHeVT9v0s0l8HKVG_T0iit685ttNzTtishR6t_L7o6xLQ5h4pq5Nb50vhxaz-DbyKx6UcHEs8vgFkvofdhgRmjDkuRH1db2rkxXBY_WAYyTASNbcuf1B0guM-A8o8OJziUT0j7sGRDOOLMATsiC8e5WKDxMSQHxy1DpliopM_9ZuPJxD3DuS5AIUEAMVidknjHWp-EJyw24mCdwNbBruDskAAAAAfTce7rsMZSfeIPr2AN6jgABEvb1xp7Tkt6WXs_hjqY012--vzorMmBoARlyp5ZTTOKmovO43L1jRekAbT2Rbu';
axios.get( 'http://2banfield.sebuildings.com.au:8083/Values/01%252FASB-L11-AhuCE%252FBACnet%2520Interface%252FIP%2520Network%252FVavL10CE02%252FApplication%252FSetPoints%252FZnTmpSpAct', { headers: { Authorization: AuthStr } }).then(response => {
  // If request is good...
  console.log(response.data);
})
.catch((error) => {
  console.log('error 3 ' + error);
});
*/
const data = {
 
  username: 'Viewer',
  password: '1234'
};

axios.post('http://2banfield.sebuildings.com.au:8083', Querystring.stringify(data))
      .then(response => {
        console.log(response.data);
        USER_TOKEN = response.data.access_token;
        console.log('userresponse ' + response.data.access_token);
      })
      .catch((error) => {
        console.log('error ' + error);
      });
//getData()