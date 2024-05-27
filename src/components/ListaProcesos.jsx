"use client";
import { ArrowBigRight } from 'lucide-react';
import Link from 'next/link';

const ListaProcesos = ({ data }) => {
    return (
        <div className="space-y-4">
            {data.map((item) => (
                <div key={item.CONSECREQUE} className="bg-secondaryAccent/50 text-primaryBg p-4 rounded-lg flex items-center justify-between">
                    <div className='flex flex-col gap-2'>
                        <h2 className="text-lg font-bold text-primaryText">Requerimiento: {item.CONSECREQUE}</h2>
                        <p className='text-md font-semibold text-secondaryText'>Fases:</p>
                        <div className="flex space-x-2">
                            {[...Array(7)].map((_, index) => (
                                <Link href={`/edit-proc-req/${item.CONSECREQUE}/${item.CONSPROCESO}/${index + 1}`} key={index}>
                                    <span className={`px-2 py-1 rounded ${parseInt(item.IDFASE) === index ? 'bg-primaryAccent text-primaryBg' : 'bg-secondaryBg text-secondaryText'}`}>
                                        {index + 1}
                                    </span>
                                </Link>
                            ))}
                        </div>
                        {/* <p>Proceso: {item.ConsProceso}</p> */}
                    </div>
                    <Link className="px-8" href={`/edit-proc-req/${item.CONSECREQUE}/${item.CONSPROCESO}/${parseInt(item.IDFASE) + 1}`}>
                        <ArrowBigRight className="cursor-pointer w-12 h-12 text-primaryText" />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ListaProcesos;
