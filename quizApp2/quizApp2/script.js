//5 questions
//Show one question at a time
//A next button
//When the user clicks the next button it should let the user know whether they got the last question correct
//At the end you should notify the user of their score
//A progress bar

//Stretch Goals

//randomize the order of the questions
//randomize the order of the answers to each question
//more than one question type
//ability to add more questions
//drag and drop questions (use the jQueryUI library)

// Declare variables
var pos = 0, 
    correct = 0,
    mainStg = [],
    qStg,
    mainStg,
    head,
    choiceStorage,
    questionStorage,
    correctStorage,
    testQuestion,
    quizMid,
    quizBottom,
    questionNum,
    len,
    a,
    q,
    percent,
    choices,
    choicePicked,
    input,
    submitBtn;

// Storage for Question components
qStg = [
    [
        "How many licks does it take to get to the center of a Tootsie Pop?",
        ["The world may never know.", "1989", "3005", "311"],
        "The world may never know."
    ],

    [
        "Which spelling is correct?",
        ["Misissippi", "Mississippi", "Missississippi", "Mississipi"],
        "Mississippi"
    ],

    [
        "Yes or No, is pizza delicious?",
        ["yes"],
        "yes"
    ],

    [
        "What is 2 + 2?",
        ["4"],
        "4",
    ],

    [
        "What rhymes with lime?",
        ["Kind", "Whim", "Rhyme", "Line"],
        "Rhyme"
    ]
];

// Shortcut for getElementById
function getE(i) {
    return document.getElementById(i);
}

// Question object constructor
function Question(question, choices, correct) {
    this.question = question;
    this.choices = choices;
    this.correct = correct;
}

// Loops through qStg and creates an object for each item
function makeQuiz() {
    for (var i = 0; i < qStg.length; i++) {
        var temp = new Question(qStg[i][0], qStg[i][1], qStg[i][2]);
        mainStg.push(temp);
    }
    qStg = [];
}

