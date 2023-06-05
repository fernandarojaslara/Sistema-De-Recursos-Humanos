window.onload = init;
var headersValues = {};

function init() {
  if (localStorage.getItem("token")) {
    headersValues = {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };
  } else {
    window.location.href = "index.html";
  }
}

function exitSystem() {
  localStorage.removeItem("token");
  init();
}

function register() {
  var name = document.getElementById("registerName").value;
  var lastN = document.getElementById("registerLastName").value;
  var mail = document.getElementById("registerMail").value;
  var phone = document.getElementById("registerPhone").value;
  var address = document.getElementById("registerAddress").value;

  axios({
    method: "post",
    url: "http://localhost:3000/empleados",
    data: {
      nombre: name,
      apellidos: lastN,
      telefono: phone,
      email: mail,
      direccion: address,
    },
    headers: headersValues.headers,
  })
    .then(function (res) {
      if (res.data.code === 1) {
        localStorage.setItem("token", res.data.message);
        alert("¡El Empleado Se Registro Exitosamente!");
      } else {
        alert("¡Ups! Usuario No Encontrado");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function update() {
  var id = document.getElementById("updateID").value;
  var name = document.getElementById("updateName").value;
  var lastN = document.getElementById("updateLastName").value;
  var mail = document.getElementById("updateMail").value;
  var phone = document.getElementById("updatePhone").value;
  var address = document.getElementById("updateAddress").value;

  axios({
    method: "put",
    url: "http://localhost:3000/empleados/" + id,
    data: {
      nombre: name,
      apellidos: lastN,
      telefono: phone,
      email: mail,
      direccion: address,
    },
    headers: headersValues.headers,
  })
    .then(function (res) {
      if (res.data.code === 200) {
        localStorage.setItem("token", res.data.message);
        alert("¡El Empleado Se Actualizó Exitosamente!");
      } else {
        alert("¡Ups! Usuario No Encontrado");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function deletE() {
  var mail = document.getElementById("deleteMail").value;

  axios({
    method: "delete",
    url: "http://localhost:3000/empleados/" + mail,
    data: {
      // email: mail,
    },
    headers: headersValues.headers,
  })
    .then(function (res) {
      if (res.data.code === 200) {
        localStorage.setItem("token", res.data.message);
        alert("¡El Empleado Se Elimino Exitosamente!");
      } else {
        alert("¡Ups! Usuario No Encontrado");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function searchE() {
  var name = document.getElementById("searchName").value;

  axios({
    method: "get",
    url: "http://localhost:3000/empleados/" + name,
    data: {
      // nombre: name,
    },
    headers: headersValues.headers,
  })
    .then(function (res) {
      if (res.data.code === 200) {
        const { empleado_id, nombre, apellidos, telefono, email, direccion } =
          res.data.message[0];
        localStorage.setItem("token", res.data.message);
        const strResult =
          "ID: " +
          empleado_id +
          " \n" +
          nombre +
          " " +
          apellidos +
          " \n" +
          telefono +
          " \n" +
          email +
          " \n" +
          direccion;
        $("#consultArea").val(strResult);
        alert("¡Empleado Encontrado!");
      } else {
        alert("¡Ups! Usuario No Encontrado");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
