const alexa = require("alexa-app");
const app = new alexa.app();

app.launch(function(request, response) {
  response.say("Hello there, I am a bot designed to be your very own butler!");
  response.shouldEndSession(false);
});

app.intent(
  "GetCodepenTrivia",
  {
    slots: {},
    utterances: [
      "Tell me something about codepen",
      "How about some codepen trivia",
      "What do {I|we} need to know about codepen"
    ]
  },
  function(request, response) {
    generate_trivia(response);
    return;
  }
);

function generate_trivia(response) {
  const trivia = [
    "Chris Coyier runs a podcast called ShopTalk Show",
    "CodePen is a social development environment. At its heart, it allows you to write code in the browser, and see the results of it as you build. A useful and liberating tool for developers of any skill, and particularly empowering for people learning to code.",
    "Codepen was founded by Chris Coyier, Tim Sabat, and Alex Vazquez",
    "People use CodePen for all sorts of things: prototyping new ideas, reduced test cases for bugs, sending clients things to look at, evaluating potential hires, to finding inspiration. People also use CodePen as a sort of resume and portfolio, showing off their best design and development work.",
    "Codepen has a jobs board, where you can find your next developer job at www.codepen.io/jobs",
    "Codepen loves Bend JS"
  ];

  var rand = trivia[Math.floor(Math.random() * trivia.length)];
  response.say(`Did you know ${rand}?`);
  response.send();

  return;
}

app.intent(
  "DoAnything",
  {
    slots: {},
    utterances: ["What do you want to say goes here"]
  },
  function(request, response) {
    runAFunction(response);
    return;
  }
);

function runAFunction(response) {
  const resp = {
    response: ""
  };

  axios
    .get(someURL)
    .then(res => res.json())
    .then(res => (resp = res))
    .catch(err => console.error(err));

  response.say(`Send a saying back here`);
  response.send();

  return;
}

// Connect to lambda
exports.handler = app.lambda();

if (process.argv.length === 3 && process.argv[2] === "schema") {
  console.log(app.schema());
  console.log(app.utterances());
}
