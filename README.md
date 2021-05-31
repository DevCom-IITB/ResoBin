# [`ResoBin`](https://resobin.netlify.app/) - Easily Share Course Material  

## Tools used

**Frontend:** React + Redux, Styled Components  
**Backend:** Django Rest Framework, PostgreSQL

## Setup

In the project directory, you can run:

### Install modules

```powershell
yarn install
pip install backend/requirements.txt
```

Installs all the required node modules for the frontend & backend.

### Start app

```powershell
> yarn start
> pg_ctl -D "C:\Program Files\PostgreSQL\13\data" start
> python backend/migrations.py runserver
```

Frontend server runs at [`http://localhost:3000`](http://localhost:3000)  
Database server runs at [`http://localhost:5432`](http://localhost:5432)  
Backend server runs at [`http://localhost:8000`](http://localhost:8000)  
