import EmailInput from "@/components/EmailInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useAddUser } from "../use-case";
import add_user_schema from "./add-user-schema";
import { Gender } from "../gender";
import { generatePassword } from "./generatePassword";

export function AddUserForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm({
    resolver: zodResolver(add_user_schema),
  });
  const { addUser, isMutating } = useAddUser({ onSuccess });
  function onSubmit(data: FieldValues) {
    data.password = generatePassword();
    addUser(data);
  }
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isMutating} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <EmailInput disabled={isMutating} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={field.disabled || isMutating}
                >
                  <SelectTrigger>
                    <SelectValue
                      onBlur={field.onBlur}
                      placeholder="Select gender"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(Gender).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isMutating}>
          Add User
        </Button>
      </form>
    </Form>
  );
}
