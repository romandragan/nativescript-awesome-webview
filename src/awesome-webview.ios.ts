import { AwesomeWebviewOptions } from './awesome-webview.common';
import { Color } from '@nativescript/core';

@NativeClass()
class SFSafariViewControllerDelegateImpl extends NSObject implements SFSafariViewControllerDelegate {
  public static ObjCProtocols = [SFSafariViewControllerDelegate];

  private _owner: WeakRef<any>;
  private _callback: Function;
  private _activityItems: NSArray<UIActivity>;
  public static initWithOwnerCallback(owner: WeakRef<any>, callback: Function, activityItems: NSArray<UIActivity>): SFSafariViewControllerDelegateImpl {
    let delegate = <SFSafariViewControllerDelegateImpl>SFSafariViewControllerDelegateImpl.new();
    delegate._owner = owner;
    delegate._callback = callback;
    delegate._activityItems = activityItems;
    return delegate;
  }

  safariViewControllerDidCompleteInitialLoad(controller: SFSafariViewController, didLoadSuccessfully: boolean): void {
    console.log('Delegate, safariViewControllerDidCompleteInitialLoad: ' + didLoadSuccessfully);
  }

  safariViewControllerDidFinish(controller: SFSafariViewController): void {
    if (this._callback && typeof this._callback === 'function') {
      this._callback(true);
    }
  }

  safariViewControllerActivityItemsForURLTitle(controller: SFSafariViewController, URL: NSURL, title: string): NSArray<UIActivity> {
    console.log('Delegate, safariViewControllerActivityItemsForURLTitle');
    return this._activityItems;
  };
}
export function init() {}

export function openWebView(options: AwesomeWebviewOptions): void {
  if (!options.url) {
    throw new Error('No url set in the Awesome WebView Options object.');
  }

  let sfc = SFSafariViewController.alloc().initWithURL(NSURL.URLWithString(options.url));

  if (options.toolbarColor) {
    sfc.preferredBarTintColor = new Color(options.toolbarColor).ios;
  }

  if (options.toolbarControlsColor) {
    sfc.preferredControlTintColor = new Color(options.toolbarControlsColor).ios;
  }

  if (options.dismissButtonStyle) {
    sfc.dismissButtonStyle = options.dismissButtonStyle;
  }

  sfc.delegate = SFSafariViewControllerDelegateImpl.initWithOwnerCallback(new WeakRef({}), options.isClosed, options.activityItems);

  let app = UIApplication.sharedApplication;

  const animated = true;
  const completionHandler = null;
  (options.iosViewController || app.keyWindow.rootViewController).presentViewControllerAnimatedCompletion(sfc, animated, completionHandler);
}