#Install
npm install

#Start
npm run start 

#requests
http://localhost:5000/auth/registration - Регистрация <br />
{
    "username": "",
    "password" : ""
} <br />

http://localhost:5000/auth/login - Логин <br />
Тело запроса -
{
    "username" : "",
    "password" : ""
} <br />
http://localhost:5000/auth/users - Получение всех пользователей (Доступно только Админу) <br />
Method - GET

http://localhost:5000/auth/changeRole - Изменение роли (Доступно только админу) <br />
{
    "admin_username" : "",
    "username" : "",
    "role" : ""
} <br />
http://localhost:5000/branch/post - Создание филиала <br />
{
    "name" : "",
    "address" : "",
    "work_time" : "",
    "reduced_img" : file,
    "img" : file,
    "inserter" : "",
    "is_blocked" : ""
}
http://localhost:5000/branch/update - Обнавление филиала <br />
{
    "name" : "",
    "address" : "",
    "work_time" : "",
    "reduced_img" : file,
    "img" : file,
    "inserter" : "",
    "is_blocked" : ""
}
http://localhost:5000/branch/delete - Удаление филиала <br />
{
    "name" : "",
    "inserter" : ""
}
http://localhost:5000/branch/get - Получение всех филиалов <br />
{
    "inserter" : ""
}