# myflix

This API will be able to:

- Return a list of ALL movies to the user
  End Point URL: /movies
  Method type: GET
  Query parameters: none
  Data format of request: none
  Data format of method: JSON
  Example Request: localhost:8080/movies
  Example Response:
   [
    {
      "Genre": {
       "Name": "Thriller",
       "Description": "Thriller film, also known as suspense film or suspense thrilller, is a broad film genre that involves excitement and suspense in the audience."
     },
  ...
     "_id": "668d9bffbb165fd3b8e8e3e8",
      "Title": "Silence of the Lambs",
      "Description": "A young FBI cadet needs some help from a scary man",
  ...
   ]
- Return data (description, genre, director, image URL, whether it's featured or not) about a single movie by title to the user
  End Point URL: /movies/[TITLE]
  Method type: GET
  Query parameters: [TITLE] is desired movie name
  Data format of request: none
  Data format of method: JSON Example Request: Example Request: localhost:8080/movies/John%20Wick
  Example Response:
   {
     "Genre": {
      "Name": "Thriller",
      "Description": "Thriller film, also known as suspense film or suspense thriller, is a broad fill genre that involves excitement and suspense in the audience."
     },
    "Director": {
      "Name": "Chad Stahelski",
      "Bio": "He kick boxed now he directs",
      "Birth": "1968",
      "Death": "2099"
    },
    "\_id": "668da869bb165fd3b8e8e3e9",
    "Title": "John Wick",
    "Description": "An ex-hitman comes out of retirement to track down the gangsters who killed his dog and stole his car.",
    "ImagePath": "johnwick1.png",
    "Actors": [
      "Keanu Reeves"
    ],
    "Featured": true
   }
- Return data about a genre (description) by name/title (e.g., “Thriller”)
  End Point URL: /movies/genres/[GENRE_NAME]
  Method type: GET
  Query parameters: [GENRE_NAME] is desired movie genre
  Data format of request: none
  Data format of method: JSON
  Example Request: localhost:8080/movies/genres/Fantasy
  Example Response:
   {
    "Name": "Fantasy",
     "Description": "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually, magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
    }
- Return data about a director (bio, birth year, death year) by name
  End Point URL: /movies/directors/[DIRECTOR_NAME]
  Method type: GET
  Query parameters: [DIRECTOR_NAME] is desired director's name
  Data format of request: none
  Data format of method: JSON Data format of method: JSON
  Example Request: localhost:8080/movies/directors/Chad%20Stahelski
  Example Response:
   {
     "Name": "Chad Stahelski",
     "Bio": "He kick boxed now he directs",
     "Birth": "1968",
     "Death": "2099"
   }
- Allow new users to register
  End Point URL: /users
  Method type: POST
  Query parameters: none
  Data format of request: JSON
  Data format of method: JSON
  Example Request: localhost:8080/users
  Example user input:
   {
    "Username": "anthonytest",
    "Password": "password1",
    "Email": "anthonytest@mail.com",
    "Birthday": "01/26/1997"
   }
  Example response:
   {
     "Username": "anthonytest",
    "Password": "password1",
    "Email": "anthonytest@mail.com",
    "Birthday": "1997-01-26T08:00:00.000Z",
    "FavoriteMovies": [],
    "\_id": "669575f92ff07eac0704e641",
    "\_\_v": 0
   }
- Allow users to update their user info (username)
  End Point URL: /users/[USEERNAME]
  Method type: PUT
  Query parameters: [USERNAME] is user's username
  Data format of request: JSON
  Data format of method: JSON
  Example Request: localhost:8080/users/anthonytest
  Example user input:
   {
    "Username": "anthonytest",
    "Password": "password2",
    "Email": "anthonytest1997@mail.com",
    "Birthday": "01/26/1997"
   }
  Example response:
   {
    "\_id": "669575f92ff07eac0704e641",
     "Username": "anthonytest",
    "Password": "password2",
    "Email": "anthonytest1997@mail.com",
    "Birthday": "1997-01-26T08:00:00.000Z",
    "FavoriteMovies": [],
    "\_\_v": 0
   }
- Allow users to add a movie to their list of favorites (showing only a text that a movie has been added)
  End Point URL: /users/[USERNAME]/movies/[MOVIE_ID]
  Method type: POST
  Query parameters: [USERNAME] is user's username, [MOVIE_ID] is new favorite movie ID
  Data format of request: none
  Data format of method: STRING;
  Example Request: localhost:8080/users/anthonytest/movies/668da869bb165fd3b8e8e3e9
  Example response:
   {
    "\_id": "669575f92ff07eac0704e641",
     "Username": "anthonytest",
    "Password": "password2",
    "Email": "anthonytest1997@mail.com",
    "Birthday": "1997-01-26T08:00:00.000Z",
    "FavoriteMovies": [
     "668da869bb165fd3b8e8e3e9"
    ],
    "\_\_v": 0
   }
- Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed)
  End Point URL: /users/[USERNAME]/movies/[MOVIE_TITLE]
  Method type: DELETE
  Query parameters: [USERNAME] is user's username, [MOVIE_TITLE] is movie title being removed
  Data format of request: none
  Data format of method: STRING;
  Example Request: localhost:8080/users/anthonytest/movies/668da869bb165fd3b8e8e3e9
  Example response:
   {
    "\_id": "669575f92ff07eac0704e641",
     "Username": "anthonytest",
    "Password": "password2",
    "Email": "anthonytest1997@mail.com",
    "Birthday": "1997-01-26T08:00:00.000Z",
    "FavoriteMovies": [],
    "\_\_v": 0
   }
- Allow existing users to deregister (showing only a text that a user email has been removed)
  End Point URL: /users/[USERNAME]
  Method type: DELETE
  Query parameters: [USERNAME] is user's username
  Data format of request: none
  Data format of method: STRING;
  Example Request: localhost:8080/users/anthonytest
  Example response:
  anthonytest was deleted.

      <table>
        <tr>
          <th>Request</th>
          <th>URL</th>
          <th>METHOD</th>
        </tr>
        <tr>
          <td>Get a list of movies</td>
          <td>/movies</td>
          <td>GET</td>
        </tr>
        <tr>
          <td>Get data about a single movie by title</td>
          <td>/movies/[TITLE]</td>
          <td>GET</td>
        </tr>
        <tr>
          <td>Get genre data by name/title</td>
          <td>/movies/genres/[GENRE_NAME]</td>
          <td>GET</td>
        </tr>
        <tr>
          <td>Get data about a director by name</td>
          <td>/movies/directors/[DIRECTOR_NAME]</td>
          <td>GET</td>
        </tr>
        <tr>
          <td>Add new user</td>
          <td>/users</td>
          <td>POST</td>
        </tr>
        <tr>
          <td>Update user information</td>
          <td>/users/[USERNAME]</td>
          <td>PUT</td>
        </tr>
        <tr>
          <td>Add a movie to user's favorite list</td>
          <td>/users/[USERNAME]/movies/[MOVIE_ID]</td>
          <td>POST</td>
        </tr>
        <tr>
          <td>Remove a movie from user's favorite list</td>
          <td>/users/[USERNAME]/movies/[MOVIE_ID]</td>
          <td>DELETE</td>
        </tr>
        <tr>
          <td>Deregister an existing user</td>
          <td>/users/[USERNAME]</td>
          <td>DELETE</td>
        </tr>
      </table>

    </body>
  </html>
