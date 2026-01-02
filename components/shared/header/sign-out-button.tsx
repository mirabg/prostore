"use client";

import { signOutUser } from "@/lib/actions/user.actions";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        await signOutUser();
      }}
      className="w-full text-left"
    >
      Sign Out
    </button>
  );
}
