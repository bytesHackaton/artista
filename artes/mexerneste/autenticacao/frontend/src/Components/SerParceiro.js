import React, { useState } from "react";
import { BtnCancelar } from "./Extra/BtnCancelar";
import { Btn } from "./Extra/Btn";
import { InputForm } from "./Extra/InputForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

export const SerParceiro = () => {
  const history = useHistory();

  const [state, setState] = useState({
    nomeDeEmpresa: "",
    email: "",
    numeroTelemovel: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    atualizarParceiro();
  };
  const handleChange = (value, field) => {
    setState((s) => ({ ...s, [field]: value }));
  };

  async function atualizarParceiro() {
    const res = await fetch("/api/users/partner", {
      method: "PATCH",
      headers: {
        authorization: localStorage.getItem("token") ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });

    const data = res.json();

    if (res.status === 200) {
      history.push("/perfil");
    } else {
    }
  }

  return (
    <div className="h-[100vh] w-full bg-corPrincipal flex flex-col items-center justify-around">
      <h1
        className="text-white font-sfdisplay-semibold  text-[3rem] h-[100px]"
        style={{ fontFamily: "SFPRO-medium" }}
      >
        Parceiro
      </h1>
      <form onSubmit={handleSubmit}>
        <InputForm
          value={state.nomeDeEmpresa}
          onChange={(e) => handleChange(e.target.value, "nomeDeEmpresa")}
          icon={
            <svg
              width="35"
              fill={"transparent"}
              height="35"
              viewBox="0 0 35 35"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.1667 30.625V27.7083C29.1667 26.1612 28.5521 24.6775 27.4582 23.5835C26.3642 22.4896 24.8805 21.875 23.3334 21.875H11.6667C10.1196 21.875 8.63588 22.4896 7.54192 23.5835C6.44796 24.6775 5.83337 26.1612 5.83337 27.7083V30.625"
                stroke={"#ADAFBB"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.5 16.0417C20.7216 16.0417 23.3333 13.43 23.3333 10.2083C23.3333 6.98667 20.7216 4.375 17.5 4.375C14.2783 4.375 11.6666 6.98667 11.6666 10.2083C11.6666 13.43 14.2783 16.0417 17.5 16.0417Z"
                stroke={"#ADAFBB"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          type={"text"}
          name={"nomeDeEmpresa"}
          id={"nomeDeEmpresa"}
          placeholder={"nome da empresa"}
        />

        <InputForm
          value={state.email}
          onChange={(e) => handleChange(e.target.value, "email")}
          icon={
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9952 6.09771L14.0852 9.24579C13.3453 9.82592 12.308 9.82592 11.5681 9.24579L7.62451 6.09771"
                stroke="#ADAFBB"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.48055 1H17.1228C18.3689 1.01398 19.5549 1.54077 20.4047 2.45769C21.2544 3.3746 21.6937 4.60161 21.6201 5.85294V11.8368C21.6937 13.0882 21.2544 14.3152 20.4047 15.2321C19.5549 16.149 18.3689 16.6758 17.1228 16.6898H8.48055C5.80397 16.6898 4 14.5123 4 11.8368V5.85294C4 3.17749 5.80397 1 8.48055 1Z"
                stroke="#ADAFBB"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          type={"text"}
          name={"email"}
          id={"email"}
          placeholder={"abc@email.com"}
        />
        <InputForm
          value={state.numeroTelemovel}
          onChange={(e) => handleChange(e.target.value, "numeroTelemovel")}
          icon={
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6227 18.0433C12.6725 18.037 11.6733 17.8049 10.6419 17.3638C9.63559 16.9313 8.62197 16.34 7.6344 15.6236C6.65531 14.899 5.7104 14.0911 4.81644 13.2083C3.93101 12.3089 3.13 11.36 2.42166 10.3866C1.70513 9.37983 1.13155 8.37396 0.725935 7.4026C0.295535 6.36428 0.0835506 5.36081 0.0898149 4.41724C0.0941389 3.76592 0.215969 3.14879 0.44684 2.57414C0.686231 1.98284 1.0683 1.43424 1.58441 0.961689C2.23613 0.331375 2.97824 0.0189813 3.76869 0.0242291C4.09665 0.0264064 4.43251 0.103791 4.71754 0.239292C5.04449 0.391772 5.3205 0.619069 5.52032 0.921015L7.45311 3.66447C7.62809 3.9078 7.76108 4.1425 7.85203 4.37691C7.95969 4.62815 8.01689 4.87904 8.01528 5.1212C8.01317 5.4385 7.91862 5.74684 7.74009 6.03793C7.61246 6.26255 7.41744 6.50342 7.17197 6.74395L6.59621 7.33302C6.60446 7.35812 6.61275 7.37488 6.62105 7.39164C6.7208 7.56766 6.92062 7.8696 7.30444 8.32308C7.71339 8.79343 8.09738 9.22185 8.48159 9.61688C8.97451 10.1045 9.38401 10.4913 9.76872 10.8112C10.2454 11.2152 10.5552 11.4177 10.7396 11.5107L10.7225 11.5524L11.3403 10.9552C11.6027 10.6981 11.8563 10.5077 12.101 10.3841C12.5654 10.1033 13.1543 10.0571 13.7414 10.3031C13.9594 10.3964 14.194 10.5233 14.4451 10.7003L17.2239 12.6895C17.5336 12.9003 17.7589 13.169 17.8913 13.4872C18.0154 13.8053 18.0723 14.098 18.0703 14.3902C18.0677 14.791 17.9725 15.1912 17.7934 15.5658C17.6144 15.9404 17.3936 16.2646 17.1141 16.5634C16.6312 17.0863 16.1074 17.4586 15.5003 17.6967C14.9185 17.9266 14.287 18.0477 13.6227 18.0433ZM3.76038 1.27675C3.29788 1.27368 2.86768 1.47124 2.45297 1.86931C2.06377 2.2258 1.79208 2.61647 1.62107 3.04122C1.44159 3.47425 1.35445 3.93295 1.35118 4.42561C1.34603 5.20218 1.52543 6.04677 1.88966 6.91765C2.2622 7.80528 2.78587 8.72731 3.4525 9.6503C4.11913 10.5733 4.87843 11.4718 5.71374 12.3208C6.54916 13.153 7.45225 13.9273 8.38117 14.6098C9.28497 15.2755 10.2148 15.8161 11.1373 16.2064C12.5712 16.8255 13.9157 16.9764 15.0288 16.5245C15.4588 16.352 15.839 16.0873 16.1863 15.7055C16.3811 15.498 16.534 15.2735 16.6619 15.0072C16.7642 14.7991 16.8161 14.5823 16.8175 14.3652C16.8184 14.2316 16.794 14.0978 16.7278 13.9471C16.7029 13.8968 16.653 13.8046 16.494 13.695L13.7152 11.7059C13.5478 11.5878 13.397 11.5033 13.2545 11.4439C13.07 11.3676 12.9948 11.2919 12.7077 11.4654C12.539 11.5477 12.3868 11.672 12.2175 11.8379L11.5742 12.4599C11.2442 12.775 10.7391 12.8468 10.3532 12.7023L10.1269 12.6006C9.78331 12.4146 9.38155 12.128 8.93837 11.7493C8.537 11.4043 8.10239 11.0005 7.57605 10.4793C7.16678 10.0591 6.75767 9.61378 6.33208 9.11828C5.9399 8.65639 5.65659 8.26204 5.48216 7.93521L5.38292 7.68403C5.33374 7.49165 5.31764 7.38298 5.31842 7.26608C5.32041 6.96547 5.4315 6.69899 5.64312 6.49164L6.27812 5.84451C6.44742 5.67862 6.57461 5.52081 6.65964 5.37941C6.72763 5.27131 6.75347 5.17962 6.75402 5.09612C6.75447 5.02932 6.72991 4.92895 6.68853 4.82847C6.63055 4.69448 6.53905 4.54356 6.42237 4.38412L4.48964 1.63232C4.40633 1.51486 4.30597 1.43069 4.18022 1.3714C4.04607 1.31205 3.90333 1.2777 3.76038 1.27675ZM10.7224 11.5607L10.5841 12.1276L10.815 11.5446C10.773 11.536 10.7394 11.5441 10.7224 11.5607Z"
                fill="#ADAFBB"
              />
            </svg>
          }
          type={"text"}
          name={"numeroTelemovel"}
          id={"numeroTelemovel"}
          placeholder={"91123456"}
        />
        <div className="flex justify-center">
          <Btn name={"Ser Parceiro"} />
        </div>
      </form>
      <div
        className="flex justify-center"
        onClick={() => history.push("perfil")}
      >
        <BtnCancelar name={"CANCELAR"} />
      </div>
    </div>
  );
};
