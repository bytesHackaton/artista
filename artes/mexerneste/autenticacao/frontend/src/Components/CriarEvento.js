import React, { useEffect, useState } from "react";
import { InputForm } from "./Extra/InputForm";
import { Btn } from "./Extra/Btn";
import { useHistory } from "react-router-dom";
import { BtnCancelar } from "./Extra/BtnCancelar";
import { NavBar } from "./Extra/NavBar";

export const CriarEvento = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    setInterval(() => {
      setLoggedIn(Boolean(localStorage.getItem("token")));
    }, 1000);
  }, []);

  const [state, setState] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    enviarEvento();
  };

  async function enviarEvento() {
    const res = await fetch(`/api/artigos/${state.category}`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });

    if (res.status === 201) {
      history.push("geraleventos");
    } else {
      history.push("geraleventos");
    }
  }

  const handleChange = (value, field) => {
    setState((s) => ({ ...s, [field]: value }));
  };

  const handleCancelar = () => {
    history.push("geraleventos");
  };

  return (
    <div
      className={`h-[100vh] relative overflow-x-hidden bg-corPrincipal flex flex-col items-center justify-center`}
    >
      <form onSubmit={handleSubmit}>
        <InputForm
          value={state.title}
          onChange={(e) => handleChange(e.target.value, "title")}
          icon={
            <svg
              width="22"
              height="19"
              viewBox="0 0 22 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.87776H20.511"
                stroke="#ADAFBB"
                strokeWidth="1.46333"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.90234 13.6822H6.85345"
                stroke="#ADAFBB"
                strokeWidth="1.46333"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.29199 13.6822H13.1942"
                stroke="#ADAFBB"
                strokeWidth="1.46333"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.33145 1H16.1698C19.6428 1 20.511 1.85849 20.511 5.28267V13.292C20.511 16.7162 19.6428 17.5746 16.1796 17.5746H5.33145C1.86824 17.5844 1 16.7259 1 13.3017V5.28267C1 1.85849 1.86824 1 5.33145 1Z"
                stroke="#ADAFBB"
                strokeWidth="1.46333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          type={"text"}
          name={"title"}
          id={"title"}
          placeholder={"titulo"}
        />
        <InputForm
          value={state.description}
          onChange={(e) => handleChange(e.target.value, "description")}
          icon={
            <svg
              width="22"
              height="19"
              viewBox="0 0 22 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.87776H20.511"
                stroke="#ADAFBB"
                strokeWidth="1.46333"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.90234 13.6822H6.85345"
                stroke="#ADAFBB"
                strokeWidth="1.46333"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.29199 13.6822H13.1942"
                stroke="#ADAFBB"
                strokeWidth="1.46333"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.33145 1H16.1698C19.6428 1 20.511 1.85849 20.511 5.28267V13.292C20.511 16.7162 19.6428 17.5746 16.1796 17.5746H5.33145C1.86824 17.5844 1 16.7259 1 13.3017V5.28267C1 1.85849 1.86824 1 5.33145 1Z"
                stroke="#ADAFBB"
                strokeWidth="1.46333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          type={"text"}
          name={"description"}
          id={"description"}
          placeholder={"descrição"}
        />
        <InputForm
          value={state.image}
          onChange={(e) => handleChange(e.target.value, "image")}
          icon={
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M24.1921 18.0031L20.4848 9.33296C19.8096 7.74581 18.8029 6.84564 17.6539 6.78642C16.5169 6.7272 15.4154 7.52077 14.5744 9.03685L12.324 13.0758C11.8502 13.9286 11.1751 14.4379 10.4407 14.4971C9.69455 14.5682 8.94835 14.1773 8.34429 13.4075L8.08371 13.0758C7.24276 12.0217 6.20045 11.5124 5.13446 11.619C4.06846 11.7256 3.15644 12.4599 2.55238 13.6562L0.503295 17.7425C-0.231057 19.2231 -0.159991 20.9405 0.70465 22.3381C1.56929 23.7358 3.07353 24.5767 4.7199 24.5767H19.8333C21.4205 24.5767 22.901 23.7832 23.7775 22.4566C24.6777 21.13 24.8198 19.4599 24.1921 18.0031Z"
                fill="#ADAFBB"
              />
              <path
                d="M6.36528 8.0068C8.57631 8.0068 10.3686 6.21441 10.3686 4.00339C10.3686 1.79236 8.57631 -1.71661e-05 6.36528 -1.71661e-05C4.15427 -1.71661e-05 2.36188 1.79236 2.36188 4.00339C2.36188 6.21441 4.15427 8.0068 6.36528 8.0068Z"
                fill="#ADAFBB"
              />
            </svg>
          }
          type={"text"}
          name={"image"}
          id={"image"}
          placeholder={"imagem"}
        />
        <InputForm
          value={state.price}
          onChange={(e) => handleChange(e.target.value, "price")}
          icon={
            <svg
              width="15"
              height="19"
              viewBox="0 0 15 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7319 11.9941H6.14014C7.04346 14.5576 9.21631 15.9004 11.9751 15.9004C12.8784 15.9004 13.9526 15.8394 14.4531 15.6929V18.061C13.916 18.2197 12.854 18.3052 11.9629 18.3052C7.71484 18.3052 4.28467 16.1445 3.24707 11.9941H0.793457V10.2363H2.9541C2.92969 9.89453 2.91748 9.55273 2.91748 9.19873C2.91748 8.83252 2.92969 8.46631 2.96631 8.12451H0.793457V6.3667H3.24707C4.29688 2.22852 7.72705 0.0800781 11.9629 0.0800781C12.8174 0.0800781 13.916 0.189941 14.4287 0.348633V2.7168C13.8916 2.59473 12.854 2.49707 11.9873 2.49707C9.24072 2.49707 7.05566 3.82764 6.15234 6.3667H12.7319V8.12451H5.76172C5.7251 8.46631 5.70068 8.82031 5.70068 9.19873C5.70068 9.55273 5.7251 9.90674 5.76172 10.2363H12.7319V11.9941Z"
                fill="#ADAFBB"
                fill-opacity="0.7"
              />
            </svg>
          }
          type={"text"}
          name={"price"}
          id={"price"}
          placeholder={"preço"}
        />
        <select
          id="category"
          value={state.category}
          onChange={(e) => handleChange(e.target.value, "category")}
          className=" w-full rounded-md text-center mt-3"
        >
          <option value="" className="rounded-md" disabled selected hidden>
            Seleciona a categoria
          </option>
          <option value="quadros" className="">
            Quadros
          </option>
          <option value="esculturas">Esculturas</option>
          <option value="artesanatos">Artesanato</option>
        </select>
        <div className="flex justify-center">
          <Btn name={"Criar"} />
        </div>
      </form>
      <div onClick={handleCancelar} className="flex justify-center">
        <BtnCancelar name={"Cancelar"} />
      </div>
      <div className="w-full absolute bottom-0">
        <NavBar />
      </div>
    </div>
  );
};
