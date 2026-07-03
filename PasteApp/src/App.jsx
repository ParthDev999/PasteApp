import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./component/Home";
import NavBar from "./component/NavBar";
import Paste from "./component/Paste";
import ViewPaste from "./component/ViewPaste";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <NavBar />
        <div className="mx-auto max-w-5xl px-4 py-6">
          <Home />
        </div>
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <NavBar />
        <div className="mx-auto max-w-5xl px-4 py-6">
          <Paste />
        </div>
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <NavBar />
        <div className="mx-auto max-w-5xl px-4 py-6">
          <ViewPaste />
        </div>
      </div>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;