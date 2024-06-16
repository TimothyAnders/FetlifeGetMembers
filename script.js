// CHANGE THIS to the correct URL. Don't include ?page=
const URL_TO_VIEW_KINKSTERS = "https://fetlife.com/p/COUNTRY/STATE/CITY/kinksters";
const URL_POSTFIX = "?page=";
const DELAY_BETWEEN_REQUESTS = 10000;
// Fetlife only shows up to 10,000 users. 20 users per page.
const MAX_PAGES = 500;
const START_PAGE = 1;

const parser = new DOMParser();

function httpGet(theUrl)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

function getURL(pageNumber)
{
  return httpGet(URL_TO_VIEW_KINKSTERS + URL_POSTFIX + pageNumber);
}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

// FETLIFE FUNCTIONS
function getLabel(fetElement) 
{
  var check1 = fetElement.getElementsByClassName('text-sm font-bold text-gray-300');
  var check2 = fetElement.getElementsByClassName('link text-base font-bold text-red-500 mr-1');
  
  return check1.length > 0 ? check1[0].textContent : check2[0].textContent;
}

function getLinkToUser(fetElement)
{
  return fetElement.getElementsByClassName('link text-base font-bold text-red-500 mr-1')[0].href;
}

function getUserName(fetElement)
{
  return fetElement.getElementsByClassName('link text-base font-bold text-red-500 mr-1')[0].textContent;
}
// END FETLIFE FUNCTIONS

let allUsers = [];

for (var i=START_PAGE; i<(MAX_PAGES + 1); i++) {
  console.log('about to run page: ' + i);
  const urlReturn = getURL(i);
  const htmlDoc = parser.parseFromString(urlReturn, 'text/html');
  const thePage = htmlDoc.getElementById('ptr-main-element').getElementsByTagName('main')[0].getElementsByTagName('div')[2];

  const allPersonResults = thePage.getElementsByClassName('xs:w-1/2 w-full px-1');

  for (const personResult of allPersonResults) {
    const label = getLabel(personResult);
    const linkToUser = getLinkToUser(personResult);
    const usersName = getUserName(personResult);
    
    const userObject = { label: label, linkToUser: linkToUser, username: usersName }
    
    allUsers.push(userObject);
  }
  console.log('finished page: ' + i + ' Sleeping..');
  sleep(DELAY_BETWEEN_REQUESTS);
}

console.log('DONE.');
