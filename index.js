const table = document.getElementById('table');
const postList = document.createElement('div');
const usersUrl = 'https://jsonplaceholder.typicode.com/users';

async function getUsers() {
 const getUsersList = await fetch(usersUrl);
 const usersList = await getUsersList.json();
 console.log(usersList);
 const usernames = usersList.map(user => {
  return user.username;
 })
 const userIds = usersList.map(user => {
  return user.id;
 })
 console.log(usernames, userIds);
 function tableCreate() {
      const tbl = document.createElement('table');
      tbl.id="tbl";
  let k = 0;
  for (let i = 0; i < 5; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < 2; j++) {
        const td = tr.insertCell();
        const username = usernames[`${k}`]
        td.appendChild(document.createTextNode(username));
        td.title = username;
        td.onclick = function() {
          async function getPosts() {

           tbl.className += 'none';
           const index = usernames.indexOf(username);
           const userId = userIds[index];
           const url = 'https://jsonplaceholder.typicode.com/users/'+userId+'/posts';
           console.log(url)
           const getTitlesAndPosts = await fetch(url);
           let titlesAndPosts = await getTitlesAndPosts.json();
           console.log(titlesAndPosts);
           titlesAndPosts = titlesAndPosts.map( user => {
            return {title: user.title, post: user.body}
           })
            posts.innerHTML+= `<h3>${username}</h3>`
           titlesAndPosts.forEach(item => {
            posts.innerHTML+=`<div class='post-title'>${item.title}</div>` 
            posts.innerHTML+=`<div class='post-body'>${item.post}</div>`
           })
           posts.innerHTML += `
           <div>
           <button onclick="document.getElementById('tbl').classList.remove('none'); this.parentNode.parentNode.style.display='none'">Return to home</button>
           </div>
          `
          }

          getPosts();
          const posts = document.createElement('div');
          posts.className += "posts";
          table.appendChild(posts);
          
        }
        td.style.textAlign = 'center';
        k++;
    }
  }
  table.appendChild(tbl);
 }
 tableCreate();
}

getUsers();





