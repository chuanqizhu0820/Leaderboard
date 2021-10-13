import './style.css';

let gameId = '';

const createGame = async () => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
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
            <form action="https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores"
            method="post" id="name-socre-form">
            <input type="text" name="name" placeholder="Your name" id="input-name"><br>
            <input type="text" name="score" placeholder="Your score" id="input-score"><br>
            <input type="submit" value="Submit" id="name-socre-submit">
            </form>
        `;
  const formDiv = document.querySelector('#add-score');
  formDiv.innerHTML = formHtml;
};

const addScore = async (name0, score0) => {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`, {
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

const refreshSocre = async () => {
  const nameScoreList = document.querySelector('#name-score-list');
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`);
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

const scoreForm = document.querySelector('#name-socre-form');

scoreForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addScore(scoreForm.name.value, scoreForm.score.value);
});

const refreshBtn = document.querySelector('#refresh-btn');

refreshBtn.addEventListener('click', () => {
  refreshSocre();
});