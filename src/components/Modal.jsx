import { Dialog, Transition } from '@headlessui/react'
import { Button, Typography } from '@material-tailwind/react';

export function Modal(
    {
        isOpen = false,
        modalTitle = "Confirmation",
        modalDialogStyle = "text-sm text-gray-500",
        modalDialog = (
            <Typography className={modalDialogStyle}>
                Are you sure?
            </Typography>
        ),
        onClose,
        confirmButtonName = "OK",
        cancelButtonName = "CANCEL",
        confirmFunc,
        cancelFunc
    }
) {


    return (
        <>
            <Transition appear show={isOpen} >
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child

                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child

                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="
                                    w-full 
                                    max-w-md 
                                    transform 
                                    overflow-hidden 
                                    rounded-2xl 
                                    bg-white 
                                    p-6 
                                    text-left 
                                    align-middle 
                                    shadow-xl 
                                    transition-all
                                    flex flex-col
                                    gap-[2rem]
                                    "
                                >
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {modalTitle}
                                    </Dialog.Title>
                                    <div className="mt-2 flex flex-col items-center justify-center">
                                        {modalDialog}
                                    </div>

                                    <div
                                        className="
                                        mt-[1rem]
                                        flex flex-row
                                        gap-[2rem]
                                        justify-center
                                        "
                                    >
                                        {/* <Button buttonName={confirmButtonName} func={confirmFunc} /> */}
                                        <Button onClick={confirmFunc} >{confirmButtonName}</Button>
                                        <Button onClick={cancelFunc} >{cancelButtonName}</Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
