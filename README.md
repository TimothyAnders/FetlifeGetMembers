Fetlife Quick Script  
--------------------  
Browsing 'kinksters' can be tedious, especially if you're only interested in users under a certain label (E.G sub).  
This script allows you to search users in a city, and categorize them based on gender, label, ETC. Then you can do whatever you want with the results, such as viewing their profile.  


# Quick Start   
1) In a browser open fetlife and navigate to viewing kinksters in whichever city   
2) Copy the URL   
3) Change `URL_TO_VIEW_KINKSTERS` URL in the supplied script    
4) Run the script in the browser console     
5) Once the script is finished, type `allUsers` into the browsers console to get the results.  
6) Copy and paste the results into a file 
7) Open `process_results/index.js` and put your filepath in the `FILES` variable. It's an array so you can use multiple files or one
8) Run `process_results/index.js` using Node.JS. This will create a `results.sql` file  
9) Run the schema.sql and the results.sql to create a database table. You can use https://www.db-fiddle.com/ if you want.



If you run `select username, label FROM Users`, you can copy the results and use this find & replace in notepad++ to populate other fields:
find: `\| (.*?)[ ]+\| (\d+)([A-Z\/ ]*?) (.*?)[ ]+\|`
replace: `UPDATE Users SET age = \2 WHERE username = '\1'\;UPDATE Users SET gender = '\3' WHERE username = '\1'\;UPDATE Users SET shortTitle = '\4' WHERE username = '\1'\;`   
