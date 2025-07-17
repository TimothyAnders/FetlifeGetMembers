// CHANGE THIS to the correct URL. Don't include ?page=
const URL_TO_VIEW_KINKSTERS = "https://fetlife.com/p/COUNTRY/STATE/CITY/kinksters";
const URL_POSTFIX = "?page=";
const DELAY_BETWEEN_REQUESTS = 10000;
// Fetlife only shows up to 10,000 users. 20 users per page.
const MAX_PAGES = 100;
const START_PAGE = 1;

const parser = new DOMParser();
var thePage;
var htmlDoc;
var check2;
var fetElementt;

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
// END FETLIFE FUNCTIONS
// JSON.parse(thePage.lastChild.dataset.props).users[0]; 

let allUsers = [];
let allUsersUnparsedArray = [];

for (var i=START_PAGE; i<(MAX_PAGES + 1); i++) {
  console.log('about to run page: ' + i);
  const urlReturn = getURL(i);
  htmlDoc = parser.parseFromString(urlReturn, 'text/html');
  thePage = htmlDoc.getElementById('ptr-main-element').getElementsByTagName('main')[0].getElementsByTagName('div')[3];
  
  const allUsers = JSON.parse(thePage.lastChild.dataset.props).users;
  allUsersUnparsedArray.push(allUsers);
  console.log('finished page: ' + i + ' Sleeping..');
  sleep(DELAY_BETWEEN_REQUESTS);
}

console.log('done getting ' + allUsersUnparsedArray.length + ' pages of people. Now parsing..');

for (const allUsersUnparsed of allUsersUnparsedArray) {
	for (const personResult of allUsersUnparsed) {
		const label = personResult.identity;
		const linkToUser = 'https://fetlife.com' + personResult.profileUrl;
		const usersName = personResult.nickname;
		
		const userObject = { label: label, linkToUser: linkToUser, username: usersName }
		
		allUsers.push(userObject);
  }
}

console.log('DONE. ' + allUsers.length + ' amount of users found.');
