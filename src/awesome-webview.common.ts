import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';


export interface AwesomeWebviewOptions {
  url: string;
  showTitle?: boolean;
  toolbarColor?: string;
  toolbarControlsColor?: string;
  isClosed?: Function;
  dismissButtonStyle?: SFSafariViewControllerDismissButtonStyleDone | SFSafariViewControllerDismissButtonStyleClose | SFSafariViewControllerDismissButtonStyleCancel;
  activityItems?: NSArray<UIActivity>;
  menuItems?: Array<any>;
  headers?: any;
}
