from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    return """
    <h1>My URL shortener</h1>
    <form action="/api/urls" method="post">
        <input type="url" name="url">
        <button type="submit">Shorten</button>
    </form>
    """


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0:5000")
