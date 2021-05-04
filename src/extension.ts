import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('WaveViewer.start', () => {
            const panel = vscode.window.createWebviewPanel(
                'Wave Viewer', // viewType
                "Wave Viewer", // 视图标题
                vscode.ViewColumn.One, // 显示在编辑器的哪个部位
                {
                    enableScripts: true, // 启用JS，默认禁用
                    retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
                }
            );
            panel.webview.html = getWebViewContent(context, 'examples/viewer.html');
            // panel.webview.html = '<html><body>I am maksyuki</body></html>'
        }));
}

// function getExtensionFileVscodeResource(context : vscode.ExtensionContext, relativePath : string) {
// 	const diskPath = vscode.Uri.file(path.join(context.extensionPath, relativePath));
// 	return diskPath.with({ scheme: 'vscode-resource' }).toString();
// }

function getWebViewContent(context : vscode.ExtensionContext, templatePath : string) {
    const resourcePath = path.join(context.extensionPath, templatePath);
    // vscode.window.showInformationMessage(resourcePath);
    const dirPath = path.dirname(resourcePath);
    // vscode.window.showInformationMessage(dirPath);
    let html = fs.readFileSync(resourcePath, 'utf-8');
    // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
    });
    // console.log(html);
    return html;
}
