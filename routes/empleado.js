const express = require("express");
const empleado = express.Router();
const db = require("../config/database");

/*
  1.- Agregar Empleados
  2.- Modificar Empleados
  3.- Eliminar Empleados
  4.- Buscar Empleados Por Nombre
*/

/* <-- LISTO: AGREGAR USUARIOS --> */
empleado.post("/", async (req, res, next) => {
  const { nombre, apellidos, telefono, email, direccion } = req.body;
  if (nombre && apellidos && telefono && email && direccion) {
    let query =
      "INSERT INTO empleados(nombre, apellidos, telefono, email, direccion)";
    query += ` VALUES('${nombre}', '${apellidos}', '${telefono}', '${email}', '${direccion}')`;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
      return res
        .status(201)
        .json({ code: 1, message: "¡Empleado Registrado Correctamente!" });
    }
    return res
      .status(500)
      .json({ code: 500, message: "Ocurrio un error" });
  }
  return res
    .status(500)
    .json({ code: 500, message: " Campos incompletos." });
});

/*  LISTO: MODIFICAR EMPLEADOS */
empleado.put("/:id([0-9]{1,3})", async (req, res, next) => {
  const { nombre, apellidos, telefono, email, direccion } = req.body;
  if (nombre && apellidos && telefono && email && direccion) {
    let query = `UPDATE empleados SET nombre='${nombre}', apellidos='${apellidos}',`;
    query += `telefono='${telefono}', email='${email}', direccion='${direccion}' WHERE empleado_id=${req.params.id};`;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 200, message: "¡Empleado actualizado correctamente!" });
    }
    return res
      .status(500)
      .json({ code: 500, message: "Ocurrio un error" });
  }
  return res
    .status(500)
    .json({ code: 500, message: "Campos incompletos." });
});

/*  LISTO: Eliminar Empleados */
empleado.delete("/:eaddress([A-Za-z@{1}.{1}]+)", async (req, res, next) => {
  const query = `DELETE FROM empleados WHERE email='${req.params.eaddress}'`;
  const rows = await db.query(query);
  if (rows.affectedRows == 1) {
    return res
      .status(200)
      .json({ code: 200, message: "¡Empleado eliminado correctamente!" });
  }
  return res
    .status(404)
    .json({ code: 404, message: "Empleado no encontrado." });
});

/*  LISTO: BUCAR POR NOMBRE */
empleado.get("/:name([A-Za-z]+)", async (req, res, next) => {
  const name = req.params.name;
  const empleado = await db.query(
    "SELECT * FROM empleados WHERE UPPER(nombre) = '" + name.toUpperCase() + "'"
  );
  if (empleado.length > 0) {
    return res.status(200).json({ code: 200, message: empleado });
  }
  return res
    .status(400)
    .send({ code: 404, message: "Empleado no encontrado." });
});

module.exports = empleado;
