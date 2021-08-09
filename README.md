# [`ResoBin`](https://resobin.netlify.app/) - Easily Share Course Material

## Requirements

* React 16.8+

## Getting started

### Development

* Install required modules:

  ```powershell
  yarn install
  ```

* Run development server:

  ```powershell
  yarn start
  ```

* Frontend server runs at [`http://localhost:3000`](http://localhost:3000)

### Production (deployment with Docker)

* Build & tag the image file

  ```powershell
  docker build --rm -f Dockerfile -t resobin:latest .
  ```

* Run the image file

  ```powershell
  docker run --rm -d -p 80:80 resobin:latest
  ```
