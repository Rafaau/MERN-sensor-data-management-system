# MERN STACK 

```
...\server > npm i 
...\client > npm i --force  //because of react-chartjs-3' vulnerability 
```

You will need to setup few services such as **Google API** (for log in by Google), **Meta for developers** (for log in by Facebook), **Dropbox** (for upload files from cloud) and **EmailJS** (for email confirmation).  
The .env file in ./client directory should look like this:
![alt text](https://i.imgur.com/wr96TlI.png)
If you don't want these features, you can use seeded account dedicated for e2e testing, to log in:

**EMAIL:** `Test@test.com`\
**PASSWORD:** `Test`


Screenshot:
![alt text](https://i.imgur.com/PxVXJjS.png)
