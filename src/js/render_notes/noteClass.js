export class NoteClass {

    constructor(noteContainer, storageQuery, idx, isMemo) {
   
      this.note = noteContainer;
      this.storageQuery = storageQuery;
      this.idx = idx;
      this.isMemo = isMemo;
      this.header = noteContainer.childNodes[0];
      this.editHeaderBtn = noteContainer.childNodes[1];
      this.minBtn = noteContainer.childNodes[2];
      this.delBtn = noteContainer.childNodes[3];
  
      if (isMemo == false) {
        this.taskInput = noteContainer.childNodes[4];
        this.addBtn = noteContainer.childNodes[5];
        this.undoBtn = noteContainer.childNodes[6];
        this.todoList = noteContainer.childNodes[7];
      }
      else {
        this.memoInput = noteContainer.childNodes[4];
        this.characterCount = noteContainer.childNodes[5];
        this.memoBtn = noteContainer.childNodes[6];
      }
    }
  }