rom flask import Flask, jsonify, request
import json

app = Flask(__name__)

with open('scraped_data.json') as f:
    data = json.load(f)

@app.route('/')
def index():
    field = request.args.get('field')
    if field and field in data:
        return jsonify({field: data[field]})
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
