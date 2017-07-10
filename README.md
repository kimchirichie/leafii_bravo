# Leafolio

Leafolio is a node app that conveniently serves many different websites at the same time on a single server.

# Setup

To get started run the package manager to download the necessary modules

```sh
$ npm install
```

# Environment Variables

To change the port and set the environment to production the server requires the following envvars

```sh
$ export PORT=80
$ export NODE_ENV=production
```

# Production

To run the node server on background, there are two methods that can work. The first is the usual method using nohup

```sh
$ forever npm start bin/www
```
