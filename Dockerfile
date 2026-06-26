FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --production
COPY server/ ./
EXPOSE 10000
CMD ["node", "index.js"]
