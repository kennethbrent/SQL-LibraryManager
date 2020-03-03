//////////////////////Pagination///////////////////////////////////
$(document).ready(()=>{
    $('.book_row').hide();
    const pageLinks = document.getElementsByClassName('pageLink')
    pageLinks[0].classList.add('activePage');
    const books = document.getElementsByClassName('book_row');
    for(let i = 0; i < 10; i ++){
        books[i].style.display = 'table-row';
    }
})

$('.pageLink').on('click', (e)=>{
    $('.book_row').hide();
    $('.pageLink').removeClass('activePage');
    $(e.target).addClass('activePage');
    const page = parseInt($(e.target).text());
    booksToShow(page)
})

const booksToShow = (page) => {
    const firstBook = (page - 1) * 10
    let lastBook = (page * 10);
    const books = document.getElementsByClassName('book_row');
    if(lastBook > books.length){
        lastBook = books.length;
    }
    for(let i = firstBook; i < lastBook; i ++){
        books[i].style.display = 'table-row';
    }
}
//////////////////////////////////////////////////////////////////////////
$('#searchForm').on('submit',  (e)=>{
    e.preventDefault();
    const query = $('#searchInput').val().toLowerCase();
    $('.book_row').hide();
    $('.pagination').hide();
    const booksArray = [...document.querySelectorAll('.book_row')]
    let matches = 0;
    booksArray.forEach((book)=>{
        let booktext = book.textContent.toLowerCase();
        if(query.length > 1){
            let match = booktext.includes(query)
            if(match){
                matches += 1;
                book.style.display = 'table-row';
            }
        }
    })
    if(matches === 0){
        $('.resultsIndicator').html(`
            <h3 id="no_results">No books found matching this criteria</h3>
            <a href='/' class="button">See all books</a>
        `)
    } else {
        $('.resultsIndicator').html(`
        <h3>${matches} book(s) matching your search criteria</h3>
        <a href='/' class="button">See all books</a>
    `)
    }
    // $('body').append(`<a href='/' class="button">See all books</a>`)

})

