import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const alertSuccess = (text) => {
  MySwal.fire({
    position: "top-end",
    icon: "success",
    title: text,
    showConfirmButton: false,
    timer: 500,
    width: "25em",
  });
}

export const alertError = (text) => {
  MySwal.fire(
    text,
    "Intente nuevamente",
    "error"
  );
}