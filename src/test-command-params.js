const vscode = require('vscode');
const path = require('path');

var mdTml = null;
function copyFile(filepath) {
    
    
    if (this.mdTml === undefined || this.mdTml == null) {
        this.mdTml = vscode.window.createTerminal("ClipBoard");
    }
    var sep = '/';
    if(process.platform == "win32"){
        if(filepath.charAt(0) == '/'){
            filepath = filepath.substring(1);
        }
        sep = "\\";
    }
    var extension = vscode.extensions.getExtension("fengdeyingzi.clipboard-plugin");
    let cmdStr = `${extension.extensionPath}${sep}bin${sep}clipboard -setfile "${filepath}"`; // Typora 所在目录必须在环境变量中, 你也可以把它抽出来作为配置
    this.mdTml.show(false);
    this.mdTml.sendText(cmdStr);
}

vscode.window.onDidCloseTerminal((terminal) => { // 监听终端被关闭
    if (terminal.name === "ClipBoard") {
        this.mdTml = undefined;
    }
});


module.exports = function(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.demo.copyFilePath', (uri) => {
        // vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
        var extension = vscode.extensions.getExtension("fengdeyingzi.clipboard-plugin");
        // vscode.window.showInformationMessage(`扩展路径：${extension.extensionPath}`)
        copyFile(uri.path);
    }));
};