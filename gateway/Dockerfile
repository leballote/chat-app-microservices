FROM node:18-alpine as base
USER node
WORKDIR /app
COPY --chown=node:node package-lock.json .
COPY --chown=node:node ./package.json .
RUN npm ci
COPY --chown=node:node . .
RUN npm run compile


FROM node:18-alpine as production
USER node
WORKDIR /app
COPY --from=base --chown=nodea:node /app/package*.json .
RUN npm ci --only=production
COPY --from=base --chown=node:node /app/dist /app/dist
# COPY --from=base --chown=node:node /app/src/schema.gql /app/dist/src/
CMD [ "npm", "run", "start" ]
