"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

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
    new_user = User(email=request_user["email"],
                    password=request_user["password"])

    db.session.add(new_user)
    db.session.commit()
    print(new_user.serialize())

    # This is the token creation
    # token = create_access_token(identity=new_user.email)

    response_body = {
        "message": "New user created successfully"
    }

    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def handle_login():

    login_cred = request.get_json()
    email = login_cred['email']
    user = User.query.filter_by(email=email).first()

    if user:
        # This is the token creation
        token = create_access_token(identity=email)

        body = {
            "user": user.serialize(),
            "token": token
        }

        return jsonify(body), 200

    """
    if user:
        print(f"{login_cred['email']} is in the db")
    else:
        print(f"user does not exist")
    """

    response_body = {
        "message": "User not found"
    }

    return jsonify(response_body), 404


@api.route("/check", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_email = get_jwt_identity()
    user = User.query.filter_by(email=current_email).first()

    return jsonify(user.serialize()), 200
