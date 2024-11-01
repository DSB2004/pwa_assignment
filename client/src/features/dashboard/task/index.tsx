
import Create from "./create";
import Table from "./table";

export default function Report() {
    return (
        <>
          
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-medium text-lg md:text-xl">Tasks</h1>
                    <p className="text-xs md:text-sm">Here's list of all tasks</p>
                </div>

                <div className="flex items-center gap-2">
                    <Create />
                </div>
            </div>
          
            <Table />
            
        </>
    );
}
