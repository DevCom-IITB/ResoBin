# `ResoBin` - Easily Share Course Material

## Requirements

* React 17+

## Getting started

* Note: Enviroment variables are located [here](https://drive.google.com/drive/folders/1HCzepWZyzKJg0-yOyt4ZW46gO3z4-mHv?usp=sharing), and will only be accessible to the core developers.
* Before starting, make sure to [install Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable). Also, **avoid** using npm in this repository.

### Development

* Clone this repository

  ```powershell
  git clone https://github.com/wncc/ResoBin.git
  cd ResoBin
  ```

* Install dependencies:

  ```powershell
  yarn install
  ```

* Copy the environment variables to the base directory (current directory)
* Finally, run the development server:

  ```powershell
  yarn start
  ```

* The frontend server runs at [`http://localhost:3000`](http://localhost:3000), and might take a few minutes to start.

### Production

* Build the project

  ```powershell
  yarn build
  ```

* Serve the `/build` directory using your webserver (Nginx or Apache)

### Production (deployment with Docker)

* Build & tag the image file

  ```powershell
  docker build --rm -f Dockerfile -t resobin:latest .
  ```

* Run the image file

  ```powershell
  docker run --rm -d -p 80:80 resobin:latest
  ```

(Make sure @material-ui/core and react-cookie are installed)