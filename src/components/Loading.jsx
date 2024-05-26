"use client";
import { LoaderCircle } from 'lucide-react';

function Loading() {
    return (
        <div className='
            flex
            justify-center
            items-center
            z-50
            w-full h-full
        '>
            <LoaderCircle className='animate-spin text-primaryText w-12 h-12' />
        </div>
    )
}

export default Loading