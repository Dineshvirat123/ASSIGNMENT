# Stage 1: Scraper (Node.js)
FROM node:18-slim AS scraper

RUN apt update && apt install -y chromium \
    && apt clean && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app
COPY package.json .
RUN npm install
COPY scrape.js .

ARG SCRAPE_URL
ENV SCRAPE_URL=${SCRAPE_URL}
RUN node scrape.js

# Stage 2: Python Flask Server
FROM python:3.10-slim

WORKDIR /app

COPY --from=scraper /app/scraped_data.json . 
COPY server.py requirements.txt . 

RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["python", "server.py"]