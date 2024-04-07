from flask import Flask, render_template
# app.py
from flask_cors import CORS
from flask import Flask, request, jsonify, session
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask, request, jsonify
from twilio.rest import Client

app = Flask(__name__)

app.secret_key = 'abcdef123456'  # Change this to a random string
#app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)

CORS(app, supports_credentials=True)

uri = "mongodb+srv://sgokul1500:5MqHKxmL76NB1qNy@sihcluster.dnpyzbh.mongodb.net/?retryWrites=true&w=majority&appName=SIHCluster"
client = MongoClient(uri, server_api=ServerApi('1'), tls=True,tlsAllowInvalidCertificates=True)
db = client['SIHDatabase']
collection = db["emergencies"]

@app.route('/AgencySOS', methods=['GET'])
def agency_sos():
    agency_name = request.args.get('agency_name')
    # Fetch data from MongoDB based on agency name
    section1_data = collection.find({'status': 'Agency Has Been Notified', 'agencyName': agency_name})
    section2_data = collection.find({'status': 'Action Initiated', 'agencyName': agency_name})
    section3_data = collection.find({'status': 'Case Resolved', 'agencyName': agency_name})
    
    return render_template('agencyEmergencies.html', section1_data=section1_data,
                           section2_data=section2_data, section3_data=section3_data)


from flask import request, redirect

@app.route('/initiate_action', methods=['POST'])
def initiate_action():
    id = request.form['id']
    collection.update_one({'_id': id}, {'$set': {'status': 'Action Initiated'}})
    return {"success" : True}

@app.route('/mark_resolved', methods=['POST'])
def mark_resolved():
    id = request.form['id']
    collection.update_one({'_id': id}, {'$set': {'status': 'Case Resolved'}})
    return {"success" : True}

if __name__ == '__main__':
    app.run(debug=True,port=5002)
