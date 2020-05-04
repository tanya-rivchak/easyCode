const http = function(){
    return{
        get(url, cb){
            try{
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.onload = () =>{
                    if(Math.floor(xhr.status/100)!==2){
                            cb(`Error: ${xhr.status}`, xhr)
                            return 
                    }
                    cb(null, JSON.parse(xhr.response))
                }
                xhr.onerror = () =>{
                    cb(`Error: ${xhr.status}`, xhr)
                }
                xhr.send();
            }catch(error){
                cb(error)
            }
        }
    }
}()

const newsList = document.getElementById('news-list');
const searchForm = document.forms.searchForm;

document.addEventListener('DOMContentLoaded', function(){
    loadNews();
})

searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    loadNews();
})

const newsService = (function(){
    const API_KEY = '21990bebed08435f92030ebaad8794c2';
    const URL = 'https://newsapi.org/v2';

    return{
        topHeadlines(country='ua', category='technology', cb){
            http.get(`${URL}/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`, cb)
        },
        everything(query, cb){
            http.get(`${URL}/everything?q=${query}&apiKey=${API_KEY}`, cb)
        }
    }
})()

function loadNews(){
    progressBar.classList.remove('d-none');
    const country = countrySelect.value;
    const category = categorySelect.value;
    const searchText = searchInput.value;

    if(!searchText){
        newsService.topHeadlines(country, category, onGetResponse)
    }else{
        newsService.everything(searchText, onGetResponse)
    }
}
function onGetResponse(err, res){
    if(err){
        console.log(err);
        return
    }
    renderNews(res.articles);
}
function renderNews(news=[]){
    newsList.children.length ? (Object.values(newsList.children).forEach(el => el.remove())):null;
    newsList.textContent = '';
    progressBar.classList.add('d-none');
    
    if(!news.length){
        newsList.textContent = 'No results';
        return;
    }
    newsList.insertAdjacentHTML(
        'afterbegin', 
        news.map(el => newsCardTemplate(el)).join('')
    );
}
function newsCardTemplate({author, description, title, publishedAt, url, urlToImage}={}){
    const authorHtml = author ? `<hr><span class="card-link">${author}</span>`: '';

    return `<div class="col-12 col-lg-6 news-card">
        <div class="card">
            <a href='${url}' class="card__link"></a>
            <div class="news-card__img">
                <img src="${urlToImage||'https://semantic-ui.com/images/wireframe/image.png'}" alt="Card image">
            </div>
            <div class="card-body">
                <h4 class="card-title"${title||''}</h4>
                <h6 class="card-subtitle mb-2 text-muted">${description||''}</h6>
                <span>${publishedAt||''}</span>
                ${authorHtml}
            </div>
        </div>
    </div>`
}