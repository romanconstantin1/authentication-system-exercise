"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def handle_signup():

    request_user = request.get_json()
    new_user = User(email = request_user["email"], password = request_user["password"])
    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "message": "New user created successfully"
        }

    return jsonify(response_body), 200

@api.route('/login', methods=['GET'])
def handle_login():

    login_cred = request.get_json()
    response_body = {
        "message": "Login info received"
        }

    return jsonify(response_body, login_cred), 200