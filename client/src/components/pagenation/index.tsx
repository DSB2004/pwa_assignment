import { FaAnglesLeft, FaAnglesRight, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Pagination({ nextPage, previousPage, totalPage }: { nextPage: Number | null, previousPage: Number | null, totalPage: Number }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const page = Number(searchParams.get('page')) || 1;


    const updatePage = (newPage: Number) => {
        setSearchParams({ page: String(newPage) });
    };

    return (
        <div className='h-10 w-full ml-auto flex items-center justify-between gap-4'>
            <span className='text-sm mr-10'>
                Page {page} of {String(totalPage)}
            </span>
            <div className="flex gap-8">
                <div className='flex gap-2'>

                    <FaAngleLeft
                        className='w-8 h-8 p-2 rounded-md border-2 border-slate-600'
                        onClick={() => { if (previousPage !== null) { updatePage(previousPage) } }}
                    />
                </div>
                <div className='flex gap-2'>
                    <FaAngleRight
                        className='w-8 h-8 p-2 rounded-md border-2 border-slate-600'
                        onClick={() => { if (nextPage !== null) { updatePage(nextPage) } }}
                    />

                </div>
            </div>
        </div>
    );
}

