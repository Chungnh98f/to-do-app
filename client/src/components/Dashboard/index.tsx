import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { GetTodoStateContext } from "../../store/context/todo";
import { GetTypeStateContext } from "../../store/context/type";
import { createTodo, getAllTodo } from "../../store/middleware/todo";
import { getAllType } from "../../store/middleware/type";
import { Container } from "../UI/Container";
import Loading from "../UI/Loading";
import TodoTable from "./TodoTable";

function Dashboard() {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const { todoState, dispatch: todoDispatch } = GetTodoStateContext();
    const { typeState, dispatch: typeDispatch } = GetTypeStateContext();
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

    const onSubmitNewTodo = (value: any) => {
        const { name, content, type } = value;
        createTodo(todoDispatch, { name, content, type }).then((res) => {
            form.resetFields();
            if (res.result) {
                getAllTodo(todoDispatch);
            }
        });

        setIsModalVisible(false);
    };

    const onTypeChange = (value: number) => {
        form.setFieldsValue({ type: value });
    };

    useEffect(() => {
        getAllTodo(todoDispatch).then((res) => {
            if (res.result) {
                setLoading(false);
                return;
            }
            history.push("/404");
        });
        getAllType(typeDispatch).then((_) => _);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Container
                title="Todos"
                extra={
                    <Button onClick={showModal} type="primary">
                        New
                    </Button>
                }
            >
                <TodoTable />

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
                        onFinish={onSubmitNewTodo}
                    >
                        <Form.Item
                            label="Name"
                            labelAlign="right"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input size="middle" type="text" />
                        </Form.Item>
                        <Form.Item
                            label="Content"
                            labelAlign="right"
                            name="content"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input.TextArea size="middle" />
                        </Form.Item>
                        <Form.Item
                            label="Type"
                            labelAlign="right"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select a type"
                                onChange={onTypeChange}
                                allowClear
                            >
                                {typeState.types.map((type) => (
                                    <Select.Option
                                        key={type.id}
                                        value={type.id!}
                                    >
                                        {type.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </Container>
            {(loading || todoState.pending || typeState.pending) && <Loading />}
        </>
    );
}

export default Dashboard;
