#Install <br />
npm install

#Start <br />
npm run start 

#requests <br />
http://localhost:5000/auth/registration - Регистрация <br />
Method - POST <br />
{
    "username": "",
    "password" : ""
} <br />

http://localhost:5000/auth/login - Логин <br />
Method - POST <br />
Тело запроса -
{
    "username" : "",
    "password" : ""
} 

ADD HEADER AFTER YOU LOGIN <br />
Add Header - {"authorization" : "Bearer { Your token }"} <br />

http://localhost:5000/auth/users - Получение всех пользователей (Доступно только Админу) <br />
Method - GET <br />


http://localhost:5000/auth/changeRole - Изменение роли (Доступно только админу) <br />
Method - POST <br />
{
    "admin_username" : "",
    "username" : "",
    "role" : ""
}

http://localhost:5000/branch/post - Создание филиала <br />
Method - POST <br />
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
Method - POST <br />
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
Method - DELETE <br />
{
    "name" : "",
    "inserter" : ""
}

http://localhost:5000/branch/get - Получение всех филиалов <br />
Method - POST <br />
{
    "inserter" : ""
}