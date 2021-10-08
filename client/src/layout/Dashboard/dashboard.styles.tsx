import styled from "styled-components";

export const HomeContainer = styled.div`
    .layout-body {
        position: relative;
    }

    & .layout {
        min-height: 100vh;
    }

    & .container-sidebar {
        min-height: 100%;
    }

    .container-menu {
        display: none;
        transition: 0.5s ease-in-out;
        right: -100vw;
        top: 0;
        position: absolute;
        height: 100%;
        width: 100%;
        justify-content: flex-end;
        .bg-close {
            display: none;
        }

        &.is-active {
            right: 0;
            .menu-custom {
                box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
            }

            .bg-close {
                display: block;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                z-index: 98;
            }
        }

        .ant-layout-sider-trigger {
            display: none;
        }
        @media (max-width: 576px) {
            display: flex;
        }
    }

    /* .layout-mobile { */
    @media (max-width: 576px) {
        .container-sidebar {
            transition: 0.5s ease-in-out;
            left: -240px;
            top: 0;
            position: absolute;
            height: 100%;
            width: 100%;

            .bg-close {
                display: none;
            }

            &.is-active {
                left: 0;
                .menu-custom {
                    box-shadow: 10px 0 20px rgba(0, 0, 0, 0.1);
                }

                .bg-close {
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    z-index: 98;
                }
            }

            .ant-layout-sider-trigger {
                display: none;
            }
        }
    }
    /* } */
`;
