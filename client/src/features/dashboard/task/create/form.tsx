
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/border_button';
import TextArea from '../../../../components/input/textarea';
import Select from '../../../../components/input/select';
import { taskSchema } from '../../../../lib/zod';
import useTask, { TaskData } from '../../../../hooks/useTask';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
export default function Form({ closeAction }: { closeAction: Function }) {
    const { createTask } = useTask();

    const queryClient = useQueryClient()

    const [params] = useSearchParams()

    const { handleSubmit, reset, register, formState: { errors, isSubmitting } } = useForm<TaskData>({
        resolver: zodResolver(taskSchema)
    });


    const mutation = useMutation({
        mutationFn: (data: TaskData) => createTask(data),
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(['tasks_' + params.get('page')]);
        },
        onError: (error) => {
            console.error(error);
        }
    });


    const onSubmit = async (data: TaskData) => {
        await mutation.mutateAsync(data);
        reset();
        closeAction();
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className="flex flex-col items-center justify-center gap-2 mb-4 min-w-72 mx-auto w-11/12 ">
                <Input {...register('id')} hidden></Input>
                <Input
                    {...register('title')}
                    placeholder="Task title ..."
                    className="w-full md:w-80"
                    error={errors.title?.message}
                />
                <TextArea
                    {...register('body')}
                    placeholder="Any comments..."
                    className="w-full md:w-80"
                    rows={8}
                    error={errors.body?.message}
                />
                <Select {...register('status')}
                    className="w-full md:w-80"
                    error={errors.status?.message}>
                    <option value="" disabled>Select a status</option>
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                    <option value="BLOCKED">Blocked</option>
                    <option value="REVIEW">Review</option>
                    <option value="ON_HOLD">On Hold</option>
                    <option value="CANCELLED">Cancelled</option>
                </Select>

                <div className='flex justify-end w-full md:w-80'>
                    <Button type="submit" className='p-2 w-20 bg-4 text-center flex items-center justify-center'>
                        {
                            isSubmitting ? <AiOutlineLoading3Quarters className='w-3 h-3  animate-spin ' /> : <>Create Task</>
                        }
                    </Button>
                    <Button type="button" className='p-2 bg-4' onClick={() => closeAction()}>Cancel</Button>
                </div>
            </div>
        </form>
    );
}
