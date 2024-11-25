import React from "react";
import { Timer } from "./components";
import Layout from "./components/Layout/Layout"

const App: React.FC = () => {
    return (
        <Layout>
            <div>
                <Timer />
            </div>
        </Layout>
    );
};

export default App;
