import { Button, Checkbox, Form, Input, Modal, Select, Table } from "antd";
import { ColumnsType, SortOrder } from "antd/lib/table/interface";
import React, { useState } from "react";
import styled from "styled-components";
import { GetTodoStateContext } from "../../../store/context/todo";
import { GetTypeStateContext } from "../../../store/context/type";
import { ITodoInput } from "../../../store/interface";
import {
    deleteTodo,
    getAllTodo,
    updateTodo,
} from "../../../store/middleware/todo";
import { getFilterRow } from "../../../utility/helpers";

export const RowContainer = styled.div`
    .table-row {
        display: grid;
        grid-template-columns: 1fr 1fr 3fr 6fr 1fr 1fr;
        grid-gap: 8px;
        margin-bottom: 8px;
    }

    .search__container {
        display: flex;
        justify-content: center;
    }
`;

export interface ISort {
    key: string;
    order: SortOrder;
}

const TodoItem: React.FC = () => {
    const { todoState, dispatch: todoDispatch } = GetTodoStateContext();
    const { typeState } = GetTypeStateContext();
    const [form] = Form.useForm();
    const [sortedInfo, setSortedInfo] = useState<ISort>({
        key: "name",
        order: null,
    });

    const [input, setInput] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const _columns: ColumnsType<any> = [
        {
            title: "Completed",
            dataIndex: "is_completed",
            key: "is_completed",
            align: "center",
            filters: [
                {
                    text: "Completed",
                    value: true,
                },
                {
                    text: "Incompleted",
                    value: false,
                },
            ],
            onFilter: (value, record) => record.is_completed === value,
            width: "8%",
            render: (value, record) => (
                <Checkbox onChange={() => toggleTodo(record)} checked={value} />
            ),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            align: "center",
            width: "8%",
            render: (type) => <span>{type.name}</span>,
        },
        {
            title: "Title",
            dataIndex: "name",
            key: "name",
            width: "20%",
            render: (text) => {
                return <span>{text}</span>;
            },
        },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
            width: "40%",
            render: (text) => {
                return <span>{text}</span>;
            },
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            align: "center",
            width: "8%",
            sorter: (a, b) => {
                const timeA = new Date(a.created_at).getTime();
                const timeB = new Date(b.created_at).getTime();
                return timeA - timeB;
            },
            sortOrder:
                sortedInfo.key === "created_at" ? sortedInfo.order : null,
            render: (text) => <span>{text.slice(0, 10)}</span>,
        },
        {
            title: "Updated At",
            dataIndex: "updated_at",
            key: "updated_at",
            align: "center",
            width: "8%",
            sorter: (a, b) => {
                const timeA = new Date(a.updated_at).getTime();
                const timeB = new Date(b.updated_at).getTime();
                return timeA - timeB;
            },
            sortOrder:
                sortedInfo.key === "updated_at" ? sortedInfo.order : null,
            render: (text) => <span>{text.slice(0, 10)}</span>,
        },
        {
            key: "update",
            align: "center",
            width: "8%",
            render: (text, record) => {
                return (
                    <Button type="primary" onClick={() => showModal(record)}>
                        Update
                    </Button>
                );
            },
        },
        {
            key: "delete",
            align: "center",
            width: "8%",
            render: (text, record) => {
                return (
                    <Button
                        type="primary"
                        danger
                        onClick={() => deleteItem(record.id)}
                    >
                        Delete
                    </Button>
                );
            },
        },
    ];

    const showModal = (todo: ITodoInput) => {
        form.setFields([
            { name: "id", value: todo.id },
            { name: "name", value: todo.name },
            { name: "content", value: todo.content },
            { name: "type", value: todo.type.id },
            { name: "is_completed", value: todo.is_completed },
        ]);

        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const onUpdateTodo = (value: any) => {
        const { id, name, is_completed, content, type } = value;
        updateTodo(todoDispatch, {
            id,
            name,
            is_completed,
            content,
            type,
        }).then((res) => {
            if (res.result) {
                getAllTodo(todoDispatch);
            }
        });
        form.resetFields();
        setIsModalVisible(false);
    };

    const onTypeChange = (value: number) => {
        form.setFieldsValue({ type: value });
    };

    const toggleTodo = (todo: ITodoInput) => {
        const { id, name, is_completed, content, type } = todo;
        updateTodo(todoDispatch, {
            id,
            name,
            is_completed: !is_completed,
            content,
            type: type.id,
        }).then((res) => {
            if (res.result) {
                getAllTodo(todoDispatch);
            }
        });
    };

    const deleteItem = (id: number) => {
        deleteTodo(todoDispatch, id);
    };

    const handleChange = (_: any, a: any, sorter: any) => {
        setSortedInfo({
            key: sorter.columnKey,
            order: sorter.order,
        });
    };

    return (
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
                dataSource={getFilterRow(todoState.userTodos, input)}
                columns={_columns}
                scroll={{ x: true }}
                onChange={handleChange}
                pagination={false}
            />

            <Modal
                title="Update todo"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    layout="horizontal"
                    name="basic"
                    form={form}
                    onFinish={onUpdateTodo}
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
                                <Select.Option key={type.id} value={type.id!}>
                                    {type.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="id" style={{ display: "none" }} />
                    <Form.Item
                        name="is_completed"
                        style={{ display: "none" }}
                    />
                </Form>
            </Modal>
        </RowContainer>
    );
};

export default TodoItem;
