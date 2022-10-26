import os

import datetime as dt
import numpy as np
import pandas as pd
import config
from config import password

import sqlalchemy
import psycopg2



from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import inspect

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import psycopg2
from psycopg2 import OperationalError


# Database Setup

# protocol = 'postgresql'
# username = 'postgres'
# password = password
# host = 'localhost'
# port = 5432
# database_name = 'project3_db'
# rds_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'
# engine = create_engine(rds_connection_string)
# conn = engine.connect()

# Flask Setup
app = Flask(__name__)

# app.config["SQLALCHEMY_DATABASE_URI"] = rds_connection_string
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# db = SQLAlchemy(app)

# # Create class
# class Mines(db.Model):
#     __tablename__ = "mindex_filtered_commodities_df"

#     id = db.Column(db.Integer, primary_key=True)
#     latitude = db.Column(db.Float, nullable=True)
#     longitude = db.Column(db.Float, nullable=True)

# Set route : Home
@app.route("/")
def index():
    return render_template('index.html')

# Set route : Map
@app.route("/map")
def map_view():
    return render_template("map.html")
# Set route : Dashboard
@app.route("/dashboard")
def dash_view():
    return render_template("dashboard.html")

# Set route : Dashboard
@app.route("/api/dashboard/<commodity>")

def execute_read_query(commodity):
    connection = create_connection()
    cursor = connection.cursor()
    result = None
    try:
        cursor.execute(f"SELECT * FROM {commodity}")
        result = cursor.fetchall()
        return jsonify(result)
    except OperationalError as e:
        print(f"The error '{e}' occurred")

def create_connection():
    connection = None
    username = 'postgres'
    host = 'localhost'
    port = 5432
    database_name = 'project3_db'
    try:
        connection = psycopg2.connect(
            database=database_name,
            user=username,
            password="64SonoCeliba!",
            host=host,
            port=port,
        )
        print("Connection to PostgreSQL DB successful")
    except OperationalError as e:
        print(f"The error '{e}' occurred")
    return connection
    
# for user in users:
#     print(user)
# def dash_view():
#     results = conn.session.query(commodities).all()

#     commodity = [result[0] for result in results]
#     price = [result[1] for result in results]
#     Q4 = [result[2] for result in results]
#     Q1 = [result[3] for result in results]
#     Q2 = [result[4] for result in results]
#     LQ = [result[5] for result in results]


#     com_data = [{
#         "mineral": commodity,
#         "price": price,
#         "Q4/22": Q4,
#         "Q1/23": Q1,
#         "Q2/23": Q2,
#         "Q3/23": LQ,
#     }]

#     return render_template("dashboard.html", jsonify(com_data))

# Set route : Map
@app.route("/download_api")
def api_view():
    return render_template("download_api.html")


if __name__ == "__main__":
    app.run(debug=True)