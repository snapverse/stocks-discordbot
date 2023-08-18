interface User {
  id: number;
  type_user_id: number;
  email: string;
  pm_type: string;
  stripe_id: string;
  pm_last_four: string;
  trial_ends_at: string | null;
  ff_last_access: string | null;
  ff_change_password: string | null;
  start_date: string;
  end_date: string | null;
  country_code: 'None' | string;
  client: Client;
  subscription_usuario: Subscription;
}

interface Client {
  id: number;
  user_id: number;
  firstName: string;
  lastName: string;
  numberPhone: string;
  id_user_discord: string | null;
  code_access_discord: string | null;
  id_country: string;
  start_date: string;
  end_date: string | null;
  plans: [Plan];
}

interface Plan {
  id: number;
  name: string;
  slug: string;
  stripe_plan: string;
  price: number;
  days_free: number;
  description: string;
  link_discord: string;
  start_date: string;
  end_date: string | null;
}

interface Subscription {
  id: number;
  user_id: number;
  name: string;
  stripe_id: string;
  stripe_status: string;
  stripe_price: string | null;
  quantity: number | null;
  trials_ends_at: string;
  ends_at: string;
  created_at: string;
  updated_at: string | null;
  historical_coupons_id: number | null;
}
