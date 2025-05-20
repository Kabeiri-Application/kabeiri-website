"use client";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import {
  CreditCardIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MonitorIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { authClient } from "@/lib/auth-client";

export function CommandMenu() {
  const [open, setOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {session ? (
              <>
                <CommandItem
                  onSelect={() => runCommand(() => router.push("/dashboard"))}
                >
                  <LayoutDashboardIcon />
                  <span>Dashboard</span>
                  <CommandShortcut>⌘D</CommandShortcut>
                </CommandItem>
                <CommandItem
                  onSelect={() =>
                    runCommand(async () => {
                      await authClient.signOut();
                      router.push("/");
                    })
                  }
                >
                  <LogOutIcon />
                  <span>Logout</span>
                  <CommandShortcut>⌘L</CommandShortcut>
                </CommandItem>
              </>
            ) : (
              <>
                <CommandItem
                  onSelect={() => runCommand(() => router.push("/login"))}
                >
                  <UserIcon />
                  <span>Login</span>
                  <CommandShortcut>⌘L</CommandShortcut>
                </CommandItem>
                <CommandItem
                  onSelect={() => runCommand(() => router.push("/signup"))}
                >
                  <UserPlusIcon />
                  <span>Sign up</span>
                  <CommandShortcut>⌘U</CommandShortcut>
                </CommandItem>
              </>
            )}
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <HomeIcon />
              <span>Home</span>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem disabled>
              <UserIcon />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem disabled>
              <CreditCardIcon />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem disabled>
              <SettingsIcon />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <MonitorIcon />
              <span>System</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon />
              <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon />
              <span>Dark</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
