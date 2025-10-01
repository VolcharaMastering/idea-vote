import "./App.scss";
import TheTable from "./components/TheTable/TheTable";

const App = () => {
    return (
        <main className="app">
            <h1 className="main-title">Choose yoyr idea. Vote for it</h1>
            <TheTable />
            <section className="buttons-section">{/* <CustomButton  /> */}</section>
        </main>
    );
};

export default App;
