import os

import datetime as dt
import numpy as np
import pandas as pd

import sqlalchemy
import psycopg2

import config

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import inspect

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

# Database Setup
protocol = 'postgresql'
username = 'postgres'
password = config.password
host = 'localhost'
port = 5432
database_name = 'project3_db'
rds_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'
engine = create_engine(rds_connection_string)
conn = engine.connect()

# Flask Setup
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = rds_connection_string
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

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

# Set route : Map
@app.route("/download_api")
def api_view():
    return render_template("download_api.html")


if __name__ == "__main__":
    app.run(debug=True)