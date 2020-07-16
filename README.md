# expense_tracker
A expense tracker app with RESTful APIs and CRUD functions.  
Built with Node.js, Express, MongoDB, and Heroku.  
Check it here: https://still-caverns-42713.herokuapp.com/  

## Features
使用者可以：
- 在首頁一次瀏覽所有支出的清單
- 在首頁看到所有支出清單的總金額
- 新增一筆支出
- 編輯支出的所有屬性 (一次只能編輯一筆)
- 刪除任何一筆支出 (一次只能刪除一筆)
- 在首頁可依「類別」與「月份」篩選支出；總金額只會包括篩選出來的支出。

## Getting Started
These instructions will get you a copy of the project up and running on your local machine.  

### Prerequisites
- npm  
- MongoDB (and a database named `expenseTracker`)

### Installing
1. clone the project to your local machine  
2. run `npm install` under the project folder to install necessary packages for the app
3. run `npm run start` to start running the app
4. open the link: `http://localhost:3000` with your browser, then you can use the web app
5. press `ctrl + c` to stop running the app

### Generate Sample Data
1. run `npm run seed` to generate sample data
