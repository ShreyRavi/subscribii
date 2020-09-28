# [Subscribii](subscribii.web.app/) ([subscribii.web.app](subscribii.web.app/))
### Subscriptions Under Control
Lose track of what you spend? Subscribii is an application built with React + Firebase to keep track of your own subscriptions!

<p align="center"><img src="https://raw.githubusercontent.com/ShreyRavi/subscribii/master/src/screenshot.png" height="93%" width="93%">Screenshots of the Subscribii App in action.</p>

## [Link to Live Demo](subscribii.web.app/)

## Usage
Go to [the deployed app](subscribii.web.app/) and log into the app via your Google account. Then, one can add and remove subscriptions and relevant information (payment date, amount, etc.).

## Local Setup
1. Clone Repository
```
git clone https://github.com/ShreyRavi/subscribii.git
```
2. Change (ex. `cd`) to project top folder (if not already there)
3. `npm install` packages
```
npm install
```
4. Start React App
```
npm start
```
5. (Optional, after Firebase setup) Deploy
```
npm run build
firebase deploy
```

## Notable Files in `src`
- **SubscribiiApp**.js
- `components/`**Footer**.js 
- `components/`**Header**.js
- `components/`**SettingsDrawer**.js
- `components/`**Controls**.js
- `components/`**SubscriptionAddModal**.js
- `components/`**SubscriptionEditModal**.js
- `components/`**SubscriptionList**.js
- `util/`**util**.js

## Built With
- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Material-UI](https://material-ui.com/)
- [`react-firebaseui`](https://www.npmjs.com/package/react-firebaseui)

## Privacy Policy
- All data is stored on the Realtime Database on Firebase only for the use of the application's functions, and Google authentication via `react-firebaseui` is used. Data is not used for any purpose other than explicit function of the application and is not sold or analyzed in any fashion. Updated 9/28/2020.

## Future Plans
- Improved UI
- Add Data Visualization Panels on Spending
- Track Year over Year spending
- More QoL Improvements
