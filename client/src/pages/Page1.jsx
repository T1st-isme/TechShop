import { useAuth } from "../context/authContext";

const Page1 = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div>Page1</div>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </>
  );
};

export default Page1;
