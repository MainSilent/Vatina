# Vatina

Introduce The Future & Increase Your Product Sales

[Demo](https://www.youtube.com/watch?v=jae2cdyipHM)

## Note

This web app was created as the final harvard CS50 project

## Distinctiveness and Complexity

This project allows people to create shows and introduce their products via a live demonstration.

The Requirements has been demonstrated in video, It is completely mobile responsive and uses django rest framework as the API that it has at least one model(Show), And for the javascript this project has been made with React...

## File structure

Since there are so many files, I will only describe the directories

### src:

All the react codes

### public:

React uses this directory as public path

### server:

This includes the django backend files

## How to run

Sign up to mux.com and get the key and token, Set the `MUX_ACCESS_TOKEN` and `MUX_SECRET_KEY` in settings.py

Then set `MEDIA_ROOT` to react static directory (This is necessary for uploading profile pictures) 

Now run the django backend:
```
py manage.py migrate
py manage.py runserver
```

Make sure you have set the django address as proxy in `package.json` so the react backend can send the API requests.

```
npm i
npm start
```

## Additional Details

The comment section and shows list in home menu is just a demo, It is not connected to the backend

Since I spent lots of time on this project, You will also receive GPL license, That means if you use this project you have to make the source code public.
