import './style.css';

let gameId = '';
const baseUri = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';

const createGame = async () => {
  const response = await fetch(baseUri, {
    method: 'POST',
    body: JSON.stringify({
      name: 'foo',
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  response.json().then((json) => {
    const [, , , c] = json.result.split(' ');
    gameId = c;
  });
};

const createForm = () => {
  const formHtml = `
            <h2>Add your score</h2>
            <form action= ${baseUri}+${gameId}+"/scores"
            method="post" id="name-score-form">
            <input type="text" name="name" placeholder="Your name" id="input-name" required><br>
            <input type="number" name="score" placeholder="Your score" id="input-score" required><br>
            <input type="submit" value="Submit" id="name-score-submit">
            </form>
        `;
  const formDiv = document.querySelector('#add-score');
  formDiv.innerHTML = formHtml;
};

const addScore = async (name0, score0) => {
  const response = await fetch(`${baseUri}${gameId}/scores`, {
    method: 'POST',
    body: JSON.stringify({
      user: name0,
      score: score0,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response.json();
};

const refreshScore = async () => {
  const nameScoreList = document.querySelector('#name-score-list');
  const response = await fetch(`${baseUri}${gameId}/scores`);
  response.json().then((json) => {
    let listHtml = '';
    const jsonArr = json.result;
    jsonArr.forEach((item) => {
      listHtml += `
                        <li>${item.user}:${item.score}</li>
                        `;
    });
    nameScoreList.innerHTML = listHtml;
  });
};

createGame();

createForm();

const scoreForm = document.querySelector('#name-score-form');

scoreForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addScore(scoreForm.name.value, scoreForm.score.value);
});

const refreshBtn = document.querySelector('#refresh-btn');

refreshBtn.addEventListener('click', () => {
  refreshScore();
});