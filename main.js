let input = document.querySelector("input");
let button = document.querySelector("#find");

let GITHUB_TOKEN = ""; // To store the token

// Function to load the token from private.json
const loadToken = async () => {
  try {
    const response = await fetch("private.json"); // Fetch private.json
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    GITHUB_TOKEN = data.githubToken;

  } catch (error) {
    console.error("Error loading private.json:", error);
  }
};

// Load the token when the script runs
loadToken();

button.addEventListener("click", () => {
  if (input.value.trim() == "") {
    input.value = "Enter Input First";
    input.style.background = "red";
    input.style.border = "3px solid #B7AE7A";
    timer();
  } else {
    let newinput = input.value.toLocaleLowerCase().trim();
    getData(newinput);
    input.value = null;
  }
});

let getData = async (username) => {
  if (!GITHUB_TOKEN) {
    alert("Token not loaded. Please check the private.json file.");
    return;
  }

  fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      let avtar = data.avatar_url;
      let name = data.name;
      let bio = data.bio;
      let repo = data.public_repos;
      let followers = data.followers;
      let following = data.following;
      let homeUrl = data.html_url;

      document.querySelector("img").src = avtar;
      document.querySelector("h3").innerText = name;
      document.querySelector("#des").innerText = bio;
      document.querySelector("#reponum").innerText = repo;
      document.querySelector("#followernum").innerText = followers;
      document.querySelector("#followingnum").innerText = following;

      document.querySelector("a").href = homeUrl;
    })
    .catch((error) => {
      input.value = "Invalid Username";
      input.style.background = "red";
      input.style.border = "3px solid";
      timer();
    });
};

let timer = () => {
  setTimeout(() => {
    input.value = "";
    input.style.background = "#6715A9";
    input.style.border = "none";
  }, 2000);
};