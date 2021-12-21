
 function editButton () {
    let id = document.getElementById("name");
    let updatetitle = document.getElementById("new-name");
    let updatebody = document.getElementById("new-description");
  
    let newData = {
      "title": updatetitle.value,
      "body": updatebody.value,
      "id": id.value
    }
  
    try {
      const response = fetch(`http://localhost:5000/post/update/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //http header fields => application/json if the http response is json data   https://www.youtube.com/watch?v=iYM2zFP3Zn0
        body: JSON.stringify(newData)//{name, description, geom}
      });
      console.log(response);
      window.location = "/"; // refresh and show the changes
    }  catch (err) {
      console.error(err.message);
    }
  }

  function openForm() {
    document.getElementById("myFormEdit").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myFormEdit").style.display = "none";
  }
  