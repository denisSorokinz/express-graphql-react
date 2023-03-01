import { useCallback, FC, PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";

import { useQuery, useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../graphql/queries";
import { ADD_CLIENT } from "../graphql/mutations";

type FormData = {
  name: string;
  email: string;
  phone: string;
};

const AddClientModal: FC<PropsWithChildren> = ({ children }) => {
  const { register, getValues, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const [handleAddClient] = useMutation(ADD_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const onSubmit = useCallback(
    () =>
      handleAddClient({
        variables: getValues(),
      }),
    []
  );
  const onError = useCallback((err: any) => {
    console.log("[submit-err]", err);
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-toggle="modal"
        data-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="mx-2" />
          {children || "Open Modal"}
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <div className="modal-body">
                <label className="form-label">Name</label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  id="name"
                  className="form-control"
                />
                <label className="form-label">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  id="email"
                  className="form-control"
                />
                <label className="form-label">Phone</label>
                <input
                  {...register("phone", { required: true })}
                  type="tel"
                  id="phone"
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClientModal;
