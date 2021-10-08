import styled from "styled-components";
import {Layout} from "antd";

const {Sider} = Layout

export const SidebarContainer = styled(Sider)`
  height: 100%;
  z-index: 99;

  & .logo {
    img {
      width: 100%;
      padding: 10px;
    }
  }

  & .sidebar {
    z-index: 100;
  }

`;
