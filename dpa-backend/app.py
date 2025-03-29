from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) #this will enable cors for all the routes

#in memory storage for notes

notes = []
note_id = 1



@app.route("/notes",methods=["POST"])
def add_note():
    global note_id
    data = request.json
    if "title" not in data or "content" not in data:
        return jsonify({"error" : "Title and Content are required"}), 400
    
    note = {"id": note_id, "title": data["title"], "content": data["content"]}
    notes.append(note)
    note_id +=1 
    return jsonify(note), 201


@app.route("/notes", methods=["GET"])
def get_notes():
    return jsonify(notes)


@app.route("/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    global notes
    notes  = [note for note in notes if note["id"] != note_id] 
    return jsonify({"message" : "Note deleted"}), 201


if __name__ == "__main__":
    app.run(debug=True)



    

