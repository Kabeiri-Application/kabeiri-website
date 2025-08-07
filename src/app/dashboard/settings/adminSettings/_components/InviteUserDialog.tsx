"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { addUser } from "../actions";
import { addUserFormSchema } from "../schema";

interface UserManagementDialogProps {
  children: React.ReactNode;
}

export function UserManagementDialog({ children }: UserManagementDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  //TODO: use react-hook-form for better form handling
  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setErrors({});

    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as "admin" | "user" | "owner",
      phone: formData.get("phone") as string,
      streetAddress: formData.get("streetAddress") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zipCode: formData.get("zipCode") as string,
    };

    const result = addUserFormSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    const response = await addUser(result.data);
    setIsLoading(false);

    if (response.success) {
      toast.success("Invitation sent successfully!");
      setOpen(false);
      router.refresh();
    } else {
      const errorMessage = response.error || "Failed to send invitation";
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite New User</DialogTitle>
          <DialogDescription>
            Send an invitation to join your organization. They&apos;ll set their
            own password when they accept.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          <div className="grid gap-4 py-4">
            {errors.general && (
              <div className="rounded-md bg-red-50 p-3 dark:bg-red-900/20">
                <p className="text-sm text-red-700 dark:text-red-300">
                  {errors.general}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  className="mt-1"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  className="mt-1"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="role">Role *</Label>
              <Select name="role" required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="streetAddress">Street Address</Label>
              <Input id="streetAddress" name="streetAddress" className="mt-1" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP</Label>
                <Input id="zipCode" name="zipCode" className="mt-1" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Invitation"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
