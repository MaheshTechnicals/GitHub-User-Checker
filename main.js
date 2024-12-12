let getData = async () => {
  fetch("https://api.github.com/users/maheshtechnicals")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {

      let avtar = data.avatar_url
      let name = data.name
      let bio = data.bio
      let repo = data.public_repos
      let followers = data.followers
      let following = data.following
      let homeUrl = data.html_url

    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
    });
};

getData();