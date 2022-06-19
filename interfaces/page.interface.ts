export interface IHomeProps {
    posts: any
}

export interface IBlogProps {
  posts: any;
  tags: any;
}

declare global {
  interface Window {
    gtag: any;
  }
}