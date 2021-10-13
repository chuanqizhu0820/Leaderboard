import './style.css';

let gameId = "";

let createGame = async () => {

    await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
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
            gameId = json.result.split(' ')[3];
        });
}

let createForm = () => {
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
}



let addScore = async (name0, score0) => {
    await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`, {
        method: 'POST',
        body: JSON.stringify({
            user: name0,
            score: score0,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => { return });
}


let refreshSocre = async () => {
    const nameScoreList = document.querySelector('#name-score-list');
    await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`)
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

}

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