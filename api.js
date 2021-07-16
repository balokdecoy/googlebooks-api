var brk = document.createElement("br")
var bookInfo = document.getElementById('main')
var picture = document.getElementById('pic')

var key = 'AIzaSyDm5RHFQfTMz5H8xNZfD-RCd-iukBs9IPw'

function buildQueryURL() {
    var searchTerm = $("#search-term").val().trim();
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm;
    return queryURL
}

$("#run-search").on("click", function(event) {
    event.preventDefault();

    var queryURL = buildQueryURL();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then((data) => {
        respond(data)
    })
})

function respond(data) {
    bookInfo.textContent = "";
    picture.textContent = "";
    console.log(data)
    for (var i = 0; i < data.items.length; i++) {
        var item = data.items[i];
        console.log(item.volumeInfo.title)
        var div = document.createElement("h2")
        var bookPic = document.createElement("img");
        var desc = document.createElement("div");
        $(desc).attr("class", "col-9")
        $(desc).attr("id", `${'textbox-' + [i]}`)
        div.textContent = item.volumeInfo.title;
        desc.textContent = item.volumeInfo.description;
        if (item.volumeInfo.imageLinks) {
            $(bookPic).attr('src', item.volumeInfo.imageLinks.thumbnail)
            $(bookPic).attr('class', 'col-md-3 img-fluid')
        }
        
        bookInfo.append(div)
        bookInfo.append(desc)
        bookInfo.append(bookPic)
    }
}