function toggleburgmenu(value) {
  var x = document.getElementById("mobilelistdropdown");

  if (x.style.display != "block") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const profdiv = document.querySelector("#profilediv");
(function () {
  console.log('here');
  const messageText = isInViewport(profdiv) ? showthem() : hidethem();
})();
document.addEventListener(
  "scroll",
  function () {
    const messageText = isInViewport(profdiv) ? showthem() : hidethem();
  },
  {
    passive: true,
  }
);

function hidethem() {
  document.getElementById("shorten").style.opacity = "1";
  document.getElementById("fullimage").style.opacity = "0";
}

function showthem() {
  document.getElementById("shorten").style.opacity = "0";
  document.getElementById("fullimage").style.opacity = "1";
}
