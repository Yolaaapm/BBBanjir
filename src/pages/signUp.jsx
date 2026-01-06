import AuthLayout from "../components/Layouts/AuthLayout";
import FormSignUp from "../components/Fragments/FormSignUp";

const SignUpPage = () => {
  return (
    <AuthLayout title="Daftar Akun" type="register">
      <FormSignUp />
    </AuthLayout>
  );
};

export default SignUpPage;