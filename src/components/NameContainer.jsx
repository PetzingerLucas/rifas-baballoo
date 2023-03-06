import React, { useContext, useEffect, useState } from "react";
import Context from "../context/Context";

function NameContainer(props) {
  const { setTotal, user, state, setUser, socket } = useContext(Context);
  const [isSelected, setIsSelected] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [selections, setSelections] = useState({});
  const [socketData, setSocketData] = useState({});

  const handleClick = (event) => {
    calcTotal();
    if (user.name.length > 0) {
      if (!isSelected) {
        const newSelections = { ...selections };
        newSelections[props.name] = {
          name: user.name,
          selectionQty: user.selectionQty + 1,
        };
        setSelections(newSelections);
        socket.emit("selected", newSelections);
        setUser({
          ...user,
          selectionQty: user.selectionQty + 1,
        });
      } else {
        if (currentUser === user.name) {
          const newSelections = { ...selections };
          delete newSelections[props.name];
          setSelections(newSelections);
          socket.emit("selected", newSelections);
          setUser({
            ...user,
            selectionQty: user.selectionQty - 1 < 0 ? 0 : user.selectionQty - 1,
          });
        }
      }
    } else {
      alert("Por favor, preencha seus dados antes de escolher!");
    }
  };

  useEffect(() => {
    const handleSelections = (newSelections) => {
      setSocketData(newSelections);
    };
    socket.on("selected", handleSelections);
    // Atualize as informações a cada segundo
    const interval = setInterval(() => {
      socket.emit("selected", selections);
    }, 1000);
    return () => {
      socket.off("selected", handleSelections);
      clearInterval(interval);
    };
  }, [selections, socket]);

  useEffect(() => {
    // Atualize o estado local selections sempre que socketData mudar
    setSelections(socketData);
  }, [socketData]);

  useEffect(() => {
    const selection = selections[props.name];
    if (selection) {
      setIsSelected(true);
      setCurrentUser(selection.name);
    } else {
      setIsSelected(false);
      setCurrentUser("");
    }
  }, [props.name, selections]);

  const calcTotal = () => {
    if (user.selectionQty > state.offset) {
      setTotal(user.selectionQty * state.promoPrice);
    } else {
      setTotal(user.selectionQty * state.price);
    }
  };
  return (
    <div
      onClick={(e) => {
        handleClick(e);
      }}
      id={props.name}
      className={
        isSelected
          ? `selected-container-${currentUser === user.name ? "main" : "other"}`
          : "name-container"
      }
    >
      <p id={props.name}>{props.name}</p>
      <p className="user-name-text">{currentUser}</p>
    </div>
  );
}

export default NameContainer;
