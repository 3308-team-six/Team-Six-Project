from flask import render_template
from flask import Flask, request, redirect, session, jsonify
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
    player_id = session.get('user_id')
    if player_id:
        scores = dbAPI.getTopTenPersonalScores('teamSix.db', player_id)
        print(scores)
        return render_template('myBestScore.html', scores=scores)
    return render_template('myBestScore.html', scores=[])

@app.route('/leaderboard')
@app.route('/Leaderboard')
def leaderboard():
    scores = dbAPI.getTopTenScores('teamSix.db')
    return render_template('leaderboard.html', scores=scores)

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
        user_id = dbAPI.addPlayer(db_filename, username, email)

        # Session
        if user_id:
            session['user_id'] = user_id
            session['username'] = username
            print("Signup successful, user logged in.")
            return redirect('/')

    return render_template('signup.html')

@app.route('/webgame')
def webgame():
    return render_template('webgame.html')

@app.route('/add_score', methods=['POST'])
def add_score():
    data = request.get_json()
    try:
        playerID = int(data['playerID'])
        playerName = data['playerName']
        score = int(data['score'])

        result = dbAPI.add_score_to_db('teamSix.db', playerID, playerName, score)
        return jsonify(result), 201
    except Exception as e:
        app.logger.error(f"Failed to add score: {e}")
        return jsonify({"message": f"Internal Server Error: {str(e)}", "status": "error"}), 500


if __name__ == '__main__':
    db_filename = 'teamSix.db'
    dbAPI.create(db_filename)
    app.run(debug=True)
