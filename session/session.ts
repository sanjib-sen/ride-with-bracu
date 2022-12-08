import { UserModel } from "@prisma/client";

type profile = {
  email: string;
  facebook: string | null;
  whatsapp: string | null;
  defaultLocationName: string;
  currentLocationNane: string | null;
  fromBRACU: boolean | null;
  requestedAt: Date | null;
};

export async function setUserSession(email: string) {
  const res = await fetch(`api/profile/${email}`, {
    method: "GET",
  });
  await res.json().then((data) => {
    if (data) {
      delete data.id;
      sessionStorage.setItem("user", JSON.stringify(data));
    }
  });
}

export async function getUserSession(email: string): Promise<UserModel> {
  const possibleUser = sessionStorage.getItem("user");
  if (possibleUser) {
    const data = JSON.parse(possibleUser);
    delete data.id;
    return data;
  } else {
    await setUserSession(email);
    return await getUserSession(email);
  }
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
