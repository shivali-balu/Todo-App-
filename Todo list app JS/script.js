document.addEventListener("DOMContentLoaded", function () {
  const dataForm = document.getElementById("dataForm");
  const dataInput = document.getElementById("dataInput");
  const dataList = document.getElementById("dataList");

  //add a event to validate the user's input
  dataForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = dataInput.value.trim();
    if (data != "") {
      addNewData(data);
      loadStoredData();
      dataInput.value = "";
    } else {
      alert("Data cannot be empty !");
      dataInput.focus();
    }
  });

  //to add new data and update them in the local storage
  function addNewData(data) {
    const storedData = JSON.parse(localStorage.getItem("myData")) || [];
    storedData.push(data);
    localStorage.setItem("myData", JSON.stringify(storedData));
  }

  //to load the existing data and display in the screen
  loadStoredData();
  function loadStoredData() {
    const storedData = JSON.parse(localStorage.getItem("myData")) || [];
    dataList.innerHTML = "";
    storedData.forEach((data, index) => {
      let output = `
               
               <li>
                  
                   ${data} 
                   <div>
                      <button class="btn btn-primary btnEdit"  data-index="${index}"> 
                      <i class = "fa fa-edit"></i>
                      </button>
                      <button class="btn btn-danger btnDelete" data-index="${index}"> 
                      <i class = "fa fa-trash"></i>
                      </button>
                   </div>
               
               </li>
            
            
            `;

      dataList.innerHTML += output;
    });

    const delBtn = document.querySelectorAll(".btnDelete");
    delBtn.forEach((btn) => {
      btn.addEventListener("click", deleteData);
    });

    const editBtn = document.querySelectorAll(".btnEdit");
    editBtn.forEach((btn) => {
      btn.addEventListener("click", editData);
    });
  }

  //To edit data from local storage and update them
  function editData() {
    const index = this.dataset.index;
    const storedData = JSON.parse(localStorage.getItem("myData")) || [];
    const newData = prompt("Edit your task ", storedData[index]);
    if (newData != null) { 
        storedData[index] = newData ; 
        localStorage.setItem("myData" , JSON.stringify(storedData)) ; 
        loadStoredData() ; 
    }
  }

  //To delete data from local storage
  function deleteData() {
    if (confirm("Are you sure to delete this task?")) {
      const index = this.dataset.index;
      const storedData = JSON.parse(localStorage.getItem("myData")) || [];
      storedData.splice(index, 1);
      localStorage.setItem("myData", JSON.stringify(storedData));
      loadStoredData();
    }
  }
});
