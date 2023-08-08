const questions = [
    {
      question: "What language works in the browser?",
      answers: ["Java", "C", "Python", "JavaScript"],
      correct: 4,
    },
    {
      question: "What does CSS mean?",
      answers: [
        "Central Style Sheets",
        "Cascading Style Sheets",
        "Cascading Simple Sheets",
        "Cars SUVs Sailboats",
      ],
      correct: 2,
    },
    {
      question: "What does HTML mean?",
      answers: [
        "Hypertext Markup Language",
        "Hypertext Markdown Language",
        "Hyperloop Machine Language",
        "Helicopters Terminals Motorboats Lamborginis",
      ],
      correct: 1,
    },
    {
      question: "In what year was JavaScript created?",
      answers: ["1996", "1995", "1994", "all answers was incorrect"],
      correct: 2,
    },
  ];
  
  const headerContainer = document.querySelector("#header");
  const listContainer = document.querySelector("#list");
  const submitBtn = document.querySelector("#submit");
  
  let score = 0;
  let questionIndex = 0; 
  
  clearPage();
  showQuestion();
  
  submitBtn.addEventListener("click", checkAnswer);
  
  function clearPage() {
    headerContainer.innerHTML = "";
    listContainer.innerHTML = "";
  }
  
  function showQuestion() {
    const titleText = `<h2 class="title">${questions[questionIndex]["question"]}</h2>`;
    headerContainer.innerHTML = titleText;
  
    let counterOfNumberAnswer = 0;
  
    for (item of questions[questionIndex]["answers"]) {
      counterOfNumberAnswer++;
      const questionTemplate = `<li>
              <label>
                  <input value="%number%" type="radio" class="answer" name="answer" />
                  <span>%answer%</span>
              </label>
          </li>`;
  
      const answerHTML = questionTemplate
        .replace("%answer%", item)
        .replace("%number%", counterOfNumberAnswer);
  
      listContainer.innerHTML += answerHTML;
    }
  }
  
  function checkAnswer() {
    const checkedRadio = listContainer.querySelector(
      'input[type="radio"]:checked'
    );
  
    if (!checkedRadio) {
      submitBtn.blur();
      return;
    }
  
    const userAnswer = +checkedRadio.value;
    if (userAnswer === questions[questionIndex]["correct"]) {
      score++;
    }
  
    if (questionIndex !== questions.length - 1) {
      questionIndex++;
      clearPage();
      showQuestion();
      return;
    } else {
      clearPage();
      showResults();
    }
  }
  
  function showResults() {
    const resultsTemplate = `
        <h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>
        <p class="result">%result%</p>
      `;
  
    let title, message;
  
    if (score === questions.length) {
      title = `Congratulate! ✌🏻 `;
      message = `You answered all the questions correctly! 🧑🏼‍🎓`;
    } else if ((score * 100) / questions.length >= 50) {
      title = `Not a bad result 🤚🏽 `;
      message = `You have answered more than half of the correct answers 😀 `;
    } else {
      title = `It's worth trying😭`;
      message = `You have less than half of the correct answers 🤬`;
    }
  
    let result = `${score} out of ${questions.length}`;
  
    const finalMessage = resultsTemplate
      .replace("%title%", title)
      .replace("%message%", message)
      .replace("%result%", result);
  
  
    headerContainer.innerHTML = finalMessage;
  
  
    submitBtn.blur();
    submitBtn.innerText = `Try again`;
    submitBtn.addEventListener('click', () => {
      history.go();
    });
  
  }
  