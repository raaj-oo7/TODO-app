// variables
const addActionModal = document.getElementById('add-action-modal');
const addModalCtaBtn = document.getElementById('add-modal-cta-btn');
const addTitleInput = document.getElementById('add-title-input');
const addDateInput = document.getElementById('add-date-input');
const addDescriptionInput = document.getElementById('add-description-input');
const addModalErrorMessage = document.getElementById('add-error-message');

const editActionModal = document.getElementById('edit-action-modal');
const editModalCtaBtn = document.getElementById('edit-modal-cta-btn');
const editTitleInput = document.getElementById('edit-title-input');
const editDateInput = document.getElementById('edit-date-input');
const editDescriptionInput = document.getElementById('edit-description-input');
const editModalErrorMessage = document.getElementById('edit-error-message');

const tasks = document.getElementById('tasks');
const taskTitle = document.getElementById('task-title');

const taskData = [];

// functions

addActionModal.addEventListener('shown.bs.modal', function () {
  addTitleInput.focus()
})

editActionModal.addEventListener('shown.bs.modal', function () {
  editTitleInput.focus()
})

const handleDeleteTask = (uniqueId) => {
  // remove task from DOM
  const task = document.getElementById(uniqueId);
  task.remove();

  // remove task from taskData array
  const index = uniqueId.split('-')[1];
  taskData.splice(index, 1);

  // save data to localStorage
  localStorage.setItem('taskData', JSON.stringify(taskData));

  // toggle task status
  toggleTaskStatus();
};

const handleEditTask = (uniqueId) => {
  // get values from inputs
  const title = editTitleInput.value;
  const date = editDateInput.value;
  const description = editDescriptionInput.value;

  if (title.trim() === '') {
    editModalErrorMessage.innerHTML = "Title can't be blank";
  } else {
    // empty error message
    editModalErrorMessage.innerHTML = ''
  }
  
  // update taskData array
  ''
  const index = +uniqueId.split('-')[1];
  const updatedTaskData = taskData.map((t, i) => {
    if (index === i) {
      return {
        title,
        date,
        description,
      }
    }
    return t;
  });

  // save data to localStorage
  handleAddTaskToDOM(updatedTaskData);

  // toggle task status
  toggleTaskStatus();

  // close modal
  localStorage.setItem('taskData', JSON.stringify(taskData));

  setTimeout(() => {
    handleCloseEditFormModal();
  }, 0);
};

const handleOpenEditFormModal = (uniqueId) => {
  // get task data from taskData array
  const index = uniqueId.split('-')[1];
  const task = taskData[index];

  // set values to inputs
  editTitleInput.value = task.title;
  editDateInput.value = task.date;
  editDescriptionInput.value = task.description;

  // add event listener to edit button
  const editBtn = document.getElementById('edit-modal-cta-btn');
  editBtn.addEventListener('click', () => handleEditTask(uniqueId));

  // add event listener to edit modal form
  const editModalForm = document.getElementById('edit-action-modal');
  editModalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleEditTask(uniqueId);
  });

  // open modal
  const myModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById('edit-action-modal')
  );
  myModal.show();
};


const handleAddTaskToDOM = (updatedTaskData) => {
  tasks.innerHTML = '';
  console.log(updatedTaskData);
  updatedTaskData.map((task, index) => {
    const uniqueId = `task-${index}`;
    const taskEl = document.createElement('div');
    taskEl.setAttribute('id', uniqueId);

    const title = document.createElement('span');
    title.classList.add('fw-bold');
    title.innerHTML = task.title;

    const date = document.createElement('span');
    date.classList.add('small', 'text-secondary');
    date.innerHTML = task.date;

    const description = document.createElement('p');
    description.innerHTML = task.description;

    const options = document.createElement('span');
    options.classList.add('options');

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-sm', 'btn-outline-primary');
    editBtn.setAttribute('data-bs-toggle', 'modal');
    editBtn.setAttribute('data-bs-target', '#action-modal');
    editBtn.addEventListener('click', () => handleOpenEditFormModal(uniqueId));

    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-edit');
    editBtn.setAttribute('data-bs-toggle', 'modal');
    editBtn.setAttribute('data-bs-target', '#edit-action-modal');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-sm', 'btn-outline-danger');
    deleteBtn.addEventListener('click', () => handleDeleteTask(uniqueId));

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash');

    editBtn.appendChild(editIcon);
    deleteBtn.appendChild(deleteIcon);

    options.appendChild(editBtn);
    options.appendChild(deleteBtn);

    taskEl.appendChild(title);
    taskEl.appendChild(date);
    taskEl.appendChild(description);
    taskEl.appendChild(options);

    tasks.appendChild(taskEl);
  });
};

const handleCloseAddFormModal = () => {
  handleResetAddModal();
  // hide modal
  const addModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById('add-action-modal')
  );
  addModal.hide();
};

const handleCloseEditFormModal = () => {
  handleResetEditModal();

  // hide modal
  const editModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById('edit-action-modal')
  );
  editModal.hide();
};

const handleResetAddModal = () => {
  addTitleInput.value = '';
  addDateInput.value = '';
  addDescriptionInput.value = '';
  addModalErrorMessage.innerHTML = '';
};

const handleResetEditModal = () => {
  editTitleInput.value = '';
  editDateInput.value = '';
  editDescriptionInput.value = '';
  editModalErrorMessage.innerHTML = '';
};

const toggleTaskStatus = () =>
  (taskTitle.style.display = taskData.length > 0 ? 'block' : 'none');

const handleAddNewTask = () => {
  // get values from inputs
  const title = addTitleInput.value;
  const date = addDateInput.value;
  const description = addDescriptionInput.value;

  if (title.trim() === '') {
    addModalErrorMessage.innerHTML = "Title can't be blank";
  } else {
    // empty error message
    addModalErrorMessage.innerHTML = '';

    // push data to taskData array
    taskData.push({
      title,
      date,
      description,
    });

    // save data to localStorage
    localStorage.setItem('taskData', JSON.stringify(taskData));

    // add task to DOM
    handleAddTaskToDOM(taskData);

    // toggle task status
    toggleTaskStatus();

    // close modal
    handleCloseAddFormModal();
  }
};

const handleOnSubmit = (e) => {
  e.preventDefault();

  handleAddNewTask();
};

// event listeners
addModalCtaBtn.addEventListener('click', handleAddNewTask);
addActionModal.addEventListener('submit', handleOnSubmit);

// init app data from localStorage
const initApp = () => {
  const data = localStorage.getItem('taskData');
  if (data) {
    taskData.push(...JSON.parse(data));
    handleAddTaskToDOM(taskData);
    toggleTaskStatus();
  }
};

document.addEventListener('DOMContentLoaded', initApp)