/// <reference types="vite/client" />

declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module "aos" {
  const AOS: any;
  export default AOS;
}
