export interface AwesomeWebviewOptions {
  url: string;
  showTitle?: boolean;
  toolbarColor?: string;
  toolbarControlsColor?: string;
  isClosed?: Function;
  dismissButtonStyle?: any; // SFSafariViewControllerDismissButtonStyleDone | SFSafariViewControllerDismissButtonStyleClose | SFSafariViewControllerDismissButtonStyleCancel;
  activityItems?: NSArray<UIActivity>;
  menuItems?: Array<any>;
  headers?: any;
  iosViewController?: UIViewController;
}
