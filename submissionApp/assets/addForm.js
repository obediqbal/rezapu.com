const submitForm = document.getElementById("newBook");
const judulBuku = document.getElementById("judul");
const penulisBuku = document.getElementById("penulis");
const tahunBuku = document.getElementById("tahun");
const sedangStatus = document.getElementById("sedang");
const selesaiStatus = document.getElementById("selesai");
const akanStatus = document.getElementById("akan");
const radioBuku = submitForm.children[3];
const ratingBuku = document.getElementById("rating");
const messageSubmit = document.getElementById("messageSubmit");
const preview = document.getElementById("previewAdd")
const heading = addPanel.children[0];

const ADD_BOOK_HEADING = "Tambahkan Buku";
const EDIT_BOOK_HEADING = "Sunting Buku";

function modeToAdd() {
    resetAddMessage();

    heading.innerText = ADD_BOOK_HEADING;
    submitForm.reset();
}

function modeToEdit(judul, penulis, tahun, status, rate) {
    resetAddMessage();

    heading.innerText = EDIT_BOOK_HEADING;
    judulBuku.value = judul;
    penulisBuku.value = penulis;
    tahunBuku.value = tahun;
    radioBuku.children[status * 2].checked = true;
    ratingBuku.value = rate;

    updateAllPreview();
}

function resetAddMessage(){
    messageSubmit.innerHTML = "";
}

function showAddMessage() {
    resetAddMessage();

    let judulQuote = document.createElement("span");
    judulQuote.style.fontStyle = "italic";
    judulQuote.style.fontWeight = "bold";
    judulQuote.innerText = judulBuku.value;

    messageSubmit.append(judulQuote);
    messageSubmit.append(" telah berhasil ditambahkan")
}

function statusToInt() {
    if (sedangStatus.checked) return 0;
    else if (selesaiStatus.checked) return 1;
    else return 2;
}

function statusToString() {
    const sint = statusToInt();
    if(sint==0) return "Sedang Dibaca";
    else if(sint==1) return "Selesai Dibaca";
    else return "Akan Dibaca";
}

submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const judul = judulBuku.value;
    const penulis = penulisBuku.value;
    const tahun = tahunBuku.value;
    const statusString = statusToString();
    const status = statusToInt();
    const rate = ratingBuku.value;

    if(heading.innerText==ADD_BOOK_HEADING) addBuku(judul,penulis,tahun,status,statusString,rate);
    else {
        editBuku(judul,penulis,tahun,status,statusString,rate);
        panelReset();
        resetPreview();
        rakPanel.removeAttribute("hidden");
    }

    showAddMessage();
    submitForm.reset();
    resetPreview();
});

function updatePreview(index){
    if(index<3){
        const target = submitForm.children[index].children[2];
        const toChange = preview.children[index].children[0];
        toChange.innerText = target.value;

        if (target.value == "" || target == tahunBuku && (parseInt(target.value) > target.max || parseInt(target.value) < target.min)) {
            toChange.innerText = "-";
        }
    }
    else if(index<6){
        preview.children[3].children[0].innerText = statusToString((index-3)*2);
    }
    else{
        const target = document.getElementById("ratePrev").children[0];
        target.innerText = ratingBuku.value;
    }
}

function updateAllPreview(){
    for(let i = 0;i<=6;i++){
        updatePreview(i);
    }
}

function resetPreview() {
    let i =0;
    while(i<5){
        preview.children[i].children[0].innerText="-";
        i++;
    }
    preview.children[3].children[0].innerText = "Sedang Dibaca";
}

for (let i = 0; i < 3; i++) {
    let target = submitForm.children[i].children[2];
    target.addEventListener("input", function () {
        updatePreview(i);
    });

    let target2 = submitForm.children[3];
    target2.children[i * 2].addEventListener("input", function () {
        updatePreview(i+3);
    });
}

ratingBuku.addEventListener("input", function () {
    updatePreview(6);
});