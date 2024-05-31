import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import axios from "axios";

export const CofeeList = () => {
  //variables para almacenar los estados

  const [CofeeList, setCofeeList] = useState([]); // arreglo vacio
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  useEffect(() => {
    const fetchData = async () => {
      try {
        //respons tra los datos l de la lista se tiar una variable de estado se utilizar setCofee
        const response = await axios.get(
          "https://api.sampleapis.com/coffee/hot"
        );
        setCofeeList(response.data);
      } catch (error) {
        console.log("Error al recupera los datos del cafe:", error);
      }
    };
    fetchData();
  }, []);
  //coloca en la pagina en la que sta
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //recetealr el index
  const handleReset = () => {
    setCurrentPage(1);
  };
  //calcular el indixe de la ultima elemento en la pagina actual
  const indexOfLastItem = currentPage * itemsPerPage;
  //calcular el indice del primer elemento de la pagina actual
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // current calcular los items catuales slide obtener los elementos en la apgian actual
  const currentItems = CofeeList.slice(indexOfFirstItem, indexOfLastItem);
  //calcular el numero total de paginas nececitan
  const totalPages = Math.ceil(CofeeList.length / itemsPerPage);
  return (
    <div className="container my-4">
      <h1 className="text-center text-white mb-4">Coffee List</h1>
      <div className="row">
        {currentItems.map((coffee, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card h-100">
              <img
                src={coffee.image}
                className="card-img-top"
                alt={coffee.title}
              />
              <div className="card-body">
                <h5 className="card-title">{coffee.title}</h5>
                <p className="card-text">{coffee.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handleClick(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={handleReset}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};
