# app.py
from flask_cors import CORS
from flask import Flask, request, jsonify, session
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask, request, jsonify
from twilio.rest import Client

uri = "mongodb+srv://sgokul1500:5MqHKxmL76NB1qNy@sihcluster.dnpyzbh.mongodb.net/?retryWrites=true&w=majority&appName=SIHCluster"
client = MongoClient(uri, server_api=ServerApi('1'), tls=True,tlsAllowInvalidCertificates=True)
db = client['SIHDatabase']
users_collection = db["users"]

app = Flask(__name__)
app.secret_key = 'abcdef123456'  # Change this to a random string
#app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)

CORS(app, supports_credentials=True)

@app.route('/getUsers',methods=['GET'])
def getUsers():
    # Perform the database query and directly convert to JSON array
    user = users_collection.find_one({})  # Exclude _id field
    session['user_id'] = str(user['_id'])
    session.modified = True
    return user["username"]
    

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    password = data['password']
    contact = data['contact']
    email = data['email']
    address = data['address']
    print("data is",data)

    # Check if username already exists
    existing_user = users_collection.find_one({'username': username})
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 400

    # Hash the password before storing in the database
    hashed_password = generate_password_hash(password)

    # Insert new user into the database
    new_user = {
        'username': username,
        'password': hashed_password,
        'contact' : contact,
        'email' :email,
        'address' : address
                }
    users_collection.insert_one(new_user)

    return jsonify({'message': 'User registered successfully'}), 201

#otp verification

# Your Twilio account SID and auth token
account_sid = 'ACc148c8c371fbcc099a39816940037a12'
auth_token = '7026a2886c30eeac8f1680542f7ea697'
twilio_phone_number = '+16508305627'

# # Initialize Twilio client
client = Client(account_sid, auth_token)

# # Endpoint for sending SMS messages
@app.route('/send-sms', methods=['POST'])
def send_sms():
    data = request.get_json()
    to_number = "+91" + str(data['to'])
    otp = data['otp']

    try:
        # Send SMS message
        message = client.messages.create(
            body=f"This is your otp {otp}",
            from_=twilio_phone_number,
            to=to_number
        )
        return jsonify({'success': True, 'message_sid': message.sid}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500



@app.route('/login', methods=['GET'])
def login():
    #data = request.json
    username = request.args.get('username')
    password = request.args.get('password')

    # Find the user in the database
    user = users_collection.find_one({'username': username})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid username or password'}), 401

    # Store the user's ID in the session
    session['user_id'] = str(user['_id'])
    session.modified = True

    print(session)

    return jsonify({'message': 'Login successful'}), 200


@app.route('/logout', methods=['POST'])
def logout():
    # Remove user ID from session
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200


@app.route('/profile', methods=['GET'])
def profile():
    # Check if user is logged in
    if 'user_id' not in session:
        return jsonify({'message': 'You are not logged in'}), 401

    # Find user by ID
    user_id = session['user_id']
    user = users_collection.find_one({'_id': ObjectId(user_id)})
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Return user profile information
    return jsonify({
        'username': user['username'],
        'contact' :user['contact'],
        'email':user['email'],
        'address':user['address']
        
    }), 200


if __name__ == '__main__':
    app.run(debug=True)
