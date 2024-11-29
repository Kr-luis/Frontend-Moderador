import "./add.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import axios from "axios";

const Add = ({ inputs, title }) => {
  const [file, setFile] = useState(null); // Estado para la imagen
  const [formData, setFormData] = useState({}); // Estado para los datos del formulario
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Actualiza los datos del formulario
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Cambiar estado de visibilidad de contraseña
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData); // Verifica los datos enviados
    try {
      const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/administrador/crear-moderador`;

      const response = await axios.post(backendUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Moderador creado exitosamente");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Error al crear el moderador");
    }
  };

  return (
    <div className="add">
      <Sidebar />
      <div className="addContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="imagen-moderador"
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Imagen: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "select" ? (
                    <select
                      name={input.name || input.label.toLowerCase()} // Usa el nombre del campo o label
                      onChange={handleChange}
                      defaultValue={input.default || ""}
                    >
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      {input.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : input.type === "password" ? (
                    <div className="passwordContainer">
                      <input
                        type={showPassword ? "text" : "password"}
                        name={input.name || "password"} // Asegúrate de que el nombre sea correcto
                        placeholder={input.placeholder || "Ingrese contraseña"}
                        onChange={handleChange}
                      />
                      <span
                        className="togglePassword"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </span>
                    </div>
                  ) : (
                    <input
                      type={input.type}
                      name={input.name || input.label.toLowerCase()} // Usa el nombre correcto
                      placeholder={input.placeholder}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
              <button type="submit">Registrar Moderador</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
