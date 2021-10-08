import {
    Button,
    Checkbox,
    Form,
    Input,
    message,
    Modal,
    Radio,
    Table,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GetAuthStateContext } from "../../../store/context/auth";
import {
    getAllUsers,
    getRegisterByAdmin,
} from "../../../store/middleware/auth";
import { getFilterRow } from "../../../utility/helpers";
import { RowContainer } from "../../Dashboard/TodoTable";
import { Container } from "../../UI/Container";
import Loading from "../../UI/Loading";

function UserManagement() {
    const { authState, dispatch } = GetAuthStateContext();
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const onCreateNewUser = (value: any) => {
        const { username, password, email, is_admin } = value;
        getRegisterByAdmin(dispatch, {
            username,
            password,
            email,
            is_admin,
        }).then((res) => {
            if (res.result) {
                message.success(res.message);
                return;
            }
            message.error(res.message);
        });
        form.resetFields();
        setIsModalVisible(false);
    };

    const _columns: ColumnsType<any> = [
        {
            title: "Is Admin",
            dataIndex: "is_admin",
            key: "is_admin",
            align: "center",
            filters: [
                {
                    text: "Admin",
                    value: true,
                },
                {
                    text: "User",
                    value: false,
                },
            ],
            onFilter: (value, record) => record.is_admin === value,
            width: "10%",
            render: (value) => <Checkbox disabled={true} checked={value} />,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "30%",
            render: (email) => <span>{email}</span>,
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            width: "30%",
            render: (username) => {
                return <span>{username}</span>;
            },
        },
    ];

    useEffect(() => {
        getAllUsers(dispatch).then((res) => {
            if (res.result) {
                setLoading(false);
                return;
            }
            history.push("/404");
        });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Container
                title="All Todos"
                extra={
                    <Button onClick={showModal} type="primary">
                        New User
                    </Button>
                }
            >
                <RowContainer>
                    <div className="search__container">
                        <Input.Search
                            style={{ maxWidth: 350, margin: "1rem auto" }}
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                            value={input}
                            enterButton
                        />
                    </div>
                    <Table
                        dataSource={getFilterRow(authState.users, input)}
                        columns={_columns}
                        scroll={{ x: true }}
                        pagination={false}
                    />
                </RowContainer>

                <Modal
                    title="Create new todo"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form
                        layout="horizontal"
                        name="basic"
                        form={form}
                        onFinish={onCreateNewUser}
                    >
                        <Form.Item
                            label="Username"
                            labelAlign="right"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input size="middle" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            labelAlign="right"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                },
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.resolve();
                                        }
                                        //eslint-disable-next-line
                                        const emailRegex =
                                            // eslint-disable-next-line no-useless-escape
                                            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                        const result = emailRegex.test(value);
                                        if (result) {
                                            return Promise.resolve();
                                        } else {
                                            return Promise.reject(
                                                new Error("Invalid email")
                                            );
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input size="middle" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            labelAlign="right"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                },
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.resolve();
                                        }

                                        if (value.length >= 5) {
                                            return Promise.resolve();
                                        } else {
                                            return Promise.reject(
                                                new Error(
                                                    "Password must contain at least 5 characters"
                                                )
                                            );
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input.Password size="middle" />
                        </Form.Item>
                        <Form.Item
                            label="Re-type password"
                            labelAlign="right"
                            name="retype_password"
                            dependencies={["password"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("password") === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            "The two passwords that you entered do not match!"
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password size="middle" />
                        </Form.Item>
                        <Form.Item
                            label="Role"
                            labelAlign="right"
                            name="is_admin"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Radio.Group name="is_admin">
                                <Radio value={true}>Admin</Radio>
                                <Radio value={false}>User</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>
            </Container>
            {(loading || authState.pending) && <Loading />}
        </>
    );
}

export default UserManagement;
