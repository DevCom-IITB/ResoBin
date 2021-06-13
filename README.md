# [`ResoBin`](https://resobin.netlify.app/) - Easily Share Course Material

## Requirements

* **Frontend:** React + Redux, Styled Components  
* **Backend:** Python 3.6+, Django Rest Framework, PostgreSQL

## Getting started

### Frontend

* From the project dir, enter the `frontend` directory

    ```powershell
    cd frontend/
    ```

* To install all node modules and start the frontend React app, run:

    ```powershell
    yarn install
    yarn start
    ```

* Frontend server runs at [`http://localhost:3000`](http://localhost:3000)

### Backend

* From the project dir, enter the `backend` directory

    ```powershell
    cd backend/
    ```

* To create the virtual enviroment `env`, install all the required Python packages and start the Django backend, run:

    ```powershell
    python -m venv env
    env/Scripts/activate
    pip install -r requirements.txt
    python manage.py runserver
    ```

* Backend server runs at [`http://localhost:8000`](http://localhost:8000)
* Next, start the `PostgreSQL` database server and the `Django` backend server

    ```powershell
    pg_ctl -D "C:/Program Files/PostgreSQL/13/data" start
    ```

* Database server runs at [`http://localhost:5432`](http://localhost:5432)

## Note

* **Dont use `127.0.0.1` instead of `localhost`.** although they are identical, browser cookie management issues will occur.
