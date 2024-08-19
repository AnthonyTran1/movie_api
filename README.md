# myflix API

<!-- ABOUT THE PROJECT -->

## About The Project

I created an API that can display and search specific movies from an external movies database as well as create and delete users that can interact with the movies database.

Here's what I utilized:

- Express endpoints to organize different unique calls
- MongoDB Atlas for online deployment of Movies and User databases.
- Hashing passwords to protect user information
- JWT token generation for user validation

### Built With

Here is what tools I used to create this API.

- React
- React Express
- Mongoose
- MongoDB
- HTML
- Passport

## Table of Content for Endpoint calls

MyFlix API will be able to:

- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it's featured or not) about a single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username)
- Allow users to add a movie to their list of favorites (showing only a text that a movie has been added)
- Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed)
- Allow existing users to deregister (showing only a text that a user email has been removed)

## Endpoint Parameters and details

In depth details of endpoint calls such as Endpoint URL, Method Type, etc:

 <p>
 ------------------------------------------------------------------------------------------------<br />
      Return a list of ALL movies to the user <br />
      ------------------------------------------------------------------------------------------------<br />
      End Point URL: /movies <br />
      Method type: GET <br />
      Query parameters: none <br />
      Data format of request: none <br />
      Data format of method: JSON <br />
      Example Request: localhost:8080/movies <br />
      Example Response: <br />
      &ensp;[ <br />
      &ensp;&ensp;{ <br />
      &ensp;&ensp;&ensp; "Genre": { <br />
      &ensp;&ensp;&ensp;&ensp; "Name": "Thriller", <br />
      &ensp;&ensp;&ensp;&ensp; "Description": "Thriller film, also known as
      suspense film or suspense thrilller, is a broad film genre that involves
      excitement and suspense in the audience." <br />
      &ensp;&ensp;&ensp;},<br />
      ...<br />
      &ensp;&ensp;&ensp;"_id": "668d9bffbb165fd3b8e8e3e8",<br />
      &ensp;&ensp;&ensp; "Title": "Silence of the Lambs",<br />
      &ensp;&ensp;&ensp; "Description": "A young FBI cadet needs some help from
      a scary man",<br />
      ...<br />
      &ensp;] <br />
    </p>
    <p></p>
    <p>
    ------------------------------------------------------------------------------------------------<br />
      Return data (description, genre, director, image URL, whether it's
      featured or not) about a single movie by title to the user <br />
      ------------------------------------------------------------------------------------------------<br />
      End Point URL: /movies/[TITLE] <br />
      Method type: GET <br />
      Query parameters: [TITLE] is desired movie name <br />
      Data format of request: none <br />
      Data format of method: JSON Example Request: Example Request:
      localhost:8080/movies/John%20Wick <br />
      Example Response: <br />
      &ensp;{<br />
      &ensp;&ensp; "Genre": {<br />
      &ensp;&ensp;&ensp; "Name": "Thriller",<br />
      &ensp;&ensp;&ensp; "Description": "Thriller film, also known as suspense
      film or suspense thriller, is a broad fill genre that involves excitement
      and suspense in the audience."<br />
      &ensp;&ensp; },<br />
      &ensp;&ensp;"Director": {<br />
      &ensp;&ensp;&ensp; "Name": "Chad Stahelski",<br />
      &ensp;&ensp;&ensp; "Bio": "He kick boxed now he directs",<br />
      &ensp;&ensp;&ensp; "Birth": "1968",<br />
      &ensp;&ensp;&ensp; "Death": "2099"<br />
      &ensp;&ensp;},<br />
      &ensp;&ensp;"_id": "668da869bb165fd3b8e8e3e9",<br />
      &ensp;&ensp;"Title": "John Wick",<br />
      &ensp;&ensp;"Description": "An ex-hitman comes out of retirement to track
      down the gangsters who killed his dog and stole his car.",<br />
      &ensp;&ensp;"ImagePath": "johnwick1.png",<br />
      &ensp;&ensp;"Actors": [<br />
      &ensp;&ensp;&ensp; "Keanu Reeves"<br />
      &ensp;&ensp;],<br />
      &ensp;&ensp;"Featured": true<br />
      &ensp;}<br />
    </p>
    <p>
    ------------------------------------------------------------------------------------------------<br />
    Return data about a genre (description) by name/title (e.g.,
      “Thriller”)<br />
      ------------------------------------------------------------------------------------------------<br />
      End Point URL: /movies/genres/[GENRE_NAME] <br />
      Method type: GET <br />
      Query parameters: [GENRE_NAME] is desired movie genre <br />
      Data format of request: none <br />
      Data format of method: JSON <br />
      Example Request: localhost:8080/movies/genres/Fantasy <br />
      Example Response: <br />
      &ensp;{<br />
      &ensp;&ensp;"Name": "Fantasy",<br />
      &ensp;&ensp; "Description": "Fantasy films are films that belong to the
      fantasy genre with fantastic themes, usually, magic, supernatural events,
      mythology, folklore, or exotic fantasy worlds."<br />
      &ensp; }<br />
    </p>
    <p>
    ------------------------------------------------------------------------------------------------<br />
      Return data about a director (bio, birth year, death year) by name<br />
      ------------------------------------------------------------------------------------------------<br />
      End Point URL: /movies/directors/[DIRECTOR_NAME] <br />
      Method type: GET <br />
      Query parameters: [DIRECTOR_NAME] is desired director's name <br />
      Data format of request: none <br />
      Data format of method: JSON Data format of method: JSON <br />
      Example Request: localhost:8080/movies/directors/Chad%20Stahelski <br />
      Example Response: <br />
      &ensp;{<br />
      &ensp;&ensp; "Name": "Chad Stahelski",<br />
      &ensp;&ensp; "Bio": "He kick boxed now he directs",<br />
      &ensp;&ensp; "Birth": "1968",<br />
      &ensp;&ensp; "Death": "2099"<br />
      &ensp;}<br />
    </p>
    <p>
    ------------------------------------------------------------------------------------------------<br />
      Allow new users to register<br />
      ------------------------------------------------------------------------------------------------<br />
      End Point URL: /users <br />
      Method type: POST <br />
      Query parameters: none <br />
      Data format of request: JSON <br />
      Data format of method: JSON <br />
      Example Request: localhost:8080/users <br />
      Example user input: <br />
      &ensp;{<br />
      &ensp;&ensp;"Username": "anthonytest", <br />
      &ensp;&ensp;"Password": "password1", <br />
      &ensp;&ensp;"Email": "anthonytest@mail.com", <br />
      &ensp;&ensp;"Birthday": "01/26/1997" <br />
      &ensp;}<br />
      Example response: <br />
      &ensp;{<br />
      &ensp;&ensp; "Username": "anthonytest",<br />
      &ensp;&ensp;"Password": "password1",<br />
      &ensp;&ensp;"Email": "anthonytest@mail.com",<br />
      &ensp;&ensp;"Birthday": "1997-01-26T08:00:00.000Z",<br />
      &ensp;&ensp;"FavoriteMovies": [],<br />
      &ensp;&ensp;"_id": "669575f92ff07eac0704e641",<br />
      &ensp;&ensp;"__v": 0<br />
      &ensp;}<br />
    </p>
    <p>
    ------------------------------------------------------------------------------------------------<br />
      Allow users to update their user info (username)<br />
    ------------------------------------------------------------------------------------------------<br />
      End Point URL: /users/[USEERNAME] <br />
      Method type: PUT <br />
      Query parameters: [USERNAME] is user's username <br />
      Data format of request: JSON <br />
      Data format of method: JSON <br />
      Example Request: localhost:8080/users/anthonytest <br />
      Example user input: <br />
      &ensp;{<br />
      &ensp;&ensp;"Username": "anthonytest", <br />
      &ensp;&ensp;"Password": "password2", <br />
      &ensp;&ensp;"Email": "anthonytest1997@mail.com", <br />
      &ensp;&ensp;"Birthday": "01/26/1997" <br />
      &ensp;} <br />
      Example response: <br />
      &ensp;{<br />
      &ensp;&ensp;"_id": "669575f92ff07eac0704e641",<br />
      &ensp;&ensp; "Username": "anthonytest",<br />
      &ensp;&ensp;"Password": "password2",<br />
      &ensp;&ensp;"Email": "anthonytest1997@mail.com",<br />
      &ensp;&ensp;"Birthday": "1997-01-26T08:00:00.000Z",<br />
      &ensp;&ensp;"FavoriteMovies": [],<br />
      &ensp;&ensp;"__v": 0<br />
      &ensp;}<br />
    </p>
    <p>
    ------------------------------------------------------------------------------------------------<br />
      Allow users to add a movie to their list of favorites (showing only a
      text that a movie has been added)<br />
      ------------------------------------------------------------------------------------------------<br />
      End Point URL: /users/[USERNAME]/movies/[MOVIE_ID] <br />
      Method type: POST <br />
      Query parameters: [USERNAME] is user's username, [MOVIE_ID] is new
      favorite movie ID<br />
      Data format of request: none<br />
      Data format of method: STRING;<br />
      Example Request:
      localhost:8080/users/anthonytest/movies/668da869bb165fd3b8e8e3e9 <br />
      Example response: <br />
      &ensp;{<br />
      &ensp;&ensp;"_id": "669575f92ff07eac0704e641",<br />
      &ensp;&ensp; "Username": "anthonytest",<br />
      &ensp;&ensp;"Password": "password2",<br />
      &ensp;&ensp;"Email": "anthonytest1997@mail.com",<br />
      &ensp;&ensp;"Birthday": "1997-01-26T08:00:00.000Z",<br />
      &ensp;&ensp;"FavoriteMovies": [<br />
      &ensp;&ensp;&ensp;"668da869bb165fd3b8e8e3e9"<br />
      &ensp;&ensp;],<br />
      &ensp;&ensp;"__v": 0<br />
      &ensp;}<br />
    </p>
    <p>
    ------------------------------------------------------------------------------------------------<br />
      - Allow users to remove a movie from their list of favorites (showing only
      a text that a movie has been removed)<br />
    ------------------------------------------------------------------------------------------------<br />
      End Point URL: /users/[USERNAME]/movies/[MOVIE_TITLE] <br />
      Method type: DELETE <br />
      Query parameters: [USERNAME] is user's username, [MOVIE_TITLE] is movie
      title being removed<br />
      Data format of request: none<br />
      Data format of method: STRING; <br />
      Example Request: localhost:8080/users/anthonytest/movies/668da869bb165fd3b8e8e3e9 <br />
      Example response: <br />
      &ensp;{<br />
      &ensp;&ensp;"_id": "669575f92ff07eac0704e641",<br />
      &ensp;&ensp; "Username": "anthonytest",<br />
      &ensp;&ensp;"Password": "password2",<br />
      &ensp;&ensp;"Email": "anthonytest1997@mail.com",<br />
      &ensp;&ensp;"Birthday": "1997-01-26T08:00:00.000Z",<br />
      &ensp;&ensp;"FavoriteMovies": [],<br />
      &ensp;&ensp;"__v": 0<br />
      &ensp;}<br />
    </p>
    <p>
    ------------------------------------------------------------------------------------------------<br />
      - Allow existing users to deregister (showing only a text that a user
      email has been removed)<br />
    ------------------------------------------------------------------------------------------------<br />  
      End Point URL: /users/[USERNAME] <br />
      Method type: DELETE <br />
      Query parameters: [USERNAME] is user's username<br />
      Data format of request: none<br />
      Data format of method: STRING; <br />
      Example Request: localhost:8080/users/anthonytest <br />
      Example response: <br />
      anthonytest was deleted. <br />
    </p>

</p>
