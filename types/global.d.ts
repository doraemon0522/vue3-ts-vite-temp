import type { PropType as VuePropType, VNodeChild } from 'vue';

import type { TRANSFORM_ENUM_DATA_LIST } from '@/plugins/enum/types';
import type { Recordable } from '@/types';
declare global {
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  // vue
  type PropType<T> = VuePropType<T>;
  type VueNode = VNodeChild | JSX.Element;
  interface Window {
    Vue: ReturnType<(typeof import('vue'))['createApp']>;
    dmViewType: string;
    __work: Recordable;
    EditorApp: any;
    clipboardData: DataTransfer;
    BMap: undefined | any;
    onBMapCallback: undefined | (() => void);
  }

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  type Nullable<T> = T | null;
  // declare type NonNullable<T> = T extends null | undefined ? never : T;
  type Recordable<T = any> = Record<string, T>;

  interface DicItem<T = any> {
    label?: string;
    value: T;
    i18nNames?: Recordable;
  }
  interface ReadonlyRecordable<T = any> {
    readonly [key: string]: T;
  }
  interface Indexable<T = any> {
    [key: string]: T;
  }
  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
  type TimeoutHandle = ReturnType<typeof setTimeout>;
  type IntervalHandle = ReturnType<typeof setInterval>;

  interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }

  interface WheelEvent {
    path?: EventTarget[];
  }
  interface ImportMetaEnv extends ViteEnv {
    __: unknown;
  }

  interface ViteEnv {
    VITE_USE_MOCK: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_GLOB_APP_TITLE: string;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  }

  function parseInt(s: string | number, radix?: number): number;

  function parseFloat(string: string | number): number;
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $enum: any | ProxyHandler<TRANSFORM_ENUM_DATA_LIST>;

    document: Document;
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    i18nNames?: Recordable;
  }
}
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
