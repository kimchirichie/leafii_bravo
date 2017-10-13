# Leafolio

Leafolio is a node app that conveniently serves many different websites at the same time on a single server.

# Setup

To get started run the package manager to download the necessary modules

```sh
$ npm install
```

# Production

To run the node server on background, there are two methods that can work. The first is the usual method using nohup

```sh
$ nohup meteor run --production
# [ctrl] + [z] // puts on stop in the background
$ bg
# [ctrl] + [d] // exits the ssh connection
```

The latter method is to use the forever module to run the script `bin/www`

```sh
$ forever npm start bin/www
```