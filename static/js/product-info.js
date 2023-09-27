window.addEventListener('load', async () => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    const product_data = await fetch(`/product-data?id=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json());

    const image_item = document.querySelector(".product-carousel .carousel-inner");

    product_data.image.forEach((image, index) => {
        const html = `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="/static/img/product/${image}" class="d-block w-100" alt="product image">
            </div>`;

        if (!image.endsWith(".mp4")) {
            image_item.innerHTML += html;
        }
    });

    $("document").ready(() => {
        $(".product-info").load(`/static/html/${product_data.html}`);
    });
});