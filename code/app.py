from flask import render_template
from flask import Flask, request, redirect, session, flash
import dbAPI

app = Flask(__name__)
app.secret_key = 'teamSixKey'

## You can use the code below for Flask

#-- Updated the index route
@app.route('/')
def index():
    return render_template('index.html')


# app = Flask(__name__, static_folder='Space_Game')

# @app.route('/game')
# def game():
#     return render_template('webgame.html')

@app.route('/myBestScore')
@app.route('/mybestscore')
def myBestScore():
    return render_template('myBestScore.html')

@app.route('/leaderboard')
@app.route('/Leaderboard')
def leaderboard():
    return render_template('leaderboard.html')

@app.route('/gamerules')
def gamerules():
    return render_template('gamerules.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/sign-in', methods=['GET', 'POST'])
@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        if dbAPI.check_user_exists(db_filename, username, email):
            user_details = dbAPI.get_user_details(db_filename, username, email)
            if user_details:
                session['user_id'] = user_details[0]
                session['username'] = user_details[1]
                print("Login successful!")
                return redirect('/')
        else:
            print("User not found.")
            return render_template('signin.html')
    return render_template('signin.html')


@app.route('/sign-up', methods=['GET', 'POST'])
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        dbAPI.addPlayer(db_filename, username, email)
        return redirect('/')
    return render_template('signup.html')

## Database part

#dbName = 'teamSix.db' # Store my local scores
#dbAPI.create(dbName)

# @app.route('/add_score', methods=['POST'])
# def add_score():
#     # Add score to myScore table

if __name__ == '__main__':
    db_filename = 'teamSix.db'
    dbAPI.create(db_filename)
    app.run(debug=True)
