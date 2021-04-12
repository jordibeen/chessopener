# React-Redux frontend for www.chessopener.com

<img width="1792" alt="chessopener-1" src="https://user-images.githubusercontent.com/9075454/114386832-07017a80-9b92-11eb-8314-aae228061e53.png">

# Features
- A searchable openings database of 3000+- records 
- A detailed page for every opening, containing lines and continuations
- Lichess' statistics for every opening (such as amount played, average rating and win distribution)
- Lichess' recent top rated games for every opening (to find out what to do next after the first few moves)
- An exploration board to explore opening lines by playing moves

# Requirements
This application requires the [chessopener api](https://github.com/JordiBeen/chessopener_api) to be running.

# Installation
Run `npm i`

Make sure the API is running, if it is not running on localhost:7000, make sure the REACT_APP_API_BASEURL is set correctly in your package.json file.

Run `npm run start`
