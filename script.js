const form = document.querySelector("#form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const itemsList = document.querySelector("#items-list");

/// Axios
let axiosAPI =
  "https://crudcrud.com/api/4617feb80883486eb7e3769235c44144/AppointmentApp";
// Creating Edit button element
function EditButton(obj) {
  const edtBtn = document.createElement("button");
  edtBtn.className = "edt-btn";
  edtBtn.appendChild(document.createTextNode("Edit"));
  // edit event handling
  edtBtn.addEventListener("click", (e) => edtItem(obj.email, e));
  function edtItem(eml, e) {
    const edtdata = JSON.parse(localStorage.getItem(eml));
    console.log("edtdata", edtdata);
    name.value = edtdata.name;
    email.value = edtdata.email;
    const li = e.target.parentElement;
    itemsList.removeChild(li);
    localStorage.removeItem(eml);
  }
  return edtBtn;
}

// Creating Delete buttion element
function DeleteButton(obj) {
  const delBtn = document.createElement("button");
  delBtn.className = "del-btn";
  delBtn.appendChild(document.createTextNode("Delete"));
  delBtn.addEventListener;
  delBtn.addEventListener("click", (e) => DelItem(obj.email, e));
  function DelItem(eml, e) {
    const li = e.target.parentElement;
    itemsList.removeChild(li);
    // deleting data from local storage
    const data = JSON.parse(localStorage.getItem(eml));
    localStorage.removeItem(eml);
  }

  return delBtn;
}

// Creating li elemnet
function li(obj) {
  const li = document.createElement("li");
  li.className = "item-list";
  li.appendChild(EditButton(obj));
  li.appendChild(DeleteButton(obj));
  li.appendChild(document.createTextNode(`${obj.name} ${obj.email}`));
  itemsList.appendChild(li);
}
// Submit button eventListener
form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();
  let obj = {
    name: name.value,
    email: email.value,
  };
  li(obj);

  // localStorage.setItem(obj.email, JSON.stringify(obj));
  axios
    .post(axiosAPI, obj)
    .then((response) => AddUsers(response.data))
    .catch((err) => console.log(err));
}

window.addEventListener("DOMContentLoaded", AddNewUsersOnScreen);

// Add User
function AddNewUsersOnScreen() {
  // let keys = Object.keys(localStorage);
  // for (let i = 0; i < keys.length; i++) {
  // li(JSON.parse(localStorage.getItem(keys[i])));
  // }
  axios.get(axiosAPI).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      li(res.data[i]);
    }
  });
}
