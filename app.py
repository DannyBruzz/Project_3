import os

import datetime as dt
import numpy as np
import pandas as pd

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



# Flask Setup
app = Flask(__name__)


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

# Calling individual commodity table
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

# Calling commodity
@app.route("/api/commodity/<searchTerm>")

def execute_read_query2(searchTerm):
    connection = create_connection()
    cursor = connection.cursor()
    result = None
    try:
        cursor.execute(r'SELECT * FROM commodities WHERE "Commodity" = ' + fr"'{searchTerm}'")
        result = cursor.fetchall()
        return jsonify(result)
    except OperationalError as e:
        print(f"The error '{e}' occurred")

def create_connection2():
    connection = None
    username = 'postgres'
    host = 'localhost'
    port = 5432
    database_name = 'project3_db'
    try:
        connection = psycopg2.connect(
            database=database_name,
            user=username,
            password=password,
            host=host,
            port=port,
        )
        print("Connection to PostgreSQL DB successful")
    except OperationalError as e:
        print(f"The error '{e}' occurred")
    return connection

# Set route : Map
@app.route("/download_api")
def api_view():
    return render_template("download_api.html")




if __name__ == "__main__":
    app.run(debug=True)