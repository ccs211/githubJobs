const form = document.querySelector('#form');
const result = document.querySelector('#result');

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('submit', validateSearch);

})

function validateSearch(e) {
  e.preventDefault();

  const search = document.querySelector('#search').value;
  
  if(search.length < 0) {
    showMsg('Try again!')
    return;
  }
  getApi(search);
}

function getApi(search) {
  const githubUrl = `https://jobs.github.com/positions.json?search=${search}`;
  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(githubUrl)}`

  axios.get(url)
       .then(res => showJobs(JSON.parse(res.data.contents)))
}

function showMsg(msg) {
  const prevAlert = document.querySelector('.alert');

  if(!prevAlert) {
    const alert = document.createElement('div');
    alert.classList.add('bg-gray-100', 'p-3', 'text-center', 'mt-3', 'alert');
    alert.textContent = msg;
  
    form.appendChild(alert);
  
    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

function showJobs(jobs) {
  while(result.firstChild) {
    result.removeChild(result.firstChild);
  }

  if(jobs.length > 0 ){
    result.classList.add('grid');

    jobs.forEach(job => {
      const { company, title, type, url } = job;

      result.innerHTML += `
      <div class="shadow bg-white p-6 rounded">
        <h2 class="text-2xl font-light mb-4">${title}</h2>
        <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
        <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
        <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Full info</a>
      </div>
      `;
    });
  } else {
    const noresult = document.createElement('p');
    noresult.classList.add('text-center', 'mt-10', 'text-gray-600', 'w-full');
    noresult.textContent = 'No jobs available. Try another search';
    result.appendChild(noresult);
  }
}