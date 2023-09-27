window.addEventListener('load', async () => {

    // Get the page number from the URL
    const url = new URLSearchParams(window.location.search);
    let page;
    if (url.has('page')) {
        page = url.get('page');
        isNaN(page) ? page = 1 : page = parseInt(page);
    } else {
        page = 1;
    }

    const pageValue = document.querySelector('.page');
    pageValue.innerHTML = page;
    
    const page_item = document.querySelectorAll('.page-item');
    page_item.forEach(element => {
        element.classList.remove('active');
    });
    page_item[page].classList.add('active');

    if(page == 1){
        page_item[0].classList.add('disabled');
    }else{
        page_item[0].classList.remove('disabled');
        page_item[0].children[0].href = `/certificate?page=${page - 1}`;

    }

    if(page == page_item.length - 2){
        page_item[page_item.length - 1].classList.add('disabled');
    }else{
        page_item[page_item.length - 1].classList.remove('disabled');
        page_item[page_item.length - 1].children[0].href = `/certificate?page=${page + 1}`;
    }


    // Fetch the page data
    const results = await fetch(`/certificate-page?page=${page}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());


    // Display the page data
    const certificate = document.querySelector('.certificate-container');
    console.log(certificate);

    results.forEach(element => {
        const {id, text, url} = element;

        const div = document.createElement('div');
        div.classList.add('col-6', 'col-md-3', 'certificate-item', 'd-flex', 'flex-column', 'justify-content-between', 'mb-4');

        const img = document.createElement('img');
        img.src = `static/img/certificate/${url}`;
        img.alt = text;

        const h1 = document.createElement('h1');
        h1.classList.add('text-muted', 'fw-bold', 'fs-5', 'text-center', 'mb-4', 'mt-2');
        h1.innerHTML = text;

        div.appendChild(img);
        div.appendChild(h1);

        certificate.appendChild(div);
    });
});