import React from "react";
import Layout from "./Layoutcomponents/Layout";
import HomeContents from "./Layoutcomponents/HomeContents"

const HomeLayout: React.FC = () => {
    return (
        <Layout>
            <HomeContents />
        </Layout>
    );
};

export default HomeLayout;
