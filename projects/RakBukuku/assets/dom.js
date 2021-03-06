const uncompletedBookList = document.getElementById("uncompleted-list");
const completedBookList = document.getElementById("completed-list");
const plannedBookList = document.getElementById("planned-list");
const BOOK_ITEM_ID = "bookId"
let el;

function createStar(rate) {
    const container = document.createElement("div");
    const star = document.createElement("div");
    const rating = document.createElement("div");

    container.classList.add("container-star")

    rating.classList.add("rating-star");
    rating.innerText = "(" + rate + ")";

    if (rate != "-") {
        star.classList.add("star-color");
        rating.style.setProperty("color", "gold");
    } else {
        star.classList.add("star-grayscale");
        rating.style.setProperty("color", "grey");
    }

    container.append(star);
    container.append(rating);
    return container;
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });

    return button;
}

function removeBookFromList(element) {
    bukubuku.splice(findBukuIndex(element[BOOK_ITEM_ID]), 1);
    element.remove();
    updateDataToStorage();
}

function editBookFromList(element) {
    panelReset();
    const buku = findBuku(element[BOOK_ITEM_ID]);
    addPanel.removeAttribute("hidden");
    console.log(element);
    el = element;
    modeToEdit(buku.title, buku.author, buku.year, buku.status, buku.rating);
}

function createEditButton() {
    return createButton("edit-button", function (event) {
        editBookFromList(event.currentTarget.parentElement.parentElement.parentElement);
    });
}

function createRemoveButton() {
    return createButton("remove-button", function (event) {
        removeBookFromList(event.currentTarget.parentElement.parentElement.parentElement);
    });
}

function editBuku(judul, penulis, tahun, status, rate) {
    removeBookFromList(el);
    addBuku(judul, penulis, tahun, status, rate);
}

function addBuku(judul, penulis, tahun, status, rate) {
    const buku = makeBuku(judul, penulis, tahun, rate);
    const bukuObject = composeBukuObject(judul, penulis, tahun, status, rate);

    bukubuku.push(bukuObject);
    buku[BOOK_ITEM_ID] = bukuObject.id;

    if (status == 0) uncompletedBookList.append(buku);
    else if (status == 1) completedBookList.append(buku);
    else plannedBookList.append(buku);

    updateDataToStorage();
}

function makeBuku(judul, penulis, tahun, rate) {
    const title = document.createElement("h4");
    title.innerText = judul;

    title.classList.add("book-title");

    const author = document.createElement("p");
    author.innerText = penulis;

    const year = document.createElement("p");
    year.innerText = tahun;

    const textContainer = document.createElement("div");
    textContainer.append(title, author, year);
    textContainer.classList.add("text-on-book-container");

    const misc = document.createElement("div");
    misc.classList.add("misc-on-book-container")

    const buttons = document.createElement("div");
    buttons.classList.add("buttons-book-container");

    const stars = createStar(rate);

    misc.append(stars);
    misc.append(buttons)

    buttons.append(createEditButton());
    buttons.append(createRemoveButton());

    const container = document.createElement("div");
    container.classList.add("book-container");
    container.classList.add("book-list");
    container.append(textContainer);
    container.append(misc);

    return container;
}

function hideBuku() {
    const bukubukuElement = document.querySelectorAll(".book-list");
    for (bukuElement of bukubukuElement) {
        bukuElement.classList.add("hide");
    }
}

function showBuku(element) {
    element.classList.remove("hide");
}