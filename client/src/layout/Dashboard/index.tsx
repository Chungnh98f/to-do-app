import { Layout } from "antd";
import React from "react";
import { WrapContent } from "../../components/UI/WrapContent";
import { HomeContainer } from "./dashboard.styles";
import Sidebar from "./partial/Sidebar";

const DashboardLayout: React.FC = (props) => {
    return (
        <>
            <HomeContainer>
                <Layout className="layout">
                    <Layout className="layout-body">
                        <div className="container-sidebar">
                            <Sidebar />
                        </div>
                        <Layout.Content className="layout-content site-layout-background">
                            <WrapContent position="relative" height="100%">
                                {props.children}
                            </WrapContent>
                        </Layout.Content>
                    </Layout>
                </Layout>
            </HomeContainer>
        </>
    );
};

export default DashboardLayout;
