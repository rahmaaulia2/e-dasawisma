import Footer from "../components/Footer";
import Form from "../components/Form";
import { useParams } from "react-router-dom";
import FormEdit from "../components/FormEdit";

export default function Dasawisma() {
  const params = useParams();
  console.log(params, "ini paraammmss");
  const id = params.idDasawisma
  // const id =
  return (
    <>
      <div>
        {id ? <FormEdit /> : <Form />}
        {/* <Form /> */}

        <Footer />
      </div>
    </>
  );
}
