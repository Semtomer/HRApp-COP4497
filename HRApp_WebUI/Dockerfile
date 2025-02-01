FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY . /usr/share/nginx/html

# Add bash
RUN apk add --no-cache bash

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY env.kuika .

# Make our shell script executable
RUN chmod +x env.sh


EXPOSE 3000
CMD ["sh", "-c", "sh /usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
