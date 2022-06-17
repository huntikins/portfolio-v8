export interface IHomeProps {
    posts: any
}

export interface IBlogProps {
  posts: any;
}

declare global {
  interface Window {
    gtag: any;
  }
}