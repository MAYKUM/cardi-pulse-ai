import React from 'react';
import { SimpleLogout } from "./SimpleLogout";

// This component has been replaced by SimpleLogout
// Keeping for backward compatibility but functionality moved to SimpleLogout
export function UserProfileDropdown({ children }: { children: React.ReactNode }) {
  return <SimpleLogout />;
}
