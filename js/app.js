const loadALlNews = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error);
    }
    // console.log(data.data.news_category[2].category_name);
    // displayNewsDataApi(data.data);
}
/*-------------- menu & catagory select--------------*/
const uniqueArray = [];
const dinamicItemValue = () => {
    // const value = document.getElementById("dinamic-Velue")
    // value.innerText = uniqueArray.length;

}
dinamicItemValue()
const setAllMenu = async () => {
    const data = await loadALlNews();
    const AllMenu = document.getElementById('menu')

    // value.innerText = data.data.length
    for (const NewsItem of data.data.news_category) {
        /*--------------create menu--------------*/
        if (uniqueArray.indexOf(NewsItem.category_name) === -1) {
            uniqueArray.push(NewsItem.category_name);
            const ul = document.createElement('ul');
            ul.classList.add('pt-4', 'text-base', 'text-gray-700',
                'md:flex',
                'md:justify-between',
                'md:pt-0')
            ul.innerHTML = `<li>
                        <a onclick= "menubar('${NewsItem.category_id}')" class="md:p-4 py-2 block hover:text-purple-400" href="#">${NewsItem.category_name}</a>
                    </li>
              `;
            AllMenu.appendChild(ul)
        }
    }
}
setAllMenu();
const menubar = (category_id) => {
    // console.log(category_id);

    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(res => res.json())
        .then(data => diplayNews(data.data))

    toggleSpinner(true);
}
// menubar()
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("spinner");
    if (isLoading) {
        loaderSection.classList.remove('hidden')
    }
    else {
        loaderSection.classList.add('hidden')
    }
}
const diplayNews = allNews => {

    // const loaderSection = document.getElementById("spinner");
    // loaderSection.classList.remove('hidden')
    const newsContainer = document.getElementById('news-container')

    newsContainer.innerHTML = '';
    const value = document.getElementById("dinamic-Velue")
    value.innerText = allNews.length;
    allNews.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('w-full', 'lg:max-w-full', 'lg:flex');
        newsDiv.innerHTML = `
        <div class=" mx-0 card card-side flex justify-between grid grid-rows-1 md:grid-cols-2 bg-base-100 shadow-xl ">
        <img class="h-full w-96 mx-0" src="${news.image_url}" alt="movie">
  <div class="card-body mr-6">
    <h2 class="card-title">${news.title.slice(0, 100)} ...</h2>
    <p>${news.details.slice(0, 500)}  See More...</p>
    <div class="flex justify-between grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-col gap-4">
    <div class="flex items-center flex justify-between grid grid-rows-1 md:grid-cols-2 ">
        <img class="w-10 h-10 rounded-full mr-4" src="${news.author.img}" Avatar of Writer">
        <div class="text-sm">
            <p class="text-gray-900 leading-none">${news.author.name}</p>

 
        </div>
    </div>
    <div class="flex items-center ">
    <i class="fa fa-eye mr-4 mt-1" aria-hidden="true"></i>
        <div class="text-sm">
            <p class="text-gray-600">${news.total_view}</p>
        </div>
    </div>
    <div class="flex items-center mt-4 hidden md:block">
        <div class="flex items-center">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star-half-stroke"></i>
        </div>
        <div class="text-sm">
        </div>
    </div>
    <label for="my-modal-6" class="btn modal-button"> News Details 
    <i class="fa-solid fa-arrow"></i>
  </div>
  </label>
</div>
            <!-- Button trigger modal -->
              <!-- Put this part before </body> tag -->
              <input type="checkbox" id="my-modal-6" class="modal-toggle" />
              <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                <div class="mb-8">
    
                <div class="text-gray-900 break-all font-bold text-xl mb-2">${news.title}</div>
                <p class="text-gray-700 text-base">${news.details}
                </p>
            </div>
            <div class="flex justify-between grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-col gap-4">
            <div class="flex items-center">
                <img class="w-10 h-10 rounded-full mr-4" src="${news.author.img}" Avatar of Writer">
                <div class="text-sm">
                    <p class="text-gray-900 leading-none">${news.author.name}</p>

         
                </div>
            </div>
            <div class="flex items-center ">
            <i class="fa fa-eye mr-4 mt-1" aria-hidden="true"></i>
                    <div class="text-sm">
                        <p class="text-gray-600">${news.total_view}</p>
                    </div>
                </div>
                    <div class="flex items-center mt-7 hidden md:block ">
                        <div class="flex items-center">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <div class="text-sm">
                        </div>
                    </div>
                  
                  <div class="modal-action">
                    <label for="my-modal-6" class="btn">close</label>
                  </div>
                </div>
              </div>
    `
        newsContainer.appendChild(newsDiv);

    });
    toggleSpinner(false);
}



/*-------------value pass */

// loadALlNews()
const button = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');


button.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});
