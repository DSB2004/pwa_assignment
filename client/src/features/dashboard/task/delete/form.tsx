
import Button from '../../../../components/button/border_button';
import useTask from '../../../../hooks/useTask';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export default function Form({ closeAction, id }: { closeAction: Function; id: string; }) {
    const { deleteTask } = useTask();
    const [isSubmitting, toggleSubmitting] = useState<boolean>(false)
    const queryClient = useQueryClient();
    const [params] = useSearchParams();



    const mutation = useMutation({
        mutationFn: (data: string) => deleteTask(data),
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(['tasks_' + params.get('page')]);
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const onClick = async () => {
        toggleSubmitting(true)
        await mutation.mutateAsync(id);
        toggleSubmitting(false)
        closeAction();
    };

    return (
        <div>

            <h1 className='ml-5'>Are you sure you want to delete this task?</h1>
            <div className="flex flex-col items-center justify-center gap-2 mb-4 min-w-72 mx-auto w-11/12">

                <div className='flex justify-end w-full md:w-80 mt-4'>
                    <Button onClick={() => onClick()} className='p-2 w-20 bg-4 hover:bg-red-500 text-center flex items-center justify-center'>
                        {
                            isSubmitting ? <AiOutlineLoading3Quarters className='w-3 h-3 animate-spin' /> : <>Delete Task</>
                        }
                    </Button>
                    <Button type="button" className='p-2 bg-4' onClick={() => closeAction()}>Cancel</Button>
                </div>
            </div>
        </div>
    );
}
