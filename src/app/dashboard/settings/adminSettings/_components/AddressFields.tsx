import { FieldErrors, UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AddressFieldsProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  errors: FieldErrors<T>;
  showStreetAddress?: boolean;
  showPhone?: boolean;
  showTitle?: boolean;
  disabled?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AddressFields<T extends Record<string, any>>({
  form,
  errors,
  showStreetAddress = true,
  showPhone = true,
  showTitle = false,
  disabled = false,
}: AddressFieldsProps<T>) {
  return (
    <div className="space-y-4">
      {showTitle && (
        <h4 className="text-base font-medium text-gray-900 dark:text-white">
          Address Information
        </h4>
      )}

      {showPhone && (
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...form.register("phone" as any)}
            placeholder="Phone number"
            className="mt-1"
            disabled={disabled}
          />
          {errors.phone && (
            <span className="text-destructive text-sm">
              {errors.phone.message as string}
            </span>
          )}
        </div>
      )}

      {showStreetAddress && (
        <div>
          <Label htmlFor="streetAddress">Street Address</Label>
          <Input
            id="streetAddress"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...form.register("streetAddress" as any)}
            placeholder="Street address"
            className="mt-1"
            disabled={disabled}
          />
          {errors.streetAddress && (
            <span className="text-destructive text-sm">
              {errors.streetAddress.message as string}
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...form.register("city" as any)}
            placeholder="City"
            className="mt-1"
            disabled={disabled}
          />
          {errors.city && (
            <span className="text-destructive text-sm">
              {errors.city.message as string}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...form.register("state" as any)}
            placeholder="State"
            className="mt-1"
            disabled={disabled}
          />
          {errors.state && (
            <span className="text-destructive text-sm">
              {errors.state.message as string}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...form.register("zipCode" as any)}
            placeholder="Zip code"
            className="mt-1"
            disabled={disabled}
          />
          {errors.zipCode && (
            <span className="text-destructive text-sm">
              {errors.zipCode.message as string}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
