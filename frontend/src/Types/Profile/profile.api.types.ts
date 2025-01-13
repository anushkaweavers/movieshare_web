export type ChangePasswordType = {
  old_password: string;
  password: string;
  confirm_password: string;
};

export type UpdateProfileApiTypes = {
  first_name?: string;
  last_name?: string;
  user_name?: string;
  date_of_birth?: Date | string;
  gender?: string;
  about?: string;
  facebook_profile?: string;
  twitter_profile?: string;
  instagram_profile?: string;
  youtube_profile?: string;
};
