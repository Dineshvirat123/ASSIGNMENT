# DevOps Scraper + Flask Hosting

## Build the Docker image
```bash
docker build --build-arg SCRAPE_URL=https://example.com -t scraper-app .
```

## Run the container
```bash
docker run -p 5000:5000 scraper-app
```

## Access the output
Visit: [http://16.170.242.165:5000](http://16.170.242.165:5000)

## Files
- `scrape.js` - Node scraper using Puppeteer
- `server.py` - Flask app that serves JSON
- `Dockerfile` - Multi-stage container
