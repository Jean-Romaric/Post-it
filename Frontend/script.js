const notesContainer = document.getElementById("app");//gd div
const addNoteButton = notesContainer.querySelector(".add-note");//button


function getNotes() {
  return JSON.parse(localStorage.getItem("sticky-notes") || "[]");
}

addNoteButton.addEventListener("click", () => addNote());

function addNote() {
  const notes = getNotes();
  const noteObj = { id: Math.floor(Math.random() * 100000), content: "" };
  //let a ={ id: Math.floor(Math.random() * 100000), content: "cvb" };
  //console.log(a);
 // console.log(noteObj);
  //console.log(noteObj.id)//
  //------- -----------//
  const noteElement = createNoteElement(noteObj.id, noteObj.content);
  console.log(noteObj.content) //chaine vide 

  notesContainer.insertBefore(noteElement, addNoteButton);
  notes.push(noteObj);
  saveNotes(notes);
}   

function createNoteElement(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  content =  element.value ;//recupère la valeur du textarea(**** ****)
  //console.log(content) //chaine vide 
  //console.log(element.value)

  element.placeholder = "Bonjour...";
  element.addEventListener("change", () => updateNote(id, element.value));
  //------- -----------//
  element.addEventListener("dblclick", () => {
    if (confirm("Supprimer cette note ?")) 
        deleteNote(id, element);
    });

  return element;
}


function updateNote(id, newContent) {
  const notes = getNotes();
  console.log(notes)
  const target = notes.filter(n => n.id == id)[0];
  console.log(target)
  target.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter(n => n.id != id);
  saveNotes(notes);
  notesContainer.removeChild(element);
}


// Charger les notes au démarrage
getNotes().forEach(note => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});






function saveNotes(notes) {
  localStorage.setItem("sticky-notes", JSON.stringify(notes));
}






