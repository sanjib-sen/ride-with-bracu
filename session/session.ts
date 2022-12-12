import { UserModel } from "@prisma/client";

export async function setUserSession(email: string): Promise<boolean> {
  const res = await fetch(`api/profile/${email}`, {
    method: "GET",
  });
  const couldSet = await res.json().then((data) => {
    if (data) {
      delete data.id;
      sessionStorage.setItem("user", JSON.stringify(data));
      return true;
    } else {
      return false;
    }
  });
  return couldSet;
}

export async function getUserSession(email: string): Promise<UserModel | null> {
  const possibleUser = sessionStorage.getItem("user");
  if (possibleUser) {
    const data = JSON.parse(possibleUser);
    delete data.id;
    return data;
  } else {
    const inDB = await setUserSession(email);
    if (inDB === true) {
      return await getUserSession(email);
    }
  }
  return null;
}

export async function updateUser(profile: Partial<UserModel>) {
  delete profile.id;
  sessionStorage.setItem("user", JSON.stringify(profile));
  await fetch(`api/profile/update/${profile.email}`, {
    method: "POST",
    body: JSON.stringify(profile),
    headers: { "Content-Type": "application/json" },
  });
}

export async function createUser(profile: Partial<UserModel>) {
  delete profile.id;
  sessionStorage.setItem("user", JSON.stringify(profile));
  await fetch("api/profile/create", {
    method: "POST",
    body: JSON.stringify(profile),
    headers: { "Content-Type": "application/json" },
  });
}

export async function removeUserSession() {
  sessionStorage.clear();
}
