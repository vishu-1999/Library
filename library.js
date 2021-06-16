

// constructor using prototype
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}
// declaring global variables
let books=[];



// display constructor :: we will enter some methods in its prototype which will be responsible for displaying our books on the user interface.
function Display() {

}

// Add methods to display prototype
Display.prototype.add = function(){
    console.log("Adding to ui");
    tableBody = document.getElementById('tableBody');
    tableBody.innerHTML="";
    books=JSON.parse(localStorage.getItem("books"));
    books.forEach(function(element,index ) {
        let uiString = `<tr>
                       <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                    </tr>`;
                    
    tableBody.innerHTML += uiString;  
    });
                  
}
Display.prototype.clear = function(){
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

Display.prototype.validate = function(book){
     if (book.name.length<2 || book.author.length<2){
         return false;
         }
         else{
            return true;
        }
    }

Display.prototype.show = function(type,displayMessage){
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert  alert-${type}   alert-dismissible fade show" role="alert">
    <strong> Messge:</strong> ${displayMessage}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
  </div>`
  setTimeout(function() {
      message.innerHTML= ''  
    }, 2000);

}  
let display = new Display();
display.add();  



// Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', libraryFormSubmit);


// definition of function made for submit button i.e. libraryFormSubmit
function libraryFormSubmit(e) {
    console.log('You have submitted library form ');
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    // type has 3 different types with 3 diff ids
    //  let type =document.getElementById("").value;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    let type;


    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    // let display = new Display();
    // showing previous data after reload
    display.add();

    if(display.validate(book)){ // so that it is assured that the author and book name is surely entered by user otherwise it will create empty rows in table by just directly clicking the add book button.
    // display.add(); // add method adds the book in the table.
    // display.clear(); // clear method will clear the display that is once the form is submitted it will clear the text area .
    // display.show('success ',' Your book is successfully added . ');
    books.push(book);
    localStorage.setItem("books",JSON.stringify(books));
    display.add();
    display.clear(); 
    display.show('success ',' Your book is successfully added . ');

    }
    else{
        display.show('error ',' Sorry you can not add this book.');
    }


    e.preventDefault();
}
