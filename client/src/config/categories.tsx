import {
    LogoutOutlined,
    UnorderedListOutlined,
    SettingOutlined,
    BarChartOutlined,
    UsergroupAddOutlined,
    BranchesOutlined,
} from "@ant-design/icons";

interface category {
    key: string;
    icon: React.ReactNode;
    forAdmin: boolean;
}

export const categories: category[] = [
    {
        key: "dashboard",
        icon: <BarChartOutlined />,
        forAdmin: false,
    },
    {
        key: "todo-management",
        icon: <UnorderedListOutlined />,
        forAdmin: true,
    },
    {
        key: "user-management",
        icon: <UsergroupAddOutlined />,
        forAdmin: true,
    },
    {
        key: "type-management",
        icon: <BranchesOutlined />,
        forAdmin: true,
    },
    {
        key: "profile",
        icon: <SettingOutlined />,
        forAdmin: false,
    },
    {
        key: "sign-out",
        icon: <LogoutOutlined />,
        forAdmin: false,
    },
];
