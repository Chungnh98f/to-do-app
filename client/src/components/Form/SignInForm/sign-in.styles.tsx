import styled from "styled-components";

export const SignInContainer = styled.div`
    form {
        border: 1px solid #d6d6d6;
        padding: 96px 48px;
        .footer {
            .ant-form-item-label {
                opacity: 0;
            }
            .btn--container {
                display: flex;
                justify-content: flex-end;
            }
        }
    }

    & .mb-0 {
        margin-bottom: 0;
    }

    & .alert-box {
        margin-bottom: 15px;
    }

    @media (max-width: 576px) {
        form {
            padding: 24px;
            .ant-form-item {
                margin-bottom: 12px;
            }
            .footer {
                .ant-form-item-label {
                    display: none;
                }
                .btn--container {
                    justify-content: flex-start;
                    margin-bottom: 12px;
                }
            }
        }
    }
`;
