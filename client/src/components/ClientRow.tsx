import { FC, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { gql, useMutation } from "@apollo/client";

import { IClient } from "../types";
import { DELETE_CLIENT } from "../graphql/mutations";
import { GET_CLIENTS } from "../graphql/queries";

type ClientRowProps = {
  client: IClient;
};

const ClientRow: FC<ClientRowProps> = ({ client }) => {
  const [handleDelete, { data, loading, error, called }] = useMutation<{
    deleteClient: IClient;
  }>(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries: () => [{ query: GET_CLIENTS }]
    update: (cache, { data }) => {
      if (!data?.deleteClient) return;

      const queryResult = cache.readQuery<{ clients: IClient[] }>({
        query: GET_CLIENTS,
      });
      if (!queryResult?.clients) return;

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: queryResult.clients.filter(
            (client) => client.id !== data?.deleteClient.id
          ),
        },
      });
    },
  });
  useEffect(() => {
    console.log("[deleteClient]", data);
  }, [data]);

  let content;

  if (called && loading) {
    content = (
      <td>
        <h1>Loading...</h1>
      </td>
    );
  }
  if (called && error) {
    console.error("[DELETE_CLIENT_ERR]", error);
    content = (
      <td>
        <h1>Something went wrong</h1>
      </td>
    );
  }
  if (called && !data) {
    content = <></>;
  }
  if (!called) {
    content = (
      <>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={handleDelete as () => void}
          >
            <FaTrash />
          </button>
        </td>
      </>
    );
  }

  return <tr>{content}</tr>;
};

export default ClientRow;
