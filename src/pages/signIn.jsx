import AuthLayout from "../components/Layouts/AuthLayout";
import FormSignIn from "../components/Fragments/FormSignIn";

const SignInPage = () => {
  return (
    <AuthLayout title="Selamat Datang" type="login">
      <FormSignIn />
    </AuthLayout>
  );
};

export default SignInPage;