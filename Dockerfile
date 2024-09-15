FROM node:20.17.0-alpine AS base
USER node

# development

FROM base AS development
COPY --chown=node:node ./package.json  /home/node/package.json
COPY --chown=node:node ./package-lock.json  /home/node/package-lock.json
RUN cd /home/node && \
    npm ci
COPY --chown=node:node . /home/node

# build

FROM base as build
COPY --chown=node:node ./package.json  /home/node/package.json
COPY --chown=node:node ./package-lock.json  /home/node/package-lock.json

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. 
# In the previous development stage we ran `npm ci` which installed all dependencies, so we
# can copy over the node_modules directory from the development image
COPY --from=development --chown=node:node /home/node/node_modules /home/node/node_modules
COPY --chown=node:node . /home/node

RUN cd /home/node && \
    npm run build

ENV NODE_ENV=production

# Running `npm ci` removes the existing node_modules directory and passing in 
# --only=production ensures that only the production dependencies are installed. This 
# ensures that the node_modules directory is as optimized as possible for the production image.
RUN cd /home/node && \
    npm ci --only=production && \
    npm cache clean --force

# production

FROM base AS production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /home/node/node_modules /home/node/node_modules
COPY --chown=node:node --from=build /home/node/dist /home/node/dist

# Start the server using the production build
CMD ["node", "/home/node/dist/main.js"]