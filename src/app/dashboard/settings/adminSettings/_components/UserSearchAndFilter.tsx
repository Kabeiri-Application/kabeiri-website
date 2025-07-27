"use client";

import { useState } from "react";

import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserSearchAndFilterProps {
  onSearch: (query: string) => void;
  onRoleFilter: (role: string) => void;
  searchQuery: string;
  selectedRole: string;
  userCount: number;
  filteredCount: number;
}

export function UserSearchAndFilter({
  onSearch,
  onRoleFilter,
  searchQuery,
  selectedRole,
  userCount,
  filteredCount,
}: UserSearchAndFilterProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearchChange = (value: string) => {
    setLocalSearchQuery(value);
    onSearch(value);
  };

  const handleRoleChange = (value: string) => {
    onRoleFilter(value);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={localSearchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedRole} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">Users</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
            <SelectItem value="owner">Owners</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        {searchQuery || selectedRole !== "all" ? (
          <>
            Showing {filteredCount} of {userCount} users
            {(searchQuery || selectedRole !== "all") && (
              <span className="text-blue-600 dark:text-blue-400">
                (filtered)
              </span>
            )}
          </>
        ) : (
          <span>{userCount} users</span>
        )}
      </div>
    </div>
  );
}
