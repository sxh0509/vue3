export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: any
  }
}
