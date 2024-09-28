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
import { file_to_base64_string } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Gender } from "../gender";
import { UserDTO } from "../user-dto";
import edit_user_schema from "./edit-user-schema";

export function EditUserForm({
  user,
  onSubmit,
}: {
  user: UserDTO;
  onSubmit: (data: FieldValues) => void;
}) {
  const form = useForm({
    resolver: zodResolver(edit_user_schema),
    defaultValues: { ...user, profile_image: user.profile_image ?? "" },
  });

  const isMutating = form.formState.isSubmitting;
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

        <FormField
          name="profile_image"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    const image_file = e.currentTarget.files?.[0];
                    if (!image_file) return;
                    file_to_base64_string(image_file).then((base64) => {
                      form.setValue(field.name, base64 as string);
                    });
                  }}
                  type="file"
                  accept="image/*"
                />
              </FormControl>
              {field.value ? (
                <img src={field.value} className="w-40 h-40 rounded" />
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isMutating}>
          Update User
        </Button>
      </form>
    </Form>
  );
}
