import React from 'react'

function SoloPrueba() {
    return (
        <>
            <h1 className='w-full mx-auto text-center'>SoloPrueba</h1>
            <button onClick={() => alert("dale pué")} className='w-fit p-4 bg-red-400 flex flex-col gap-1justify-center items-center mx-auto rounded-lg'>

                <p > ClickMe !</p>
            </button>
        </>
    )
}

export default SoloPrueba