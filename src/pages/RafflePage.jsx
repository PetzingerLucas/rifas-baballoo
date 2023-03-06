import React from "react";
import ConfirmationButton from "../components/ConfirmationButton";
import Form from "../components/Form";
import Header from "../components/Header";
import RaffleContent from "../components/RaffleContent";
import Table from "../components/Table";
import Total from "../components/Total";

function RafflePage() {
  return (
    <div className="App">
      <Header />
      <Form />
      <RaffleContent />
      <Table />
      <Total />
      <ConfirmationButton />
    </div>
  );
}

export default RafflePage;
