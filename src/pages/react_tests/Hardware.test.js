import HardwareDatasets from "../hardware-datasets/Hardware-Datasets";
import {render, fireEvent} from "@testing-library/react"

it("Render Hardware", () => {
  const {queryByTitle} = render(<HardwareDatasets loggedIn={true}/>);
  const hardware = queryByTitle("hardware");
  const datasets = queryByTitle("datasets");
  expect(hardware).toBeTruthy();
  expect(datasets).toBeTruthy();
})