import { Spinner } from "react-bootstrap";

export default function FullPageSpinner() {
  return (
    <div className="d-flex justify-content-around mt-4 pt-4">
      <div className="d-flex flex-column text-center">
        <Spinner style={{ width: "5rem", height: "5rem", margin: "1em" }} />
        <p>Loading</p>
      </div>
    </div>
  );
}
