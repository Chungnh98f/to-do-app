import { Button, Form, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GetTypeStateContext } from "../../../store/context/type";
import { createType, getAllType } from "../../../store/middleware/type";
import { Container } from "../../UI/Container";
import Loading from "../../UI/Loading";
import TypeTable from "./TypeTable";

function TypeManagement() {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const { typeState, dispatch } = GetTypeStateContext();
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
        const { name } = value;
        createType(dispatch, { name }).then((res) => {
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

    useEffect(() => {
        getAllType(dispatch).then((res) => {
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
                title="Todos"
                extra={
                    <Button onClick={showModal} type="primary">
                        New Type
                    </Button>
                }
            >
                <TypeTable />
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
                    </Form>
                </Modal>
            </Container>
            {(loading || typeState.pending) && <Loading />}
        </>
    );
}

export default TypeManagement;
