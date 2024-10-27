import BorderButton from "../../../../components/button/border_button";
import TextArea from "../../../../components/input/border_textarea";
import Input from "../../../../components/input/border_input";
import { MdDelete } from "react-icons/md";
import { MdDownload } from "react-icons/md";


export default function Form({ closeAction }: { closeAction: Function }) {
  return (
    <>
      <form action="" className="m-0 w-full">
        <div className="flex flex-col mx-4">

          <div className="m-4 flex justify-between">
            <h1 className="font-semibold">Report Overview</h1>
            {/* <MdDownload className="h-6 w-6" onClick={() => DownloadPDF(PDF_Report, "report")} /> */}
          </div>

          <div className="flex flex-col m-4 mt-0">
            <div className="flex justify-between  gap-3 items-center my-2">
              <span className="text-xs font-semibold hidden md:inline">Title</span>
              <Input placeholder="Report Title ..." className="w-full md:w-80 " />
            </div>
            <div className="flex justify-between  gap-3 my-2">
              <span className="text-xs font-semibold hidden md:inline mt-2">
                About
              </span>
              <TextArea placeholder="About report ..." className="w-full md:w-80 " rows={10} />
            </div>
            <div className="flex justify-between  gap-3 items-center my-2">
              <span className="text-xs font-semibold hidden md:inline">Done By</span>
              <Input placeholder="Full name ..." className="w-full md:w-80 " />
            </div>

          </div>

          <div className="mx-4 my-2 flex items-center justify-between">
            <BorderButton type="button" className="border-red-500 text-red-500 p-2" >
              <MdDelete className="w-4 h-4" />
              Delete
            </BorderButton>

            <div className="flex items-center gap-1">
              <BorderButton type="button" className="bg-black text-white p-2 px-3">
                Save
              </BorderButton>
              <BorderButton type="button" className="border-black p-2 " onClick={() => closeAction()}>

                Cancel

              </BorderButton>
            </div>
          </div >




        </div>
      </form >
    </>
  );
}
