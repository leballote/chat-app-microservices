FROM node:18-alpine as build
USER node
WORKDIR /app
COPY --chown=node:node package*.json .
RUN npm ci
COPY --chown=node:node . .
RUN npm run build

#TODO: should I change user to not use root?
FROM nginx:1.23.2-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# COPY --from=build /app/replaceWsURLToken.sh /bin/
# RUN chmod +x /bin/replaceWsURLToken.sh
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
#TODO: do this less kubernetes dependent
# CMD [ "sh", "-c", "/bin/replaceWsURLToken.sh $FRONT_IP", "&&" , "nginx", "-g", "daemon off;" ]
CMD [ "nginx", "-g", "daemon off;" ]
