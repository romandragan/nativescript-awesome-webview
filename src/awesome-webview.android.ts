import { AwesomeWebviewOptions } from './awesome-webview.common';
import * as app from 'tns-core-modules/application';
import CustomTabsClient = androidx.browser.customtabs.CustomTabsClient;
import CustomTabsServiceConnection = androidx.browser.customtabs.CustomTabsServiceConnection;
import CustomTabsSession = androidx.browser.customtabs.CustomTabsSession;
import CustomTabsIntent = androidx.browser.customtabs.CustomTabsIntent;
import {Color} from 'tns-core-modules/color';

const CUSTOM_TAB_PACKAGE_NAME = "com.android.chrome";
let mCustomTabsClient: CustomTabsClient = null;
let mCustomTabsServiceConnection: CustomTabsServiceConnection = null;
let mCustomTabsSession: CustomTabsSession = null;
const context = () => app.android.startActivity || app.android.context;

export function init(): void {

  mCustomTabsServiceConnection = new (CustomTabsServiceConnection.extend({
    onCustomTabsServiceConnected: function (name: android.content.ComponentName, client: CustomTabsClient) {
      mCustomTabsClient = client;
      mCustomTabsClient.warmup(long(0));
      mCustomTabsSession = mCustomTabsClient.newSession(null);
    },
    onServiceDisconnected (name: android.content.ComponentName) {
      mCustomTabsClient = null;
    }
  }))();

  CustomTabsClient.bindCustomTabsService(context(), CUSTOM_TAB_PACKAGE_NAME, mCustomTabsServiceConnection);
}

export function openWebView(options: AwesomeWebviewOptions): void {
  if (!options.url) {
    throw new Error('No url set in the Advanced WebView Options object.');
  }
  let intentBuilder: CustomTabsIntent.Builder;
  if (mCustomTabsSession) {
    intentBuilder = new CustomTabsIntent.Builder();
  } else {
    intentBuilder = new CustomTabsIntent.Builder(mCustomTabsSession);
  }

  intentBuilder.setShowTitle(options.showTitle === true);

  if (options.toolbarColor) {
    intentBuilder.setToolbarColor(new Color(options.toolbarColor).android);
  }

  if (options.menuItems) {
    options.menuItems.forEach((item) => {
      intentBuilder.addMenuItem(item.title, item.pendingIntent);
    });
  }

  intentBuilder.enableUrlBarHiding();

  const customTabsIntent = intentBuilder.build();

  if (options.headers) {
    const headers = new android.os.Bundle();

    Object.keys(options.headers).forEach(headerName => {
      headers.putString(headerName, options.headers[headerName]);
    });

    customTabsIntent.intent.putExtra(android.provider.Browser.EXTRA_HEADERS, headers);
  }

  customTabsIntent.launchUrl(context(), android.net.Uri.parse(options.url));
}
