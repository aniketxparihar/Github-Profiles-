const APIURL="https://api.github.com/users/"
const main=document.getElementById("main");
const form=document.getElementById("form");
const search=document.getElementById("search");
getUser("fireclan17");
async function getUser(username){

const resp=await fetch(APIURL + username);
const respData= await resp.json();

createUserCard(respData);
getRepos(username);

}

async function getRepos(username){

const resp=await fetch(APIURL + username+'/repos');
const respData= await resp.json();
 
addReposToCard(respData);
}

function createUserCard(user){

   
    const cardHTML=`
    <div class="card"> 
        <div>
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}"/>
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul class="info">
                <li><strong>Followers >  </strong>${user.followers}</li>
                    <li><strong>Following >  </strong>${user.following}</li>
            <li><strong>Repos >  </strong>${user.public_repos}</li>
            </ul>
            <h4> Repos </h4>
            <div class="repos" id="repos"> </div>
        </div>
    </div>   
    `;
     
    main.innerHTML=cardHTML;
}

function addReposToCard(repos){
    const reposE1=document.getElementById("repos");
    repos.forEach((repo) => {
    const repoE1=document.createElement("a");
    repoE1.classList.add("repo");

    repoE1.href=repo.html_url;
    repoE1.target="_blank";
    repoE1.innerText=repo.name;
    reposE1.appendChild(repoE1);
});


form.addEventListener(`submit`,(e) => {
    e.preventDefault();
    const user=search.value;

    if(user){
        getUser(user);
        search.value="";
    }
});
}