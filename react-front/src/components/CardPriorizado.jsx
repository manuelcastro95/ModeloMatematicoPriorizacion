import React from 'react'

const CardPriorizado = (props) => {
    return (
        <div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
            <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-blue-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
            <div className="relative text-center">
                <div className="capitalize mb-1 text-center">
                    <strong>{props.orden}</strong>
                </div>
                <div className="capitalize text-gray-700 border text-center w-full  p-1 flex relative rounded-lg">
                    {props.nombre}
                </div>

                <div className="mt-2 pb-1 rounded-b-[--card-border-radius]">
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>
                            Puntaje: {props.puntaje}
                        </strong>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CardPriorizado;