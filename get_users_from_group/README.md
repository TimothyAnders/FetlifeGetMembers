Fetlife Get Users From Group
----------------------------
Script to get users from a Group. Very similar process.   

# Quick Start   
1) In a browser open fetlife and navigate to viewing kinksters in a group.  
2) Copy the URL   
3) Change `URL_TO_VIEW_KINKSTERS` URL in the supplied script    
4) Run the script in the browser console     
5) Once the script is finished, type `allUsers` into the browsers console to get the results.  
6) Copy and paste the results into a file 
7) Open `process_results/index.js` and put your filepath in the `FILES` variable. It's an array so you can use multiple files or one
8) Run `process_results/index.js` using Node.JS. This will create a `results.sql` file  
9) Run the schema.sql and the results.sql to create a database table. You can use https://www.db-fiddle.com/ if you want.  
