function scopeToDo() {
  const listTask = document.querySelector(".listTask");
  const arrayTask = [];
  let li;
  let inputTask = document.querySelector(".inputTask");
  let inputTaskV;

  function createLi(paramLi) {
    li = document.createElement("li");
    listTask.appendChild(li);
    return li;
  }

  function addTask(paramTarsk) {
    arrayTask.push(paramTarsk);
    createLi(li);

    arrayTask.map((tasks) => {
      li.innerHTML = tasks + " ";
      createBtnDelet(li);
    });
    transfJSON();
  }

  function createBtnDelet(li) {
    const btnDelet = document.createElement("button");
    btnDelet.innerText = "Apagar";
    btnDelet.setAttribute("class", "delete");
    btnDelet.classList.add('btn-task')
    li.appendChild(btnDelet);
  }

  function cleanInput() {
    inputTask.value = "";
    inputTask.focus();
  }

  document.addEventListener("click", function (event) {
    const elemento = event.target;

    if (elemento.classList.contains("btnAdd")) {
      inputTaskV = inputTask.value;
      if (!inputTaskV) return;
      addTask(inputTaskV);
      cleanInput();
    }

    if (elemento.classList.contains("delete")) {
      elemento.parentElement.remove();
      transfJSON();
    }
  });

  //ENTER
  inputTask.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
      if (!inputTask.value) return;
      addTask(inputTask.value);
      cleanInput();
    }
  });

  function transfJSON() {
    const nodeTask = listTask.querySelectorAll("li");
    const arrTextTask = [];

    for (task of nodeTask) {
      let textTask = task.innerText;
      textTask = textTask.replace("Apagar", "").trim();
      arrTextTask.push(textTask);
    }
    const taskJSON = JSON.stringify(arrTextTask);
    localStorage.setItem("task", taskJSON);
  }

  function restoreTaskSaved() {
    const taskSaved = localStorage.getItem("task");
    const listTask = JSON.parse(taskSaved);

    for (eachTask of listTask) {
      addTask(eachTask);
    }
  }
  restoreTaskSaved();
}
scopeToDo();
