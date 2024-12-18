import { Provider } from "react-redux"
import { store } from "./store"
import { GridExample} from './DataGrid'
import { Button } from "@mui/material"


function App() {
return (
  <Provider store={store}>
    <div className="m-20 block">
      <GridExample />
    </div>
  </Provider>
)
}

export default App
