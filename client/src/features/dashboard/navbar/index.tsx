
import Wrapper from "../../../components/navbar/wrapper";
import Item from "../../../components/navbar/item";
import Logo from "../../../components/navbar/logo";
import { MdDashboard } from "react-icons/md";
import { GrTask, GrAnnounce } from "react-icons/gr";
export default function Navbar() {
    return (
        <>
            <Wrapper>
                <Logo />
                <Item className="" href="/">
                    <MdDashboard className="w-6 h-6" /> Overview
                </Item>
                <Item href="/task">
                    <GrTask className="w-6 h-6" />
                    Tasks
                </Item>
                <Item href="/blog">
                    <GrAnnounce className="w-6 h-6" />
                    Blogs
                </Item>



            </Wrapper>
        </>
    );
}
