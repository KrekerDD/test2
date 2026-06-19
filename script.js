const SUPABASE_URL = "https://roaeaopzvjupgefljfye.supabase.co";
const SUPABASE_KEY = "sb_publishable_iRBkVWDUnld4og4hQxIF2A_pQ0DXNAN";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const questions = [
{
    title: "Вопрос 1 из 7",

    question: "Опиши свой идеальный вечер 🌙",

    description: `
Желательно в деталях 🍿

Можно несколько вариантов:

— уютный домашний вечер
— прогулка
— встреча с друзьями
— бар, концерт или ещё какой-нибудь расколбас

Интересно всё.
`,

    button: "Бине Бине"
},

{
    title: "Вопрос 2 из 7",

    question: "Так-такс... теперь про покушац 🍸",

    description: `
Что насчёт еды, напитков (alc. no alc. 👀) и десертов?
Что любишь больше всего?
Однажды, одного кальяна и Kiwi Martini будет маловато.
Собственно, это очень важный вопрос !!!
`,

    button: "Цыыыыц"
},

{
    title: "Вопрос 3 из 7",

    question: "Цветочки 🌷",

    description: `
Так называемая - "База".

Какие тебе нравятся большего всего ?

И конечно же те, которые совсем не нравятся?
`,

    button: "Ага ага"
},

{
    title: "Вопрос 4 из 7",

    question: "Фильмы и сериалы 🎬",

    description: `
Начирикай несколько любимых фильмов и сериалов.

Может есть то, что готова пересматривать снова и снова.

Слишком сложно ?

Тогда хотя бы про любимые жанры.
`,

    button: "Обсосали"
},

{
    title: "Вопрос 5 из 7",

    question: "Тяжёлые дни бывают у всех 😤",

    description: `
Что обычно помогает тебе поднять настроение?

Это может быть что угодно:

— музыка
— прогулка
— человек
— вкусная еда
— сон
— сериал

или что-то совсем неожиданное 🤔
`,

    button: "Окак 🔪"
},

{
    title: "Вопрос 6 из 7",

    question: "О чём ты мечтаешь сейчас? ✨",

    description: `
Можно отвечать как угодно.

Может есть мечта "На вырост".

Через месяц, год.

Или вообще про всю жизнь.

`,

    button: "Заебал олякэ"
},

{
    title: "Вопрос 7 из 7",

    question: "Финальный босс",

    description: `
Напомню, серьёзный вопрос.

Прошу отнестись максимально ответственно.

Стул — это существительное или местоимения? 🤔
`,

    button: "Заблокировать Сашку"
}
];
let currentQuestion = -1;
const answers = [];

const savedAnswers =
    JSON.parse(
        localStorage.getItem("sundayAnswers")
    );

const savedQuestion =
    localStorage.getItem("sundayQuestion");

if (savedAnswers) {

    savedAnswers.forEach(answer => {
        answers.push(answer);
    });

}

const content = document.getElementById("content");

document
    .getElementById("startBtn")
    .addEventListener("click", startQuestions);

function startQuestions() {

    if (
        savedQuestion !== null &&
        savedAnswers &&
        savedAnswers.length > 0
    ) {

        currentQuestion = Number(savedQuestion);

    } else {

        currentQuestion = 0;
    }

    renderQuestion();
}

function renderQuestion() {

    let progress = ((currentQuestion + 1) / questions.length) * 100;

if (currentQuestion === 5) {
    progress = 90;
}

if (currentQuestion === 6) {
    progress = 100;
}

    document.querySelector(".progress-bar").style.width =
        `${progress}%`;

    content.innerHTML = `
        <h3>${questions[currentQuestion].title}</h3>

        <div class="question-title">
    ${questions[currentQuestion].question}
</div>

<div class="question-description">
    ${questions[currentQuestion].description}
</div>

        <textarea
    id="answer"
    rows="6"
    placeholder="Чирикать тут..."
>${answers[currentQuestion] || ""}</textarea>

<button id="nextBtn">
    ${questions[currentQuestion].button}
</button>
`;

content.classList.remove("fade-in");

void content.offsetWidth;

content.classList.add("fade-in");

document
    .getElementById("nextBtn")
    .addEventListener("click", nextQuestion);
}

async function nextQuestion() {

    const answer =
        document.getElementById("answer").value.trim();

    if (!answer) {
        alert("Хорошая попытка, но я это предусмотрел 🤡");
        return;
    }

    answers[currentQuestion] = answer;

localStorage.setItem(
    "sundayAnswers",
    JSON.stringify(answers)
);

localStorage.setItem(
    "sundayQuestion",
    currentQuestion
);

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

localStorage.setItem(
    "sundayQuestion",
    currentQuestion
);

        if (currentQuestion === 5) {
            renderSecretScreen();
            return;
        }

        renderQuestion();
        return;
    }

    await saveAnswers();
}

function renderSecretScreen() {

    document.querySelector(".progress-bar").style.width = "90%";

    content.innerHTML = `
        <div class="secret-screen">

            <div class="secret-icon">
                🎉
            </div>

            <h1>С базой кончили</h1>

            <p>
                Еще совсем чуть чуть.
            </p>

            <p>
                Осталось ещё два вопроса.
            </p>

            <p>
                Самые серьезные и важные.
            </p>

            <p class="secret-small">
                Вот тут, пожалуйста, максимальная серьезность.
            </p>

            <button id="continueBtn">
                🤡🤡🤡
            </button>

        </div>
    `;

    content.classList.remove("fade-in");
    void content.offsetWidth;
    content.classList.add("fade-in");

    document
        .getElementById("continueBtn")
        .addEventListener("click", renderQuestion);
}

async function saveAnswers() {

    const { error } = await supabaseClient
        .from("answers")
        .insert([
            {
                question_1: answers[0],
                question_2: answers[1],
                question_3: answers[2],
                question_4: answers[3],
                question_5: answers[4],
                question_6: answers[5],
                question_7: answers[6]
            }
        ]);

    if (error) {
        console.error(error);

        content.innerHTML = `
            <h1>Ошибка 😥</h1>
            <p>Не удалось сохранить ответы.</p>
        `;

        return;
    }

    content.innerHTML = `
    <div class="final-screen">

        <div class="final-icon">
            🫡
        </div>

        <h1>Спасибо❤️❤️❤️</h1>

        <p>
            Ответы успешно сохранены. (надеюсь)
        </p>

        <p>
            Очень внимательно изучу и возьму на заметку ответы 👀
        </p>

        <p class="final-joke">
            Кстати, мнение по вопросу стула будет
            передано чату гпт для анализа по гороскопу.
        </p>

        <div class="final-divider"></div>

        <p class="final-small">
            Хай давай 😎
        </p>

    </div>
`;

content.classList.remove("fade-in");

void content.offsetWidth;

content.classList.add("fade-in");

document.querySelector(".progress-bar").style.width =
    "100%";
    
    localStorage.removeItem("sundayAnswers");
    localStorage.removeItem("sundayQuestion");

answers.length = 0;

currentQuestion = -1;
}
