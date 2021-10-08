import { Checkbox, Input, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { GetTodoStateContext } from "../../../store/context/todo";
import { adminGetAllTodo } from "../../../store/middleware/todo";
import { getFilterRow } from "../../../utility/helpers";
import { ISort, RowContainer } from "../../Dashboard/TodoTable";
import { Container } from "../../UI/Container";
import Loading from "../../UI/Loading";

function TodoManagement() {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const { todoState, dispatch: todoDispatch } = GetTodoStateContext();
    const [input, setInput] = useState("");
    const [sortedInfo, setSortedInfo] = useState<ISort>({
        key: "name",
        order: null,
    });

    const _columns: ColumnsType<any> = [
        {
            title: "Completed",
            dataIndex: "is_completed",
            key: "is_completed",
            align: "center",
            filters: [
                {
                    text: "Completed",
                    value: true,
                },
                {
                    text: "Incompleted",
                    value: false,
                },
            ],
            onFilter: (value, record) => record.is_completed === value,
            width: "8%",
            render: (value, record) => (
                <Checkbox disabled={true} checked={value} />
            ),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            align: "center",
            width: "8%",
            render: (type) => <span>{type.name}</span>,
        },
        {
            title: "Title",
            dataIndex: "name",
            key: "name",
            width: "20%",
            render: (text) => {
                return <span>{text}</span>;
            },
        },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
            width: "40%",
            render: (text) => {
                return <span>{text}</span>;
            },
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            align: "center",
            width: "8%",
            sorter: (a, b) => {
                const timeA = new Date(a.created_at).getTime();
                const timeB = new Date(b.created_at).getTime();
                return timeA - timeB;
            },
            sortOrder:
                sortedInfo.key === "created_at" ? sortedInfo.order : null,
            render: (text) => <span>{text.slice(0, 10)}</span>,
        },
        {
            title: "Updated At",
            dataIndex: "updated_at",
            key: "updated_at",
            align: "center",
            width: "8%",
            sorter: (a, b) => {
                const timeA = new Date(a.updated_at).getTime();
                const timeB = new Date(b.updated_at).getTime();
                return timeA - timeB;
            },
            sortOrder:
                sortedInfo.key === "updated_at" ? sortedInfo.order : null,
            render: (text) => <span>{text.slice(0, 10)}</span>,
        },

        {
            title: "User",
            dataIndex: "user",
            key: "user",
            width: "15%",
            render: (user) => <span>{user.username}</span>,
        },
    ];

    const handleChange = (_: any, a: any, sorter: any) => {
        setSortedInfo({
            key: sorter.columnKey,
            order: sorter.order,
        });
    };

    useEffect(() => {
        adminGetAllTodo(todoDispatch).then((res) => {
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
            <Container title="All Todos">
                <RowContainer>
                    <div className="search__container">
                        <Input.Search
                            style={{ maxWidth: 350, margin: "1rem auto" }}
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                            value={input}
                            enterButton
                        />
                    </div>
                    <Table
                        dataSource={getFilterRow(todoState.allTodos, input)}
                        columns={_columns}
                        scroll={{ x: true }}
                        onChange={handleChange}
                        pagination={false}
                    />
                </RowContainer>
            </Container>
            {(loading || todoState.pending) && <Loading />}
        </>
    );
}

export default TodoManagement;
