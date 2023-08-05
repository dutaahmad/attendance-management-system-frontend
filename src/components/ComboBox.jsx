import { useState, useEffect } from 'preact/hooks';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export function ComboBox({ datas, getDataFunc, dataName, onSelect, selectName, defaultData = datas[0] }) {

    const [selected, setSelected] = useState(datas[0])
    const [query, setQuery] = useState('')

    const filteredData = (
        query === ''
            ?
            datas : (
                datas.filter(
                    (data) => (
                        data[`${dataName}`]
                            .toLowerCase()
                            .replace(/\s+/g, '')
                            .includes(query.toLowerCase().replace(/\s+/g, ''))
                    )
                )
            )
    )


    useEffect(
        () => {
            getDataFunc()
        }
        , []
    )



    return (
        <>
            <div
                className='
                flex-1 
            '
            >
                <Combobox defaultValue={defaultData} value={selected} onChange={setSelected}>
                    <div
                        className="relative mt-1"
                    >
                        <div
                            className="
                        relative 
                        w-full 
                        cursor-default 
                        overflow-hidden 
                        rounded-lg 
                        bg-gray-200 
                        text-left 
                        shadow-md 
                        focus:outline-none 
                        focus-visible:ring-2 
                        focus-visible:ring-white 
                        focus-visible:ring-opacity-75 
                        focus-visible:ring-offset-2 
                        focus-visible:ring-offset-teal-300 
                        sm:text-sm"
                        >
                            <Combobox.Input
                                className="
                            w-full 
                            border-none 
                            py-2 
                            pl-3 
                            pr-10 
                            text-sm 
                            leading-5 
                            text-gray-900 
                            focus:ring-0"
                                displayValue={(item) => item[`${dataName}`]}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            <Combobox.Button
                                className="
                                        absolute 
                                        inset-y-0 
                                        right-0 
                                        flex 
                                        items-center 
                                        pr-2"
                            >
                                <ChevronUpDownIcon
                                    className="
                                                h-5 
                                                w-5 
                                                text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        </div>
                        <Transition
                            // as={Fragment}
                            leave="
                                    transition 
                                    ease-in 
                                    duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                        >
                            <Combobox.Options
                                className="
                                        absolute 
                                        mt-1 
                                        max-h-60 
                                        w-full 
                                        overflow-auto 
                                        rounded-md 
                                        bg-white 
                                        py-1 
                                        text-base 
                                        shadow-lg 
                                        ring-1 
                                        ring-black 
                                        ring-opacity-5 
                                        focus:outline-none 
                                        sm:text-sm
                                        z-10"
                            >
                                {filteredData.length === 0 && query !== '' ? (
                                    <div
                                        className="
                                                relative 
                                                cursor-default 
                                                select-none 
                                                py-2 
                                                px-4 
                                                text-gray-700
                                                "
                                    >
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredData.map((data) => (
                                        <Combobox.Option
                                            key={data.id}
                                            className={({ active }) =>
                                                `
                                                relative 
                                                cursor-default 
                                                select-none 
                                                py-2 
                                                pl-10 
                                                pr-4 
                                                ${active ? 'bg-blue-400 text-white' : 'text-gray-900'}
                                                `
                                            }
                                            value={data}
                                        >
                                            {
                                                ({ selected, active }) => {

                                                    if (active === true) {
                                                        onSelect(data[`${selectName}_id`])
                                                    }

                                                    return (
                                                        <>
                                                            <span
                                                                className={`
                                                                block 
                                                                truncate 
                                                                ${selected ? 'font-medium' : 'font-normal'}
                                                                `}
                                                            >
                                                                {data[`${dataName}`]}
                                                            </span>
                                                            {selected ? (
                                                                <span
                                                                    className={`
                                                                                absolute 
                                                                                inset-y-0 
                                                                                left-0 
                                                                                flex 
                                                                                items-center 
                                                                                pl-3 ${active ? 'text-white' : 'text-teal-600'}
                                                                                `}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )
                                                }
                                            }
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            </div>
        </>
    )
}