from flask import Flask, jsonify, abort, render_template, request
from flask_cors import CORS
import json

app = Flask(__name__, static_folder='static')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/history')
def history():
    return render_template('history.html')

@app.route('/outline')
def outline():
    return render_template('outline.html')

@app.route('/location')
def location():
    return render_template('location.html')

@app.route('/certificate')
def certificate():
    return render_template('certificate.html')

@app.route('/news')
def news():
    return render_template('news.html')

@app.route('/modules')
def modules():
    return render_template('modules.html')


@app.route('/breadcrumb')
def breadcrumb():
    return render_template('breadcrumb.html')

@app.route('/product-info')
def product_info():
    return render_template('product-info.html')



def pagination(data, page, per_page):
    start_idx = (page - 1) * per_page
    end_idx = start_idx + per_page
    return data[start_idx:end_idx]

@app.route('/certificate-page')
def certificate_page():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 12))

    with open('static/data/certificate.json', 'r', encoding="utf-8") as f:
        data = json.load(f)
        data = data["certificate"]
        data = pagination(data, page, per_page)
        return jsonify(data)


@app.route('/product-data', methods=['GET'])
def product_data():
    id = request.args.get('id')
    id = int(id)
    with open('static/data/product.json', 'r', encoding="utf-8") as f:
        data = json.load(f)

        for product in data:
            if product.get("id") == id:
                return jsonify(product)
        else:
            abort(404)


@app.route('/product', methods=['GET'])
def product():
    category = request.args.get('category')
    sort_by = request.args.get('sort_by')

    if category not in ["Module", "Sensor", "TrafficSafety"]:
        abort(400)

    if sort_by not in ["Best", "New", "Asc", "Desc"]:
        abort(400)

    products = []
    with open('static/data/product.json', 'r', encoding="utf-8") as f:
        data = json.load(f)
        
        for product in data:
            if product.get("category") == category:
                products.append(product)
    

    if sort_by == "Best":
        products.sort(key=lambda x: x.get("type") != "Best")
    elif sort_by == "New":
        products.sort(key=lambda x: x.get("type") != "New")

    if sort_by in ["Asc", "Desc"]:
        products.sort(key=lambda x: x.get("name"))
        if sort_by == "Desc":
            products.reverse()

    return jsonify(products)
        



if __name__ == '__main__':
    app.run(debug=True, port=8080, host='0.0.0.0')




