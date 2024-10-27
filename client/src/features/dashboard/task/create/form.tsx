import React from 'react'
import Input from '../../../../components/input/border_input'

import Button from '../../../../components/button/border_button'

import TextArea from '../../../../components/input/border_textarea'

export default function Form({ closeAction }: { closeAction: Function }) {
    return (
        <form action="" >
            <div className="flex flex-col mx-4 ">

                <div className="flex flex-col m-4 mt-0">
                    <div className="flex justify-between  gap-3 items-center my-2">

                        <Input placeholder="Report Title ..." className="w-full md:w-80 " />
                    </div>
                    <div className="flex justify-between  gap-3 my-2">

                        <TextArea placeholder="About report ..." className="w-full md:w-80 " rows={10} />
                    </div>
                    <div className="flex justify-between  gap-3 items-center my-2">
                        <Input placeholder="Full name ..." className="w-full md:w-80 " />
                    </div>

                </div>
                <div className='flex justify-end items-center my-3'>
                    <Button type="button" className='p-2  bg-4' >Add Report</Button>
                    <Button type="button" className='p-2 bg-4 ' onClick={() => closeAction()}>Cancel</Button>
                </div>
            </div>
        </form>
    )
}
