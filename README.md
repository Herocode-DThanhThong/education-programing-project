# Education Programing Project With React, Springboot

## Requirements

* Nodejs 18.x.x
* Installed PostgreSQL
* Java 8 or newer

Clone project and run test.
```
$ git clone https://git_url_clone <project_dir>
$ cd <project_dir>
```

* Frontend:

Create an environment variable file .env in the root of the project and inside add:
```
REACT_APP_CLOUDINARY_UPLOAD_PRESET = "<Your cloud upload preset>"
REACT_APP_CLOUDINARY_UPLOAD_FOLDER = "<Your cloud upload folder>"
REACT_APP_CLOUDINARY_UPLOAD_CLOUD_NAME = "<Your cloud name>"
REACT_APP_CLOUDINARY_DOMAIN = "<Your cloud domain>"
```
Run application:
```
$ cd .\frontend
$ npm install
$ npm start
```

* Backend:

Create database ***lvtn*** in PostgreSQL before start application

```
$ cd .\backend
$ mvn package -DskipTests
$ mvn spring-boot:run
```

Navigate to http://localhost:3000/.


Author: Duong Thanh Thong


CV: https://drive.google.com/drive/folders/190jUh-ozh2P7mb8foC9DSZ9xAim0Zj9S?hl=vi

"On the path to success there is no footprint of the lazy!"

Thanks for watching!
