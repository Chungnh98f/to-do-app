import { Spin } from "antd";
import React from "react";
import { WrapContent } from "../WrapContent";

function Loading() {
    return (
        <>
            <WrapContent
                width="100%"
                height="100%"
                position="fixed"
                top="0"
                left="0"
                backgroundColor="#d1d1d169"
                zIndex="99999999999999999999"
            >
                <WrapContent
                    width="100%"
                    height="100vh"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Spin size="large" />
                </WrapContent>
            </WrapContent>
        </>
    );
}

export default Loading;
