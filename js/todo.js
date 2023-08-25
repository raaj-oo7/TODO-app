// const form = document.getElementById("form");
// const textInput = document.getElementById("textInput");
// const dateInput = document.getElementById("dateInput");
// const textarea = document.getElementById("textarea");
// const msg = document.getElementById("msg");
// const tasks = document.getElementById("tasks");
// const add = document.getElementById("add");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   formValidation();
// });
// const formValidation = () => {
//   if (textInput.value === "") {
//     console.log("failure");
//     document.getElementById("msg").innerHTML = "Post can't be blank";
//   } else {
//     console.log("success");
//     document.getElementById("msg").innerHTML = "";
//     acceptData();
//     add.setAttribute("data-bs-dismiss", "modal");
//     add.click();
//     (() => {
//       add.setAttribute("data-bs-dismiss", "");
//     })();
//   }
// };

// let data = [];
// function updateStatus() {
//   if (data.length === 0) {
//     taskTitle.style.display = "none";
//   } else {
//     taskTitle.style.display = "block";
//   }
// }

// let acceptData = () => {
//   data.push({
//     text: textInput.value,
//     date: dateInput.value,
//     description: textarea.value,
//   });

//   localStorage.setItem("data", JSON.stringify(data));
//   console.log(data);

//   createTasks();
// };

// let createTasks = () => {
//   tasks.innerHTML = "";
//   data.map((x, y) => {
//     return (tasks.innerHTML += `
//     <div id=${y}>
//           <span class="fw-bold">${x.text}</span>
//           <span class="small text-secondary">${x.date}</span>
//           <p>${x.description}</p>
  
//           <span class="options">
//             <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
//             <i onClick ="deleteTask(this)" class="fas fa-trash-alt"></i>
//           </span>
//         </div>
//     `);
//   });
//   resetForm();
//   updateStatus();
// };

// const deleteTask = (e) => {
//   e.parentElement.parentElement.remove();
//   data.splice(e.parentElement.parentElement.id, 1);
//   localStorage.setItem("data", JSON.stringify(data));
//   console.log(data);
//   updateStatus();
// };
// const editTask = (e) => {
//   let selectedTask = e.parentElement.parentElement;
//   document.getElementById("textInput").value = selectedTask.children[0].innerHTML
//   document.getElementById("dateInput").value = selectedTask.children[1].innerHTML
//   document.getElementById("textarea").value = selectedTask.children[2].innerHTML

//   deleteTask(e);
// }
// const resetForm = () => {
//   document.getElementById("textInput").value = "";
//   document.getElementById("dateInput").value = "";
//   document.getElementById("textarea").value = "";
// }

// (() => {
//   data = JSON.parse(localStorage.getItem("data")) || [];
//   console.log(data);
//   createTasks();
// })();


