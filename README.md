# Poly-Glot: A Shape-Based Word Game

## Background

I love the New York Times' Spelling Bee game (https://www.nytimes.com/puzzles/spelling-bee). There's just one problem: they only release one puzzle per day! How am I supposed to procrastinate without an infinite supply of word puzzles?

My solution is to build Poly-Glot, an application that builds customizable Spelling Bee-like word games.

The gameplay is simple. Poly-Glot displays a group of letters that you can use to spell words. Your words can use any of the letters as many times you like, but each word _must_ include the "key" letter shown in the center of the display. Words must be at least 4 letters long, and they can't be proper nouns. Obscure or specialized words might not be in the dictionary.

## Fuctionality and MVPs

### Minimum functionality

The application will need to do the following at minimum:

* Generate and display 7 unique letters
* Allow users to spell and submit words by typing or clicking on the letters
* Check whether each word meets general criteria (4+ letters, contains "key" letter, no extra letters)
* Check whether each word is in the dictionary

### Additional features

The project may also have additional functionality to make the game more pleasant:

* Give users a score based on how many words they've submitted
* Allow users to scramble the display (some words are easier to "see" after the letters are rearranged)
* Provide a descriptions of the rules
* Show an answer key once the player gives up

### Bonus features

The project can also be expanded to include more advanced features down the road:

* Allow users to adjust the number letters in the puzzle
* Allow users to adjust the "difficulty" of the game (i.e. the size of the wordbank)
* Use a dictionary API to display the definitions of words if you click them
* Provide a "loading" display while the puzzle is generated, if that takes a while

## Wireframe

![Wireframe of project](./assets/images/wireframe.png?raw=true "Wireframe")

## Technologies

This project will use:

* The Canvas API to render the letter polygons
* Webpack and Babel to bundle/transpile the Javascript
* A dictionary CSV file
* Eventually: a dictionary API to display word definitions

## Timeline

* **Friday and Weekend:** Build out essential logic for game. Write Javascript that will be able to (1) generate a sequence of 7 random unique letters, (2) use letters to generate wordbank from dictionary (in assets folder), (3) determine whether a submitted word is in the wordbank (etc.).

* **Monday:** Finish any leftover core logic work. Next, build barebones display for game. Should have letter grid, input bar, and delete button. Build out ability to click a letter or type it to spell a word.

* **Tuesday:** Build display of successfully submitted words. Build logic that will calculate and display score based on submitted words vs. total possible points. Work on initial styling. Can buttons shrink when clicked on (or typed)? Should there be a "ding" sound if your word is accepted?

* **Wednesday:** More styling and bug-testing. Prevent repeated words. Build a "scramble" button if there's time. Build a "New Game" button.

* **Thursday:** Practice demoing the application. Put on Github.