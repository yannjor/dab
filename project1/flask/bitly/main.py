from flask import Flask, request, redirect, jsonify
from nanoid import generate
import psycopg2
from os import environ
from random import choice

app = Flask(__name__)


def connect_db():
    conn = psycopg2.connect(dbname=environ["PGDATABASE"],
                            user=environ["PGUSER"], password=environ["PGPASSWORD"])
    cur = conn.cursor()
    return conn, cur


@app.route("/")
def index():
    return """
    <h1>My URL shortener</h1>
    <form action="/api/urls" method="post">
        <input type="url" name="url">
        <button type="submit">Shorten</button>
    </form>
    """


@app.route("/api/urls", methods=["GET", "POST"])
def urls():
    conn, cur = connect_db()
    if request.method == "POST":
        original = request.form["url"]
        print(original)
        shortened = generate(size=8)
        cur.execute(
            "INSERT INTO urls (original, shortened) VALUES (%s, %s);", (original, shortened))
        conn.commit()
        cur.close()
        conn.close()
        return f"""
              <a href="{original}">{original}</a>
              is now at
              <a href="/{shortened}">/{shortened}</a>
            """
    else:
        cur.execute("SELECT * FROM urls;")
        urls = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(urls)


# TODO: fix
@app.route("/random")
def get_random():
    conn, cur = connect_db()
    cur.execute("SELECT * FROM urls;")
    urls = [t[0] for t in cur.fetchall()]
    cur.close()
    conn.close()
    return redirect(choice(urls))


@app.route("/<shortened>")
def get_original(shortened):
    conn, cur = connect_db()
    cur.execute(
        "SELECT original FROM urls WHERE shortened = %s;", (shortened,))
    original = cur.fetchone()[0]
    cur.close()
    conn.close()
    return redirect(original)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3000)
