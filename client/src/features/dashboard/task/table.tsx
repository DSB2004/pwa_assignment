import Wrapper from "../../../components/table/wrapper";
import Header from "../../../components/table/header";
import Row from "../../../components/table/row";
import Data from "../../../components/table/data";
import Body from "../../../components/table/body";
import Head from "../../../components/table/head";
import Update from "./actions";
import Delete from "./delete";
import Pagenation from "../../../components/pagenation";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useTask from "../../../hooks/useTask";
import { useSearchParams } from "react-router-dom";
export default function Table() {
    const [params] = useSearchParams();
    const { getTaskList } = useTask();
    const { data, error, status } = useQuery({
        queryKey: ['tasks_page_' + params.get('page')],
        queryFn: () => getTaskList(String(params.get('page'))),
    });

    if (error) return <div className="my-4">Error loading tasks...</div>;
    if (status === 'pending') return <div className="my-10 flex items-center justify-center text-lg" >
        <AiOutlineLoading3Quarters className="w-14 h-14 animate-spin" />
    </div>
    return (

        <div className="flex gap-0 my-4 justify-center flex-col">
            <Pagenation totalPage={data?.totalPage || 1} nextPage={data?.nextPage || null} previousPage={data?.previousPage || null} />
            <Wrapper key="wrapper">
                <Header key="header">
                    <Row>
                        <Head key="title">Title</Head>
                        <Head key="status">Status</Head>
                        <Head key="actions">Actions</Head>
                    </Row>
                </Header>
                <Body>
                    {data?.tasks.map((ele) => (
                        <Row key={ele.id}>
                            <Data key={ele.id + "_title"}>{ele.title}</Data>
                            <Data key={ele.id + "_status"}>{ele.status}</Data>
                            <Data>

                                <div className="flex items-center gap-2 my-1">

                                    <Update id={ele.id} />
                                    <Delete id={ele.id} />
                                </div>

                            </Data>
                        </Row>
                    ))}
                </Body>

            </Wrapper>
        </div>
    );
}
