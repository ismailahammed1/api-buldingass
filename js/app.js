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
console.log(uniqueArray.length);
const dinamicItemValue = () => {
    const value = document.getElementById("dinamic-Velue")
    value.innerText = `${uniqueArray.length}`

}
dinamicItemValue()
const setAllMenu = async () => {
    const data = await loadALlNews();
    const AllMenu = document.getElementById('menu')

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

}
// menubar()
const diplayNews = allNews => {
    console.log(allNews);
    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = '';
    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('w-full', 'lg:max-w-full', 'lg:flex');
        newsDiv.innerHTML = `
        <div
        class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
        <img src="${news.image_url}"/>
    </div>
    <div
        class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div class="mb-8">
    
            <div class="text-gray-900 break-all font-bold text-xl mb-2">${news.title.slice(0, 100)}</div>
            <p class="text-gray-700 text-base">${news.details.slice(0, 500)}
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
            <div class="flex items-center hidden md:block">
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
            <div class="flex items-center">
            <button onclick="toggleModal('modal-id')" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer">
            <i class="fa-solid fa-arrow-right"></i>
            
          </button>
         
        <div class="hidden overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center" id="modal-id">
          <div class="relative w-auto my-6 mx-auto max-w-3xl">
            <!--content-->
            <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <!--header-->
              <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 class="text-3xl font-semibold">
                ${news.title}
                </h3>
                <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onclick="toggleModal('modal-id')">
                  <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <!--body-->
              <div class="relative p-6 flex-auto">
                <p class="my-4 text-slate-500 text-lg leading-relaxed">
                ${news.details}
                </p>
              </div>
              <!--footer-->
              <div class="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
              <p class="text-gray-900 leading-none">${news.author.name}</p>

              <p class="text-gray-600">${news.author.published_date}</p>
              <div class="flex items-center ">
            <i class="fa fa-eye mr-4 mt-1" aria-hidden="true"></i>
                <div class="text-sm">
                    <p class="text-gray-600">${news.total_view}</p>
                </div>
            </div>
            <div class="flex items-center md:d-none">
                <div class="flex items-center">
                
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
                </div>
                <div class="text-sm">
                </div>
            </div>
                <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="toggleModal('modal-id')">
                  Close
                </button>
            
              </div>
            </div>
          </div>
        </div>
        <div class="hidden opacity-25 fixed inset-0 z-40 bg-black" id="modal-id-backdrop"></div>
        <script type="text/javascript">
         
        </script>
              </div>
          </div>
            </div>
        </div>
    </div>
    
    `
        newsContainer.appendChild(newsDiv);

    });
}
/*-------------Spiner section-------------------*/
// const toggleSpinner = isLoading => {
//     const loaderSection = document.getElementById('loader');
//     if (isLoading) {
//         loaderSection.classList.remove('hidden')
//     }
//     else {
//         loaderSection.classList.add('hidden')
//     }
// }



/*-------------value pass */

// array.sort(function (a, b) {
//     // Turn your strings into dates, and then subtract them
//     // to get a value that is either negative, positive, or zero.
//     return new (b.date) - new (a.date);
// });
// loadALlNews()
const button = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');


button.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});
