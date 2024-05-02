
import * as AlertDialog from '@radix-ui/react-alert-dialog';


const AlertDialogDemo = () => {

    return (


        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button className="  text-moradobasicoOscuro hover:bg-mauve3 shadow-blackA4 inline-flex h-[35px] items-center justify-center rounded-[4px]  px-[15px] font-medium leading-none outline outline-1 outline-slate-500 bg-fondoSideBar">
                    Delete account
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="  outline outline-1 outline-moradobasicoTransparente  bg-fondoSideBar   data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px]  p-[25px] shadow-moradobasicoOscuro/25 shadow-lg focus:outline-none">
                    <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Are you absolutely sure?
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                        This action cannot be undone. This will permanently delete your account and remove your
                        data from our servers.
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-[25px]">
                        <AlertDialog.Cancel asChild>
                            <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-4 focus:shadow-[0_0_0_1px] bg-moradobasicoTransparente ">
                                <a href='/display/damas'>Cancel</a>
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button className="font-sans  bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-1 outline-red focus:shadow-[0_0_0_2px]">
                                Yes, delete account
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
};

export default AlertDialogDemo;