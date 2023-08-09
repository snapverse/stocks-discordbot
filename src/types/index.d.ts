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
