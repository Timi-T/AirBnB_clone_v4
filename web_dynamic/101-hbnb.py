#!/usr/bin/python3
"""
script that starts a Flask web application:
- Use storage for fetching data from the storage engine
(FileStorage or DBStorage) => from models import storage and storage.all(...)
- After each request you must remove the current SQLAlchemy Session:
- Declare a method to handle @app.teardown_appcontext
- Call in this method storage.close()
Routes:
    - /hbnb_filters: display a HTML page with data from DBstorage
    (State, City and Amenity objects)
"""

from flask import Flask, render_template
from models import storage
from models.state import State
from models.amenity import Amenity
from models.place import Place
import uuid


app = Flask(__name__)
app.url_map.strict_slashes = False


@app.teardown_appcontext
def teardown(reponse_or_exc):
    """runs this method when app context tears down"""
    storage.close()


@app.route('/')
def hbnb():
    """Flask web application that /hbnb: display a HTML page
        with data from DBstorage"""
    state_dict = storage.all(State)
    amn_dict = storage.all(Amenity)
    place_dict = storage.all(Place)
    return render_template('101-hbnb.html', place_dict=place_dict,
                           state_dict=state_dict, amn_dict=amn_dict,
                           cache_id=uuid.uuid4())


if __name__ == "__main__":
    app.run(debug=True)
