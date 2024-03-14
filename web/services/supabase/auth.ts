import { GeneralFormValues } from "@/components/instance/general-form";
import { ILoginTokenResponse, IPasswordSignInData, IUser } from "@plane/types";
import { supabaseClient } from "@/services/supabase/supabase";
// services
import { UserService } from "services/user.service";

const userService = new UserService();

const getUserFromSupabase = async () => {
  const response = await userService.currentUser();

  try {
    const { data, error } = await supabaseClient.from("users").select("*").eq("email", response.email);

    if (error) {
      console.error("error", error);
      throw error;
    }

    return data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};

// Register a new administrator
const instanceAdminSignInSupabase = async (data: IPasswordSignInData) => {
  try {
    const { data: dataUser, error } = await supabaseClient.from("users").insert([
      {
        email: data?.email,
        admin_email: data?.email,
      },
    ]);
    console.log("dataUser", dataUser);
    if (error) {
      console.log("instanceAdminSignInSupabase error", error);
      throw error;
    }
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};

const updateInstanceInfoSupabase = async (formData: GeneralFormValues) => {
  const response = await userService.currentUser();
  try {
    const { data, error } = await supabaseClient
      .from("users")
      .update({ instance_name: formData.instance_name })
      .match({ email: response.email });

    if (error) {
      console.error("error", error);
      throw error;
    }

    return data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};

const upadateUserSupabase = async (payload: Partial<IUser>) => {
  const supabaseUser = await getUserFromSupabase();
  try {
    const { data, error } = await supabaseClient.from("users").update(payload).match({ email: supabaseUser[0].email });

    if (error) {
      console.error("error", error);
      throw error;
    }

    return data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};

const deleteWorkspaceSupabase = async (slug: string) => {
  try {
    const { data, error } = await supabaseClient.from("workspaces").delete().match({ name: slug });

    if (error) {
      console.error("error", error);
      throw error;
    }

    return data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};

export {
  instanceAdminSignInSupabase,
  updateInstanceInfoSupabase,
  getUserFromSupabase,
  upadateUserSupabase,
  deleteWorkspaceSupabase,
};
