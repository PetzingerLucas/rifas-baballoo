import React, { useContext, useEffect, useState } from "react";
import Context from "../context/Context";

function NameContainer(props) {
  const { setTotal, user, state, setUser, socket, isAdmin } =
    useContext(Context);
  const [isSelected, setIsSelected] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [selections, setSelections] = useState({});
  const [socketData, setSocketData] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleClick = (event) => {
    calcTotal();
    if (isAdmin) {
      handleAdminClick();
      return;
    }
    if (!user.name) {
      alert("Por favor, preencha seus dados antes de escolher!");
      return;
    }
    const newSelections = { ...selections };
    const selection = newSelections[props.name];

    if (!isSelected) {
      if (!selection) {
        newSelections[props.name] = {
          name: user.name,
          selectionQty: user.selectionQty + 1,
          isConfirmed: false,
        };
        setSelections(newSelections);
        socket.emit("selected", newSelections);
        setUser({
          ...user,
          selectionQty: user.selectionQty + 1,
          selection: [...user.selection, props.name],
        });
      } else if (selection.name === currentUser && !selection.isConfirmed) {
        newSelections[props.name] = {
          name: user.name,
          selectionQty: user.selectionQty + 1,
          isConfirmed: false,
        };
        setSelections(newSelections);
        socket.emit("selected", newSelections);
        setUser({
          ...user,
          selectionQty: user.selectionQty + 1,
          selection: [...user.selection, props.name],
        });
      }
    } else if (currentUser === user.name) {
      if (!selection.isConfirmed) {
        delete newSelections[props.name];
        setSelections(newSelections);
        socket.emit("selected", newSelections);
        setUser({
          ...user,
          selectionQty: user.selectionQty - 1 < 0 ? 0 : user.selectionQty - 1,
          selection: user.selection.filter((e) => e !== props.name),
        });
      }
    }
  };

  const handleAdminClick = () => {
    const newSelections = { ...selections };
    const selection = newSelections[props.name];
    const element = document.getElementById(props.name);

    if (element.classList.contains("selected-container-other")) {
      if (
        selection &&
        selection.name !== currentUser &&
        selection.isConfirmed
      ) {
        setIsConfirmed(!isConfirmed);
        newSelections[props.name] = {
          name: selection.name,
          selectionQty: 1,
          isConfirmed: !isConfirmed,
        };
      } else {
        newSelections[props.name] = {
          name: currentUser,
          selectionQty: 1,
          isConfirmed: true,
        };
      }
      setSelections(newSelections);
      socket.emit("selected", newSelections);
    } else {
      alert("Este nome ainda não foi selecionado por ninguém!");
    }
  };

  useEffect(() => {
    const selection = selections[props.name];
    if (selection) {
      setIsSelected(true);
      setCurrentUser(selection.name);
      setIsConfirmed(selection.isConfirmed);
    } else {
      setIsSelected(false);
      setCurrentUser("");
      setIsConfirmed(false);
    }
  }, [props.name, selections, isAdmin]);

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
      setIsConfirmed(selection.isConfirmed);
    } else {
      setIsSelected(false);
      setCurrentUser("");
      setIsConfirmed(false);
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
          ? `selected-container-${
              currentUser === user.name ? "main" : "other"
            }${isConfirmed ? " confirmed" : ""}`
          : "name-container"
      }
    >
      <p id={props.name}>{props.name}</p>
      <p className="user-name-text">{currentUser}</p>
    </div>
  );
}
export default NameContainer;
