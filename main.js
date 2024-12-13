let input = document.querySelector("input")

let button = document.querySelector("#find")



button.addEventListener("click", () => {
  if (input.value.trim() == "") {
    input.value = "Enter Input First"
    input.style.background = "red"
    input.style.border = "3px solid #B7AE7A"
    timer()
  }
  else {
    let newinput = input.value.toLocaleLowerCase().trim()
    getData(newinput)
    input.value = null

  }


})






let getData = async (username) => {
  fetch(`https://api.github.com/users/${username}`)
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

      let img = document.querySelector("img").src = avtar
      let h3Name = document.querySelector("h3").innerText = name
      let des = document.querySelector("#des").innerText = bio
      let reponum = document.querySelector("#reponum").innerText = repo
      let followernum = document.querySelector("#followernum").innerText = followers
      let followingnum = document.querySelector("#followingnum").innerText = following

      let url = document.querySelector("a").href = homeUrl

    })
    .catch((error) => {
      input.value = "Invalid Username"
      input.style.background = "red"
      input.style.border = "3px solid"
      timer()
    });
};

getData("maheshtechnicals");



let timer = () => {
  setTimeout(() => {
    input.value = ""
    input.style.background = "#6715A9"
    input.style.border = "none"
  }, 2000)
}