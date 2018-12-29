export interface IPostJobState {
  language: any;
  title: any;
  jobDesc: any;
  date: any;
  time: any;
}

export interface IEmailProps {
  name: string
  containerStyle?: any
  onPressEmail: any 
  email: any, 
  index: any
 }

 export interface ITelProps {
  containerStyle?: any,
  index: string | number,
  name: any,
  number: any,
  onPressSms: Function,
  onPressTel: Function,
 }

 export interface IProfileProps {
  avatar: string,
  avatarBackground: string,
  name: string,
  address: { city: string, country: string },
  emails: Array<{name: string, id: number, email: string}>,
  tels: Array<{name: string, id: number, number: string}>
}

export interface Params {
  myParam: string
}

export interface IThoseProps {
  focused: boolean;
  horizontal: boolean;
  tintColor: string | null;
};