// Randomizes the array entered as parameter
function randomizer(array) {
    var m = array.length,
        t,
        i;
    while (m) {
        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}

// Randomizes choices
function randomizeAnswers() {
    var s = mainStg,
        i;

    for (var i = 0; i < s.length; i++) {
        for (var ii = 0; ii < s[i].choices.length; ii++) {
            randomizer(s[i].choices);
        }
    }
}

// Runs functions to randomize questions and answers
function ran() {
    randomizer(mainStg);
    randomizeAnswers();
}

// Creates radio buttons for answers on html
function crtChoices() {
    var m = mainStg[pos].choices,
        i;
    for (i = 0; i < m.length; i++) {
        if (i === 0) {
            a.innerHTML = "<input type='radio' name='choices' value='" + m[i] + "'>" + m[i] + "<br>";
        } else {
            a.innerHTML += "<input type='radio' name='choices' value='" + m[i] + "'>" + m[i] + "<br>";
        }
    }
}

// Creates the quiz for each page
function createQuiz() {
    quizMid = getE("quiz-middle");
    submitBtn = getE("btn2");
    head = getE("questionNum");
    quizBottom = getE("quiz-bottom");
    makeQuiz();
    len = mainStg.length;

    // Stops the quiz once it reaches the last question
    if (pos >= len) {
        percentage();
        head.innerHTML = "Congratulations!<br>";
        head.innerHTML += "You finished the quiz!<br>";
        head.innerHTML += "<progress id='progress' value='" + pos + "' max='" + len + "'>"
        quizMid.innerHTML = "<div id='question'></div>";
        q = getE("question");
        q.innerHTML = "You answered " + correct + " out of " + len + " questions correctly.<br>";
        q.innerHTML += "This gives you a score of " + percent + "%.";
        quizBottom.innerHTML = "<input type='button' id='btn3' value='Start Over' onclick='restart()'>";
        pos = 0;
        correct = 0;
        //mainStg = [];
        return false;
    }

    // Adds html and quiz components to page
    head.innerHTML = "Question " + (pos + 1) + " of " + len + "<br>";
    head.innerHTML += "<progress id='progress' value='" + pos + "' max='" + len + "'>"

    quizMid.innerHTML = "<div id='question'></div>";
    q = getE("question");
    q.innerHTML = "" + mainStg[pos].question + "<br>";
    q.innerHTML += "<hr width='60%'>";
    q.innerHTML += "<div id='answer'></div>";
    a = getE("answer");


    // Determines the type of quiz question
    if (mainStg[pos].choices[1]) {
        crtChoices();
    } else {
        a.innerHTML = "<input type='text' placeholder='Type answer here' id='input' autofocus>";
    }

    // Creates the check answer button
    quizBottom.innerHTML = "<input type='button' id='btn2' class='btn' value='Next' onclick='checkAnswer()'>";
}

// Checks answer and moves to next question
function checkAnswer() {
    input = getE("input");
    choices = document.getElementsByName("choices");

    // Checks for question type and adds answer accordingly
    if (input) {
        if (input.value === "") {
            alert("You didn't enter anything!");
            return false;
        } else {
            choicePicked = input.value.toLowerCase();
        }
    } else {
        for (var i = 0; i < choices.length; i++) {
            if (choices[i].checked) {
                choicePicked = choices[i].value;
            }
        }
    }

    // Checks the user's answer against correct answer
    // If it's correct they get a point
    // Alerts user to tell them if it was right
    if (choicePicked === mainStg[pos].correct) {
        correct++;
        console.log(correct);
        alert("You got it right!");
    } else {
        alert("Sorry, that's not the right answer");
    }

    pos++;
    createQuiz();
}

// Gets the percentage value of final score
function percentage() {
    percent = ((correct / len) * 100).toFixed(2);
}

// Creates the page to remove questions 
function removeQuestionPage() {
    var top = getE("questionNum");
    var mid = getE("quiz-middle");
    var bottom = getE("quiz-bottom");

    makeQuiz();

    top.innerHTML = "Remove a question from the quiz";
    top.innerHTML += "<input type='button' id='back2' class='btn1' value='Back' onClick='restart();'>";
    mid.innerHTML = "<div id='question' ></div>";
    mid.innerHTML += "<div id='scroll' ></div>"
    var q = getE("question");
    var f = getE("scroll");

    for (var i = 0; i < mainStg.length; i++) {
        if (i === 0) {
            q.innerHTML = "Which question(s) would you like to remove?<br><br>"
            f.innerHTML = "<input type='radio' id='q" + i + "' name='radio' value='" + mainStg[i].question + "'>" + mainStg[i].question + "<br>";
        } else {
            f.innerHTML += "<input type='radio' id='q" + i + "' name='radio' value='" + mainStg[i].question + "'>" + mainStg[i].question + "<br>";
        }
    }

    bottom.innerHTML = "<input type='button' value='Remove Question' class='btn1' id='btn4' onclick='removeQuestion()'>";
}

// Removes question from quiz
function removeQuestion() {
    var picks = document.getElementsByName("radio"),
        pick;
    for (var i = 0; i < picks.length; i++) {
        if (picks[i].checked) {
            pick = picks[i].value;
            for (var ii = 0; ii < mainStg.length; ii++) {
                if (mainStg[ii].question === pick) {
                    mainStg.splice(ii, 1);
                }
            }
            alert("Question Removed");
        }
    }
    restart();
}

// Creates the page to add new questions
function newQuestion() {
    var top = getE("questionNum");
    var mid = getE("quiz-middle");
    var bottom = getE("quiz-bottom");

    top.innerHTML = "Which kind of question would you like to add?<br>";
    top.innerHTML += "<input type='button' id='back' class='btn1' value='Back' onClick='restart();'>";

    mid.innerHTML = "<div id='newQ' onclick='newType()' ><p>Type Answer</p><input type='text' class='inputs' placeholder='Answer'></div>";
    mid.innerHTML += "<div id='newQ' onclick='newMultiChoice()' ><p>Multiple Choice</p><input type='radio'>Answer</div>";
}

// Creates the page to add text questions
function newType() {
    var top = getE("questionNum");
    var mid = getE("quiz-middle");
    var bottom = getE("quiz-bottom");

    top.innerHTML = "Create a new question<br>";
    top.innerHTML += "<input type='button' id='back' class='btn1' value='Back' onClick='newQuestion();'>";

    mid.innerHTML = "<textarea autofocus rows='4' col='10' placeholder='Enter question here' class='a' id='textQInput'></textarea><br>";
    mid.innerHTML += "<input type='text' placeholder='Enter correct answer here' class='inputs' id='textA'><br>";

    bottom.innerHTML = "<input type='button' value='Submit question' onclick='txtQstCreator(); makeQuiz(); restart()' class='btn1' id='btn5'>";
    bottom.innerHTML += "<input type='button' value='Submit and add another question' onclick='txtQstCreator(); newQuestion()' class='btn1' id='btn6'>";
}

 // Creates the page to add multiple choice questions
function newMultiChoice() {
    var top = getE("questionNum");
    var mid = getE("quiz-middle");
    var bottom = getE("quiz-bottom");

    top.innerHTML = "Create a new question<br>";
    top.innerHTML += "<input type='button' id='back' class='btn1' value='Back' onClick='newQuestion();'>";

    mid.innerHTML = "<textarea autofocus rows='4' col='10' placeholder='Enter question here' class='a' id='qInput'></textarea><br>";
    mid.innerHTML += "<input type='text' placeholder='Enter correct answer here' class='inputs' id='a1'><br>";
    mid.innerHTML += "<input type='text' placeholder='Enter wrong answer here' class='inputs' id='a2'><br>";
    mid.innerHTML += "<input type='text' placeholder='Enter wrong answer here' class='inputs' id='a3'><br>";
    mid.innerHTML += "<input type='text' placeholder='Enter wrong answer here' class='inputs' id='a4'><br>";

    bottom.innerHTML = "<input type='button' value='Submit question' onclick='qCreator(); makeQuiz(); restart()' class='btn1' id='btn5'>";
    bottom.innerHTML += "<input type='button' value='Submit and add another question' onclick='qCreator(); newQuestion()' class='btn1' id='btn6'>";
}

// Creates new text questions and sends them to qStg
function txtQstCreator() {
    var temp = []
    var temp1 = [];
    
    temp.push(getE("textQInput").value);
    temp1.push(getE("textA").value.toLowerCase());
    temp.push(temp1);
    temp.push(getE("textA").value.toLowerCase());

    qStg.push(temp);
    console.log(qStg);
}

// Creates new multiple choice questions and sends them to qStg
function qCreator() {
    var temp = [];
    var temp1 = [];

    temp.push(getE("qInput").value);
    temp1.push(getE("a1").value);
    temp1.push(getE("a2").value);
    temp1.push(getE("a3").value);
    temp1.push(getE("a4").value);

    temp.push(temp1);
    temp.push(getE("a1").value);

    qStg.push(temp);
}

// Back to beginning
function restart() {
    var head = getE("questionNum");
    var middle = getE("quiz-middle");
    var bottom = getE("quiz-bottom");

    head.innerHTML = "";
    middle.innerHTML = "<input type='button' id='btn1' value='Begin Quiz!' onclick='makeQuiz(); ran(); createQuiz()' />";
    bottom.innerHTML = '<input type="button"  class="btn1" value="Add Question" onclick="newQuestion()" />';
    bottom.innerHTML += '<input type="button" id="mainBtn" class="btn1 " value="Remove Question" onclick="removeQuestionPage()"  />';
}