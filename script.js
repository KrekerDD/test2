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
Желательно в деталях 🙂

Можно несколько вариантов:

— уютный домашний вечер
— прогулка
— встреча с друзьями
— бар, концерт или ещё какой-нибудь расколбас


Интересно всё.
`
},

{
    title: "Вопрос 2 из 7",

    question: "Так-такс... теперь про еду 😌",

    description: `
Что насчёт еды, напитков (безалкогольных 👀) и десертов?

Что любишь больше всего?

Что готова есть хоть каждую неделю?

Есть ли любимые кухни?

А что наоборот никогда не выберешь?
`
},

{
    title: "Вопрос 3 из 7",

    question: "Цветочки 🌷",

    description: `
Какие цветы тебе нравятся больше всего?

Есть любимые?

Может быть есть какие-то особенные, которые вызывают приятные эмоции?

Или наоборот те, которые совсем не нравятся?
`
},

{
    title: "Вопрос 4 из 7",

    question: "Фильмы и сериалы 🎬",

    description: `
Посоветуй несколько любимых фильмов и сериалов.

А если выбрать сложно —

расскажи хотя бы про любимые жанры.

Что готова пересматривать снова и снова?
`
},

{
    title: "Вопрос 5 из 7",

    question: "Тяжёлые дни бывают у всех",

    description: `
Что обычно помогает тебе поднять настроение?

Это может быть что угодно:

— музыка

— прогулка

— человек

— вкусная еда

— сон

— сериал

или что-то совсем неожиданное 🙂
`
},

{
    title: "Вопрос 6 из 7",

    question: "О чём ты мечтаешь сейчас? ✨",

    description: `
Можно отвечать как угодно.

Про ближайший месяц.

Про несколько лет.

Или вообще про всю жизнь.

Интересно всё 🙂
`
},

{
    title: "Вопрос 7 из 7",

    question: "Финальный вопрос",

    description: `
Очень серьёзный вопрос.

Прошу отнестись максимально ответственно.

Стул — это существительное или местоимение? 🤔
`
}
];

let currentQuestion = -1;
const answers = [];

const content = document.getElementById("content");

document
    .getElementById("startBtn")
    .addEventListener("click", startQuestions);

function startQuestions() {

    currentQuestion = 0;

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
    placeholder="Твой ответ..."
></textarea>

<button id="nextBtn">
    ${
        currentQuestion === questions.length - 1
            ? "Отправить"
            : "Далее →"
    }
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
        alert("Нужно написать ответ 🙂");
        return;
    }

    answers[currentQuestion] = answer;


    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

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

            <h1>Основная часть завершена</h1>

            <p>
                Если ты думала, что всё...
            </p>

            <p>
                То нет 😌
            </p>

            <p>
                Осталось ещё два вопроса.
            </p>

            <p class="secret-small">
                Обещаю, они не страшные.
            </p>

            <button id="continueBtn">
                Открыть секретный блок →
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
            ❤️
        </div>

        <h1>Спасибо</h1>

        <p>
            Ответы успешно сохранены.
        </p>

        <p>
            Некоторые ответы меня уже заинтересовали 👀
        </p>

        <p class="final-joke">
            Твоё мнение по вопросу стула будет
            передано ведущим мировым лингвистам
            для дальнейшего изучения.
        </p>

        <div class="final-divider"></div>

        <p class="final-small">
            Хорошего дня 🙂
        </p>

    </div>
`;

content.classList.remove("fade-in");

void content.offsetWidth;

content.classList.add("fade-in");

document.querySelector(".progress-bar").style.width =
    "100%";
}