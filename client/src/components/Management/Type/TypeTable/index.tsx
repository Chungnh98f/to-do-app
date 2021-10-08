import { Button, Form, Input, message, Modal, Table } from "antd";
import { ColumnsType, SortOrder } from "antd/lib/table/interface";
import React, { useState } from "react";
import { GetTypeStateContext } from "../../../../store/context/type";
import { ITypeInput } from "../../../../store/interface";
import {
    deleteType,
    getAllType,
    updateType,
} from "../../../../store/middleware/type";

const TypeTable: React.FC = () => {
    const { typeState, dispatch } = GetTypeStateContext();
    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const _columns: ColumnsType<any> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "10%",
            render: (id) => <span>{id}</span>,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (name) => <span>{name}</span>,
        },
        {
            key: "update",
            align: "center",
            width: "10%",
            render: (_, record) => {
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
            width: "10%",
            render: (_, record) => {
                return (
                    <Button
                        type="primary"
                        danger
                        onClick={() => onDeleteType(record.id)}
                    >
                        Delete
                    </Button>
                );
            },
        },
    ];

    const showModal = (type: ITypeInput) => {
        form.setFields([
            { name: "id", value: type.id },
            { name: "name", value: type.name },
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

    const onUpdateType = (value: any) => {
        const { id, name } = value;
        updateType(dispatch, {
            id,
            name,
        }).then((res) => {
            if (res.result) {
                message.success(res.message);
                getAllType(dispatch);
                return;
            }
            message.error(res.message);
        });
        form.resetFields();
        setIsModalVisible(false);
    };

    const onDeleteType = (id: number) => {
        deleteType(dispatch, id).then((res) => {
            if (res.result) {
                message.success(res.message);
                return;
            }
            message.error(res.message);
        });
    };

    return (
        <>
            <Table
                dataSource={typeState.types}
                columns={_columns}
                scroll={{ x: true }}
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
                    onFinish={onUpdateType}
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
                    <Form.Item name="id" style={{ display: "none" }} />
                </Form>
            </Modal>
        </>
    );
};

export default TypeTable;
