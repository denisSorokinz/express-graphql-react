import Header from "./components/Header";
import Clients from "./components/Clients";
import AddClientModal from "./components/AddClientModal";

function App() {
  return (
    <div className="container">
      <Header />
      <Clients />
      <AddClientModal>Add Client</AddClientModal>
    </div>
  );
}

export default App;
