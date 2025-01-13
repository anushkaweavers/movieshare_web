export type LoginData = {
  email: string;
  password: string;
};

export type RegisterApiData = {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  date_of_birth: Date;
  gender: string;
  confirm_password?: string;
};

export type ResetPasswordApiData = {
  token: string;
  newPassword: string;
};

export type SocialLoginType = {
  type: string;
  token: string;
};

export interface IRefreshToken {
  token: string;
}

// Login Response Types
export interface IUserDetails {
  _id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  date_of_birth: Date;
  gender: string;
  signup_by: string;
  profile_picture: string;
  is_active: boolean;
  is_deleted: boolean;
  is_accept_term_condition: boolean;
  is_email_verified: boolean;
  account_type: string;
  is_account_private: boolean;
  is_show_followers: boolean;
  is_show_friends: boolean;
  is_show_likes: boolean;
  is_live: boolean;
  is_banned: boolean;
  role: string;
  last_login_time: Date;
  banned_start_time: Date;
  created_at: Date;
  updated_at: Date;
  verify_token: string;
  token: string;
}
export interface ILoginResponse {
  status: boolean;
  message: string;
  result: {
    is_email_verified?: boolean;
    userData: IUserDetails;
    tokens: {
      access: {
        expires: Date;
        token: string;
      };
      refresh: {
        expires: Date;
        token: string;
      };
    };
  };
}

export interface ISignUpResponse {
  status: boolean;
  message: string;
}
