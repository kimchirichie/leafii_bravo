# Leafolio

Leafolio is a node app that conveniently serves many different websites at the same time on a single server.

# Prereq

If you are running Ubuntu run the following. If not, use your own package manager:

```sh
# apt update
# apt upgrade
# apt -y install nginx socat
```

For npm, take it from the source (or later versions if it becomes available):

```sh
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
# apt -y install nodejs
# npm install -g npm
```

# Setup

To get started run the package manager to download the necessary modules

```sh
$ npm install
```

# Environment Variables

To change the port and set the environment to production the server requires the following envvars

```sh
$ export PORT=80
$ export ENV=production
```

# Production

To run the node server on background, use a node module called forever:

```sh
$ sudo npm install -g forever
```

Then start the node server through forever:

```sh
$ forever npm start bin/www
```

# HTTPS with nginx ssl


ACME.sh is a free Automated Certificate Management Environment that registers certificates through Let's Encrypt Certificate Authority. To install run:

```sh
# curl https://get.acme.sh | sh
```


To simplify setup, we use standalone method of registering the domain to our IP. Remembering that the standalone procedure requires port 80 to be open, we simply use `--httpport` to specify an alternate port:

```sh
$ sudo su
# service nginx stop
# acme.sh --issue --standalone --httpport 88 -d example.com -d www.example.com
# service nginx start
```

for example:

```
# acme.sh --issue --standalone -d richtutoring.com -d www.richtutoring.com -d cminshull.com -d kimchirichie.com -d scarlettminshull.com -d sminshull.com -d money.kimchirichie.com
```

which will store the generated files in `~/.acme.sh/example.com/`. Copy the folder into `/var/www/cert/` and change permissions. Proceed to specify the cert and key paths in `nginx.conf` reference guides to [setup nginx ssl](http://nginx.org/en/docs/http/configuring_https_servers.html) and [forward http to https](https://www.bjornjohansen.no/redirect-to-https-with-nginx). Then reload nginx server

```sh
# cp -r ~/.acme.sh/example.com /var/www/cert/
# chmod -R 660 /var/www/cert/example.com
...
    ##modify nginx.conf
...
# service nginx reload
```

if the setup was successful, nginx will now be using SSL (TLS) to encrypt http communications. However this environment does not renew the certificate automatically. To setup auto-renew run the acme script again

```sh
acme.sh --install-cert -d example.com
  --key-file       /var/www/cert/example.com/example.com.key
  --fullchain-file /var/www/cert/example.com/fullchain.cer
  --reloadcmd     "service nginx force-reload"
```

for example:

```sh
acme.sh --install-cert -d richtutoring.com -d www.richtutoring.com -d cminshull.com -d kimchirichie.com -d scarlettminshull.com -d sminshull.com -d money.kimchirichie.com
  --key-file /var/www/cert/richtutoring.com/richtutoring.com.key
  --fullchain-file /var/www/cert/richtutoring.com/fullchain.cer
  --reloadcmd "service nginx force-reload"
```

This will auto-renew the certificate every 60 days by default.
