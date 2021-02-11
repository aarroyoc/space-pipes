import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("/serviceworker.js");
}

const location = window.location.href.split("/");
const prefix = location.slice(0, location.length - 1).join("/")
sessionStorage.setItem("prefix-url", prefix);

/* GameDistribution SDK */
if(false){
  (window as any)["GD_OPTIONS"] = {
    "gameId": "22940b4195e840c0bf64d1fd970637f9",
    "onEvent": function(event: any) {
        switch (event.name) {
            case "SDK_GAME_START":
                // advertisement done, resume game logic and unmute audio
                break;
            case "SDK_GAME_PAUSE":
                // pause game logic / mute audio
                break;
            case "SDK_GDPR_TRACKING":
                // this event is triggered when your user doesn't want to be tracked
                break;
            case "SDK_GDPR_TARGETING":
                // this event is triggered when your user doesn't want personalised targeting of ads and such
                break;
        }
    },
  };
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0] as HTMLElement;
    if (d.getElementById(id)) return;
    js = d.createElement(s) as HTMLScriptElement;
    js.id = id;
    js.src = 'https://html5.api.gamedistribution.com/main.min.js';
    fjs?.parentNode?.insertBefore(js, fjs);
  }(document, 'script', 'gamedistribution-jssdk'));
}