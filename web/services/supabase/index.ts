import { GeneralFormValues } from "@/components/instance/general-form";
import { ILoginTokenResponse, IPasswordSignInData, IUser } from "@plane/types";
import { supabaseClient } from "helpers/999-utils/supabase/supabase";
// services
import { UserService } from "services/user.service";

const userService = new UserService();
// Register a new administrator
const instanceAdminSignInSupabase = async (data: IPasswordSignInData) => {
  try {
    const { error } = await supabaseClient.from("users").insert([
      {
        email: data?.email,
        admin_email: data?.email,
      },
    ]);

    if (error) {
      console.log("error", error);
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

export { instanceAdminSignInSupabase, updateInstanceInfoSupabase, getUserFromSupabase, upadateUserSupabase };
