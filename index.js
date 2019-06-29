window.onload = () => {
  let quoteAPIUrl = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
  let tweetAPIUrl = "https://twitter.com/intent/tweet?text=";
  let previousColor = 0;
  let randomQuote = "";
  let randomAuthor ="";
  let quote = "";
  let author = "";
  let p = "";
  let transitionIterator = 0;
  let loopIterator = 0;
  let colorArray = ["yellow", "DarkGray", "LightBlue", "white", "IndianRed", "SpringGreen", "LightPink", "magenta", "orange", "SlateGray"];
  let randomColor = "";
  let quoteDiv = document.querySelectorAll(".quote")[0];
  let authorDiv = document.querySelectorAll(".author")[0];
  let quoteButton = document.querySelectorAll(".quote-button")[0];
  ////INTRO QUOTE ANIMATION
  document.querySelectorAll(".intro-quote-space").forEach((word, i) => {
    Array.from(word.children).forEach((letter, i) => {
      loopIterator += 0.05;
      letter.style.animationDelay = (transitionIterator + loopIterator) + "s";
      letter.classList.add("intro-quote-animation");
    });
  });
  ////FETCH QUOTE FROM QUOTES ON DESIGN API AND DISPLAYS THEM ON PAGE
  function getQuote() {
    fetch(quoteAPIUrl, {
      cache: "no-store"
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      while (authorDiv.firstChild) {
        authorDiv.removeChild(authorDiv.firstChild);
      }
      quote = "";
      author = "-" + data[0].title;
      let temp = document.createElement("textarea");
      temp.innerHTML = data[0].content;
      quote = '"' + temp.value.slice(3,-5)+'"';
      quoteDiv.innerHTML = data[0].content;
      p = document.createElement("p");
      authorDiv.appendChild(p).innerHTML = author;
      randomQuote = quote;
      randomAuthor = author;
      document.querySelectorAll(".fa-twitter")[0].setAttribute("href", tweetAPIUrl + randomQuote + " " + randomAuthor);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  ////CHANGE COLOR OF BACKGROUND
  function randomBackground() {
    randomColor = Math.floor(Math.random() * (9-0));
    if(previousColor === randomColor) {
      while(previousColor === randomColor) {
      randomColor = Math.floor(Math.random() * (9-0));
      };
    };
    previousColor = randomColor;
    document.body.style.transition = "background 1s";
    document.body.style.backgroundColor = colorArray[randomColor];
    quoteButton.style.backgroundColor = colorArray[randomColor];
 }
 ////EVENT LISTENERS
 quoteButton.addEventListener("mousedown", function(e) {
   e.preventDefault();
 });
 document.querySelectorAll(".fa-twitter")[0].addEventListener("mousedown", function(e) {
   e.preventDefault();
 });
 quoteButton.addEventListener("click", function() {
   quoteButton.disabled = true;
   getQuote();
   randomBackground();
   setTimeout(() => {quoteButton.disabled = false}, 1000);
 });
 getQuote();
}