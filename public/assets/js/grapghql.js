let token = "d315efee5025269bf863a3bdd6a794b64079c75d";
let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let queryRequest = `
{
  viewer {
    login
    avatarUrl
    name
    bio
    repositories(last: 20, isFork: false) {
      nodes {
        name
        description
        url
        stargazerCount
        updatedAt
        forkCount
        languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
          nodes {
            color
            name
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
`;
fetch("https://api.github.com/graphql", {
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  referrerPolicy: "no-referrer",
  headers: {
    "Content-Type": "application/json",
    authorization: `token ${token} `,
  },
  body: JSON.stringify({
    query: queryRequest,
  }),
})
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    let repodata = data.data.viewer;
    console.log(repodata);
    setUserProfileSection(repodata);
    reposec(repodata);
  });

function setUserProfileSection(data) {
  let userprof = document.getElementById("webuserprofile");
  let tabdivuserprof = document.getElementById("shorten");
  let numberofrepo = document.getElementById("numberofrepo");
  let imgmobile = document.getElementById("imgmobile");
  let mobileusername = document.getElementById("mobileusername");
  let mnavuser = document.getElementById("mnavuser");
  let webuserimage = document.getElementById("webuserimage");
  mnavuser.innerHTML += `
  <a class="avatar" href="/"> <img class="avatar"
                                src="${data.avatarUrl}" width="20"
                                height="20" alt="@onaty">
                            <span>${data.login}</span></a>`;

  webuserimage.innerHTML = `
                            <img class="userimage" src="${data.avatarUrl}" alt="">    
                            <span class="downarrow"></span>
                            `;
  imgmobile.innerHTML = `
        <img id="fullimage" class="avatar"
            src="${data.avatarUrl}" alt="@${data.login}">
            <span class="downarrow"></span>
  `;
  mobileusername.innerHTML = `
  <h2 class="name">${data.name} </h2>
  <p class="usernick">${data.login}</p>
`;
  userprof.innerHTML = `
        <div class="userdetails">
        <div class="userdp">
        <img id="fullimage" class="avatar"
            src="${data.avatarUrl}" alt="@${data.login}">
        <p id="profilediv" style="margin: 0px;"></p>
        </div>
        <div id="usernamediv" class="username">
        <h2 class="name">${data.name} </h2>
        <p class="usernick">${data.login}</p>
        </div>
        </div>
        ${data.bio ? `<p  class="status">${data.bio}</p>` : ""} 
  `;

  tabdivuserprof.innerHTML = `
            <div class="avatar"> <img
            src="${data.avatarUrl}"></div>
            <div class="name">
            <p>${data.name}</p>
            </div>
    `;
  numberofrepo.innerHTML = `102`;
  if (document.getElementById("fullimage")) {
    document.getElementById("shorten").style.opacity = "0";
    document.getElementById("fullimage").style.opacity = "1";
  }
}

function reposec(data) {
  document.getElementById("searchfield").style.display = "block";

  let reposec = document.getElementById("repolist");
  let repoTotal = "";
  for (let index = data.repositories.nodes.length - 1; index > 0; index--) {
    const element = data.repositories.nodes[index];

    let languages = "";
    for (let index = 0; index < element.languages.nodes.length; index++) {
      let lang = element.languages.nodes[index];
      console.log(lang);
      languages += `
        <span class="reponame"> <span style="background-color:${lang.color}" class="colorss"></span> ${lang.name}</span>
        `;
    }
    let repo = `
  <div class="repo">
  <div class="details">
      <div class="name">
          <h3><a href="${element.url}">${element.name}
              </a></h3>
      </div>
        ${
          element.description
            ? `    <div class="description">
        <p class="">
        ${element.description}
        </p>
        </div>`
            : ""
        }
      <div class="repodatas">
         ${languages}
        ${
          element.stargazerCount > 0
            ? `
            <span class="detss"> <svg fill="#6a737d" viewBox="0 0 16 16" version="1.1" width="16"
            height="16" aria-hidden="true">
            <path fill-rule="evenodd"
                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
            </path>
        </svg>
        <span>${element.stargazerCount}</span></span>`
            : ""
        }
         ${
           element.forkCount > 0
             ? `
             <a class="detss"><svg fill="#6a737d" aria-label="fork" viewBox="0 0 16 16"
             version="1.1" width="16" height="16" role="img">
             <path fill-rule="evenodd"
                 d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z">
             </path>
         </svg><span>${element.forkCount}</span></a>
             `
             : ""
         }
      
          <span class="detss lastupdate">Updated on ${timecalc(
            element.updatedAt
          )}</span>
      </div>
  </div>
  <div class="buttons">
      <button class="starbutton">
          <svg fill="#6a737d" viewBox="0 0 16 16" version="1.1" width="16" height="16"
              aria-hidden="true">
              <path fill-rule="evenodd"
                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
              </path>
          </svg>
          <span> Star</span>
      </button>
  </div>
</div>`;

    repoTotal += repo;
  }
  reposec.innerHTML = repoTotal;
}

function timecalc(t1) {
  let todaysdate = new Date();
  let d = new Date() - new Date(t1);
  let weekdays = Math.floor(d / 1000 / 60 / 60 / 24 / 7);
  let days = Math.floor(d / 1000 / 60 / 60 / 24 - weekdays * 7);
  let hours = Math.floor(d / 1000 / 60 / 60 - weekdays * 7 * 24 - days * 24);
  let minutes = Math.floor(
    d / 1000 / 60 - weekdays * 7 * 24 * 60 - days * 24 * 60 - hours * 60
  );
  let seconds = Math.floor(
    d / 1000 -
      weekdays * 7 * 24 * 60 * 60 -
      days * 24 * 60 * 60 -
      hours * 60 * 60 -
      minutes * 60
  );
  let milliseconds = Math.floor(
    d -
      weekdays * 7 * 24 * 60 * 60 * 1000 -
      days * 24 * 60 * 60 * 1000 -
      hours * 60 * 60 * 1000 -
      minutes * 60 * 1000 -
      seconds * 1000
  );
  let datesd = new Date(t1);

  let t = {};
  ["weekdays", "days", "hours", "minutes", "seconds", "milliseconds"].forEach(
    (q) => {
      if (eval(q) > 0) {
        t[q] = eval(q);
      }
    }
  );
  let yeardata = `${datesd.getDate()} ${months[datesd.getMonth()]} ${
    datesd.getFullYear() < todaysdate.getFullYear() ? datesd.getFullYear() : ""
  }`;
  if (t.weekdays) {
    return `${yeardata}`;
  } else if (t.days && t.days > 7) {
    return `${t.days} days`;
  } else if (t.hours) {
    return `Updated ${t.hours} hours ago`;
  } else if (t.minutes) {
    return `Updated ${t.minutes} minutes ago`;
  } else if (t.seconds) {
    return `Updated ${t.seconds} seconds ago`;
  } else {
    return `${yeardata}`;
  }
}
