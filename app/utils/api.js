const id = "8c189c2e2561fb5d531b"
const sec = "b2d961fff6e1e530a87575078a40b2db41ac0005"
const params = `?client_id=${id}&client_secret=${sec}`

function getErrorMsg(message, username){
    if(message === 'Not Found')
        return `${username} does not exist`
    return message
}

function fetchProfile(username){
    return fetch(`https://api.github.com/users/${username}${params}`)
        .then((res) => res.json())
        .then((profile)=>{
            if(profile.message)
                throw new Error(getErrorMsg(profile.message,username))
            return profile
        })
}

function fetchRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .then((res) => res.json())
    .then((repos)=>{
        if(repos.message)
            throw new Error(getErrorMsg(repos.message,username))
        return repos
    })
}

function getStartCount(repos){
    return repos.reduce(
        (counte,{stargazers_count}) => counte + stargazers_count, 0
        )
    //return repos.reduce((counte, {stargazers_count})=>{
    //    return (counte + stargazers_count)
    //}, 0)
}

function calculateScore(followers, repos){
    return (followers * 3) + getStartCount(repos)
}

function getUserData(player){
    return Promise.all([
        fetchProfile(player),
        fetchRepos(player)
    ]).then(([profile, repos])=>({
        profile,
        score : calculateScore(profile.followers, repos)
    }))
}

function sortPlayers(players){
    return players.sort((a,b)=> b.score - a.score)
}

export function battle(players){
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ]).then((results)=> sortPlayers(results))
}

export function fetchPopularRepos(language){
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
    return fetch(endpoint)
        .then((res)=>res.json())
        .then((data)=>{
            if(!data.items) {
                throw new Error(data.message)
            }
            return data.items
        })
}