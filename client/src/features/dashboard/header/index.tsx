import Wrapper from "../../../components/header/wrapper";
import Menu from "../../../components/header/menu";
import React from 'react'

export default function Header() {
    return (
        <>
            <Wrapper>
                <div className="flex items-center gap-2 ">
                    <Menu />
                </div>
            </Wrapper>
        </>
    );
}

