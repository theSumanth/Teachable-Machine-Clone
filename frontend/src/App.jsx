import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./Pages/Home";
import RootLayout from "./Pages/RootLayout";
import "./App.css";
import ClassContextProvider from "./store/ClassContextProvider";
import CreateModel from "./Pages/CreateModel";
import ModelContextProvder from "./store/ModelContextProvder";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/create-model",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ClassContextProvider>
            <ModelContextProvder>
              <CreateModel />
            </ModelContextProvder>
          </ClassContextProvider>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
