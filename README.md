Colors
------

colors is a [node-canvas](https://github.com/Automattic/node-canvas) based color and gradient image API built
in [Node.js](http://nodejs.org).

<img src="https://i.imgur.com/TNuedJZ.jpg" align="right" height="100" width="100">

https://colors.christiansandor.com/avatar/gradient/colors <br>
You can use the **public API** available for free to generate your colored images, and avatars as it gives `100`
requests an hour for each user. You can modify this limit when you build your instance.

## API endpoints

The hosted version of this application is at <br>
https://colors.christiansandor.com

### Generate color images

```
/color/{color-like}
```

```
/gradient/{color-like}/{color-like}/{degree?}
```

### Generate avatars

```
/avatar/{hash}
```

```
/avatar/gradient/{hash}
```

### URL Parameters

- `color-like`: You can use these URL-enabled color-like strings:
    - `red`
    - `F00` or `FF0000` or `F00F` or `FF0000FF`
    - `hsl(50,100,50)` or `hsla(50,100,50,0.5)`
    - `rgb(255,10,70)` or `rgba(255,10,70,1)`
- `degree`: (*Optional*) Sets the rotation degree when generating a gradient. Can be any normal number `0-360`
- `hash`: Seed to generate the avatar color or gradient from. Use unique IDs or hashes only - always hash personal
          information with strong algorithms to protect your users.


### Query parameters

- `?text=...`: Adds a light text with dark shadow to the generated image.
- `?size=200` or `?size=200x300`: Sets the image dimensions to `200px` or sets the image height to `200px` and image width to `300px`
- `?format=json`: Get information about the colors provided

## Build from source

### Run in Docker

```
$ docker-compose up -d --build
```

The project contains a `Dockerfile` and a `docker-compose.yaml` file.
You need [Docker](https://www.docker.com) to be installed to call the script below.

The container have an exposed `80` port from the you can set a local port to, and then you'll be able to call the API.

### Run locally

Please head over to the [node-canvas](https://github.com/Automattic/node-canvas) repository first, and follow the
instructions in the **Compiling** section.


```
$ yarn install
```

```
$ yarn start
```


To use a specific host and / or port, you can set the `HOST` and `PORT` environment variables respectively.
Alternatively, create a `.env` file with the environment variables you'd wish to set.

## Original Authors

- Krisztian Sandor ([christiansandor](https://github.com/christiansandor))

## License

### colors

(The MIT License)

Copyright (c) 2019 Wanty, and contributors <[dev@wanty.app](mailto:dev@wanty.app)>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### BMP parser

See [license](bmp/LICENCE.md)

