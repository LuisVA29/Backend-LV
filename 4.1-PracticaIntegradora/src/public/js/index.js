const socket = io();

socket.on("product created", (product) => {
  const articleAdd = `<article id="${product?.id}" class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
    <div class="relative flex items-end overflow-hidden rounded-xl">
    <img class="h-48 w-full object-contain" src=${product?.thumbnail}/>
    <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
        <span class="ml-1 text-sm text-slate-400">Codigo: ${product?.code} </span>
    </div>
    </div>
    <div class="mt-1 p-2">
    <h2 class="text-slate-700 line-clamp-1"> ${product?.title} </h2>
    <p class="mt-1 text-sm text-slate-400 capitalize"> ${product?.category} </p>

    <div class="mt-3 flex items-end justify-between">
        <p class="text-lg font-bold text-blue-500">${product?.price}</p>


        <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
        <button class="text-sm">Stock ${product?.stock} </button>
        </div>
    </div>
    </div>
</article>`;

  document
    .getElementById("articleList")
    .insertAdjacentHTML("beforeend", articleAdd);
});

socket.on("product deleted", (productID) => {
  document.getElementById(`${productID}`).remove();
});
