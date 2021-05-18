## Minesweeper
### Official DSA Project

## API Usage

### Run locally
### 1. Board Generating
- Run https://myapi-minesweeper.herokuapp.com/:UserFirstClick/:BombNumber/:ColumnNumber/:RowNumber

### 2. Leaderboard


## API Functions

### Board making
- [ ] Randomize bombs
- [ ] Generate values for board 
- [ ] Avoid bomb in first click
- [ ] Check and complete a 3x3 square
- [ ] BFS algorithm
  - [ ] Implement queue in js
  - [ ] Implement BFS using the queue

### Leader board
Summary: this leaderboard will be an object of JSON or string to save data.

- [ ] Singleton of leaderboard 
  - [ ] Add score record
  - [ ] Get 10 highest score records (sorting)
  - [ ] Search a user's name in a record (optional)

### Routings (HTTP response)
- [ ] Board
- [ ] User

## Web 
- [ ] Send HTTP request to get data
- [ ] Row and column calculating for display
- [ ] Novelty element for the game
- [ ] User click functions
  - Game
  - [ ] IsWin() -> boolean
  - [ ] IsLose() -> boolean
  - [ ] IsBomb(x, y) -> boolean
  - [ ] IsFlagged(x, y)
  - [ ] IsNumber(x, y) -> int [0 -> 8]
  - [ ] Expand3x3(x, y) -> int[][][] (array of position x, y) 
  - [ ] ExpandUntilBound(x, y) -> int[][][] (array of position x, y) 
  - Leaderboard
  - [ ] GetLeaderboard() -> string[] (return 10 highest score)
  - [ ] InsertRecord(object Record) 

