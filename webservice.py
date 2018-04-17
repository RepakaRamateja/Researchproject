from flask import Flask , jsonify

app = Flask(__name__)


treeData ={

    "name": "BU Head",
    "children": [
        {
            "name": "Manager",
            "children": [
                {
                    "name": "Team Lead",
                    "children": []
                },
                {
                    "name": "Team Lead",
                    "children": []
                }
            ]
        },
        {
            "name": "Manager",
            "children": []
        }
    ]
}






@app.route('/todo/api/v1.0/tasks', methods=['GET'])
def get_tasks():
    return jsonify({'treeData': treeData})




if __name__ == '__main__':
    app.run(debug=True)
