/// <reference types="vite/client" />

declare module 'react-helmet-async' {
  import { Component } from 'react';
  
  interface HelmetProps {
    children?: React.ReactNode;
    title?: string;
    meta?: Array<{
      name?: string;
      property?: string;
      content?: string;
    }>;
  }
  
  export class Helmet extends Component<HelmetProps> {}
}