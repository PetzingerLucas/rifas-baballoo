import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import NameContainer from "./NameContainer";

function Table() {
  const { state, socket } = useContext(Context);
  const [quantity, setQuantity] = useState(state.quantity);
  const [type, setType] = useState(state.type);

  const listOfNames = [
    "Ana",
    "Antônio",
    "Amanda",
    "Arthur",
    "Bianca",
    "Bruno",
    "Camila",
    "Carlos",
    "Carla",
    "César",
    "Clara",
    "Cleber",
    "Cristina",
    "Daniel",
    "Débora",
    "Diego",
    "Eduardo",
    "Elaine",
    "Elias",
    "Elisa",
    "Emerson",
    "Fabiana",
    "Fábio",
    "Felipe",
    "Fernanda",
    "Fernando",
    "Flávia",
    "Gabriel",
    "Gabriela",
    "Giovanna",
    "Guilherme",
    "Gustavo",
    "Helena",
    "Hugo",
    "Isabela",
    "Isaac",
    "Isadora",
    "Isadora",
    "Ítalo",
    "Joana",
    "João",
    "José",
    "Julia",
    "Juliana",
    "Júlio",
    "Karen",
    "Karina",
    "Kátia",
    "Larissa",
    "Leonardo",
    "Leticia",
    "Lívia",
    "Luana",
    "Lucas",
    "Luciana",
    "Luciano",
    "Luiza",
    "Marcela",
    "Marcelo",
    "Márcia",
    "Márcio",
    "Mariana",
    "Mário",
    "Mateus",
    "Matheus",
    "Maurício",
    "Melissa",
    "Miguel",
    "Monique",
    "Natália",
    "Nathalia",
    "Nicole",
    "Nícolas",
    "Olivia",
    "Otávio",
    "Pamela",
    "Patrícia",
    "Paula",
    "Paulo",
    "Pedro",
    "Rafael",
    "Raphael",
    "Renan",
    "Renata",
    "Renato",
    "Roberta",
    "Roberto",
    "Rodrigo",
    "Sabrina",
    "Samuel",
    "Sandra",
    "Sara",
    "Sarah",
    "Simone",
    "Stefany",
    "Tatiana",
    "Thaís",
    "Thiago",
    "Valentina",
    "Valter",
    "Vera",
    "Vinícius",
    "Vitor",
    "Vivian",
    "William",
    "Yago",
    "Yasmin",
    "Yuri",
    "Zélia",
    "Zoe",
  ];
  const animais = [
    "Leão",
    "Girafa",
    "Elefante",
    "Hipopótamo",
    "Tigre",
    "Onça",
    "Lobo",
    "Raposa",
    "Cachorro",
    "Gato",
    "Vaca",
    "Cavalo",
    "Porco",
    "Coruja",
    "Águia",
    "Falcão",
    "Papagaio",
    "Pomba",
    "Galinha",
    "Pato",
    "Cisne",
    "Tartaruga",
    "Cobra",
    "Jacaré",
    "Crocodilo",
    "Sapo",
    "Rã",
    "Peixe",
    "Tubarão",
    "Baleia",
    "Golfinho",
    "Polvo",
    "Lagosta",
    "Caranguejo",
    "Formiga",
    "Abelha",
    "Joaninha",
    "Borboleta",
    "Besouro",
    "Caracol",
    "Lesma",
    "Ostra",
    "Mexilhão",
    "Estrela do Mar",
    "Ouriço-do-Mar",
    "Tatu",
    "Panda",
    "Morcego",
    "Coelho",
    "Esquilo",
    "Castor",
    "Lontra",
    "Búfalo",
    "Canguru",
    "Camelo",
    "Cavalo-marinho",
    "Chimpanzé",
    "Chita",
    "Cobra-coral",
    "Crocodilo-de-água-salgada",
    "Dragão-de-komodo",
    "Enguia",
    "Esquilo-voador",
    "Flamingo",
    "Foca",
    "Gafanhoto",
    "Galo",
    "Girino",
    "Golfinho-rotador",
    "Hamster",
    "Hiena",
    "Hipopótamo-pigmeu",
    "Jabuti",
    "Jacaré-açu",
    "Jaguar",
    "Jiboia",
    "Kangal",
    "Kiwi",
    "Leão-marinho",
    "Lhama",
    "Lobo-guará",
    "Lontra-marítima",
    "Mandril",
    "Marmota",
    "Mico-leão-dourado",
    "Morsa",
    "Muriçoca",
    "Naja",
    "Onça-pintada",
    "Orangotango",
    "Ouriço-cacheiro",
    "Panda-vermelho",
    "Papagaio-do-mar",
    "Peixe-boi",
    "Porco-do-mato",
    "Puma",
    "Rinoceronte-negro",
    "Salamandra",
    "Tamanduá-bandeira",
    "Tartaruga-verde",
    "Texugo",
    "Tucano",
    "Urso-polar",
    "Vaga-lume",
    "Veado-catingueiro",
    "Veado-campeiro",
    "Viúva-negra",
    "Zebra",
    "Zorro",
  ];

  const selectedNames =
    state.type === "Animais"
      ? animais.sort(() => 0.5 - Math.random()).slice(0, quantity)
      : listOfNames.sort(() => 0.5 - Math.random()).slice(0, quantity);

  const generateTable = (listOfNames) => {
    return listOfNames.map((name, index) => {
      return <NameContainer key={index} name={name} />;
    });
  };

  useEffect(() => {
    const receiveRaffleInfoFromServer = (raffleInfo) => {
      socket.emit("get_raffle_info");
    };

    socket.on("raffle_info", (raffleInfo) => {
      setQuantity(raffleInfo.quantity);
      setType(raffleInfo.type);
    });

    return () => {
      socket.off("raffle_info", receiveRaffleInfoFromServer);
    };
  }, [socket]);

  return (
    <div className="main-container">
      <section className="names-container">
        {generateTable(selectedNames)}
      </section>
    </div>
  );
}

export default Table;
