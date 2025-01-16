import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario
import "./lmod.scss";

const Lmod = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Para manejar errores de autenticación
  const navigate = useNavigate(); // Hook para redireccionar

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verificación de email y contraseña específicos
    if (email === "TK4ever@gmail.com" && password === "7") {
      window.location.href = "https://frontend-propietario.onrender.com"; // Redirigir a la página específica
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/login`; // URL dinámica
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Guardar datos en localStorage
        localStorage.setItem("id_usuario", data.id_usuario);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);

        // Verificamos si el usuario es moderador o administrador antes de redirigir
        if (data.role === "moderador" || data.role === "administrador") {
          navigate("/home"); // Redirigir al usuario
        } else {
          setErrorMessage("No tienes permisos para acceder.");
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.msg || "Credenciales incorrectas");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor. Inténtalo más tarde.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">QuitoTech Administrativo</h1>
        <form onSubmit={handleLogin} className="login-form">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Lmod;
