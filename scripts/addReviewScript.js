let colectionbutton = document.querySelectorAll(".btn button");
let parentdiv = document.querySelector(".btn");
let selectvalue;
let timeoutID; // Variable to store timeout ID

parentdiv.addEventListener("mouseover", function (event) {
  if (event.target.className == "click") {
    event.target.style.backgroundColor = "orange";
  }
});

parentdiv.addEventListener("click", function (e) {
  if (e.target.className == "click") {
    selectvalue = e.target.innerHTML;
    clearTimeout(timeoutID); // Clear timeout if button clicked
  }
});

parentdiv.addEventListener("mouseout", function (e) {
  if (e.target.className == "click") {
    e.target.style.backgroundColor = "gray";
    setTimeout(function () {
      e.target.style.backgroundColor = "#082032";
    }, 500);
  }
});

let sub1 = document.querySelector("input");
sub1.onclick = function () {
  document.querySelector(".appear").style.display = "none";
  document.querySelector(".hide").classList.remove("hide");
  let scorediv = document.querySelector(".score");
  scorediv.innerText = `You selected ${selectvalue} out of 5`;

  // Close the web page after 5 seconds (5000 milliseconds)
  timeoutID = setTimeout(function () {
    window.location.href = "review.html"; // Redirect to review page
  }, 400);
};
