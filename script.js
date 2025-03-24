let pyodide = null;
let isRunning = false;

async function initPyodide() {
    try {
        document.getElementById('output').textContent = 'Loading Python environment...';
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/"
        });
        document.getElementById('output').textContent = 'Python environment ready!';
        enableRunButton();
        document.getElementById('loading').style.display = 'none';
    } catch (error) {
        document.getElementById('output').textContent = 'Failed to load Python environment: ' + error;
    }
}

async function runPythonCode() {
    if (isRunning) return;

    const outputElement = document.getElementById('output');
    const codeElement = document.getElementById('codeInput');
    const runButton = document.querySelector('button');

    if (!pyodide) {
        outputElement.textContent = "Python environment is not ready yet...";
        return;
    }

    if (!codeElement || !codeElement.value.trim()) {
        outputElement.textContent = "Please enter some code first!";
        return;
    }

    try {
        isRunning = true;
        runButton.disabled = true;
        outputElement.textContent = 'Running...';

        const code = codeElement.value;

        // 设置捕获输出的代码
        await pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
        `);

        // 执行用户代码
        await pyodide.runPython(code);

        // 获取输出
        const output = await pyodide.runPython(`
output = sys.stdout.getvalue()
sys.stdout = sys.__stdout__
output
        `);

        outputElement.textContent = output || 'Code executed successfully!';

    } catch (error) {
        outputElement.textContent = `Error: ${error.message || error}`;
    } finally {
        isRunning = false;
        runButton.disabled = false;
        // 恢复标准输出
        await pyodide.runPython('sys.stdout = sys.__stdout__');
    }
}

function enableRunButton() {
    const runButton = document.querySelector('button');
    if (runButton) {
        runButton.disabled = false;
    }
}

function clearOutput() {
    document.getElementById('output').textContent = '';
}

// 初始化
window.addEventListener('load', initPyodide);