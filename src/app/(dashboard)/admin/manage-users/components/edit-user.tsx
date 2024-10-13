import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateUser } from "@/hooks/user-hook";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
interface EditUserProps {
  user: any;
}
export const EditUser = ({ user}: EditUserProps) => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, control } = useForm();
    const {mutate: updateUser} = useUpdateUser()
 
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        
        const userData = {
            id: user._id,
          name: data.name,
          status: data.status,
          role: data.role,
        };
        
        updateUser({ id: user._id, userData }, {
          onSuccess: () => {
            setOpen(false);
          
          },
        })
       
       
      };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button
        onClick={() => setOpen(true)}
       className=" cursor-pointer"
      >
        <Edit size={16} />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] max-h-screen overflow-y-auto">
      <DialogHeader>
        <DialogTitle className=" hover:text-[#FEA633]] font-semibold">
          Edit User
        </DialogTitle>
        <DialogDescription>Make changes to your user here.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input {...register("name")} id="name" defaultValue={user.name} className="col-span-3" />
        
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Status
          </Label>
          <Controller
            name="status"
            defaultValue={user.status}
            control={control}
            // rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className=" col-span-3 focus-visible:ring-offset-0">
                  <SelectValue placeholder="Select a option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"active"}>Active</SelectItem>
                    <SelectItem value={"blocked"}>Block</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Role
          </Label>
          <Controller
            name="role"
            defaultValue={user.role}
            control={control}
            // rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className=" col-span-3 focus-visible:ring-offset-0">
                  <SelectValue placeholder="Select a option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"user"}>User</SelectItem>
                    <SelectItem value={"admin"}>Admin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        
        <DialogFooter>
          <Button
            type="submit"
            className="w-full  hover:text-white font-bold text-2xl"
          >
            Edit User
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
  );
};