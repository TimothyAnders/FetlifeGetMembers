// Use current URL
const URL_TO_VIEW_KINKSTERS = window.location.href;
const URL_POSTFIX = "?page=";
const DELAY_BETWEEN_REQUESTS = 10000;
// Fetlife only shows up to 10,000 users. 20 users per page.
const START_PAGE = 1;
const END_PAGE = 100;
var forceStop = false;

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

if (END_PAGE <= START_PAGE) {
	throw 'ERROR, End page must be greater than start page.'
}

if (START_PAGE <= 0) {
	throw 'ERROR, start page must be 1 or more.'
}

for (var i=START_PAGE; i<(END_PAGE + 1); i++) {
	if (!forceStop) {
		console.log('about to run page: ' + i);
		const urlReturn = getURL(i);
		const htmlDoc = parser.parseFromString(urlReturn, 'text/html');
		const thePage = htmlDoc.getElementById('ptr-main-element').querySelectorAll('[data-component="GroupMembers"]')[0];
		const jsonObject = JSON.parse(thePage.getAttribute('data-props'));
	  
		const allPersonResults = jsonObject.users;

		for (const personResult of allPersonResults) {
			const label = personResult.identity;
			const linkToUser = 'https://fetlife.com' + personResult.profileUrl;
			const usersName = personResult.nickname;
			const location = personResult.location;
		
			const userObject = { label: label, linkToUser: linkToUser, username: usersName, location: location }
		
			allUsers.push(userObject);
		}
		console.log('finished page: ' + i + ' Sleeping..');
		if (!forceStop) {
			sleep(DELAY_BETWEEN_REQUESTS);
		}
	}
}

console.log('DONE.');
