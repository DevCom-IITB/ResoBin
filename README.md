# [`ResoBin`](https://resobin.netlify.app/) - Easily Share Course Material  

## Tools used

**Frontend:** React + Redux, Styled Components  
**Backend:** Django Rest Framework, PostgreSQL

## Setup

### Frontend

* In the project directory, you can run

    ```powershell
    yarn install
    yarn start
    ```

* This will install all required frontend dependencies and start the app
* Frontend server runs at [`http://localhost:3000`](http://localhost:3000)

### Backend

* First, enter the `backend` directory

    ```powershell
    cd backend/
    ```

* Then you can run:

    ```powershell
    python -m venv env
    env/Scripts/activate
    pip3 install -r requirements.txt
    ```

* This will create a Python virtual enviroment `env`, and install the required backend packages.
* Next, start the `PostgreSQL` database server and the `Django` backend server

    ```powershell
    pg_ctl -D "C:/Program Files/PostgreSQL/13/data" start
    python3 "backend/migrations.py" runserver
    ```

* Backend server runs at [`http://localhost:8000`](http://localhost:8000)
* Database server runs at [`http://localhost:5432`](http://localhost:5432)
