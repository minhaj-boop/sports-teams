const spinner = document.getElementById('spinner-element');
spinner.style.display = 'none';

const alertMessage = document.getElementById('alert');
alertMessage.style.display = 'none';

const alertMessage2 = document.getElementById('alert2');
alertMessage2.style.display = 'none';

document.getElementById('search-button').addEventListener('click', async () =>{
    const searchResult = document.getElementById('search-input');
    const searchText = searchResult.value;
    spinner.style.display = 'block';
    if(searchText == '') {
        spinner.style.display = 'none';
        alertMessage2.style.display = 'block';
    } else {
        alertMessage2.style.display = 'none';
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.teams);
        displayTeamDetails(data.teams);
    }
});

const displayTeamDetails = teams => {
    const allteams = document.getElementById('all-teams');    
    spinner.style.display = 'none';    
    if(teams == null) {
        allteams.textContent = '';
        alertMessage.style.display = 'block';
    } else {
        alertMessage.style.display = 'none';
        allteams.textContent = '';
        teams.forEach(team => {
            console.log(team);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="col">
                <div class="card h-100">
                <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${team.strTeam}</h5>
                    <p>${team.strDescriptionEN}</p>
                </div>
                <div>
                    <a href="${'https://'+team.strWebsite}" target="_blank" class="btn btn-danger">Official website</a>
                </div>
                </div>
            </div>
            `;
            allteams.appendChild(div);
        });
    }
}
