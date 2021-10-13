import './style.css';

fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
  method: 'POST',
  body: JSON.stringify({
    name: 'foo',
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    const gameId = json.result.split(' ')[3];
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

    const socreFrom = document.querySelector('#name-socre-form');
    const nameInput = document.querySelector('#input-name');
    const scoreInput = document.querySelector('#input-score');

    socreFrom.addEventListener('submit', (e) => {
      e.preventDefault();

      fetch(socreFrom.action, {
        method: 'POST',
        body: JSON.stringify({
          user: nameInput.value,
          score: scoreInput.value,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    });

    const refreshBtn = document.querySelector('#refresh-btn');
    const nameScoreList = document.querySelector('#name-score-list');
    refreshBtn.addEventListener('click', () => {
      fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`)
        .then((response) => response.json())
        .then((json) => {
          let listHtml = '';
          const jsonArr = json.result;
          jsonArr.forEach((item) => {
            listHtml += `
                        <li>${item.user}:${item.score}</li>
                        `;
          });
          nameScoreList.innerHTML = listHtml;
        });
    });
  });
