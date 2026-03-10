interface User {
  username: string;
}

interface Credentials{
  email: string;
  password: string;
}

declare namespace Types {
  export type User = User;
  export type Credentials = Credentials;
}
