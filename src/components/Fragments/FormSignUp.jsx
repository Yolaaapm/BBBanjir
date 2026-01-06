import Button from "../Elements/Button";
import InputForm from "../Elements/InputForm";

const FormSignUp = () => {
  return (
    <form action="">
      <InputForm
        label="Nama Lengkap"
        type="text"
        placeholder="Masukkan nama Anda"
        name="fullname"
      />
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
      <Button variant="bg-blue-600 w-full">Daftar Sekarang</Button>
    </form>
  );
};

export default FormSignUp;