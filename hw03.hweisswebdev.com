server {
	listen 80;
	listen [::]:80;

	root /home/hannah/www/hw03/build;

	index index.html;

	server_name hw03.hweisswebdev.com;

	location / {
		try_files $uri $uri/ =404;
	}
}
