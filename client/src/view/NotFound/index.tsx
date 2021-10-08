import React from 'react';
import {Button, Result} from "antd";
import {useHistory} from 'react-router-dom'

function NotFound() {
    const history = useHistory();
    return (
        <Result
            style={{paddingTop: "100px"}}
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button onClick={() => history.push("/")} type="primary">
                    Back to Homepage
                </Button>
            }
        />
    );
}

export default NotFound;
