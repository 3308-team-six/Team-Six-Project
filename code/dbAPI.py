
"""
This is the datasbase API for the Team Six Project
Last Modifeied: 3/17/2024 By: Patrick Sharp
"""


# Imports
import sqlite3
from datetime import datetime
import re




"""
@Parm db_filename: Name of the database file to open or create
@Return 0, Void Function, But returns 0 when working successfully
This function will connect to the database file given to create Player, Scores, and ___ tables if they do not exist already
Author(s): Patrick Sharp
Last Mofdified: 3/15/2024
"""
def create(db_filename: str):
    if type(db_filename) is not str or not db_filename:
        raise ValueError
    conn = sqlite3.connect(db_filename)
    c = conn.cursor()
    

    # The date will be stored as an VARCHAR in yy-mm-dd format
    # date will come from datetime.now() and only save the yyyy-mm-dd format as a string
    
    create_players_table =  """
                               CREATE TABLE IF NOT EXISTS Players
                               (playerID INTEGER PRIMARY KEY,
                                playerName CHAR(3),
                                lastLoginDate VARCHAR(10),
                                playerEmail VARCHAR(45)
                               );
                            """
    c.execute(create_players_table)
    
    
    create_scores_table =  """
                               CREATE TABLE IF NOT EXISTS Scores
                               (playerID INT,
                               score INT,
                               date CHAR(10), 
                               gameID INTEGER PRIMARY KEY
                               );
                            """ 
    c.execute(create_scores_table)
    
    
    create_games_table =  """
                               CREATE TABLE IF NOT EXISTS Games
                               (playerID INT,
                               time INT,
                               distance REAL,
                               date VARCHAR(10),
                               gameID INT
                               );
                            """
    c.execute(create_games_table)
    
     
    conn.commit()
    conn.close()
    return 0




"""
@Parm db_filename: Name of the database file to open or create
@Parm playerID: The playerID connected to the score being added
@Parm score: The players score achieved
@Return 0, Void Function, But returns 0 when working successfully
This function will connect to the database file given to add a players score to the Scores table in the DB
Author(s): Patrick Sharp
Last Mofdified: 3/15/2024
"""
def addScore(db_filename: str, playerID: int, score: int):
    
    if type(db_filename) is not str or not db_filename:
        raise ValueError
    if type(playerID) is not int or playerID <= 0:
        raise ValueError
    if type(score) is not int or score <= 0:
        raise ValueError
    
    # Grab the date YYYY-MM-DD format
    date = str(datetime.now())
    date = date[0:10] 
    
    
    conn = sqlite3.connect(db_filename)
    c = conn.cursor()
    addScores = f"""
                INSERT INTO Scores (playerID, score, date) VALUES
                ({playerID},
                 {score},
                 '{date}'
                );
               """
    c. execute(addScores)
    conn.commit()
    conn.close()
    return 0



"""
@Parm db_filename: Name of the database file to open or create
@Parm playerName: The player name used for storing scores
@Parm playerEmail: Email of the player
@Return 0, Void Function, But returns 0 when working successfully
This function will connect to the database file given to add a player to the Players table in the DB
Author(s): Patrick Sharp
Last Mofdified: 3/17/2024
"""
def addPlayer(db_filename: str, playerName: str, playerEmail: str):
    
    # Grab the date YYYY-MM-DD format
    date = str(datetime.now())
    date = date[0:10]
    
    if type(playerName) is not str or len(playerName) != 3:
        raise ValueError
    
    # Regex to check for valid email input
    emailRegex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    
    if  type(playerEmail) is not str or not (re.match(emailRegex, playerEmail)):
        raise ValueError
    
    conn = sqlite3.connect(db_filename)
    c = conn.cursor()
    
    
    addPlayer = f"""
                INSERT INTO Players (playerName, lastLoginDate, playerEmail) VALUES
                ('{playerName}',
                 '{date}',
                 '{playerEmail}'
                );
               """
    c. execute(addPlayer)
    conn.commit()
    conn.close()
    return 0