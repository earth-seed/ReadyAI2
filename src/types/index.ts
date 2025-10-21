export interface Industry {
  id: string;
  name: string;
  description: string;
  industryStatement?: string;
  icon: string;
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Legal {
  id: string;
  title: string;
  description: string;
}

export interface Contact {
  id: string;
  title: string;
}

export interface About {
  id: string;
  title: string;
}

export interface Pricing {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
}

export interface NavItem {
  name: string;
  path: string;
  submenu?: NavItem[];
}