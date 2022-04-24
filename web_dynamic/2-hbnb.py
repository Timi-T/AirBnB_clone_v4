#!/usr/bin/python3
"""
genrate content for places container
"""

from flask import Flask, render_template
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.user import User
from models.place import Place
import uuid


app = Flask(__name__)


@app.route('/2-hbnb', strict_slashes=False)
def places():
    """render places.html"""
    st = []
    pl = []
    amn = []
    usr = []
    all_states = storage.all(State)
    all_places = storage.all(Place)
    all_amenities = storage.all(Amenity)
    for k, v in all_states.items():
        st.append(v)
    for k, v in all_places.items():
        pl.append(v)
    for k, v in all_amenities.items():
        amn.append(v)
    cache_id = str(uuid.uuid4())
    return render_template("2-hbnb.html", states=st, places=pl,
                           cache_id=cache_id, amen=amn)


@app.teardown_appcontext
def close_session(response_or_exc):
    """close sqlalchemy session"""
    storage.close()


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
