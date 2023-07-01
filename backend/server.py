from flask import Flask

server = Flask(__name__)

@server.route("/")
def hello_world():
    return "<p>Hello, world</p>"


if __name__ == '__main__':
    server.run()
