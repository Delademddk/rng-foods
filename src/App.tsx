import { BrowserRouter } from "react-router-dom";
import FloatingCallButton from "./components/common/FloatingCallButton";
import FloatingOrderNowButton from "./components/common/FloatingOrderNowButton";
import {
  FloatingFabProvider,
  useFloatingFab,
} from "./context/FloatingFabContext";
import AppRoutes from "./routes/AppRoutes";

function FloatingActionButtonSwitcher() {
  const { mode } = useFloatingFab();

  return mode === "order" ? <FloatingOrderNowButton /> : <FloatingCallButton />;
}

export default function App() {
  return (
    <BrowserRouter>
      <FloatingFabProvider>
        <AppRoutes />
        <FloatingActionButtonSwitcher />
      </FloatingFabProvider>
    </BrowserRouter>
  );
}
