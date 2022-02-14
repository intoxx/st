ARG NODE_VERSION=17.5.0-alpine3.15

# Base
FROM node:${NODE_VERSION} AS base
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

# Build to /app/build
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# DEVELOPMENT
FROM build as DEVELOPMENT
CMD ["npm", "run", "dev"]

# PRODUCTION
FROM base as PRODUCTION
COPY --from=build /app/build build
RUN npm ci --production
CMD ["npm", "run", "start"]
