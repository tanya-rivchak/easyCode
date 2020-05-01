const tasks = `[
    {
        "_id": 1,
        "text": "Coding and debugging",
        "done": false
    },
    {
        "_id": 2,
        "text": "Designing and testing computer structures",
        "done": false
    },
    {
        "_id": 3,
        "text": "Troubleshooting system errors",
        "done": false
    },
    {
        "_id": 4,
        "text": "Writing computer instructions",
        "done": false
    }
]`;

const objTasks = JSON.parse(tasks).reduce((res, task) => {
  res[task._id] = task;
  return res;
}, {});
const tasksList = document.getElementById("tasks-list");
const addForm = document.forms.addTask;
const filter = document.getElementById("filter");
const tasksNum = document.getElementById("number-of-tasks");
const emptyList = document.getElementById('empty-list');

let activeFilter = 'all';

tasksList.append(...renderTasks(objTasks));
tasksList.addEventListener("click", taskBtns);
addForm.addEventListener("submit", addFormSubmit);
filter.addEventListener("click", tasksFilter);
tusksNumber();
onEmptyTasksList();

function renderTasks(tasks) {
    return Object.values(tasks).map((task) => taskTemplate(task));
}

function taskTemplate({ _id, text, done = false } = {}) {
  const task = document.createElement("li");
  task.classList.add("list-group-item", "task");
  if (done) task.classList.add("task_done");
  task.setAttribute("data-id", _id);

  const taskElements = [
    { tag: "span", htmlOrText: text },
    {
      tag: "button",
      classes: ["btn", "btn-outline-dark"],
      attr: "done",
      htmlOrText: `Done`,
    },
    {
      tag: "button",
      classes: ["btn", "btn-outline-danger"],
      attr: "delete",
      htmlOrText: `<i class="fa fa-trash-o"></i>`,
    },
  ];

  taskElements.forEach(({ tag, classes, attr, htmlOrText } = {}) => {
    const el = document.createElement(tag);
    if (classes) el.classList.add(...classes);
    if (attr) {
      el.setAttribute("data-btn", attr);
      if (attr === "done" && done) {
        el.classList.add("active");
      }
    }
    el.insertAdjacentHTML("beforeend", htmlOrText);
    task.appendChild(el);
  });

  return task;
}

function taskBtns({ target }) {
  let button = target;

  if (target.closest("button")) {
    button = target.closest("button");
  }

  switch (button.dataset.btn) {
    case "delete":
      deleteTask(button.closest("li"));
      break;
    case "done":
      doneToggleHandler(button);
      break;
    default:
      return;
  }
}

function deleteTask(task) {
  delete objTasks[task.dataset.id];
  deleteTaskFromHTML(task);
  tusksNumber();
  onEmptyTasksList();
}

function deleteTaskFromHTML(task) {
  task.remove();
}

function doneToggleHandler(btn) {
  objTasks[btn.closest("li").dataset.id].done = !objTasks[
    btn.closest("li").dataset.id
  ].done;
  btn.classList.toggle("active");
  btn.closest("li").classList.toggle("task_done");
  tusksNumber();
  tasksFilter();
}

function addFormSubmit(e) {
  e.preventDefault();
  if (addForm["new-task"].value) {
    addTask(addForm["new-task"].value);
  }
  addForm.reset();
}

function addTask(text) {
  const task = {
    _id: Math.random(),
    text,
    done: false,
  };
  objTasks[task._id] = task;
  tasksList.append(taskTemplate(task));
  tusksNumber()
}

function tasksFilter({ target }={}) {
    let filter = target ? target.dataset.filter : activeFilter;

    if(target){
        activeFilterBtn(target);
        activeFilter = target.dataset.filter;
    }

    allTasksActive();
    
    switch (filter) {
        case "active":
            [...tasksList.getElementsByTagName("li")].forEach((task) => {
                if (task.classList.contains("task_done")) {
                task.classList.add("d-none");
                }
            });
            break;
        case "done":
            [...tasksList.getElementsByTagName("li")].forEach((task) => {
                if (!task.classList.contains("task_done")) {
                task.classList.add("d-none");
                }
            });
            break;
        default:
            return;
    }
}

function activeFilterBtn(activeBtn) {
  const btns = [...filter.getElementsByTagName("button")];
  btns.forEach((btn) =>
    btn.classList.contains("active") ? btn.classList.remove("active") : null
  );
  activeBtn.classList.add("active");
}

function allTasksActive() {
  [...tasksList.getElementsByTagName("li")].forEach((task) => {
    task.classList.remove("d-none");
  });
}

function tusksNumber() {
  const active = Object.values(objTasks).reduce(
    (res, task) => (res += !task.done ? 1 : 0),
    0
  );
  const done = Object.values(objTasks).length - active;
  tasksNum.textContent = `${active} active, ${done} done`;
}

function onEmptyTasksList(){
    if(Object.values(objTasks).length === 0){
        emptyList.classList.remove('d-none');
        return
    }
    emptyList.classList.add('d-none')
}