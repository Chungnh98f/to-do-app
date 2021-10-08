import React from "react";
import { Col } from "antd";

import { AuthenticationContainer } from "./authentication.styles";

const AuthenticationLayout: React.FC = (props) => {
    return (
        <AuthenticationContainer>
            <Col
                xs={{ span: 22, offset: 1 }}
                sm={{ span: 20, offset: 2 }}
                lg={{ span: 18, offset: 3 }}
                xxl={{ span: 14, offset: 5 }}
            >
                {props.children}
            </Col>
        </AuthenticationContainer>
    );
};
export default AuthenticationLayout;
