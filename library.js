console.log('This is ES6 version of Project 2');
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}
let books=[];

class Display {
    add() {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        tableBody.innerHTML="";
        let uiString;
        books=JSON.parse(localStorage.getItem("books"));
        books.forEach(function(element,index){
             uiString = `<tr>
            <td>${index+1}</td> 
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            <td><button id = "delete" class="delete"  >Delete</button></td>
                    

        </tr>`;
tableBody.innerHTML += uiString;
index++;
        });
        
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }
    

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 2000);
    
    }
}
let display = new Display();
display.add();
// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);







function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    

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

    
    display.add();
    if (display.validate(book)) {
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
        display.add();
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    
    e.preventDefault();
}
let del = document.getElementById("delete");
    del.addEventListener('click',function(i){
    books=JSON.parse(localStorage.getItem("books"));
    books.splice(i,1);
    localStorage.setItem("books",JSON.stringify(books));
    display.add();
    display.show('success','Book deleted successfully!!');

});
