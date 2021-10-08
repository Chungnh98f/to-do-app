import { Menu, message } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../../../components/UI/Loading";
import { categories } from "../../../../config/categories";
import { GetAuthStateContext } from "../../../../store/context/auth";
import { getLogout } from "../../../../store/middleware/auth";
import { capitalizing } from "../../../../utility/helpers";
import { SidebarContainer } from "./sidebar.styles";

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const history = useHistory();
    const { dispatch, authState } = GetAuthStateContext();

    const pathname = history.location.pathname
        .split("/")
        .filter((item) => item !== "");
    const [openKey, setOpenKey] = useState([`${pathname[0]}`]);
    const [selectKey, setSelectKey] = useState([
        pathname[0] === "app-configurations" || pathname[0] === "reporting"
            ? pathname[0] + "/" + pathname[1]
            : pathname[0],
    ]);
    const rootKey = categories.map((cate) => cate.key);

    const setDefaultSelectedKey = () => {
        const pathname = history.location.pathname
            .split("/")
            .filter((item) => item !== "");
        setSelectKey([
            pathname[1] ? pathname[0] + "/" + pathname[1] : pathname[0],
        ]);
    };

    const onClickDashboard = (e: any) => {
        if (e.key === "sign-out") {
            getLogout(dispatch).then((res) => {
                if (res.result) {
                    message.success("" + res.message);
                    history.push("/auth");
                } else if (!res.result) {
                    message.error("" + res.message);
                }
            });
            return;
        }
        console.log(e);
        history.push("/" + e.key);

        setDefaultSelectedKey();
    };

    const onOpenChange = (keys: any[]) => {
        const latestOpenKey = keys.find((key) => openKey.indexOf(key) === -1);
        if (latestOpenKey && rootKey.indexOf(latestOpenKey) === -1) {
            setOpenKey(keys);
        } else {
            setOpenKey(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const renderSidebar = () => {
        const menus = authState.me.is_admin
            ? categories
            : categories.filter((cate) => !cate.forAdmin);
        return menus.map((cate) => {
            const { key, icon } = cate;
            return (
                <Menu.Item key={`${key}`} icon={icon}>
                    {capitalizing(key || "")}
                </Menu.Item>
            );
        });
    };

    return (
        <>
            <SidebarContainer
                className="sidebar menu-custom"
                collapsible
                collapsed={collapsed}
                onCollapse={() => {
                    setCollapsed((prevState) => !prevState);
                }}
                theme="light"
                width="240px"
            >
                <Menu
                    theme="light"
                    defaultSelectedKeys={[
                        pathname[1]
                            ? pathname[0] + "/" + pathname[1]
                            : pathname[0],
                    ]}
                    selectedKeys={selectKey}
                    openKeys={openKey}
                    onOpenChange={onOpenChange}
                    mode="inline"
                    onClick={onClickDashboard}
                >
                    {renderSidebar()}
                </Menu>
            </SidebarContainer>
            {authState.pending && <Loading />}
        </>
    );
}

export default Sidebar;
