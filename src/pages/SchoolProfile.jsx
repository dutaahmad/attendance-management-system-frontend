import {
    Typography
} from "@material-tailwind/react";

export function SchoolProfile() {
    return (
        <div
            className="flex flex-col gap-[1rem] items-center mt-[6rem] md:mt-0 md:ml-[20rem] md:w-[70%] "
        >
            <Typography variant='h3' >SD Negeri 2 Pajerukan</Typography>
            <Typography variant="h5" >Visi</Typography>
            <Typography
                variant="paragraph"
                className="text-center px-[1rem] "
            >
                Cillum sit laboris labore ex consectetur incididunt elit id dolor dolor enim minim consectetur consectetur.
                Incididunt eu sunt veniam aliqua. Occaecat excepteur ad consequat id.
                Eu nulla consequat non incididunt elit nulla laboris ut et laborum reprehenderit quis sit.
                Pariatur commodo incididunt consequat id adipisicing ad ipsum tempor adipisicing.
                Magna minim enim sint duis velit amet amet exercitation id non eiusmod aliqua.
            </Typography>
            <Typography variant="h5" >Misi</Typography>
            <Typography
                variant="paragraph"
                className="text-center px-[1rem] "
            >
                Cillum sit laboris labore ex consectetur incididunt elit id dolor dolor enim minim consectetur consectetur.
                Incididunt eu sunt veniam aliqua. Occaecat excepteur ad consequat id.
                Eu nulla consequat non incididunt elit nulla laboris ut et laborum reprehenderit quis sit.
                Pariatur commodo incididunt consequat id adipisicing ad ipsum tempor adipisicing.
                Magna minim enim sint duis velit amet amet exercitation id non eiusmod aliqua.
            </Typography>
        </div>
    )
}