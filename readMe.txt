Backend Setup:-

step1 ...make package.json
  -> npm init -y
step2...install express
  ->npm i express

step3...install mongoose
  ->npm i mongoose

step4...install nodemon
  ->npm i nodemon

step5 ....install morgan for log
  ->npm install --save morgan 

step6 .....install jsonWebtoken
  ->npm i jsonwebtoken

step7 .....install bcrypt
  ->npm i bcrypt




  start mongo -> sudo systemctl start mongod
status check -> sudo systemctl status mongod
Enter terminal --> mongo -> enter

db.products.find().pretty()

mongo enter
show databases  --> show databases / show dbs
create database  --> use youtube   ...."youtube new database"
create collection -->db.createCollection("videos")   
                  -->db.createCollection("playlist")

show collection ---> show collections
delete collection --> db.videos.drop()

database delete  --> db.dropDatabase();

https://www.youtube.com/watch?v=0oXYLzuucwE&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q



port kill
lsof -i tcp:5000   -> kill -9 PID


nodemon start app.js