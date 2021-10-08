import { Button, Col, Form, Input, message, Row } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { layout } from "../../../config/layout";
import { GetAuthStateContext } from "../../../store/context/auth";
import { ILoginInput } from "../../../store/interface";
import { getAuth, getLogin } from "../../../store/middleware/auth";
import Loading from "../../UI/Loading";
import { SignInContainer } from "./sign-in.styles";

const SignInForm = () => {
    const history = useHistory();
    const { dispatch, authState } = GetAuthStateContext();

    const onFinish = async (values: ILoginInput) => {
        const { email, password } = values;
        getLogin(dispatch, {
            email,
            password,
        }).then((res) => {
            if (res.result) {
                getAuth(dispatch).then((res) => history.push("/"));
                message.success(res.message);
            } else if (!res.result) {
                message.error(res.message);
            }
        });
    };

    const validateMessages = {
        // eslint-disable-next-line
        required: "${label} is required!",
        types: {
            // eslint-disable-next-line
            email: "${label} is not a valid email!",
        },
    };

    const onFinishFailed = (errorInfo: any): void => {};

    return (
        <>
            <SignInContainer className="btn-custom link-custom form-custom">
                <h1>Login</h1>
                <Form
                    validateMessages={validateMessages}
                    {...layout}
                    layout="horizontal"
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Email"
                        labelAlign="right"
                        name="email"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Row gutter={[16, 0]}>
                            <Col xs={24} sm={24} md={16}>
                                <Input size="middle" type="text" />
                            </Col>
                        </Row>
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
                        <Row gutter={[16, 0]}>
                            <Col xs={24} sm={24} md={16}>
                                <Input.Password size="middle" />
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item className="mb-0 footer" label="Submit">
                        <Row gutter={[16, 0]}>
                            <Col xs={24} sm={24} md={16}>
                                <div className="btn--container">
                                    <Button
                                        type="primary"
                                        className="button"
                                        htmlType="submit"
                                    >
                                        Log in
                                    </Button>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={8}>
                                <div>
                                    <Link to="/auth/sign-up">
                                        Register new account here
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
                {authState.pending && <Loading />}
            </SignInContainer>
        </>
    );
};

export default React.memo(SignInForm);
