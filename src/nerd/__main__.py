from waitress import serve

from nerd import create_app

def main():
    app = create_app()
    serve(app, host="0.0.0.0", port=8080)

if __name__ == "__main__":
    main()    