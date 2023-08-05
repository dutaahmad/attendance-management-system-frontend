const buttonStyle =   (`sm:px-[3rem]
                        px-[1rem]
                        py-[0.7rem] 
                        font-medium 
                        sm:text-xl
                        text-[12px] 
                        text-slate-100
                        bg-[#c62a2a]
                        rounded-md 
                        hover:bg-[#d10000]
                        hover:drop-shadow-xl 
                        hover:shadow-xl
                        `)

export const Button = ({ buttonName, func, style = buttonStyle }) => (
    <>
        <button className={style} onClick={func}>
        {/* <button className={"bg-[#d10000]"} onClick={func}> */}
            {buttonName}
        </button>
    </>
)