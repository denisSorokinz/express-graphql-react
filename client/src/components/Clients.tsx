import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../graphql/queries";
import ClientRow from "./ClientRow";
import { IClient } from "../types";
import Spinner from "./Spinner";

const Clients = () => {
  const { data, loading, error } = useQuery<{ clients: IClient[] }>(
    GET_CLIENTS
  );


  if (loading) return <Spinner />;

  if (error || !data) {
    console.error("[GET_CLIENTS_ERR]", error, data);
    return <h1>Clients not found</h1>;
  }

  return (
    <table className="table table-hover mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.clients.map((client, ind) => (
          <ClientRow key={client.id} client={client} />
        ))}
      </tbody>
    </table>
  );
};

export default Clients;
