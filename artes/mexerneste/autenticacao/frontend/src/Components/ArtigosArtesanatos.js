import React, { useEffect, useState } from "react";
import { NavBar } from "./Extra/NavBar";

export const ArtigosArtesanatos = () => {
  const [artesanatos, setArtesanatos] = useState();

  async function getEventsArtesanatos() {
    const res = await fetch(`/api/artigos/artesanatos`);
    const data = await res.json();
    setArtesanatos(data);
  }

  useEffect(() => {
    getEventsArtesanatos();
  }, []);

  return (
    <div
      className={`h-[85vh] overflow-hidden bg-corPrincipal flex flex-col items-center`}
    >
      <div className="flex flex-col gap-3 overflow-y-auto mb-3">
        {artesanatos && artesanatos.length > 0 ? (
          artesanatos?.map((ele, i) => {
            return (
              <div key={i} className="flex flex-col">
                <div className="relative ">
                  <img
                    src={ele.image}
                    className="flex w-[22rem] min-h-[11rem] max-h-[11rem] opacity-60 rounded-lg border-[3px] border-[#4D5E6B] justify-center items-center"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-[2rem] text-gray-500 font-sfdisplay-semibold ">
            Sem Artigos...
          </h1>
        )}
      </div>
      <div className="w-full absolute bottom-0">
        <NavBar />
      </div>
    </div>
  );
};
