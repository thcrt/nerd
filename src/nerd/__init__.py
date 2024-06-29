import flask as f

def create_app() -> f.app:
    app = f.Flask(__name__)

    @app.route("/")
    def index() -> str:
        return f.render_template("index.jinja")

    return app
