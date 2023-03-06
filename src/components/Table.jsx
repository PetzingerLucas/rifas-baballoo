import NameContainer from "./NameContainer";

function Table() {
  const generateTable = (listOfNames) => {
    return listOfNames.map((name, index) => {
      return <NameContainer key={index} name={name} />;
    });
  };
  const listOfNames = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goías",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rondônia",
    "Roraíma",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ];

  return (
    <div className="main-container">
      <section className="names-container">
        {generateTable(listOfNames)}
      </section>
    </div>
  );
}

export default Table;
