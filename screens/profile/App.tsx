import React from 'react'
import PropTypes from 'prop-types'

const contactData = {
  "name": "Darrell Schmeler",
  "username": "Leola_VonRueden",
  "address": {
    "streetA": "Abbott Shoals",
    "streetB": "505 Winona Place",
    "streetC": "4306 Hudson Street Suite 875",
    "streetD": "Suite 489",
    "city": "Ginatown",
    "state": "Massachusetts",
    "country": "Nepal",
    "zipcode": "41428-0189",
    "geo": {
      "lat": "-75.8513",
      "lng": "81.3262"
    }
  },
  "company": {
    "name": "Streich, Harber and Hilpert",
    "catchPhrase": "Team-oriented hybrid neural-net",
    "bs": "user-centric embrace vortals"
  },
  "avatar": "https://pbs.twimg.com/profile_images/909953369694859265/BOakwKQY_400x400.jpg",
  "avatarBackground":
    "https://orig00.deviantart.net/dcd7/f/2014/027/2/0/mountain_background_by_pukahuna-d73zlo5.png",
  "tels": [
    { "id": 1, "name": "Mobile", "number": "" },
    { "id": 2, "name": "E-mail", "number": "" }
  ],
  "emails": [
    { "id": 1, "name": "Personal", "email": "elsie-goodman@mail.com" },
    { "id": 2, "name": "Work", "email": "elsie@work.com" }
  ]
};

import Profile from './Profile'

export const ProfileScreen = () => 
  <Profile {...contactData} />

// ProfileScreen.navigationOptions = () => ({
//   header: null,
// })

// ProfileScreen.propTypes = {
//   navigation: PropTypes.object.isRequired,
// }