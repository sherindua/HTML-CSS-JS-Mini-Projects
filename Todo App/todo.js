let todoList=[];
displayItems();
function addTodo(){
  let inputElement=document.querySelector('#todo-input');
  let inputText=inputElement.value;
  let dateElement=document.querySelector('#duedate');
  let inputDate=dateElement.value;
 if(inputText!==''){
  todoList.push({task:inputText,dueDate:inputDate});
  inputElement.value='';
  dateElement.value='';}
  displayItems();
}

function displayItems(){
  let containerElement=document.querySelector('.todo-container');
   containerElement.innerHTML='';
  
  for(let i=0;i<todoList.length;i++){
    // let oldText=contentElement.innerText;
    containerElement.innerHTML+=`
    
    <span class="tasks-added">${todoList[i].task}</span>
    <span class="tasks-added" id="dueDate-added">${todoList[i].dueDate} </span>
    <button class="btn-delete" onclick="todoList.splice(${i},1);displayItems();">Delete</button>
  `;
  }
}