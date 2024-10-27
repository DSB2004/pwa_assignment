import Wrapper from "../../../components/table/wrapper";
import Header from "../../../components/table/header";
import Row from "../../../components/table/row";
import Data from "../../../components/table/data";
import Body from "../../../components/table/body";
import Head from "../../../components/table/head";
// import Content from "../../../assets/reports.json";
import Actions from "./actions";
import { useState } from "react";
export default function Table() {



    const [Content] = useState<any[]>([])




    return (
        <>
            <Wrapper key="wrapper">
                <Header key="header">
                    <Row>
                        <Head key="email">Title</Head>
                        <Head key="phone">Done By</Head>

                        <Head key="actions">Actions</Head>
                    </Row>
                </Header>
                <Body>
                    {Content.map((ele) => {
                        return (
                            <>
                                <Row key={ele.id}>
                                    <Data key={ele.id + "_name"}>{ele.title}</Data>
                                    <Data key={ele.id + "_email"}>{ele.madeBy}</Data>

                                    <Data>

                                        <Actions />
                                    </Data>
                                </Row>
                            </>
                        );
                    })}
                </Body>
            </Wrapper>
        </>
    );
}
