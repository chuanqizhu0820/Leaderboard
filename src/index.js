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
            <h4 class="mb-3">Add your score</h4>
            <form action= ${baseUri}+${gameId}+"/scores"
            method="post" id="name-score-form">
            <div class="mb-3">
            <input type="text" name="name" placeholder="Your name" id="input-name" class="form-control" aria-describedby="emailHelp" required>
            </div>
            <div class="mb-3">
            <input type="number" name="score" placeholder="Your score" class="form-control" id="input-score" required>
            </div>
            <input type="submit" class="btn btn-outline-secondary" value="Submit" id="name-score-submit">
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
    jsonArr.forEach((item, i) => {
      if (i % 2 === 0) {
        listHtml += `<li class="list-group-item">${item.user}: ${item.score}</li>`;
      } else {
        listHtml += `<li class="list-group-item list-group-item-secondary">${item.user}: ${item.score}</li>`;
      }
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