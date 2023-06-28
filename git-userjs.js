const searchbar = document.querySelector(".search-container");
const profilecontainer = document.querySelector(".main-card");
const url = "https://api.github.com/users/";
const btnsubmit = document.querySelector(".btn");
const input = document.querySelector(".searchbar-container");
const avatar = document.querySelector(".image-de");
const namee = document.querySelector(".name-de");
const user = document.querySelector(".linkk");
const date = document.querySelector(".join-date-de");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = document.querySelector(".bio-de");
const repos = document.querySelector(".repos-de");
const followers = document.querySelector(".follower-de");
const following = document.querySelector(".following-de");
const user_location = document.querySelector(".location-de");
const page = document.querySelector(".github-link-de");
const twitter = document.querySelector(".twitter-de");
const company = document.querySelector(".apperenship-link-de");
const noresults = document.querySelector(".no-result");
let darkMode = false;
const modetext = document.querySelector(".dark-mode");
const modeicon = document.querySelector(".dark-mode-icon");
const get = (param) => document.getElementById(`${param}`);
const root = document.documentElement.style;
const btnmode = document.querySelector(".btn-mode");



btnsubmit.addEventListener("click",function () {
    if(input.value !== ""){
        getUserData(url + input.value);
    }
});

input.addEventListener(
  "keydown",
  function (e) {
    if (e.key == "Enter") {
      if (input.value !== "") {
        getUserData(url + input.value);
      }
    }
  },
  false
);

input.addEventListener("input", function () {
  noresults.style.display = "none";
});

btnmode.addEventListener("click", function () {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});


function getUserData(giturl) {

      fetch(giturl).then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateProfile(data);
      })
      .catch((error) => {
        throw error;
      });
  }
    
  function updateProfile(data) {
    if (data.message !== "Not Found") {
      noresults.style.display = "none";
      function checkNull(param1, param2) {
        if (param1 === "" || param1 === null) {
          param2.style.opacity = 0.5;
          param2.previousElementSibling.style.opacity = 0.5;
          return false;
        } else {
          return true;
        }
      }
    

      avatar.src = `${data.avatar_url}`;
      namee.innerText = data.name === null ? data.login : data.name;
      user.innerText = `@${data.login}`;
      user.href = `${data.html_url}`;
      datesegments = data.created_at.split("T").shift().split("-");
      date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
      bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
      repos.innerText = `${data.public_repos}`;
      followers.innerText = `${data.followers}`;
      following.innerText = `${data.following}`;
      user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
      page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
      page.href = checkNull(data.blog, page) ? data.blog : "#";
      twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
      twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
      company.innerText = checkNull(data.company, company) ? data.company : "Not Available";

    } else {
      noresults.style.display = "block";
    }
   
    }

    const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (localStorage.getItem("dark-mode")) {
      darkMode = localStorage.getItem("dark-mode");
      darkModeProperties();
    } else {
      localStorage.setItem("dark-mode", prefersDarkMode);
      darkMode = prefersDarkMode;
      lightModeProperties();
    }

    function darkModeProperties() {
      root.setProperty("--lm-bg", "#141D2F");
      root.setProperty("--lm-bg-content", "#1E2A47");
      root.setProperty("--lm-text", "white");
      root.setProperty("--lm-text-alt", "white");
      root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
      modetext.innerText = "LIGHT";
      modeicon.src = "./images/sun-icon.svg";
      root.setProperty("--lm-icon-bg", "brightness(1000%)");
      darkMode = true;
      localStorage.setItem("dark-mode", true);
    }
    function lightModeProperties() {
      root.setProperty("--lm-bg", "#F6F8FF");
      root.setProperty("--lm-bg-content", "#FEFEFE");
      root.setProperty("--lm-text", "#4B6A9B");
      root.setProperty("--lm-text-alt", "#2B3442");
      root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
      modetext.innerText = "DARK";
      modeicon.src = "./images/moon-icon.svg";
      root.setProperty("--lm-icon-bg", "brightness(100%)");
      darkMode = false;
      localStorage.setItem("dark-mode", false);
    }
 getUserData(url + "chlnedo");
