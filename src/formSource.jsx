export const userInputs = [
  {
    id: 1,
    label: "Nombre",
    name:"nombre",
    type: "text",
    placeholder: "John",
  },
  {
    id: 2,
    label: "Apellido",
    name:"apellido",
    type: "text",
    placeholder: "Doe",
  },
  {
    id: 3,
    label: "Email",
    name:"email",
    type: "email",
    placeholder: "john_doe@gmail.com",
  },
  {
    id: 4,
    label: "Password",
    name:"password",
    type: "password",
    placeholder: "********",
  },
  {
    id: 5,
    label: "Propietario",
    name:"propietario",
    type: "text", // Se usa una caja de texto para escribir "Sí" o "No"
    placeholder: "Escribe Si o No",
    helperText: "Si : No", // Texto que aparece debajo
  },
];


export const productInputs = [
  {
    id: 1,
    label: "Title",
    type: "text",
    placeholder: "Apple Macbook Pro",
  },
  {
    id: 2,
    label: "Description",
    type: "text",
    placeholder: "Description",
  },
  {
    id: 3,
    label: "Category",
    type: "text",
    placeholder: "Computers",
  },
  {
    id: 4,
    label: "Price",
    type: "text",
    placeholder: "100",
  },
  {
    id: 5,
    label: "Stock",
    type: "text",
    placeholder: "in stock",
  },
];

export const tiendaInputs = [
  {
    id: 1,
    label: "Nombre de la Tienda",
    type: "text",
    placeholder: "Tienda Ejemplo",
  },
  {
    id: 2,
    label: "Descripción",
    type: "text",
    placeholder: "Breve descripción de la tienda",
  },
  {
    id: 3,
    label: "Dirección",
    type: "text",
    placeholder: "Calle Principal y Secundaria",
  },
  {
    id: 4,
    label: "Teléfono de Contacto",
    type: "text",
    placeholder: "+1 234 567 89",
  },
  {
    id: 5,
    label: "Email de la Tienda",
    type: "mail",
    placeholder: "tienda_ejemplo@gmail.com",
  },
  {
    id: 6,
    label: "Estado",
    type: "select",
    options: ["Activa", "Inactiva"],
  },
];

export const moderadorInputs = [
  {
    id: 1,
    label: "Usuario",
    name: "usuario",
    type: "text",
    placeholder: "john_doe",
  },
  {
    id: 2,
    label: "Nombre Completo",
    name: "nombre",
    type: "text",
    placeholder: "John Doe",
  },
  {
    id: 3,
    label: "Email",
    name: "email",
    type: "mail",
    placeholder: "john_doe@gmail.com",
  },
  {
    id: 4,
    label: "Teléfono",
    name: "telefono",
    type: "text",
    placeholder: "+1 234 567 89",
  },
  {
    id: 5,
    label: "Contraseña",
    name: "password",
    type: "password",
  },
  {
    id: 6,
    label: "Dirección",
    name: "direccion",
    type: "text",
    placeholder: "Av. Simon Bolivar E5-555",
  },
  {
    id: 7,
    label: "País",
    name: "pais",
    type: "text",
    placeholder: "Ecuador",
  },
  {
    id: 8,
    label: "Rol",
    name: "role",
    type: "select",
    options: ["moderador", "administrador"],
    default: "moderador", // Por defecto, asigna "moderador"
  },
  {
    id: 9,
    label: "Estado",
    name: "estado",
    type: "select",
    options: ["Activo", "Inactivo"],
    default: "Activo", // Por defecto, asigna "Activo"
  },
];
