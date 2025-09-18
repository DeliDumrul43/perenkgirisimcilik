import { useEffect, useState } from "react";
import "./App.css";
import Home from "./views/Home";
import Loading from "./components/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  // şimdilik deneme yaptım, daha sonra gerçekten de resimler yüklendikten sonra sayfa açılacak
  // şekilde ayar çekicez
  //  <Suspense /> ekleyerek bunu ayarlayabiliyoruz.
  // https://react.dev/reference/react/Suspense
  
  useEffect(() => {
    const tryDataFetch = () => {
      setTimeout(() => {
        setIsLoading(true);
      }, 4000);
    };
    tryDataFetch();
  }, []);

  return <>{isLoading ? <Home /> : <Loading />}</>;
}

export default App;
