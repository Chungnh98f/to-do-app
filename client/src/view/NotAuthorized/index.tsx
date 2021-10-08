import React from "react";
import { Button, Result } from "antd";
import { useHistory } from "react-router-dom";

function NotAuthorized() {
    const history = useHistory();
    return (
        <Result
            style={{ paddingTop: "100px" }}
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to visit this page"
            extra={
                <Button onClick={() => history.push("/")} type="primary">
                    Back to Homepage
                </Button>
            }
        />
    );
}

export default NotAuthorized;
