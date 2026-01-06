import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext"; 
import Button from "../Elements/Button";
import InputForm from "../Elements/InputForm";

const FormSignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Ambil fungsi login dari Context
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Memanggil fungsi login dari AuthContext
    const success = login(email, password);

    if (success) {
      navigate("/"); // Redirect ke dashboard jika berhasil
    } else {
      setError("Email atau Password salah!"); // Tampilkan error jika gagal
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p className="text-red-500 text-sm mb-4 italic">{error}</p>}
      <InputForm
        label="Email"
        type="email"
        placeholder="nama@email.com"
        name="email"
      />
      <InputForm
        label="Password"
        type="password"
        placeholder="*****"
        name="password"
      />
      <Button variant="bg-primary w-full" type="submit">
        Masuk ke ByeByeBanjir
      </Button>
    </form>
  );
};

export default FormSignIn;