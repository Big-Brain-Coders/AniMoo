## The Problem at Hand

Due to the Covid-19 pandemic, many people were required to quarantine and social distance, resulting in limited social interaction and a decline in mental health among communities. This has lead to problems such as: <br>
- Worse mental health outcomes
- Increased substance abuse
- Higher tendencies for suicidal thoughts
College students are also having difficulty socializing through online classes due to the limitations of Zoom and in-person hangouts. 
<br>
Because of this, watching anime, netflix, and movies has become an incredibly common pastime. 

## Description
_**AniMoo**_ is a social media platform centered around discussing TV shows and movies. The title is wordplay on anime (Japanese animation) and movies (hence AniMoo).
With AniMoo, users will be able to add friends to see what kind of shows they like to watch, discuss plot twists from the latest episode of the hot new series, and track who’s the
biggest Netflix addict among the friend group. We realized that being able to discuss your favorite anime and shows amongst is a great way to establish connections and build friendships. Sharing the same excitement and passion for a show with someone can create a unique bond that can last a lifetime. 
With our application AniMoo, we hope to create those connections and bonds between students that would otherwise be lacking due to the limitations of online education. 

## Benefits
The goal of _**AniMoo**_ was to create an application that allowed anime lovers and show bingers to gather and interact with one another. We wanted to create a virtual environment where users can build communities and bonds amongst each other to discuss their favorite shows.

### Students
Although our application is designed for a variety of audience, the target audience in mind at the time AniMoo was envisioned were students. Being students ourselves, we can relate to the frustration that many college students experience due to the lack of social interaction since switching to online education. Due to the combination of a busy schedule from taking college courses and staying home due to the Covid-19 pandemic, watching tv shows and anime has become the primary pastime for many individuals. With AniMoo, users will be able to have non-academic social interaction about these shows, providing a breath of fresh air for many students. Our goal was to provide users with the ability to "like" shows for viewing later, have chat environments to discuss with other users about a particular show, and to friend other users, with each user profile displaying the shows they liked.

## Outcome
Unfortunately due to the time constraints given for the 2021 Meteor Hackathon, we were unable to complete all the tasks envisioned for AniMoo. However, we were able to provide a user interface aesthetic that we felt would give users the same feeling of excitement they get when watching their favorite shows. We also were able to grab data on a list of Anime shows, which we implemented into our "Anime List" page. This page allows users to "like" a show. This is done by dislaying a button to the user. If the button is red, then the show within the same row is considered a liked show. If it is grey, then the show has not been liked.
<br>
We also were able to display a "My Profile" page, which allows the user to view their username, full name, profile picture, and bio.

## Welcome to Animoo!

When first arriveing to the web application, the user is prompted with a login page. If the user is a new user and does not have an account, they can go to the register page.
![](/doc/Login.png)

On the register page, the user will fill out their first name, last name, email address, username, password, profile picture, and bio. 
![](/doc/Register.png)

Once logged in, the user will be displayed a landing page where they can choose to navigate throughout the website using the navbar. The landing page will also display AniMoo's most popular shows at the time. 
![](/doc/landing.png)

The user will also be able to view a list of anime through the "Anime List" menu item in the navbar. This page displays close to 1000 different anime with the use of pagination. The user will also be able to like the anime of their choice by clicking on the heart icon button. 
![](/doc/anime-list.png)

The user will also be able to view their profile, which will display the information that they put in at the time of registration.
![](/doc/my-profile.png)

## Installation
If you wish to install the _**AniMoo**_ application locally, you can follow the directions below. 

First, [install Meteor](https://www.meteor.com/install).

Second, download a copy of [AniMoo](https://github.com/Big-Brain-Coders/AniMoo).

Third, open up your terminal/command prompt and cd into the app directory of the AniMoo copy you had just downloaded
and install the necessary libraries by invoking meteor npm install:

```
$ meteor npm install
$ npm install axios
$ npm install --save form-data
```

After meteor is installed, you can run the application by typing in the command:

```
$ meteor npm run start
```

## Deployment 
Our application was deployed with [_**Galaxy**_](https://galaxy-guide.meteor.com/deploy-guide.html). You can view a deployed version of our application [**here**](https://animoooo.meteorapp.com/).

## The Team
_**AniMoo**_ was an application developed for the Meteor Hackathon 2021 competition.

If you would like to view more information on our team members, please see the provided links and emails below.

- [Kyra Ikeda](https://kyraikeda.github.io/) - kyrai@hawaii.edu
- [Eric Lam](https://airyclam.github.io/) - lameric@hawaii.edu
- [Glen Larita](https://glarita.github.io/) - glarita@hawaii.edu
- [Chase Lee](https://chase-lee-ui.github.io/) - leechase@hawaii.edu
- [Irene Ma](https://irene-ma.github.io/) - mairene@hawaii.edu

