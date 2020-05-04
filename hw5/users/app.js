localStorage.clear();

const http = (function(){
    return{
        get(url, cb){
            try{
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.onload = () =>{
                    if(Math.floor(xhr.status/100)!==2){
                        cb(xhr.status, xhr)
                    }
                    cb(null, JSON.parse(xhr.response))
                }
                xhr.onerror = () =>{
                    cb(xhr.status, xhr)
                    return
                }
                xhr.send()
            }catch(error){
                cb(error)
            }
        },
        post(url, body, headers={"Content-type": "application/json; charset=UTF-8"}, cb){
            try{
                const xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                xhr.onload = () =>{
                    if(Math.floor(xhr.status/100)!==2){
                        cb(xhr.status, xhr)
                    }
                    cb(null, JSON.parse(xhr.response))
                }
                xhr.onerror = () =>{
                    cb(xhr.status, xhr)
                    return
                }
                Object.entries(headers).forEach(([key, value])=>  xhr.setRequestHeader(key, value))
                xhr.send(JSON.stringify(body))
            }catch(error){
                cb(error)
            }
        }
    }
})()
const usersList = document.getElementById('usersList');
const userName = document.getElementById('userName');
const userInformation = document.getElementById('userInfo');
const createUserForm = document.forms.createUserForm;
let maxId = 10;

const userService = (function(){
    const url = 'https://jsonplaceholder.typicode.com/users';
    return{
        userList(){
            http.get(url, (err, res)=>{
                if(err){
                    console.log(err)
                    return
                }
                renderUsersList(res)
            })
        },
        user(id){
            clearModal();
            if(localStorage.getItem(id)){
                userInfoRender(JSON.parse(localStorage.getItem(id)))
                return
            }
            http.get(`${url}/${id}`, (err, res)=>{
                if(err){
                    console.log(err)
                    return
                }
                userInfoRender(res)
            })
        },
        newUser(body){
            http.post(
                url,
                body,
                {"Content-type": "application/json; charset=UTF-8"},
                (err, res)=>{
                    if(err){
                        console.log(err)
                        return
                    }
                    renderUsersList([res],++maxId)
                }
            )
        }
    }
})()

usersList.onclick = ({target}) =>{
    if(target.classList.contains('list-group-item')){
        userService.user(target.getAttribute('data-id'));
    }
}
createUserForm.addEventListener('submit', function(e){
    e.preventDefault();
    const inputs = Object.fromEntries(
        [ ...createUserForm.elements ]
            .filter(el => el.tagName==="INPUT")
            .map(el => [el.name, el.value])
        );
        
    userService.newUser(userObj(inputs));
    createUserForm.reset();
})

userService.userList();

function renderUsersList(list, newUserId=null){
    usersList.insertAdjacentHTML(
        'afterbegin', 
        list.map(user => {
            if(newUserId){
                user.id = newUserId;
            }
            localStorage.setItem(user.id, JSON.stringify(user))
            return userCardTemplate(user)
        }).join(' ')
    )
}

function userCardTemplate({name, id}={}){
    return `
        <li class="list-group-item" data-toggle="modal" data-target="#userModal"
            data-id='${id}'>
            <span>${name}</span>
            <a href="#" class="card-link">More...</a>
        </li>
    `
}

function userInfoRender(info){
    userName.textContent = info.name;
    userInformation.insertAdjacentHTML('afterbegin', userInfoTemplate(info))
}

function userInfoTemplate({username, company, phone, website, email}={}){
    const emailHTML = email ? `<p>Email: <a href='mailto:${email}'>${email}</a></p>` : '';
    const phoneHTML = phone ? `<p>Phone: <a href='tel:${phone}'>${phone}</a></p>` : '';
    const websiteHTML = website ? `<p>Website: <a href='https://www.${website}' target='_blanc'>${website}</a></p>` : '';
    const usernameHTML = username 
        ? `<p>${username}</p>` : '';
    
    return `
        ${usernameHTML}
        ${emailHTML}
        ${phoneHTML}
        ${websiteHTML}
    `
}


function clearModal(){
    userInformation.children.length 
    ? Object.values(userInformation.children).forEach(el => {
        console.log()
        if(el.hasAttribute('id')){ return }
        el.remove()
    })
    : null;
    userName.textContent = '';
}

function userObj({name, email, phone, username, website, id}={}){
    return{
        name, email, phone, username, website, id
    }
}