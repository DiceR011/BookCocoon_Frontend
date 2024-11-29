import React from "react";
import Layout from "./Layout";
import { Timer } from "../index"

const Home: React.FC = () => {
    return (
        <Layout>
            <div style={{ marginTop: "-25px" }}>
                <Timer />
            </div>
        </Layout>
    );
};

export default Home;