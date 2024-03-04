// Definición de la clase Usuario para estructurar la información de los usuarios
class Usuario {
  constructor(id, nombre, direccion, correo, fechaNacimiento, objetivos) {
    this.id = id; // ID único para el usuario
    this.nombre = nombre; // Nombre completo del usuario
    this.direccion = direccion; // Dirección del usuario
    this.correo = correo; // Correo electrónico del usuario
    this.fechaNacimiento = fechaNacimiento; // Fecha de nacimiento del usuario
    this.objetivos = objetivos; // Objetivos personales del usuario
  }
}

// Clase para manejar la lógica del formulario y la tabla de usuarios
class Formulario {
  constructor() {
    this.usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    this.formularioRegistro = document.getElementById("formularioRegistro");
    this.formularioRegistro.addEventListener(
      "submit",
      this.registrarUsuario.bind(this)
    );
    this.inicializarTabla();
  }

  // Método para inicializar la tabla de usuarios al cargar la página
  inicializarTabla() {
    new TablaUsuarios(this.usuarios);
  }

  // Método para registrar un nuevo usuario y actualizar la tabla y el localStorage
  registrarUsuario(event) {
    event.preventDefault();
    // Recolecta los valores de los campos del formulario
    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    const correo = document.getElementById("correo").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const objetivos = document.getElementById("objetivos").value;

    // Crea un nuevo objeto Usuario y lo añade al arreglo de usuarios
    const usuario = new Usuario(
      this.usuarios.length + 1,
      nombre,
      direccion,
      correo,
      fechaNacimiento,
      objetivos
    );
    this.usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(this.usuarios)); // Almacena el arreglo de usuarios en localStorage
    new TablaUsuarios(this.usuarios); // Actualiza la tabla con los nuevos datos

    this.formularioRegistro.reset(); // Reinicia el formulario después de la inscripción
  }

  // Método para eliminar un usuario de la lista y actualizar la tabla y localStorage
  eliminarUsuario(id) {
    this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
    localStorage.setItem("usuarios", JSON.stringify(this.usuarios)); // Actualiza localStorage
    new TablaUsuarios(this.usuarios); // Actualiza la tabla con los nuevos datos
  }
}

// Clase para renderizar la tabla de usuarios registrados
class TablaUsuarios {
  constructor(usuarios) {
    this.usuarios = usuarios;
    this.render();
  }

  // Método para construir y mostrar la tabla de usuarios
  render() {
    const div = document.getElementById("tablaUsuarios");
    div.innerHTML = "";
    const tabla = document.createElement("table");

    // Construye la cabecera de la tabla
    const thead = tabla.createTHead();
    const headerRow = thead.insertRow();
    const headers = [
      "ID",
      "Nombre",
      "Dirección",
      "Correo",
      "Fecha de Nacimiento",
      "Objetivos",
      "Acciones",
    ];
    headers.forEach((text) => {
      const cell = headerRow.insertCell();
      cell.textContent = text;
    });

    // Rellena la tabla con los datos de los usuarios
    this.usuarios.forEach((usuario) => {
      const fila = tabla.insertRow();
      Object.values(usuario).forEach((valor) => {
        const celda = fila.insertCell();
        celda.textContent = valor;
      });

      // Agregar botón de eliminar usuario
      const cell = fila.insertCell();
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.addEventListener("click", () => {
        formulario.eliminarUsuario(usuario.id);
      });
      cell.appendChild(botonEliminar);
    });

    div.appendChild(tabla);
  }
}

const formulario = new Formulario(); // Instancia la clase Formulario para iniciar la aplicación
