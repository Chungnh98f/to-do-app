import { Button, Col, Form, Input, message, Row } from "antd";
import layout from "antd/lib/layout";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { GetAuthStateContext } from "../../../store/context/auth";
import { getRegister } from "../../../store/middleware/auth";
import Loading from "../../UI/Loading";
import { SignUpContainer } from "./sign-up.styles";

interface ISignUp {
    email: string;
    password: string;
    retype_password: string;
    agreement: boolean;
    username: string;
}

const SignUpForm = () => {
    const history = useHistory();
    const { dispatch, authState } = GetAuthStateContext();
    const validateMessages = {
        // eslint-disable-next-line
        required: "${label} is required!",
        types: {
            // eslint-disable-next-line
            email: "${label} is not a valid email!",
        },
    };
    const onFinish = (values: ISignUp): void => {
        const { email, password, username } = values;
        getRegister(dispatch, { email, password, username }).then((res) => {
            if (res.result) {
                message.success(res.message);
                history.push("/auth");
            } else if (!res.result) {
                message.error(res.message);
            }
        });
    };

    const onFinishFailed = (errorInfo: any): void => {};

    return (
        <SignUpContainer className="btn-custom link-custom form-custom">
            <h1>Register</h1>
            <Form
                validateMessages={validateMessages}
                {...layout}
                layout="horizontal"
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                    <Row gutter={[16, 0]}>
                        <Col xs={24} sm={24} md={16}>
                            <Input size="middle" />
                        </Col>
                    </Row>
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
                    <Row gutter={[16, 0]}>
                        <Col xs={24} sm={24} md={16}>
                            <Input size="middle" />
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
                    <Row gutter={[16, 0]}>
                        <Col xs={24} sm={24} md={16}>
                            <Input.Password size="middle" />
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item label="Submit" className="mb-0 footer">
                    <Row gutter={[16, 0]}>
                        <Col xs={24} sm={24} md={16}>
                            <div className="btn--container">
                                <Button
                                    type="primary"
                                    className="button"
                                    htmlType="submit"
                                >
                                    Sign up
                                </Button>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <span>
                                Already has an account? &nbsp;
                                <Link to="/auth/sign-in">Login here</Link>
                            </span>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
            {false && <Loading />}
        </SignUpContainer>
    );
};

export default React.memo(SignUpForm);
