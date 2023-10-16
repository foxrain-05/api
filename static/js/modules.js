const product_list = document.querySelector('.preview .row');

const createProduct = (product) => {
    const {id, name, type, image, category} = product;

    let state = "";
    if(type === "New") {
        state = `<q class="state fs-5 px-1">New Model</q>`
    } else if(type === "Best") {
        state = `<q class="state fs-5 px-1">Best Sellers</q>`
    }

    const html = `
    <div class="card col-1 text-center" data-id="${id}">
        ${state}
        <img src="static/img/product/${image[0]}" class="card-img-top" height="166" width="166">
        <div class="card-body d-flex flex-column justify-content-between">
          <h6 class="card-title tag fs-6">${name}</h6>
        </div>
    </div>`;

    product_list.innerHTML += html;
}


window.addEventListener('load', async () => {

    const params = new URLSearchParams(location.search);

    const category = params.get('category');
    const sort_by = params.get('sort_by');

    const category_text = document.querySelectorAll('.breadcrumb-container .category');

    if (category === "Module") {
        category_text[0].innerHTML = "마이크로웨이브 모듈";
    } else if(category === "Sensor") {
        category_text[0].innerHTML = "마이크로웨이브 센서";
    } else if(category === "TrafficSafety") {
        category_text[0].innerHTML = "교통안전";
    } else {
        category_text[0].innerHTML = "ERROR!";
        
    }


    const sort_btn = document.querySelectorAll('.preview .dropdown-menu .dropdown-item');
    console.log(sort_btn);
    sort_btn[0].href = `/modules?category=${category}&sort_by=Best`;
    sort_btn[1].href = `/modules?category=${category}&sort_by=New`;
    sort_btn[2].href = `/modules?category=${category}&sort_by=Asc`;
    sort_btn[3].href = `/modules?category=${category}&sort_by=Desc`;


    const url = `/product?category=${category}&sort_by=${sort_by}`;
    const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();

    if(!response.ok) {
        throw Error(data);
    }

    data.forEach(product => createProduct(product));

    const product_card = document.querySelectorAll('.preview .card');
    product_card.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            location.href = `/product-info?id=${id}`;
        });
    });

});