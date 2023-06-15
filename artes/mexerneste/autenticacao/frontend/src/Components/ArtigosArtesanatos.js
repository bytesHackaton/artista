import React, { useEffect, useState } from "react";
import { NavBar } from "./Extra/NavBar";
import { useHistory } from "react-router-dom";

export const ArtigosArtesanatos = () => {
  const [artesanatos, setArtesanatos] = useState();
  const history = useHistory();

  async function getEventsArtesanatos() {
    const res = await fetch(`/api/artigos/artesanatos`);
    const data = await res.json();
    setArtesanatos(data);
  }

  useEffect(() => {
    getEventsArtesanatos();
  }, []);

  const handleMoveFavClick = (id) => {
    const path = `/events/event/${id}`;
    history.push(path, id);
  };

  return (
    <div
      className={`h-[100vh] overflow-hidden bg-corPrincipal flex flex-col gap-5 items-center justify-center`}
    >
      <h1 className="text-[2rem] text-white text-bold h-[5rem]">Artesanato</h1>

      <div className="flex flex-col gap-5 overflow-y-auto mb-3 h-[80vh]">
        {artesanatos && artesanatos.length > 0 ? (
          artesanatos?.map((ele, i) => {
            return (
              <div key={i} className="flex flex-col">
                <div className="relative ">
                  <img
                    onClick={() => handleMoveFavClick(ele["_id"])}
                    src={ele.image}
                    className="flex w-[18rem] min-h-[11rem] max-h-[11rem] rounded-lg border-[3px] border-[#4D5E6B] justify-center items-center"
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
